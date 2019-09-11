const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('../routers');
const socketio = require('socket.io');
const http = require('http');
const utils = require('../utils');
const {redisForRing} = require('../lib/redis');

//http server
const app = new Koa();
app.use(cors({
	// eslint-disable-next-line no-unused-vars
	origin: function(ctx) {
		return '*';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = socketio.listen(server,{
    path: '/ringSocket',
    pingTimeout: 60000,
    pingInterval: 25000
});

io.on('connection', ws => {
    ws.on('login',message =>{
		try{
			let obj = JSON.parse(message);
			if(obj.msg && obj.sign && obj.addr && utils.tronWeb.trx.verifyMessage(obj.msg,obj.sign,obj.addr)){
                //用户oct质押数量对应的等级 ，从1级开始
                (async function(){
                    ws.userInfo = obj;
                    let level = [0,1,10,50,100,500,1000,3000,5000,10000,20000,40000,60000,80000,100000,200000,400000,600000,800000,1000000];
                    let amt = await utils.getUserTotalDeposit(obj.addr);
                    for (let i = 1; i < level.length; i++) {
                        if(amt >= level[i - 1] && amt <= level[i]){
                            ws.userInfo.userLevel = i;
                        }    
                    }

                    ws.emit('login',JSON.stringify({
                        username: ws.userInfo.addr,
                        userLevel:ws.userInfo.userLevel
                    }));
                })();
			}	
		}
		catch(e){
			//do nothing
		}
    });
    
    ws.on('newMsg',message =>{
		if(ws.userInfo && ws.userInfo.userLevel >=5){
            (async function(){
                let msg = JSON.stringify({
                    username: ws.userInfo.addr,
                    userLevel:ws.userInfo.userLevel,
                    message: message
                });
                
                ws.broadcast.emit('newMsg',msg);
                
                let listLen = await redisForRing.rpushAsync('chatMsg',msg);
                if(listLen > 200){
                    await redisForRing.lpopAsync('chatMsg');
                }
            })();
		}
    });
    
    emitRingInfo(ws);
    
});

server.listen(3000);

async function emitRingInfo(ws){
    //get ring curr info
    let currGameId = await redisForRing.getAsync('currGameId');
    let currGameStatus = await redisForRing.getAsync('currGameStatus');
    let currGameLotteryNum = await redisForRing.getAsync('currGameLotteryNum');
    let currGameStartTime = await redisForRing.getAsync('currGameStartTime');

    if(currGameId){
        currGameId = parseInt(currGameId);
    }else{
        currGameId = 0;
    }

    if(currGameLotteryNum){
        currGameLotteryNum = parseInt(currGameLotteryNum);
    }else{
        currGameLotteryNum = 0;
    }

    if(currGameStartTime){
        currGameStartTime = parseInt(currGameStartTime);
    }else{
        currGameStartTime = Date.now();
    }

    let message = {
        currGameId : currGameId,
        currGameStatus : currGameStatus,
        currGameLotteryNum : currGameLotteryNum
    };

    switch (message.currGameStatus){
        case 'created':
            message.currGameRemain = currGameStartTime + utils.betTimeInterval - Date.now();
        break;
        case 'lotterying':
            message.currGameRemain = currGameStartTime + utils.betTimeInterval + utils.lotteryInterval - Date.now();
        break;
        case 'done':
            message.currGameRemain = currGameStartTime + utils.betTimeInterval + utils.lotteryInterval + utils.doneInterval - Date.now();
        break;
    }
    ws.emit('currentStatus', JSON.stringify(message));
}

module.exports = {
    server,
    io
};