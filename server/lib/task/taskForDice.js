/* eslint-disable no-console */
const utils = require('../../utils');
const {redisForDice,redisForRing,redisForTower} = require('../redis');
const schedule = require('node-schedule');
const TronWeb = require('tronweb');
const config = require('../../config/config');

function scheduleCalcShares(){
    schedule.scheduleJob('0 0 12 * * *', function(){
        console.log('scheduleCalcShares:' + new Date());
        calcShares();
    }); 
}

function scheduleWithdrawDeposit(){
    schedule.scheduleJob('*/5 * * * *', function(){
        console.log('scheduleWithdrawDeposit:' + new Date());
        depositWithdraw();
    }); 
}

function scheduleCalcInviteAmount(){
    calcInviteAmount();
}


function scheduleUpdateInviteRank(){
    updateInviteRank();
}

function scheduleUpdateDepositRank(){
    updateDepositRank();
}

function scheduleShareInvitePrize(){
    schedule.scheduleJob('0 0 0 * * *', function(){
        console.log('scheduleShareInvitePrize:' + new Date());
        shareInvitePrize();
    }); 
}

function scheduleShareDepositPrize(){
    schedule.scheduleJob('0 0 0 * * *', function(){
        console.log('scheduleShareDepositPrize:' + new Date());
        shareDepositPrize();
    }); 
}

function scheduleCalcDailyBetAnnounce(){
    calcDailyBetAnnounce();
}

//=======================================================================================
async function calcShares(){
    let nextCalcShareTime = await redisForDice.getAsync('calcSharesNextTime');
    if(nextCalcShareTime){
        nextCalcShareTime = parseInt(nextCalcShareTime);
    }else{
        nextCalcShareTime = new Date().setHours(12,0,0,0) + 24 * 60 * 60 * 1000 ;
    }

    let date = Date.now();
    if(date < nextCalcShareTime){
        return;
    }
    await redisForDice.setAsync('calcSharesNextTime',nextCalcShareTime + 24 * 60 * 60 * 1000);

    let recentPrize = await redisForDice.zrevrangeAsync('prizeRecords',0,0,'WITHSCORES');
    if(recentPrize && recentPrize.length > 0 && date - parseInt(recentPrize[1]) <= 60 * 60 * 1000){
        return;
    }

    let totalDeposit = await utils.getTotalDeposit();
    await redisForDice.zaddAsync('calcShares-totalDeposit',date,totalDeposit);

    let diceBalance = await redisForRing.getAsync('diceBalance');
    let ringBalance = await redisForRing.getAsync('ringBalance');
    let diceBaseAmount = await redisForRing.getAsync('diceBaseAmount');
    let ringBaseAmount = await redisForRing.getAsync('ringBaseAmount');

    diceBalance = diceBalance?parseInt(diceBalance):0;
    ringBalance = ringBalance?parseInt(ringBalance):0;
    diceBaseAmount = diceBaseAmount?parseInt(diceBaseAmount):0;
    ringBaseAmount = ringBaseAmount?parseInt(ringBaseAmount):0;

    let totalBenefit = diceBalance + ringBalance - diceBaseAmount - ringBaseAmount;
    await redisForDice.zaddAsync('benefitRecords',date,date + '-' + totalBenefit);
    if(totalBenefit <= 0){
        await redisForDice.zaddAsync('prizeRecords',date,date + '-0');
        return;
    }

    //富余的取出
    if(diceBalance - diceBaseAmount > 0){
        utils.withdrawDiceJackPot(diceBalance - diceBaseAmount);
    }

    if(ringBalance - ringBaseAmount > 0){
        utils.withdrawRingJackPot(ringBalance - ringBaseAmount);
    }

    await utils.sleep(30*1000);

    //亏损的补上
    if(diceBalance - diceBaseAmount < 0){
        utils.depositDiceJackPot(diceBaseAmount - diceBalance);
    }

    if(ringBalance - ringBaseAmount < 0){
        utils.depositRingJackPot(ringBaseAmount - ringBalance);
    }

    //50%进分红池
    let totalPrize = parseInt(totalBenefit * 0.5);
    await redisForDice.zaddAsync('prizeRecords',date,date + '-' + totalPrize);
    utils.transferStakePot(totalPrize);

    //40%进项目方收益
    let totalOurs = parseInt(totalBenefit * 0.4);
    utils.transferTrx(utils.storeMoneyAddr,totalOurs);

    //5%进邀请人活动
    let totalActivity = parseInt(totalBenefit * 0.05);
    utils.transferTrx(utils.activityAddr,totalActivity);

    //5%进质押榜活动
    let totalActivity2 = parseInt(totalBenefit * 0.05);
    utils.transferTrx(utils.activityAddr2,totalActivity2);
    
    let addrs = await utils.getOwnersOfDeposit();
    for(let addr of addrs){
        let userDeposit = await utils.getDeposit(addr);
        if(userDeposit == 0){
            userDeposit = await utils.getDeposit(addr);
        }
        let prize = parseInt(userDeposit * (totalPrize / totalDeposit));

        let oldPrize = await redisForDice.hgetAsync('userPrizes',addr);

        if(!oldPrize){
            oldPrize = 0;
        }else{
            oldPrize = parseInt(oldPrize);
        }
        redisForDice.hsetAsync('userPrizes',addr,oldPrize + prize);
        redisForDice.hsetAsync('calcShares' + date,addr,prize);
    }
}

async function depositWithdraw(){
    let addrs = await utils.getOwnersOfDeposit();
    for(let addr of addrs){
        let {value,time} = await utils.getUnstake(addr);
        if(time != 0 && value != 0 && Date.now()/1000 - time >= 60*60*24){
            utils.withdrawUnstaked(addr);
        }
    }
}

async function calcInviteAmount(){
    // eslint-disable-next-line no-constant-condition
    while (true){
        try{
            let startTime = await redisForDice.getAsync('calcInviterBetIn3Games_startTime');
            let endTime = await redisForDice.getAsync('calcInviterBetIn3Games_endTime');
            let lastBetTimeDice = await redisForDice.getAsync('calcInviterBetIn3Games_betTimeDice');
            let lastBetTimeRing = await redisForDice.getAsync('calcInviterBetIn3Games_betTimeRing');
    
            if(!startTime){
                startTime = new Date().setHours(0,0,0,0) -(new Date()).getDay() * 24 * 60 * 60 * 1000;
                endTime = startTime + 7 * 24 * 60 * 60 * 1000;

                await redisForDice.setAsync('calcInviterBetIn3Games_startTime',startTime);
                await redisForDice.setAsync('calcInviterBetIn3Games_endTime',endTime);
            } else{
                startTime = parseInt(startTime);
                endTime = parseInt(endTime);
            }

            let date = Date.now();
            if(date >=  endTime){
                startTime = endTime;
                endTime = startTime + 7 * 24 * 60 * 60 * 1000;
                await redisForDice.setAsync('calcInviterBetIn3Games_startTime',startTime);
                await redisForDice.setAsync('calcInviterBetIn3Games_endTime',endTime);
            }

            if(!lastBetTimeDice){
                lastBetTimeDice = startTime;
            } else{
                lastBetTimeDice = parseInt(lastBetTimeDice);
            }

            if(!lastBetTimeRing){
                lastBetTimeRing = startTime;
            } else{
                lastBetTimeRing = parseInt(lastBetTimeRing);
            }

            //延迟2秒
            if(date < endTime){
                endTime = Date.now() - 2 * 1000;
            }

            let betDataDice = await redisForDice.zrevrangebyscoreAsync('betRecordsByTime',endTime,lastBetTimeDice,'withscores');
            if(betDataDice){
                for(let i = 0;i < betDataDice.length/2;i++){
                    let info = betDataDice[i * 2].split(';');
                    let Addr = info[0];
                    let betAmt = parseInt(info[2]);
                    let betTime = parseInt(betDataDice[i * 2 + 1]);

                    if(betTime <= lastBetTimeDice){
                        break;
                    }

                    //每个人的当周下注额
                    await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt-' + startTime,betAmt,Addr);

                    //有邀请人的就可以贡献积分
                    let inviterOfPlayer = await determineInviter(Addr);
                    if(!inviterOfPlayer){
                        continue;
                    }
                    distributeScore(startTime,Addr,betAmt,inviterOfPlayer,1);
                }
                if(betDataDice && betDataDice.length > 1){
                    await redisForDice.setAsync('calcInviterBetIn3Games_betTimeDice',betDataDice[1]);
                }
            }

            let betDataRing = await redisForRing.zrevrangebyscoreAsync('betRecordsByTime',endTime,lastBetTimeRing,'withscores');
            if(betDataRing){
                for(let i = 0;i < betDataRing.length / 2;i++){
                    let info = betDataRing[i * 2].split(';');
                    let Addr = info[0];
                    let betAmt = parseInt(parseInt(info[2]));

                    let betTime = parseInt(betDataRing[i * 2 + 1]);
                    if(betTime <= lastBetTimeRing){
                        break;
                    }

                    //每个人的当周下注额
                    await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt-' + startTime,betAmt,Addr);

                    //有邀请人的就可以贡献奖池
                    let inviterOfPlayer = await determineInviter(Addr);
                    if(!inviterOfPlayer){
                        continue;
                    }
                    await distributeScore(startTime,Addr,betAmt,inviterOfPlayer,1);   
                }
                if(betDataRing && betDataRing.length > 1){
                    await redisForDice.setAsync('calcInviterBetIn3Games_betTimeRing',betDataRing[1]);
                }
            }    
        }catch(e){
            console.log(e);
        }
        
        await utils.sleep(5*1000);
    }
}

async function determineInviter(playerAddr){
    //首先检查是不是绑定邮箱的有效用户
    let isBind = await redisForTower.hgetAsync('userEmailValidate',playerAddr);
    if(isBind != 'bind'){
        return '';
    }

    let inviterOfPlayer = await redisForDice.hgetAsync('addr_inviter',playerAddr);
    if(!inviterOfPlayer) {
        inviterOfPlayer = await utils.getInviterPAddrByPAddr(playerAddr);
        await redisForDice.hsetAsync('addr_inviter',playerAddr,inviterOfPlayer);
    }
    //410000000000000000000000000000000000000000的base58编码。即空地址
    if(!inviterOfPlayer || inviterOfPlayer == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb') {
        return '';
    }

    await redisForDice.saddAsync('myInvite-' + inviterOfPlayer,playerAddr);
    return inviterOfPlayer;
}

async function distributeScore(startTime,Addr,betAmt,inviterOfPlayer,divisor){
    //下注额榜
    await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_' + inviterOfPlayer,parseInt(betAmt/divisor),Addr);
    await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_Total' ,parseInt(betAmt/divisor),inviterOfPlayer);

    //活跃用户榜
    let activeUser = await redisForDice.zcardAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_' + inviterOfPlayer);
    await redisForDice.zaddAsync('calcInviterBetIn3Games_activeUser_' + startTime + '_Total' ,activeUser,inviterOfPlayer);

    //我邀请人的累积下注
    await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt_' + inviterOfPlayer,parseInt(betAmt/divisor),Addr);
}

//更新总榜，每10秒更新一次
async function updateInviteRank(){
    // eslint-disable-next-line no-constant-condition
    while(true){
        try{
            let startTime = await redisForDice.getAsync('calcInviterBetIn3Games_startTime');
            let userScoreMap = new Map();

            let betAmtData = await redisForDice.zrevrangeAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_Total' ,0,19);
            for (let i = 0;i < betAmtData.length;i++){
                let Addr = betAmtData[i];
                let score = 60 - 3 * i;

                userScoreMap.set(Addr,score);
            }

            let betUserData = await redisForDice.zrevrangeAsync('calcInviterBetIn3Games_activeUser_' + startTime + '_Total' ,0,19);
            for (let i = 0;i < betUserData.length;i++){
                let Addr = betUserData[i];
                let score = 40 - 2 * i;
                
                let Amtscore = userScoreMap.get(Addr);
                if(Amtscore){
                    userScoreMap.set(Addr,score + parseInt(Amtscore));
                }else{
                    userScoreMap.set(Addr,score);
                }
            }

            await redisForDice.delAsync('calcInviterBetIn3Games_scoreTop' + startTime);
            for (let [key, value] of userScoreMap) {
                await redisForDice.zaddAsync('calcInviterBetIn3Games_scoreTop' + startTime,parseInt(value),key);
            }
        }catch(e){
            console.log(e);
        }      
        await utils.sleep(10*1000);
    }
}

//更新质押排行榜,每10秒更新一次
async function updateDepositRank(){
    // eslint-disable-next-line no-constant-condition
    while(true){
        try{
            let startTime = await redisForDice.getAsync('calcDepositRank_startTime');
            let endTime = await redisForDice.getAsync('calcDepositRank_endTime');
            
            if(!startTime){
                startTime = new Date().setHours(0,0,0,0);
                endTime = startTime + 1 * 24 * 60 * 60 * 1000;

                await redisForDice.setAsync('calcDepositRank_startTime',startTime);
                await redisForDice.setAsync('calcDepositRank_endTime',endTime);
            } else{
                startTime = parseInt(startTime);
                endTime = parseInt(endTime);
            }

            let addrs = await utils.getOwnersOfDeposit();
            let lastRoundStartTime = startTime - 1 * 24 * 60 * 60 * 1000;
            for(let addr of addrs){
                let userDeposit = await utils.getDeposit(addr); 
                let userDepositLastRound = await redisForDice.zscoreAsync('DepositRankTotal_' + lastRoundStartTime,addr);
                if(userDepositLastRound){
                    userDepositLastRound = parseFloat(parseFloat(userDepositLastRound).toFixed(3));
                    if(userDepositLastRound < 0){
                        userDepositLastRound = 0;
                    }
                }else{
                    userDepositLastRound = 0;
                }
                await redisForDice.zaddAsync('DepositRankTotal_' + startTime,userDeposit,addr);
                await redisForDice.zaddAsync('DepositRank_' + startTime,userDeposit - userDepositLastRound,addr);
            }
        }catch(e){
            console.log(e);
        }
        
        await utils.sleep(10*1000);
    }
}

async function shareInvitePrize(){
    let date = Date.now();
    let startTime = parseInt(await redisForDice.getAsync('calcInviterBetIn3Games_startTime'));
    let endTime = parseInt(await redisForDice.getAsync('calcInviterBetIn3Games_endTime'));

    if(date < endTime) {
        return;
    }

    let inviteScores = await redisForDice.zrevrangeAsync('calcInviterBetIn3Games_scoreTop' + startTime,0,4,'WITHSCORES');

    let startTimeNew = endTime;
    let endTimeNew = startTimeNew + 7 * 24 * 60 * 60 * 1000;

    await redisForDice.setAsync('calcInviterBetIn3Games_startTime',startTimeNew);
    await redisForDice.setAsync('calcInviterBetIn3Games_endTime',endTimeNew);

    let sum = 0;
    let result = [];
    let shareMoney = await redisForRing.getAsync('activityBalance');
    if(shareMoney){
        shareMoney = (parseInt(shareMoney) - 1000 * 1e6);
    }else{
        shareMoney = 0;
    }

    await redisForDice.zaddAsync('calcInviterBetIn3Games_prizeRecords',startTime,shareMoney);
    if(shareMoney <= 0) return;

    for (let i = 0;i < parseInt(inviteScores.length/2);i++) {
        let inviter = inviteScores[i*2];
        let score = parseInt(inviteScores[i*2+1]);
        
        result.push({
            inviter:inviter,
            score:score,
            share:0
        });

        sum += score;
    }

    let tronWebForAct = new TronWeb(
        config.trongridApi,
        config.trongridApi,
        config.trongridApi,
        config.PRIVATE_KEY_ACT
    );
    for(let i = 0;i < result.length;i++) {
        result[i].share = parseInt((result[i].score/sum) * shareMoney);
        //转钱 记录
        tronWebForAct.trx.sendTrx(result[i].inviter,result[i].share);
        await redisForDice.zaddAsync('calcInviterBetIn3Games_transferRecords_' + startTime,result[i].share,result[i].inviter);
    }
}

async function shareDepositPrize(){
    let date = Date.now();
    let startTime = parseInt(await redisForDice.getAsync('calcDepositRank_startTime'));
    let endTime = parseInt(await redisForDice.getAsync('calcDepositRank_endTime'));

    if(date < endTime) {
        return;
    }

    let DepositAmt = await redisForDice.zrevrangeAsync('DepositRank_' + startTime,0,4);

    let startTimeNew = endTime;
    let endTimeNew = startTimeNew + 1 * 24 * 60 * 60 * 1000;

    await redisForDice.setAsync('calcDepositRank_startTime',startTimeNew);
    await redisForDice.setAsync('calcDepositRank_endTime',endTimeNew);

    let result = [];
    let shareMoney = await redisForRing.getAsync('activityBalance2');
    if(shareMoney){
        shareMoney = (parseInt(shareMoney) - 1000 * 1e6);
    }else{
        shareMoney = 0;
    }

    await redisForDice.zaddAsync('calcDepositRank_prizeRecords',startTime,shareMoney);
    if(shareMoney <= 0) return;
    for (let i = 0;i < parseInt(DepositAmt.length);i++) {
        let addr = DepositAmt[i];
        let share = 0;
        if(i < 5){
            share = parseInt(shareMoney * utils.sharePercentage[i]);
        }
        
        result.push({
            addr:addr,
            share:share
        });
    }

    let tronWebForAct = new TronWeb(
        config.trongridApi,
        config.trongridApi,
        config.trongridApi,
        config.PRIVATE_KEY_ACT2
    );
    for(let i = 0;i < result.length;i++) {
        //转钱 记录
        tronWebForAct.trx.sendTrx(result[i].addr,result[i].share);
        await redisForDice.zaddAsync('calcDepositRank_transferRecords_' + startTime,result[i].share,result[i].addr);
    }
}

//当日每累计100W下注额 发公告
async function calcDailyBetAnnounce(){
    // eslint-disable-next-line no-constant-condition
    while(true){
        let startTime = await redisForDice.getAsync('calcDailyBetAnnounce_startTime');
        let endTime = await redisForDice.getAsync('calcDailyBetAnnounce_endTime');
        let lastBetTime = await redisForDice.getAsync('calcDailyBetAnnounce_betTime');

        if(!startTime){
            //startTime 为当日凌晨
            startTime = new Date().setHours(0,0,0,0);
            endTime = startTime + 24 * 60 * 60 * 1000;

            await redisForDice.setAsync('calcDailyBetAnnounce_startTime',startTime);
            await redisForDice.setAsync('calcDailyBetAnnounce_endTime',endTime);
        } else if(Date.now() > parseInt(endTime)) {
            startTime = parseInt(endTime);
            endTime = startTime + 24 * 60 * 60 * 1000;

            await redisForDice.setAsync('calcDailyBetAnnounce_startTime',startTime);
            await redisForDice.setAsync('calcDailyBetAnnounce_endTime',endTime);
            await redisForDice.delAsync('calcDailyBetAnnounce_betAmt');
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
            endTime = Date.now() - 20 * 1000;
        }

        let betData = await redisForDice.zrevrangebyscoreAsync('betRecordsByTime',endTime,lastBetTime,'withscores');
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

            let currBetAmt = await redisForDice.hgetAsync('calcDailyBetAnnounce_betAmt',playerAddr);
            if(currBetAmt){
                currBetAmt = parseInt(currBetAmt) + betAmt;
            }
            else{
                currBetAmt = betAmt;
            }

            if(currBetAmt >= 1000000){
                let Msg_cn = '感謝尊貴的' + playerAddr.substr(0,4) + '...' + playerAddr.substr(playerAddr.length-4) +'今日在本站骰子游戏累計投註100WTRX，祝他運氣長虹好運連連！';
                let Msg_en = 'Thanks for our distinguished user ' + playerAddr.substr(0,4) + '...' + playerAddr.substr(playerAddr.length-4) + ' whose wagered TRX is up to 1,000,000 TRX now in DICE! Wish you have a good luck on Tronoscar Platform!';
                                    
                redisForRing.publishAsync('rarelyWin',JSON.stringify({
                    Msg_cn:Msg_cn,
                    Msg_en:Msg_en
                }));

                currBetAmt = currBetAmt - 1000000;
            }

            await redisForDice.hsetAsync('calcDailyBetAnnounce_betAmt',playerAddr,currBetAmt);
        }

        if(betData && betData.length > 1){
            await redisForDice.setAsync('calcDailyBetAnnounce_betTime',betData[1]);
        }

        await utils.sleep(5*1000);
    }
}


module.exports = {
    scheduleCalcShares,
    scheduleWithdrawDeposit,
    scheduleCalcInviteAmount,
    scheduleUpdateInviteRank,
    scheduleUpdateDepositRank,
    scheduleShareInvitePrize,
    scheduleShareDepositPrize,
    scheduleCalcDailyBetAnnounce
};