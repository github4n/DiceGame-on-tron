/* eslint-disable no-console */
const utils = require('../../utils');
const {redisForRing} = require('../redis');
const fsm = require('../fsm');
const config = require('../../config/config');

function scheduleCalcDailyBetAnnounce(){
    calcDailyBetAnnounce();
}
//=======================================================================================
async function startGame(){
    //格式GameID-Status-startTime
    let currGameId = await redisForRing.getAsync('currGameId');
    let currGameStatus = await redisForRing.getAsync('currGameStatus');
    let currGameStartTime = await redisForRing.getAsync('currGameStartTime');
    if(!currGameId || !currGameStatus || !currGameStartTime){
        //创建一局游戏
        currGameId = await utils.getRingGIDIndex();
        await utils.createRingGame();

        currGameId ++;
        currGameStatus = 'created';
        currGameStartTime = Date.now();
        await redisForRing.setAsync('currGameId',currGameId);
        await redisForRing.setAsync('currGameStatus',currGameStatus);
        await redisForRing.setAsync('currGameStartTime',currGameStartTime);
    }
    else{
        currGameId = parseInt(currGameId);
        currGameStartTime = parseInt(currGameStartTime);
    }

    fsm.createFSM(currGameStatus,currGameId,currGameStartTime);
}

//订阅公告
function rarelyAnnounce(socket){
    let sub = redisForRing.createClient(config.redisOpForRing);

    sub.on('subscribe', function (channel, count) {
        console.log('subscribe' + ' ' + channel + ', count:' + count);
    });
    
    sub.on('message', function (channel, message) {
        if(channel == 'rarelyWin'){
            socket.emit('announce',message);
        }
    });
    
    sub.subscribe('rarelyWin');
}

//当日每累计100W下注额 发公告
async function calcDailyBetAnnounce(){
    // eslint-disable-next-line no-constant-condition
    while(true){
        let startTime = await redisForRing.getAsync('calcDailyBetAnnounce_startTime');
        let endTime = await redisForRing.getAsync('calcDailyBetAnnounce_endTime');
        let lastBetTime = await redisForRing.getAsync('calcDailyBetAnnounce_betTime');

        if(!startTime){
            //startTime 为当日凌晨
            startTime = new Date().setHours(0,0,0,0);
            endTime = startTime + 24 * 60 * 60 * 1000;

            await redisForRing.setAsync('calcDailyBetAnnounce_startTime',startTime);
            await redisForRing.setAsync('calcDailyBetAnnounce_endTime',endTime);
        } else if(Date.now() > parseInt(endTime)) {
            startTime = parseInt(endTime);
            endTime = startTime + 24 * 60 * 60 * 1000;

            await redisForRing.setAsync('calcDailyBetAnnounce_startTime',startTime);
            await redisForRing.setAsync('calcDailyBetAnnounce_endTime',endTime);
            await redisForRing.delAsync('calcDailyBetAnnounce_betAmt');
        } else{
            startTime = parseInt(startTime);
            endTime = parseInt(endTime);
        }

        if(!lastBetTime){
            lastBetTime = startTime;
        } else{
            lastBetTime = parseInt(lastBetTime) + 1;
        }
        if(Date.now() < endTime){
            endTime = Date.now() - 2 * 1000;
        }

        let betData = await redisForRing.zrevrangebyscoreAsync('betRecordsByTime',endTime,lastBetTime,'withscores');
        if(!betData){
            await utils.sleep(5*1000);
            continue;
        }
        for(let i = 0;i < betData.length / 2;i++){
            let info = betData[i * 2].split(';');
            let playerAddr = info[0];
            let betAmt = parseInt(parseInt(info[2])/1000000);

            let betTime = parseInt(betData[i * 2 + 1]);
            if(betTime <= lastBetTime){
                break;
            }

            let currBetAmt = await redisForRing.hgetAsync('calcDailyBetAnnounce_betAmt',playerAddr);
            if(currBetAmt){
                currBetAmt = parseInt(currBetAmt) + betAmt;
            }
            else{
                currBetAmt = betAmt;
            }

            if(currBetAmt >= 1000000){
                let Msg_cn = '感謝尊貴的' + playerAddr.substr(0,4) + '...' + playerAddr.substr(playerAddr.length-4) +'今日在本站幸运中本聪游戏累計投註100WTRX，祝他運氣長虹好運連連！';
                let Msg_en = 'Thanks for our distinguished user ' + playerAddr.substr(0,4) + '...' + playerAddr.substr(playerAddr.length-4) + ' whose wagered TRX is up to 1,000,000 TRX now in LUCKY SATOSHI! Wish you have a good luck on Tronoscar Platform!';
                                    
                redisForRing.publishAsync('rarelyWin',JSON.stringify({
                    Msg_cn:Msg_cn,
                    Msg_en:Msg_en
                }));

                currBetAmt = currBetAmt - 1000000;
            }

            await redisForRing.hsetAsync('calcDailyBetAnnounce_betAmt',playerAddr,currBetAmt);
        }

        if(betData && betData.length > 1){
            await redisForRing.setAsync('calcDailyBetAnnounce_betTime',betData[1]);
        }

        await utils.sleep(5*1000);
    }
}

async function logAccountBalance(){
    // eslint-disable-next-line no-constant-condition
    while(true){
        try{
            let activityBalance = await utils.tronWeb.trx.getBalance(utils.activityAddr);
            if(activityBalance && activityBalance != 0){
                await redisForRing.setAsync('activityBalance',activityBalance);
            }

            let activityBalance2 = await utils.tronWeb.trx.getBalance(utils.activityAddr2);
            if(activityBalance2 && activityBalance2 != 0){
                await redisForRing.setAsync('activityBalance2',activityBalance2);
            }
            
            let adminBalance = await utils.tronWeb.trx.getBalance();
            if(adminBalance && adminBalance != 0){
                await redisForRing.setAsync('adminBalance',adminBalance);
            }
            
            let diceBalance = await utils.tronWeb.trx.getBalance(utils.tronWeb.address.fromHex(utils.oscarDice.address));
            if(diceBalance && diceBalance != 0){
                await redisForRing.setAsync('diceBalance',diceBalance);
            }

            let diceBaseAmount = await utils.oscarDice.baseAmount().call();
            if(diceBaseAmount){
                diceBaseAmount = utils.decodeHexNum(diceBaseAmount._hex);
                if(diceBaseAmount && diceBaseAmount != 0){
                    await redisForRing.setAsync('diceBaseAmount',diceBaseAmount);
                }  
            }

            let ringBalance = await utils.tronWeb.trx.getBalance(utils.tronWeb.address.fromHex(utils.oscarRing.address));
            if(ringBalance && ringBalance != 0){
                await redisForRing.setAsync('ringBalance',ringBalance);
            }

            let ringBaseAmount = await utils.oscarRing.baseAmount().call();
            if(ringBaseAmount){
                ringBaseAmount = utils.decodeHexNum(ringBaseAmount._hex);
                if(ringBaseAmount && ringBaseAmount != 0){  
                    await redisForRing.setAsync('ringBaseAmount',ringBaseAmount);
                }
            }

            let ourProfit = await utils.getTotalBenefit();
            if(ourProfit){ 
                await redisForRing.setAsync('ourProfit',ourProfit);
            }

            let prizePot = await utils.getPrizePot();
            if(prizePot){ 
                await redisForRing.setAsync('prizePot',prizePot);
            }
            
            await utils.sleep(1000);
        }
        catch(e){
            await utils.sleep(1000);
        }
    }
}


module.exports = {
    startGame,
    rarelyAnnounce,
    scheduleCalcDailyBetAnnounce,
    logAccountBalance
};

