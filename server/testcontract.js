/* eslint-disable no-console */
const TronWeb = require('tronweb');
const Utils = require('./utils');
const TRONGRID_API = 'https://api.trongrid.io';

const PRIVATE_KEY = 'af7c83e40cc67a355852b44051fc9e34452375ae569d5c18dd62e3859b9be229';//TB1zCK6zJFHRbdnWqgq3hw1DqWVbNA4fzW

 //const PRIVATE_KEY = 'af7c83e40cc67a355852b44051fc9e34452375ae569d5c18dd62e3859b9be229';//TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC
// const PRIVATE_KEY = 'c8df4d01d0d69e71867e4b1d18ab56b6b09a1ab5cd69bbfee47f3d20a7ca53b9'; //TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV
//  const PRIVATE_KEY= '6b1fd866fe52f4e8161417a1e76491145a4737b7af5b2192ffdc346809370079'; //TNaLCLGHErFUWaArm4KZjxM5kJ1LyFygxi
//  const PRIVATE_KEY = '743A1FFF22275A33FF0B2013CC435EE747B7CB8C159991D60F2B9E8C665942A8';//TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq
// const PRIVATE_KEY = 'ec193e2b62a4ddf922ed144b9c8c502968b6f9d790cd5ee1ff04f5e4785c9121';
Utils.setTronWeb(
    new TronWeb(
        TRONGRID_API,
        TRONGRID_API,
        TRONGRID_API,
        PRIVATE_KEY
    )
);

(async function(){

    let result ;

    /**Token */

    //  挖矿
    result = await Utils.mint('THxfzzs4Auidqhg9CkgqYkf7bEQauweZvT',100000000000000);
    console.log(result);

    result = await Utils.getBalanceOf('THxfzzs4Auidqhg9CkgqYkf7bEQauweZvT');
    console.log('Player balance :'+ result );

    result = await Utils.getTotalSupply();
    console.log('总发行量 :'+ result );

    //将dice和ring的地址设为管理员
    result = await Utils.setAdministrator('TBa9HSmvwooABgQf6JE5bCUzFne1bp2QXU',true);
    console.log(result);

    result = await Utils.boolAdmin('TBa9HSmvwooABgQf6JE5bCUzFne1bp2QXU');
    console.log(result);

    result = await Utils.setAdministrator('TAwhwiKo1HDWxGWSy1CzKCc3qCB1QgYwai',true);
    console.log(result);

    result = await Utils.boolAdmin('TAwhwiKo1HDWxGWSy1CzKCc3qCB1QgYwai');
    console.log(result);

    result = await Utils.setRingWager();
    console.log(result);

    result = await Utils.depositDiceJackPot(500000000000);
    console.log(result);

    result = await Utils.depositRingJackPot(500000000000);
    console.log(result);


    // result = await Utils.getBlackListAdmin();
    // console.log(result);

    // result = await Utils.transferBlackListAdmin('TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC');
    // console.log(result);

    // result = await Utils.getBlackListAdmin();
    // console.log(result);

    // result = await Utils.updateBlackList('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA',false);
    // console.log(result);

    //质押 2个代币
    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result); //4.749

    // result = await Utils.getFreeBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result); //4.749

    // result = await Utils.deposit(2);
    // console.log(result); //holder:TDwRC8f9Bv3iQ5vx96bgUYtMpbMRX5ddBm,value:2

    // result = await Utils.getFreeBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result); // 2.749

    // result = await Utils.getUserTotalDeposit('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log(result); // 2

    // result = await Utils.getTotalDeposit();
    // console.log(result); // 2

    // result = await Utils.setUnstakeInterval(300);  //将默认质押结束时间24小时改为5分钟
    // console.log(result);


    //解除质押

    // result = await Utils.getFreeBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result); //2.749

    // result = await Utils.unstakeDeposit(2);
    // console.log(result); // holder:TDwRC8f9Bv3iQ5vx96bgUYtMpbMRX5ddBm,value:2

    // result = await Utils.getUnstake('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('解除值押还未领取'+result); // 

    // result = await Utils.getUserTotalUnstakes('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('用户总的解压中数量'+result); //1.8  距离上一次解押超过24小时 所以扣除10%

    // result = await Utils.getFreeBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result); // 2.749

    // result = await Utils.getUserTotalDeposit('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('用户质押的ODIN数量：'+ result); //0

    // result = await Utils.getTotalDeposit();
    // console.log('总质押的ODIN数量：' + result); //0


    // result = await Utils.getFreeBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.withdrawUnstaked('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log(result);

    // result = await Utils.getUnstake('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('解除值押还未领取'+result);

    // result = await Utils.getUserTotalUnstakes('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('用户总的解压中数量'+result);

    // result = await Utils.getFreeBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.getUserTotalDeposit('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('用户质押的ODIN数量：'+ result);

    // result = await Utils.getTotalDeposit();
    // console.log('总质押的ODIN数量：' + result);


    

    /**Token */

    /**Player */

    // 获取流通量 
    // result = await Utils.getCirculatingSupply();
    // console.log(result);

    // 将dice ring 设置为Player管理员
    // result = await Utils.getOwnerOfPlayer();
    // console.log(result);

    // result = await Utils.setDicePlayerAddr('TDwRC8f9Bv3iQ5vx96bgUYtMpbMRX5ddBm');
    // console.log(result);

    // result = await Utils.setRingPlayerAddr('TDwRC8f9Bv3iQ5vx96bgUYtMpbMRX5ddBm');
    // console.log(result);

    // result = await Utils.getRingPlayerAddr();
    // console.log(result);

    // result = await Utils.getDicePlayerAddr();
    // console.log(result);


    

    // result = await Utils.getInviterPAddrByPAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log(result);

    // result = await Utils.getMintLevelAndOverage();
    // console.log(result);

    // 普通挖矿
    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.mintTokens('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA',1000000000);
    // console.log(result);

    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // 白名单挖矿
    // result = await Utils.setWhiteList('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA',true);
    // console.log(result);

    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.mintTokens('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA',1000000000);
    // console.log(result);

    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.getPrizePot();
    // console.log(result);

    /**Player */
    

    /*  Dice   */

    // result = await Utils.diceActive();
    // console.log(result);

    // result = await Utils.dicePause();
    // console.log(result);

    // result = await Utils.setDiceWager(10000000000);
    // console.log(result);

    // result = await Utils.depositDiceJackPot(500000000000);
    // console.log(result);
    
    // result = await Utils.getBalanceByAddr('TQ9L5GyADSLBxTaChabtcmohYmxi7APRvK');
    // console.log('Dice balance:'+result);

    //无邀请人下注
    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);    

    // result = await Utils.diceBet(95,1000000000,0);
    // console.log(result);

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);  

    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    //带邀请人下注

    // result = await Utils.getBalanceOf('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家ODIN余额：'+result);

    // result = await Utils.getBalanceByAddr('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家余额：'+result);  
    
    // result = await Utils.getBalanceOf('TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq');
    // console.log('玩家ODIN余额：'+result);

    // result = await Utils.diceBet(95,1000000000,0,'TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq');
    // console.log(result);

    // result = await Utils.getBalanceOf('TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq');
    // console.log('玩家ODIN余额：'+result);

    // result = await Utils.getBalanceByAddr('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家余额：'+result);  

    // result = await Utils.getBalanceOf('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家ODIN余额：'+result);

    //开奖
    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);  

    // result = await Utils.getBalanceByAddr('TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC');
    // console.log('管理员余额：'+result);    

    // result = await Utils.diceLottery(2,98);
    // console.log(result);

    // result = await Utils.getBalanceByAddr('TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC');
    // console.log('管理员余额：'+result);  

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);  

     /*  Dice   */

     /*  Ring   */
    // result = await Utils.depositRingJackPot(500000000000);
    // console.log(result);

    // result = await Utils.getBalanceByAddr('TBVwugyNJzjrpwGYv4ioied3ZQ7eiaiZZs');
    // console.log('Ring balance:'+result);

    // result = await Utils.setRingWager();
    // console.log(result);

    // let currGameId = await Utils.getRingGIDIndex();
    // console.log(currGameId);

    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);    

    // result = await Utils.ringBet(2,1,1000000000);
    // console.log(result);

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);  

    // result = await Utils.getBalanceOf('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('ODIN余额：'+result);

     //带邀请人下注

    // result = await Utils.getBalanceOf('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家ODIN余额：'+result);

    // result = await Utils.getBalanceByAddr('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家余额：'+result);  
    
    // result = await Utils.getBalanceOf('TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq');
    // console.log('玩家ODIN余额：'+result);

    // result = await Utils.ringBet(2,1,1000000000,'TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq');
    // console.log(result);

    // result = await Utils.getBalanceOf('TRhCosnRdgdLD9bHdaBmXS73Hb5cAXyosq');
    // console.log('玩家ODIN余额：'+result);

    // result = await Utils.getBalanceByAddr('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家余额：'+result);  

    // result = await Utils.getBalanceOf('TWTRec8CQUF64U9D7mY5TZbMbJZxhMDAzV');
    // console.log('玩家ODIN余额：'+result);

    //开奖

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);  

    // result = await Utils.getBalanceByAddr('TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC');
    // console.log('管理员余额：'+result);    

    // result = await Utils.ringLottery(currGameId,1);
    // console.log(result);

    // result = await Utils.getBalanceByAddr('TAbzgkG8p3yF5aywKVgq9AaAu6hvF2JrVC');
    // console.log('管理员余额：'+result);  

    // result = await Utils.getBalanceByAddr('TQEkhXzR77u72nKxVSANCBfAjFnNUD81yA');
    // console.log('玩家余额：'+result);  

     /*  Ring   */

})();
