const {redisForDice,redisForRing,redisForTower} = require('./lib/redis');


(async function(){

    //TWRK1FNuwBQcg8bGWYm3Dd6ohcXPioA8ry
    //TGBzXVfN4s1z4WZ63wkV9aEFjUkud4pJYM
    //TK7qJzyAhNeLjN263WH4G8uXi67NGCHkYk
    //TEcPoiyrcnHV454K1p4AJTQTMF2kjkqkRe
    //TAni5c5g22aZpCTr8yHYp8E9rkXgZvPRoH

    let addrs = ['TWRK1FNuwBQcg8bGWYm3Dd6ohcXPioA8ry','TGBzXVfN4s1z4WZ63wkV9aEFjUkud4pJYM','TK7qJzyAhNeLjN263WH4G8uXi67NGCHkYk','TEcPoiyrcnHV454K1p4AJTQTMF2kjkqkRe','TAni5c5g22aZpCTr8yHYp8E9rkXgZvPRoH'];
    let startTime = await redisForDice.getAsync('calcInviterBetIn3Games_startTime');
    for(let i = 0;i<addrs.length;i++){
        let addr = addrs[i];
        let Addr = 'a';
        for (let j = 0;j < 50;j++){
            Addr += 'a';
            await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_' + addr,parseInt(1000000000000),Addr);
        }
        await redisForDice.zincrbyAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_Total' ,parseInt(50000000000000),addr);

        let activeUser = await redisForDice.zcardAsync('calcInviterBetIn3Games_betAmt_' + startTime + '_' + addr);
        await redisForDice.zaddAsync('calcInviterBetIn3Games_activeUser_' + startTime + '_Total' ,activeUser,addr);
    }
})();
