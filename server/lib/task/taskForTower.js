/* eslint-disable no-console */
const utils = require('../../utils');
const {redisForTower} = require('../redis');

function scheduleCalcOdinShare(){
    CalcOdinShare();
}

async function CalcOdinShare(){
    // eslint-disable-next-line no-constant-condition
    while(true){
        try{
            //绑定邮箱的奖励发放
            let emailValidateInfo = await redisForTower.hgetAllAsync('userEmailValidate');
            if(emailValidateInfo){
                Object.keys(emailValidateInfo).forEach(async function(key){
                    let addr = key;
                    let code = emailValidateInfo[key];
                    if(code == 'bind'){
                        //是否已经发放
                        let isObtain = await redisForTower.sismemberAsync('userOdinPrizeUsers_bindEmail',addr.toString());
                        if(!isObtain){
                            await redisForTower.saddAsync('userOdinPrizeUsers_bindEmail',addr);
                            await redisForTower.zaddAsync('userOdinPrize_' + addr,Date.now(),'0.5-Mailbox binding-1');
                        }               
                    }
                });
            }
        }catch(e){
            //do nothing
        }
    
        await utils.sleep(15 * 1000);
    }
}

module.exports = {
    scheduleCalcOdinShare
};