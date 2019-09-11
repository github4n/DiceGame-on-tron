const config = require('../../config/config');
const utils = require('../../utils');
const {redisForDice,redisForRing,redisForTower} = require('../redis');
const client = require('../http');

async function betWatchForTower(){
    let pollingUrl = config.trongridApi + '/v1/contracts/' + utils.tronWeb.address.fromHex(utils.octTower.address) + '/events';
	// eslint-disable-next-line no-constant-condition
	while(true){ 
        let res = await client.requestWithOvertime(pollingUrl,5000);
        if(res && res.result){
            let data = JSON.parse(res.data);
            let recentBetReqId = await redisForTower.getAsync('tower_recentBetReqId');
            let lastBetId = 0;
            if(recentBetReqId){
                lastBetId = parseInt(recentBetReqId);
            }

            if(!data.success){
                await utils.sleep(5*1000);
                continue;
            }
            data = data.data;

            for(let i=0;i<data.length;i++){
                let item = data[i];

                if(item.event_name!='onBet'){
                    continue;
                }
                let bId = parseInt(item.result.bID);

                if(bId <= lastBetId){
                    break;
                }

                let time = item.block_timestamp;
                let pAddr = utils.tronWeb.address.fromHex('41' + item.result.pAddr.substr(2));
                let betNum = item.result.betNumber;
                let betVal = item.result.betValue;

                let seed = pAddr+bId+betNum+betVal+time;
                let resultInfo = await determineRate(seed,betNum);

                if(resultInfo.payout){
                    utils.towerLottery(bId,resultInfo.payout);
                }

                await redisForTower.zaddAsync('tower_betRecords',bId,pAddr+ ';'+ betNum+ ';'+ betVal + ';' + bId + ';' + time + ';' + resultInfo.num + ';' + resultInfo.payout);
                await redisForTower.zaddAsync('tower_betRecords-'+ pAddr,bId,pAddr+ ';'+ betNum+ ';'+ betVal + ';' + bId + ';' + time + ';' + resultInfo.num + ';' + resultInfo.payout);
                await redisForTower.zaddAsync('tower_betRecordsByTime',time,pAddr+ ';'+ betNum+ ';'+ betVal + ';' + bId + ';' + time + ';' + resultInfo.num + ';' + resultInfo.payout);
            }
            recentBetReqId = data[0].result.bID;
            await redisForTower.setAsync('tower_recentBetReqId',recentBetReqId);
        }
    }
}

async function betWatchForDice(){
    let pollingUrl = config.trongridApi + '/v1/contracts/' + utils.tronWeb.address.fromHex(utils.oscarDice.address) + '/events';
	// eslint-disable-next-line no-constant-condition
	while(true){ 
        let res = await client.requestWithOvertime(pollingUrl,5000);
        if(res && res.result){
            let data = JSON.parse(res.data);
            let recentBetReqId = await redisForDice.getAsync('recentBetReqId');
            let recentBetId = 0;
            if(recentBetReqId){
                recentBetId = parseInt(recentBetReqId);
            }

            if(!data.success){
                await utils.sleep(5*1000);
                continue;
            }
            data = data.data;

            if(data.length == 0){
                await utils.sleep(5*1000);
                continue;
            }
            for(let i=0;i<data.length;i++){
                let item = data[i];

                if(item.event_name!='onBet'){
                    continue;
                }

                let bId = parseInt(item.result.bID);
                if(bId <= recentBetId){
                    break;
                }

                let time = item.block_timestamp;
                let addr = utils.tronWeb.address.fromHex('41' + item.result.pAddr.substr(2));
                let betNum = item.result.betNumber;
                let betValue = item.result.betValue;
                let betType = item.result.betType;
                let bonus = 0;

                let seed = addr+bId+betNum+betValue+time;
                let randRes = await utils.fairRandom(seed,100);
                let lotteryNum = randRes.result;

                utils.diceLottery(bId,lotteryNum);

                if (betType == 0 && lotteryNum < betNum) {
                    bonus = parseInt(betValue * 97 / (betNum-1));
                }else if (betType == 1 && lotteryNum > betNum) {
                    bonus = parseInt(betValue * 97 / (100 - betNum));
                }

                //rarely win
                if(betNum < 10 && lotteryNum < betNum && betType == 0){
                    let payout = (97 / (betNum-1)).toFixed(2).toString();
                    let Msg_cn = '恭喜幸運的' + addr.substr(0,4) + '...' + addr.substr(addr.length-4) +'在骰子中下註數字“' + betNum + '”並獲勝，獲得' + payout + '倍大獎！';
                    let Msg_en = 'Lucky user ' + addr.substr(0,4) + '...' + addr.substr(addr.length-4) + ' betting result \'' + betNum +'\' and congratulation to your winning ' + payout + ' X TRX payout.';

                    redisForRing.publishAsync('rarelyWin',JSON.stringify({
                        Msg_cn:Msg_cn,
                        Msg_en:Msg_en
                    }));
                }

                await redisForDice.zaddAsync('betRecords',bId,addr+ ';'+ betNum+ ';'+ betValue+ ';'+ lotteryNum+ ';'+ bonus + ';' + time + ';' + betType);
                await redisForDice.zaddAsync('betRecordsByTime',time,addr+ ';'+ betNum+ ';'+ betValue+ ';'+ lotteryNum+ ';'+ bonus + ';' + bId + ';' + betType);
                await redisForDice.zaddAsync('betRecords-'+ addr,bId,addr+ ';'+ betNum+ ';'+ betValue+ ';'+ lotteryNum+ ';'+ bonus + ';' + time + ';' + betType);
            }
            recentBetId = data[0].result.bID;
            await redisForDice.setAsync('recentBetReqId',recentBetId);
        }
    }
}

async function betWatchForRing(){
    let pollingUrl = config.trongridApi + '/v1/contracts/' + utils.tronWeb.address.fromHex(utils.oscarRing.address) + '/events';
    // eslint-disable-next-line no-constant-condition
	while(true){ 
        let res = await client.requestWithOvertime(pollingUrl,5000);
        if(res && res.result){
            let data = JSON.parse(res.data);
            let recentBetReqId = await redisForRing.getAsync('recentBetReqId');
            let lastBetId = 0;
            if(recentBetReqId){
                lastBetId = parseInt(recentBetReqId);
            }

            if(!data.success){
                await utils.sleep(5*1000);
                continue;
            }
            data = data.data;

            for(let i=0;i<data.length;i++){
                let item = data[i];

                if(item.event_name!='onBet'){
                    continue;
                }
                
                let bId = parseInt(item.result.bID);
                if(bId <= lastBetId){
                    break;
                }

                let time = item.block_timestamp;
                let gID = item.result.gID;
                let betId = item.result.bID;
                let pAddr = utils.tronWeb.address.fromHex('41' + item.result.pAddr.substr(2));
                let betNum = item.result.betNumber;
                let betVal = item.result.betValue;

                await redisForRing.zaddAsync('betRecords',betId,pAddr+ ';'+ betNum+ ';'+ betVal + ';' + gID + ';' + betId);
                await redisForRing.zaddAsync('betRecordsByTime',time,pAddr+ ';'+ betNum+ ';'+ betVal + ';' + gID + ';' + betId);
            }
            recentBetReqId = data[0].result.bID;
            await redisForRing.setAsync('recentBetReqId',recentBetReqId);
        }
    }
}

async function determineRate(seed,betNum){
    let resultInfos = [];
    if(betNum <=60){
        //level1
        resultInfos = utils.level1;
    }else if(betNum <= 90){
        //level2
        resultInfos = utils.level2;
    }else{
        //level3
        resultInfos = utils.level3;
    }

    let resNum = await utils.fairRandom2(seed,99999);
    let sum = 0;
    let resultInfo = {};
    for(let i = 0;i < resultInfos.length;i++){
        sum += resultInfos[i].percent;
        if(resNum.result < sum){
            resultInfo = resultInfos[i];
            break;
        }
    }
    return resultInfo;
}

module.exports = {
    betWatchForTower,
    betWatchForDice,
    betWatchForRing
};