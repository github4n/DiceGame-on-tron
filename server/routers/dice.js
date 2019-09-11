const router = require('koa-router')();
const {redisForDice, redisForRing}= require('../lib/redis');
const utils = require('../utils');

async function prizeRecords(ctx){
    let count = ctx.request.query.Count;
    if(count){
        count = parseInt(count);
    }
    else{
        count = 10;
    }
    let result = await redisForDice.zrevrangeAsync('prizeRecords',0,count - 1,'WITHSCORES');
    let records = [];
    for (let i = 0;i < parseInt(result.length/2);i++){
        records.push({
            time:result[i*2+1],
            prize:result[i*2].split('-')[1]
        });
    }
  ctx.body = records;
}

async function myPrizes(ctx){
    let addr = ctx.request.query.Addr;
    if(!addr){
        addr = '';
    }
    let result = await redisForDice.hgetAsync('userPrizes',addr);
    if(!result){
        result = 0;
    }
  ctx.body = result;
}

async function withdraw(ctx){
    let Addr = ctx.request.query.Addr;
    let value = ctx.request.query.Value;
    if(!Addr){
        Addr = '';
    }
    if(!value){
        value = 0;
    }else{
        value = parseInt(value);
    }
    let userPrize = await redisForDice.hgetAsync('userPrizes',Addr);
    if(!userPrize){
        userPrize = 0;
    }else{
        userPrize = parseInt(userPrize);
    }
    if(value && value <= userPrize){
        redisForDice.hsetAsync('userPrizes',Addr,userPrize - value);
        utils.withdrawPrize(Addr,value);
        ctx.body = 'success';
    }
    else{
        ctx.body = 'invalid withdraw value';
    }
}

async function betRecords(ctx){
    let count = ctx.request.query.Count;
    if(count){
        count = parseInt(count);
    }
    else{
        count = 10;
    }

    let result = await redisForDice.zrevrangeAsync('betRecords',0,count - 1,'WITHSCORES');
    let records = [];
    for (let i = 0;i < parseInt(result.length/2);i++){
        let info = result[i*2].split(';');
        records.push({
            betId:result[i*2+1],
            addr:info[0],
            betNUm:info[1],
            betValue:info[2],
            lotteryNumber:info[3],
            bonus:info[4],
            time:info[5],
            betType:info[6]
        });
    }
    ctx.body = records;
}

async function myBets(ctx){
    let Addr = ctx.request.query.Addr;
    let count = ctx.request.query.Count;
    if(count){
        count = parseInt(count);
    }
    else{
        count = 10;
    }

    if(!Addr){
        Addr = '';
    }

    let result = await redisForDice.zrevrangeAsync('betRecords-' + Addr,0,count,'WITHSCORES');
    let records = [];
    for (let i = 0;i < parseInt(result.length/2);i++){
        let info = result[i*2].split(';');
        records.push({
            betId:result[i*2+1],
            addr:info[0],
            betNUm:info[1],
            betValue:info[2],
            lotteryNumber:info[3],
            bonus:info[4],
            time:info[5],
            betType:info[6]
        });
    }
    ctx.body = records;
}

async function getConfig(ctx){
    let isShowMsg = await redisForDice.getAsync('isShowMsg');
    let shownMsg = await redisForDice.getAsync('shownMsg');
    let shownMsgEN = await redisForDice.getAsync('shownMsgEN');

    let body = {
        isShowMsg:isShowMsg?parseInt(isShowMsg):0,
        shownMsg:(shownMsg?shownMsg:'').split('|'),
        shownMsgEN:(shownMsgEN?shownMsgEN:'').split('|')
    };

    ctx.body = body;
}

async function getInviteTop(ctx){
    let count = ctx.request.query.Count;
    if(count) {
        count = parseInt(count);
    } else {
        count = 10;
    }
    let startTime = await redisForDice.getAsync('calcInviterBetIn3Games_startTime');
    let endTime = await redisForDice.getAsync('calcInviterBetIn3Games_endTime');
    let shareMoney = await redisForRing.getAsync('activityBalance');
    if(!shareMoney){
        shareMoney = 0;
    }else{
        shareMoney = (parseInt(shareMoney) - 1000 * 1e6);
    }
    if(shareMoney < 0) {
        shareMoney = 0;
    }

    if(endTime){
        endTime = parseInt(endTime);
    }else{
        endTime = 0;
    }

    let nextCalcShareTime = await redisForDice.getAsync('calcSharesNextTime');
    if(nextCalcShareTime){
        nextCalcShareTime = parseInt(nextCalcShareTime);

        if(nextCalcShareTime - Date.now() <= 12 * 60 * 60 * 1000 || endTime - Date.now() >= 12 * 60 * 60 * 1000){
            let benefitAmt = await redisForRing.getAsync('ourProfit');
            if(benefitAmt){
                benefitAmt = parseInt(benefitAmt);
                if(benefitAmt > 0){
                    shareMoney += parseInt(benefitAmt * 0.05);
                }
            }
        }
    }

    let sumTop5 = 0;
    let result = await redisForDice.zrevrangeAsync('calcInviterBetIn3Games_scoreTop' + startTime,0,count-1,'WITHSCORES');
    let records = [];
    for (let i = 0;i < parseInt(result.length/2);i++){
        let addr = result[i*2];
        let amt = parseInt(result[i*2+1]);
        let amtBet = 0;
        let amtUser = 0;
        let rankBet = await redisForDice.zrevrankAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_Total',addr);
        let rankUser = await redisForDice.zrevrankAsync('calcInviterBetIn3Games_activeUser_' + startTime + '_Total',addr);
        
        if(rankUser || rankUser == 0){
            amtUser = 40 - parseInt(rankUser) * 2;
        }

        if(rankBet || rankBet == 0){
            amtBet = 60 - parseInt(rankBet) * 3;
        }

        records.push({
            addr:addr,
            amt:amt,
            amtBet:amtBet,
            amtUser:amtUser,
            prize:0
        });

        if(i<5){
            sumTop5 += amt;
        }
    }

    for(let i = 0;i<records.length;i++) {
        if(i < 5){
            records[i].prize = parseInt(shareMoney * (records[i].amt/sumTop5));
        }
    }
    ctx.body = records;
}

async function getInviteTopEndTime(ctx){
    let endTime = await redisForDice.getAsync('calcInviterBetIn3Games_endTime');
    ctx.body = endTime;
}

async function verifyRandom(ctx){
    //let addr = ctx.request.query.Addr;
    //let result = await redisForDice.zrevrangeAsync('betRecords-' + addr,0,0,'WITHSCORES');

    let betId = ctx.request.query.BetId;
    if(!betId){
        betId = 0;
    }else{
        betId = parseInt(betId);
    }
    let result = await redisForDice.zrevrangebyscoreAsync('betRecords',betId,betId,'WITHSCORES');
    let data = {};
    if(result && result.length > 0) {
        let info = result[0].split(';');
        let addr = info[0];
        let betId = parseInt(result[1]);
        let betNUm = parseInt(info[1]);
        let betValue = parseInt(info[2]);
        let time = parseInt(info[5]);

        let seed = addr+betId+betNUm+betValue+time;
        let randRes = await utils.fairRandom(seed,100);

        data = {
            betId:betId,
            addr:addr,
            betNum:betNUm,
            betAmt:betValue,
            timestamp:time,
            combSeed:seed,
            combSeedSha3:randRes.sha3_1,
            publicKey:utils.randomPublicKey,
            publicKeyAddr:utils.randomAddress,
            sign:randRes.sign,
            sha3Sig:randRes.sha3_2,
            last6digits:randRes.postfix6+'('+randRes.postfix6_10 + ')',
            luckNum:randRes.result
        };
    }
    ctx.body = data;
}

async function getBanner(ctx){
    let body = [];
    let info = await redisForDice.zrevrangeAsync('bannerInfo',0,99);
    for (let i = 0;i < info.length;i++){
        let bannerInfo = info[i].split(';');
        body.push({
            banner:bannerInfo[0],
            url:bannerInfo[1],
            url_en:bannerInfo[2],
            banner_en:bannerInfo[3]
        });
    }
    ctx.body = body;
}

async function getBannerPC(ctx){
    let body = [];
    let info = await redisForDice.zrevrangeAsync('bannerInfoPC',0,99);
    for (let i = 0;i < info.length;i++){
        let bannerInfo = info[i].split(';');
        body.push({
            banner:bannerInfo[0],
            url:bannerInfo[1],
            url_en:bannerInfo[2],
            banner_en:bannerInfo[3]
        });
    }
    ctx.body = body;
}

async function getNextDividendTime(ctx){
    let nextCalcShareTime = await redisForDice.getAsync('calcSharesNextTime'); 
    ctx.body = nextCalcShareTime;
}

async function getWeeklyAmountTop(ctx){
    let count = ctx.request.query.Count;
    if(count) {
        count = parseInt(count);
    } else {
        count = 10;
    }
    let records = [];
    let startTime = await redisForDice.getAsync('calcDepositRank_startTime');
    let weeklyResult = await redisForDice.zrevrangeAsync('DepositRank_' + startTime,0,count - 1,'WITHSCORES');
    let shareMoney = await redisForRing.getAsync('activityBalance2');
    if(!shareMoney){
        shareMoney = 0;
    }else{
        shareMoney = (parseInt(shareMoney) - 1000 * 1e6);
    }
    if(shareMoney < 0) {
        shareMoney = 0;
    }

    let nextCalcShareTime = await redisForDice.getAsync('calcSharesNextTime');
    if(nextCalcShareTime){
        nextCalcShareTime = parseInt(nextCalcShareTime);

        if(nextCalcShareTime - Date.now() <= 12 * 60 * 60 * 1000){
            let benefitAmt = await redisForRing.getAsync('ourProfit');
            if(benefitAmt){
                benefitAmt = parseInt(benefitAmt);
                if(benefitAmt > 0){
                    shareMoney += parseInt(benefitAmt * 0.05);
                }
            }
        }
    }

    for (let i = 0;i < parseInt(weeklyResult.length/2);i++){
        let weeklyAmount =  parseFloat(parseFloat(weeklyResult[i*2 + 1]).toFixed(3));
        let addr = weeklyResult[i*2];
        let prizeAmount = 0;

        if(i < 5){
            prizeAmount = parseInt(shareMoney * utils.sharePercentage[i]);
        }

        records.push({
            addr:addr,
            weeklyAmount:weeklyAmount,
            prizeAmount:prizeAmount
        });
    }
    ctx.body = records;
}

async function getInviteTopInfo(ctx){
    let endTime = await redisForDice.getAsync('calcInviterBetIn3Games_endTime');
    let totalPrize = 0;
    let prizeRecords = await redisForDice.zrevrangeAsync('calcInviterBetIn3Games_prizeRecords',0,-1);
    if(prizeRecords && prizeRecords.length > 0){
        for(let i =0;i<prizeRecords.length;i++){
            totalPrize += parseInt(prizeRecords[i]);
        }
    }

    ctx.body = {
        endTime : endTime,
        totalPrize : totalPrize
    };
}

async function getMyInviteTop(ctx){
    let addr = ctx.request.query.Addr;
    if(!addr){
        addr = '';
    }

    let result = [];
    let activeUserCnt = 0;
    let totalBetThisWeek = 0;
    let totalBetAmtData = await redisForDice.zrevrangeAsync('calcInviterBetIn3Games_betAmt_' + addr,0,-1,'withscores');
    if(totalBetAmtData && totalBetAmtData.length > 0){
        let startTime = await redisForDice.getAsync('calcInviterBetIn3Games_startTime');
        for(let i = 0;i<totalBetAmtData.length / 2;i++){
            let addrBro = totalBetAmtData[i * 2];
            let betAmtBro = parseInt(totalBetAmtData[i * 2 + 1]);
            let betAmtThisWeek = await redisForDice.zscoreAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_' + addr,addrBro);
            if(!betAmtThisWeek){
                betAmtThisWeek = 0;
            }else{
                betAmtThisWeek = parseInt(betAmtThisWeek);
                totalBetThisWeek += betAmtThisWeek;
                activeUserCnt++;
            }

            result.push({
                addr:addrBro,
                totalBetAmt:betAmtBro,
                betAmtThisWeek:betAmtThisWeek
            });
        }
    }
    ctx.body = {
        activeUserCnt : activeUserCnt,
        totalBetThisWeek : totalBetThisWeek,
        details:result
    };
}

async function getShareAmtTotal(ctx){
    let data = await redisForDice.zrangeAsync('prizeRecords',0,-1);
    let sum = 0;
    for(let i = 0;i<data.length;i++){
        let info = data[i].split('-');
        sum += parseInt(info[1]);
    }
    ctx.body = sum;
}

async function getPrizePot(ctx){
    let data = await redisForRing.getAsync('prizePot');

    ctx.body = data;
}

module.exports = router
.get('/prizeRecords',prizeRecords)
.get('/myPrizes',myPrizes)
.get('/withdraw',withdraw)
.get('/betRecords',betRecords)
.get('/myBets',myBets)
.get('/getConfig',getConfig)
.get('/verifyRandom',verifyRandom)
.get('/getBanner',getBanner)
.get('/getBannerPC',getBannerPC)
.get('/getNextDividendTime',getNextDividendTime)
.get('/getWeeklyAmountTop',getWeeklyAmountTop)
.get('/getInviteTopInfo',getInviteTopInfo)
.get('/getInviteTop',getInviteTop)
.get('/getInviteTopEndTime',getInviteTopEndTime)
.get('/getMyInviteTop',getMyInviteTop)
.get('/getShareAmtTotal',getShareAmtTotal)
.get('/getPrizePot',getPrizePot);

