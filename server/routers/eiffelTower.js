const router = require('koa-router')();
const redisForTower = require('../lib/redis/redisForTower');
const mailUtils = require('../lib/mail');
const utils = require('../utils');

async function getBetRecords(ctx){
  let count = ctx.request.query.Count;
  if(count){
      count = parseInt(count);
  }
  else{
      count = 10;
  }

  let result = await redisForTower.zrevrangeAsync('tower_betRecords',0,count - 1);
  let records = [];
  for (let i = 0;i < parseInt(result.length);i++){
      let info = result[i].split(';');
      records.push({
          addr:info[0],
          betNum:info[1],
          betValue:info[2],
          betId:info[3],
          time:info[4],
          resultNum:info[5],
          payout:info[6]
      });
  }
  ctx.body = {
    success: true,
    data: records
  };
}

async function getMyBets(ctx){
  let count = ctx.request.query.Count;
  if(count){
      count = parseInt(count);
  }
  else{
      count = 10;
  }

  let addr = ctx.request.query.Addr;
  if(!addr){
    addr = '';
  }

  let result = await redisForTower.zrevrangeAsync('tower_betRecords-' + addr,0,count - 1);
  let records = [];
  for (let i = 0;i < parseInt(result.length);i++){
      let info = result[i].split(';');
      records.push({
          addr:info[0],
          betNum:info[1],
          betValue:info[2],
          betId:info[3],
          time:info[4],
          resultNum:info[5],
          payout:info[6]
      });
  }
  ctx.body = {
    success: true,
    data: records
  };
}

async function bindEmail(ctx){
  let email = ctx.request.query.Email;
  let addr = ctx.request.query.Addr;

  if(!email || !addr){
    ctx.body = {
      success: false,
      data: 'invalid param'
    };
    return;
  }

  let reg = new RegExp('^[\\w.\\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\\.)+[a-z]{2,3}$');
  if(!reg.test(email)){
    ctx.body = {
      success: false,
      data: 'invalid email address'
    };
    return;
  }

  let isBind = await redisForTower.hgetAsync('userEmailValidate',addr);
  let isUsed = await redisForTower.sismemberAsync('emails',email);

  if (isBind && isBind=='bind'){
    ctx.body = {
      success: false,
      data: 'you have already bind you email'
    };
    return;
  }

  if(isUsed){
    ctx.body = {
      success: false,
      data: 'email address has already been used'
    };
    return;
  }

  let code = utils.generateSalt(6);
  mailUtils.sendEmail(email,code);

  await redisForTower.hsetAsync('userEmailInfo',addr,email);
  await redisForTower.hsetAsync('userEmailValidate',addr,code);

  ctx.body = {
    success: true,
    data: 'validation code sent'
  };
}

async function validateEmail(ctx){
  let code = ctx.request.query.Code;
  let addr = ctx.request.query.Addr;

  if(!code || !addr){
    ctx.body = {
      success: false,
      data: 'invalid param'
    };
    return;
  }

  let email = await redisForTower.hgetAsync('userEmailInfo',addr);
  if(!email){
    ctx.body = {
      success: false,
      data: 'no email info'
    };
    return;
  }
  let isBind = await redisForTower.hgetAsync('userEmailValidate',addr);
  let isUsed = await redisForTower.sismemberAsync('emails',email);

  if (isBind && isBind=='bind'){
    ctx.body = {
      success: false,
      data: 'you have already bind you email'
    };
    return;
  }

  if (!isBind || isBind != code){
    ctx.body = {
      success: false,
      data: 'Wrong Code'
    };
    return;
  }
  
  if(isUsed){
    ctx.body = {
      success: false,
      data: 'email address has already been used'
    };
    return;
  }
  await redisForTower.hsetAsync('userEmailValidate',addr,'bind');
  await redisForTower.saddAsync('emails',email);

  ctx.body = {
    success: true,
    data: 'email address bind successfully'
  };
}

async function getUserEmailInfo(ctx){
  let addr = ctx.request.query.Addr;
  if(!addr){
    ctx.body = {
      isBind: false,
      email: ''
    };
    return;
  }

  let isBind = await redisForTower.hgetAsync('userEmailValidate',addr);
  if (!isBind || isBind != 'bind'){
    ctx.body = {
      isBind: false,
      email: ''
    };
    return;
  }

  let email = await redisForTower.hgetAsync('userEmailInfo',addr);
  if(!email){
    ctx.body = {
      isBind: false,
      email: ''
    };
    return;
  }

  ctx.body = {
    isBind: true,
    email: email
  };

}

async function getOdinPrize(ctx){
  let addr = ctx.request.query.Addr;
  if(!addr){
    ctx.body = {
      total: 0,
      active: 0,
      details:[]
    };
    return;
  }

  let total = 0;
  let active = 0;
  let details = [];
  let userOdinPrize = await redisForTower.zrevrangeAsync('userOdinPrize_' + addr,0,-1,'withscores');

  if(userOdinPrize){
    for(let i = 0;i<userOdinPrize.length/2;i++){
      let info = userOdinPrize[i * 2].split('-');
      let amt = parseFloat(info[0]);
      let desc = info[1];
      //let status = info[2];
      let timestamp = parseInt(userOdinPrize[i * 2 + 1]);
      
      total += amt;
      details.push({
        timestamp:timestamp,
        desc:desc,
        amt:amt
      });
    }

    ctx.body = {
      total: total,
      active: active,
      details:details
    };
  }

}

module.exports = router
// .get('/betRecords', getBetRecords)
// .get('/myBets', getMyBets)
.get('/bindEmail',bindEmail)
.get('/validateEmail',validateEmail)
.get('/getUserEmailInfo',getUserEmailInfo)
.get('/getOdinPrize',getOdinPrize);