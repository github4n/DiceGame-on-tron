/* eslint-disable no-console */
const StateMachine = require('javascript-state-machine');
const utils = require('../../utils');
const {redisForRing} = require('../redis'); 
const server = require('../../webServer');

let fsm = {
    fsm:null,
    createFSM(initState,GameId,StartTime){
       this.fsm = new StateMachine({
            init: initState,
            transitions: [
              { name: 'create',   from: 'done',       to: 'created' },
              { name: 'lottery',  from: 'created',    to: 'lotterying'},
              { name: 'share',    from: 'lotterying', to: 'done'  }
            ],
            data: {
                GameId: GameId,
                StartTime:StartTime,
                lotteryNum:0
            },
            methods: {
                onCreated: function(lifecycle) { 
                    (async function(){
                        await redisForRing.setAsync('currGameStatus','created');
        
                        let now = Date.now();
                        let currGameLotteryTime = lifecycle.fsm.StartTime + utils.betTimeInterval;
                        if(now < currGameLotteryTime){
                            server.io.sockets.emit('currentStatus',JSON.stringify({
                                currGameId : lifecycle.fsm.GameId,
                                currGameStatus : lifecycle.fsm.state,
                                currGameRemain : currGameLotteryTime - now
                            }));
                            await utils.sleep(currGameLotteryTime - now);
                        }

                        lifecycle.fsm.lottery();
                    })(); 
                },
                onLotterying: function(lifecycle) { 
                    (async function(){

                        //合约开奖num，status置为1
                        let salt = await redisForRing.hgetAsync('GameSalt',lifecycle.fsm.GameId);
                        if(!salt){
                            salt = utils.generateSalt(32);
                            await redisForRing.hsetAsync('GameSalt',lifecycle.fsm.GameId,salt);
                        }

                        let result = await utils.fairRandom(salt + lifecycle.fsm.GameId,utils.ring.length);
                        result.result = result.result - 1;

                        server.io.sockets.emit('currentStatus',JSON.stringify({
                            currGameId : lifecycle.fsm.GameId,
                            currGameStatus : lifecycle.fsm.state,
                            currGameRemain : utils.lotteryInterval,
                            currGameLotteryNum : result.result
                        }));
        
                        lifecycle.fsm.lotteryNum = result.result;
                        await redisForRing.setAsync('currGameStatus','lotterying');
                        await redisForRing.setAsync('currGameLotteryNum',result.result);

                        let ResNum = utils.ring[result.result];
                        utils.ringLottery(lifecycle.fsm.GameId,ResNum);

                        redisForRing.zaddAsync('GameResult',lifecycle.fsm.GameId,lifecycle.fsm.GameId + '-' + ResNum);

                        //redis保存最近50条数据
                        let GameResultData = JSON.stringify({
                            gId:lifecycle.fsm.GameId,
                            lotteryNum:ResNum,
                            salt:salt,
                            hash:result.sha3_2
                        });
                        let listLen = await redisForRing.lpushAsync('GameResultRecently',GameResultData);
                        //console.log('listLen' + listLen);
                        if(listLen > 50){
                            await redisForRing.rpopAsync('GameResultRecently');
                        }

                        //rarely win
                        if(ResNum == 4){
                            let betData = redisForRing.zrevrangeAsync('betRecords',0,50);
                            for(let i = 0;i < betData.length;i++){
                                let info = betData[i].split(';');
                                let betNum = parseInt(info[1]);
                                let gameId = parseInt(info[3]);
                                
                                if(gameId < lifecycle.fsm.GameId){
                                    break;
                                }

                                if(betNum == 4){
                                    let addr = info[0];
                                    let Msg_cn = '恭喜幸運的' + addr.substr(0,4) + '...' + addr.substr(addr.length-4) +'在輪盤投中“莊家”牌，獲得30倍大獎！';
                                    let Msg_en = 'Lucky user ' + addr.substr(0,4) + '...' + addr.substr(addr.length-4) + ' betting \'Maker\' card and congratulation to your winning 30 X TRX payout.';
                                    
                                    redisForRing.publishAsync('rarelyWin',JSON.stringify({
                                        Msg_cn:Msg_cn,
                                        Msg_en:Msg_en
                                    }));
                                }
                            }
                        }

                        await utils.sleep(utils.lotteryInterval);
                        
                        //console.log('fsm.share()');
                        lifecycle.fsm.share();
                    })(); 
                },
                onDone: function(lifecycle) { 
                    (async function(){
                        //console.log('onDone');

                        server.io.sockets.emit('currentStatus',JSON.stringify({
                                currGameId : lifecycle.fsm.GameId,
                                currGameStatus : lifecycle.fsm.state,
                                currGameRemain : utils.doneInterval,
                        }));

                        //创建一局游戏
                        let currGameId = await utils.getRingGIDIndex();
                        utils.createRingGame();                 
                        await utils.sleep(utils.doneInterval);

                        lifecycle.fsm.GameId = currGameId + 1;
                        lifecycle.fsm.StartTime = Date.now();
                        //console.log('create successful');
        
                        await redisForRing.setAsync('currGameId',lifecycle.fsm.GameId);
                        await redisForRing.setAsync('currGameStatus','done');
                        await redisForRing.setAsync('currGameStartTime',lifecycle.fsm.StartTime);

                        let salt = utils.generateSalt(32);
                        await redisForRing.hsetAsync('GameSalt',lifecycle.fsm.GameId,salt);

                        //console.log('fsm.create()');
                        lifecycle.fsm.create();
                    })(); 
                }
            }
        });
    }
};

module.exports = fsm;