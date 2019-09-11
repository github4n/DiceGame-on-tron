const router = require('koa-router')();
const {redisForRing}= require('../lib/redis');
const utils = require('../utils');

async function getRing(ctx){
  ctx.body = utils.ring.toString();
}

async function getBetting(ctx){
    let currGameId = await redisForRing.getAsync('currGameId');
    let betData = await redisForRing.zrevrangeAsync('betRecords',0,100);
    let betInfos = [];

    for(let i = 1;i <= 4;i++ ){
        betInfos.push({
            betNum:i,
            totalBetAmt:0,
            detail:[]
        });
    }

    for(let i = 0;i < betData.length; i++){
        let infos = betData[i].split(';');

        let gID = infos[3];
        let betId = parseInt(infos[4]);
        let pAddr = infos[0];
        let betNum = parseInt(infos[1]);
        let betVal = parseInt(parseInt(infos[2]) / 1e6);

        if(gID != currGameId) break;

        betInfos[betNum - 1].totalBetAmt += betVal;
        betInfos[betNum - 1].detail.push({
            betId:betId,
            pAddr:pAddr,
            betVal:betVal
        });
    }

    ctx.body = betInfos;
}

async function getHistory(ctx){
    let count = ctx.request.query.Count;
    if(count){
        count = parseInt(count);
    }
    else{
        count = 10;
    }

    let result = [];
    let data = await redisForRing.lrangeAsync('GameResultRecently',0,count - 1);
    for(let i = 0;i<data.length;i++){
        result.push(JSON.parse(data[i]));
    }

    ctx.body = result;
}

async function getChatHistory(ctx){
    let count = ctx.request.query.Count;
    if(count){
        count = parseInt(count);
    }
    else{
        count = 30;
    }

    let result = [];
    let data = await redisForRing.lrangeAsync('chatMsg',0 - count,-1);
    for(let i = 0;i<data.length;i++){
        result.push(JSON.parse(data[i]));
    }

    ctx.body = result;
}

async function verifyRandom(ctx){
    let gID = ctx.request.query.GId;
    if(!gID){
        gID = 0;
    }else{
        gID = parseInt(gID);
    }
    let betRecords = await redisForRing.lrangeAsync('GameResultRecently',0,-1);
    let result = null;

    for(let i = 0;i<betRecords.length;i++){
        let item = JSON.parse(betRecords[i]);
        if(item.gId.toString() == gID){
            result = item;
            break;
        }
    }

    let data = {};
    if(result) {
        let salt = result.salt;
        let seed = salt + gID;
        let randRes = await utils.fairRandom(salt + gID,utils.ring.length);

        data = {
            gID:gID,
            salt:salt,
            combSeed:seed,
            combSeedSha3:randRes.sha3_1,
            publicKey:utils.randomPublicKey,
            publicKeyAddr:utils.randomAddress,
            sign:randRes.sign,
            sha3Sig:randRes.sha3_2,
            last6digits:randRes.postfix6+'('+randRes.postfix6_10 + ')',
            luckNum:randRes.result - 1
        };
    }
    ctx.body = data;
}

module.exports = router
.get('/getRing',getRing)
.get('/getBetting',getBetting)
.get('/getHistory',getHistory)
.get('/getChatHistory',getChatHistory)
.get('/verifyRandom',verifyRandom);


