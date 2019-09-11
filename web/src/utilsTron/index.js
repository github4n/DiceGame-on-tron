/* eslint-disable no-console */
import contracts from './contracts';

const oscarToken = contracts['OscarToken.sol:OscarToken'];
const oscarPlayer = contracts['OscarPlayer.sol:OscarPlayer'];
const oscarDice = contracts['OscarDice.sol:OscarDice'];
const oscarRing = contracts['OscarRing.sol:OscarRing'];

Date.prototype.format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
          (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  };


const utilsTron = {
    tronWeb: false,
    oscarToken: false,
    oscarPlayer: false,
    oscarDice:false,
    oscarRing:false,

    randomPrivteKey:'20DEE811032DE491012643F7C4045C7EC2FF39C0CED937A6F37338B46AC26A86',
    randomPublicKey:'047B4E4108DB01E92AAB05F46A471BA6C89A818E5ABA8D12E6E3C59E21A8DD1D5C834820D448A31C8571CF587BCE1730A40E24BAFD37A3931598A1D11EDF3820B4',
    randomAddress:'TPL6a5CKYWFqU82JoTaMLhm5YCdHnSD8j9',
    ring:[3,1,2,1,3,4,2,1,2,1,3,1,2,1,2,1,3,1,2,1,3,1,2,1,2,1,3,1,2,1,2,1],
    betTimeInterval : 25000,
    lotteryInterval : 10000,
    doneInterval : 5000,
    betCardAmt:[20,30,50,300],
    storeMoneyAddr : 'TBwQPGmutL7HtxE3kaizC1BtMWGBSaWE9k',
    activityAddr : 'TTGysgU75PGBp1JV5c2b6cjf2pc3Qo1V5i',

    level3 : [
        {
            num:12,
            payout:500,
            percent:1900
        },
        {
            num:11,
            payout:0,
            percent:98100
        }
    ],

    level2 : [
        {
            num:10,
            payout:300,
            percent:1055
        },
        {
            num:9,
            payout:200,
            percent:1583
        },
        {
            num:8,
            payout:100,
            percent:3166
        },
        {
            num:7,
            payout:0,
            percent:94196
        }
    ],

    level1 : [
        {
            num:6,
            payout:50,
            percent:3120
        },
        {
            num:5,
            payout:20,
            percent:7810
        },
        {
            num:4,
            payout:10,
            percent:15530
        },
        {
            num:3,
            payout:9,
            percent:17390
        },
        {
            num:2,
            payout:7,
            percent:22610
        },
        {
            num:1,
            payout:5,
            percent:33540
        }
    ],

    trxParam : {
        feeLimit:10000000,
        callValue:0,
        shouldPollResponse:true
        },

    setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.oscarToken = tronWeb.contract(oscarToken.abi, oscarToken.address);
        this.oscarPlayer = tronWeb.contract(oscarPlayer.abi,oscarPlayer.address);
        this.oscarDice = tronWeb.contract(oscarDice.abi, oscarDice.address);
        this.oscarRing = tronWeb.contract(oscarRing.abi, oscarRing.address);
    },

    //根据地址获取账户余额（TRX）
    async getBalanceByAddr(addr){
        try {
            let result = await this.tronWeb.trx.getBalance(addr);
            return result;
        } catch (error) {
            console.error(error);
        }
    },

    /////////////////////////////Ring////////////////////////////////////////////////

    //设置RING赌注倍率
    async setRingWager(){
        try {
            let result = await this.oscarRing.setBetWager().send(this.params);
            return result;
        } catch (error) {
            console.log('setRingWager error');
            console.error(error);
        }
    },

    //获取ring对应下注数的赌注额 倍率
    async getRingWager(_betNumber){
        try {
            let result = await this.oscarRing.bet_rate_(_betNumber).call();
            return {
                rId:this.decodeHexNum(result.rId._hex),
                minimal:parseInt(this.decodeHexNum(result.minimal._hex) / 1e6),
                wager:parseInt(this.decodeHexNum(result.wager._hex) / 1e6),
                betRate:this.decodeHexNum(result.betRate._hex),
            };
        } catch (error) {
            console.log('getRingWager error');
            console.error(error);
        }
    },

    //获取ring当局游戏对应下注详情
    async getRingGameInfo(_gId,_betNum,_count){
        try {
            let result = await this.oscarRing.game_bet_(_gId,_betNum,_count).call();
            return result;
        } catch (error) {
            console.error(error);
        }
       
    },

    //获取ring当局游戏对应下注数的总额
    async getRingGameBetNumberAmt(_gId,_betNum){
        try {
            let result = await this.oscarRing.total_amount_(_gId,_betNum).call();
            return parseInt(this.decodeHexNum(result._hex) / 1e6);
        } catch (error) {
            console.log('getGameBetNumberAmt error');
            console.error(error);
        }
    },

    //提取Ring的jackPot
    async withdrawRingJackPot(_value){
        try {
            let result = await this.oscarRing.withdrawJackPot(_value).send(this.trxParam);
            return result;
        } catch (error) {
            console.error(error);
        }
       
    },

    //往对赌池充值
    async depositRingJackPot(value){
        try{
            await this.oscarRing.depositJackPot().send({
                feeLimit:10000000,
                callValue:value,
                shouldPollResponse:true
                });
            
        }catch(error) {
            console.log('depositRingJackPot error');
            console.error(error);
        }
    },

    //创建一局游戏

    async createRingGame(){
        try {
            await this.oscarRing.createGame().send(this.params);
        } catch (error) {
            console.log('CreateRingGame error');
            console.error(error);
        }
    },

    //修改游戏状态
    async updateRingGameStatus(_gId,_status){
        try {
            await this.oscarRing.updateGameStatus(_gId,_status).send(this.params);
        } catch (error) {
            console.log('updateRingGameStatus error');
            console.error(error);
        }
    },


    //下注
    async ringBet(_gId,_betNumber, _betValue, _inviterPAddr) {
        try {
            let params = {
                feeLimit: 10000000,
                callValue: _betValue,
                shouldPollResponse: true
            };

            if(_inviterPAddr){
                await this.oscarRing.betWithInviter(_gId,_betNumber, _inviterPAddr).send(params);
            }
            else{
                await this.oscarRing.betWithoutInviter(_gId,_betNumber).send(params);
            }

        } catch (error) {
            console.log('bet error');
            console.error(error);
        }
      },
    //开奖
      async ringLottery(_gId,_lotteryNumber){
        try{
            await this.oscarRing.lottery(_gId,_lotteryNumber).send(this.trxParam);
        }catch(error){
            console.log('lottery error');
            //console.error(error);
            return error;
        }
    },

     //关闭合约
     async RingPause (){
        try {
            await this.oscarRing.pause().send(this.trxParam);
        } catch (error) {
        // console.log("setAdministrator error");
            console.error(error);
        }
    },

    //开启合约
    async RingActive (){
        try {
            await this.oscarRing.activate().send(this.trxParam);
        } catch (error) {
            console.error(error);
        }
    },

    //设置游戏ID
    async setRingGIDIndex (bId){
        try {
            await this.oscarRing.setGIDIndex(bId).send(this.trxParam);
        } catch (error) {
            console.log('setGIDIndex error');
            console.error(error);
        }
    },

    //获取游戏ID
    async getRingGIDIndex (){
        try {
            let result = await this.oscarRing.gIDIndex_().call();
            return this.decodeHexNum(result._hex);
        } catch (error) {
            return 0;
        }
    },

    async setRingBIDIndex (bId){
        try {
            await this.oscarRing.setBIDIndex(bId).send(this.trxParam);
        } catch (error) {
            console.log('setBIDIndex error');
            console.error(error);
        }
    },

    async getRingBetIndex() {
        try {
            let result = await this.oscarRing.bIDIndex_().call();
            return this.decodeHexNum(result._hex);
        } catch (error) {
            console.error(error);
        }
    },

    //刷量空函数
    async betRing(){
        try {
           await this.oscarRing.betRing().send(this.params); 
        } catch (error) {
            console.log('betRing error');
            console.error(error);
        }
    },

    async betRingTransfer(_betValue){
        try {
            let params = {
                feeLimit: 10000000,
                callValue: _betValue,
                shouldPollResponse: true
            };

           await this.oscarRing.betRingTransfer().send(params); 
        } catch (error) {
            console.log('betRingTransfer error');
            console.error(error);
        }
    },

    async betRingByIndex(_betValue){
        try {
            let params = {
                feeLimit: 10000000,
                callValue: _betValue,
                shouldPollResponse: true
            };

           await this.oscarRing.betRingByIndex().send(params); 
        } catch (error) {
            console.log('betRingByIndex error');
            console.error(error);
        }
    },
    /////////////////////////////Ring////////////////////////////////////////////////

    /////////////////////////////Dice////////////////////////////////////////////////
    //下注
    async diceBet(_betNumber, _betValue,_type,_inviterPAddr) {
        try {
            let params = {
                feeLimit: 10000000,
                callValue: _betValue,
                shouldPollResponse: true
            };

            let result = [];
            if(_inviterPAddr){
                result = await this.oscarDice.betWithInviter(_betNumber, _inviterPAddr,_type).send(params);
            }
            else{
                result = await this.oscarDice.betWithoutInviter(_betNumber,_type).send(params);
            }
            return  this.decodeHexNum(result._hex);
           
        } catch (error) {
            console.log('diceBet error');
            console.error(error);
        }
      },

    //开奖
    async diceLottery(_betId,_lotteryNumber){
        try{
            await this.oscarDice.lottery(_betId,_lotteryNumber).send(this.trxParam);
            
        }catch(error){
            console.log('diceLottery error');
            return error;
        }
    },

    //往对赌池充值
    async depositDiceJackPot(value){
        try{
            await this.oscarDice.depositJackPot().send({
                feeLimit:10000000,
                callValue:value,
                shouldPollResponse:true
                });
            
        }catch(error) {
            console.log('depositDiceJackPot error');
            console.error(error);
        }
    },

    //提取jackPot
    async withdrawDiceJackPot(_value){
        try {
            let result = await this.oscarDice.withdrawJackPot(_value).send(this.trxParam);
            return result;
        } catch (error) {
            console.error(error);
        }
       
    },

     //设置合约内下注ID
     async setDiceBIDIndex (bId){
        try {
            await this.oscarDice.setBIDIndex(bId).send(this.trxParam);
        } catch (error) {
            console.log('setBIDIndex error');
            console.error(error);
        }
    },

    //设置赌注最大值
    async setDiceWager(wager){
        try {
            await this.oscarDice.setWager(wager).send(this.trxParam);
        } catch (error) {
            console.log('setWager error');
            console.error(error);
        }
    },

     //获取当前最大赌注金额
     async getDiceWager(){
        let value = await this.oscarDice.getWager().call();
        return this.decodeHexNum(value._hex);
    },


     //设置赌注最小值
     async setDiceMinimal(minimal){
        try {
            await this.oscarDice.setMinimal(minimal).send(this.trxParam);
        } catch (error) {
            console.log('setMinimal error');
            console.error(error);
        }
    },

     //获取当前最小赌注金额
     async getDiceMinimal(){
        let value = await this.oscarDice.getMinimal().call();
        return this.decodeHexNum(value._hex);
    },

     //关闭合约
     async dicePause (){
        try {
            await this.oscarDice.pause().send(this.trxParam);
        } catch (error) {
        // console.log("setAdministrator error");
            console.error(error);
        }
    },

    //开启合约
    async diceActive (){
        try {
            await this.oscarDice.activate().send(this.trxParam);
        } catch (error) {
            console.error(error);
        }
    },


    /////////////////////////////Dice////////////////////////////////////////////////

    /////////////////////////////Player////////////////////////////////////////////////
        
        //转出合约中的Token
    async TransferTokensFromPlayer(_addr,_value){
        try {
            await this.oscarPlayer.transferTokens(_addr,_value).send(this.trxParam);
        } catch (error) {
            console.error(error);
        }
    },
    

    //转入分红池
    async transferStakePot(value){
        try{
            await this.oscarPlayer.updateStakePot().send({
                feeLimit:100000000,
                callValue:value,
                shouldPollResponse:true
                });
            
        }catch(error) {
            console.log('transferStakePot error');
            console.error(error);
        }
    },

    //获取奖池余额
    async getPrizePot(){
        let diceBalance = await this.tronWeb.trx.getBalance(this.tronWeb.address.fromHex(oscarDice.address));
        let diceBaseAmount = await this.oscarDice.baseAmount().call();
        let ringBalance = await this.tronWeb.trx.getBalance(this.tronWeb.address.fromHex(oscarRing.address));
        let ringBaseAmount = await this.oscarRing.baseAmount().call();
        let prize = diceBalance - parseInt(this.decodeHexNum(diceBaseAmount._hex)) + ringBalance - parseInt(this.decodeHexNum(ringBaseAmount._hex));
        if(prize > 0){
            return prize / 2;
        }else{
            return prize;
        }
    },


    //提取分红奖励
    async withdrawPrize(_addr,_value){
        try{
            await this.oscarPlayer.withdrawPrize(_addr,_value).send(this.trxParam);
            return 'success'; 
        }catch(error){
            console.log('withdrawPrize error');
            console.error(error);
            return error;
        }
    },
  
    //挖矿阶段和当前阶段挖矿剩余量
    async getMintLevelAndOverage() {
        let result = await this.oscarPlayer.getMintLevelAndOverage().call();
        return {
        mintLevel: this.decodeHexNum(result[0]._hex),
        amount:parseInt(this.decodeHexNum(result[1]._hex)/1e6),
        overage: parseInt(this.decodeHexNum(result[2]._hex)/1e6),
        mintRate:this.decodeHexNum(result[3]._hex)
        };
    },

    //获取邀请人
    async getInviterPAddrByPAddr(addr){
        try{
            let result = await this.oscarPlayer.getInviterPAddrByPAddr(addr).call();
            return this.tronWeb.address.fromHex(result);
        }catch(error){
            console.error(error);
            return '';
        }
    },
    
    //记录用户地址和邀请人地址
    async determineInviter (pAddr, inviterPAddr){
        try {
           let result = await this.oscarPlayer.determineInviter(pAddr, inviterPAddr).send(this.params); 
           return result;
        } catch (error) {
           console.error(error); 
           return false;
        }
    },

    //设置管理员
    async setAdministrator (address,state){
        try {
            await this.oscarPlayer.setAdministrator(address,state).send(this.trxParam);
        } catch (error) {
            console.log('setAdministrator error');
            console.error(error);
        }
    },

    //判断是否为管理员
    async boolAdmin(addr){
        try {
            let result = await this.oscarPlayer.administrators_(addr).call();
            return result;
        } catch (error) {
            console.error(error);
        }
    },

    //设置挖矿比率 初始值1000:1
    async setMintRate(rate){
        try {
            await this.oscarPlayer.setMintRate(rate).send(this.trxParam);
        } catch (error) {
            console.log('setMintRate error');
            console.error(error);
        }
    },


    //设置阶段挖矿量
    async setMintAmount(amount){
        try {
            await this.oscarPlayer.setMintAmount(amount).send(this.trxParam);
        } catch (error) {
            console.log('setMintAmount error');
            console.error(error);
        }
    },

    //设置分红阶段
    async setMintLevel (mintLevel){
        try {
            await this.oscarPlayer.setMintLevel(mintLevel).send(this.trxParam);
            
        } catch (error) {
            console.log('setMintLevel error');
            console.error(error);
        }
    },


    async getTokensMintedTotal(){
        let value = await this.oscarPlayer.getTokensMintedTotal().call();
        return this.decodeHexNum(value._hex);
    },

    //设置dice中挖矿总量
    async setTokensMintedTotal(mintNum){
        try {
            await this.oscarPlayer.setTokensMintedTotal(mintNum).send(this.trxParam);
        } catch (error) {
            console.error(error);
        }
    },

    //设置邀请人挖矿分红比率
    async setInviteRate(rate) {
        try {
            await this.oscarPlayer.setInviteRate(rate).send(this.params);
        } catch (error) {
            console.error(error);
        }
    },

      //设置通缩变化量
      async setMintVariety(variety) {
        try {
            await this.oscarPlayer.setMintVariety(variety).send(this.params);
        } catch (error) {
            console.error(error);
        }
    },

    //设置白名单挖矿比率
    async setWhiteRate(rate){
        try {
            await this.oscarPlayer.setWhiteRate(rate).send(this.params);
        } catch (error) {
            console.error(error);
        }
    },

    //设置白名单
    async setWhiteList(pAddr,status){
        try {
            await this.oscarPlayer.setWhiteList(pAddr,status).send(this.params);
        } catch (error) {
            console.error(error);
        }
    },

    /////////////////////////Token///////////////////////////////////////
    //GET

    //获取市场上流通的Token
    async getCirculatingSupply(){
        let result = await this.oscarToken.totalSupply().call();
        let totalSupply = parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));

        let playerAddr = this.tronWeb.address.fromHex(oscarPlayer.address);
        result = await this.oscarToken.balanceOf(playerAddr).call();
        if(result.balance) {
        result = result.balance;
        }
        let odinHold = parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));

        return totalSupply - odinHold;
    },

    //获取Token目前发行量
    async getTotalSupply(){
        let result = await this.oscarToken.totalSupply().call();
        return parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));
    
    },

    //获取用户Token余额  
    async getBalanceOf(_addr){
        let value = await this.oscarToken.balanceOf(_addr).call();
        if(value.balance){
            value =  value.balance;
        }
        return parseFloat((this.decodeHexNum(value._hex)/1e6).toFixed(3));
    },

    //获取用户可流动余额 
    async getFreeBalanceOf(_addr){
        let value = await this.oscarToken.freeBalanceOf(_addr).call();
        if(value.balance){
            value =  value.balance;
        }
        return parseFloat((this.decodeHexNum(value._hex)/1e6).toFixed(3));
    },

    //获取用户抵押Token量
    async getDeposit(_owner){
        try {
            let _holder = this.tronWeb.address.fromHex(oscarPlayer.address);
            let result = await this.oscarToken.getDeposit(_owner,_holder).call();
            return parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));
        }catch(e){
            return 0;
        }
    },

    // 当前已解除质押但未领取的ODIN量
    async getUnstake(_owner,_holder) {
        if(!_holder) _holder = this.tronWeb.address.fromHex(oscarPlayer.address);

        let result = await this.oscarToken.getUnstake(_owner, _holder).call();
        return {
            value: parseFloat((this.decodeHexNum(result[0]._hex)/1e6).toFixed(3)),
            time: this.decodeHexNum(result[1]._hex)
        };
    },

    //获取抵押给holder的owners
    async getOwnersOfDeposit(_holder){
        if(!_holder) _holder = this.tronWeb.address.fromHex(oscarPlayer.address);
        let address = [];
        let result = await this.oscarToken.getOwnersForHolder(_holder).call();
        
        for(let item of result){
           let addrHex = this.tronWeb.address.toHex(item);
           let addrBase58 = this.tronWeb.address.fromHex(addrHex);
           address.push(addrBase58);
        }
        return address;
    },

    //获取总抵押量
    async getTotalDeposit(){
        let _holder = this.tronWeb.address.fromHex(oscarPlayer.address);
        let result = await this.oscarToken.getTotalDepositsForHolder(_holder).call();
        return parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));
    },

    // 获取用户总抵押
    async getUserTotalDeposit(_owner) {
        let result = await this.oscarToken.totalDeposits(_owner).call();
        return parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));
    },

    // 获取用户总解押中
    async getUserTotalUnstakes(_owner) {
        let result = await this.oscarToken.totalUnstakes(_owner).call();
        return parseFloat((this.decodeHexNum(result._hex)/1e6).toFixed(3));
    },


    //更改合约owner
    async transferOwnership(_newOwner){
        try {
            let result = await this.oscarToken.transferOwnership(_newOwner).send(this.trxParam);
            return result;
        } catch (error) {
            console.error(error);
        }
              
    },

    //挖矿，分发代币
    async mint(_recipient,_value){
        try{
           let result = await this.oscarToken.mint(_recipient,_value).send(this.trxParam);
           console.log('mint success,recipient:' + _recipient + ',value:' + _value);
           return result;
        }catch(error){
            console.log('mint error');
            console.error(error);  
        }
    },

    //转账代币  
    async transfer(_to,_value){
        try{
            let result = await this.oscarToken.transfer(_to,_value).send(this.trxParam);
            console.log('transfer success,recipient:' + _to + ',value:' + _value);
            return result;
         }catch(error){
            console.log('transfer error');
            console.error(error);  
         }
    },


     //抵押给holder
     async deposit(_value){
        try{
            let _holder = this.tronWeb.address.fromHex(oscarPlayer.address);
            let result = await this.oscarToken.submitDeposit(_holder,_value * 1e6).send(this.trxParam);
            console.log('deposit success,holder:' + _holder + ',value:' + _value);
            return result;
         }catch(error){
            console.log('deposit error');
            console.error(error);  
         }
    },

     //解除质押
     async unstakeDeposit(_value){
        try {
            let _holder = this.tronWeb.address.fromHex(oscarPlayer.address);
            await this.oscarToken.unstakeDeposit(_holder,_value * 1e6).send(this.params);
            console.log('unnstake success,holder:' + _holder + ',value:' + _value);
        } catch (error) {
            console.log('unstake error');
            console.error(error);  
        }
    },


    // 领取解除质押的token
    async withdrawUnstaked(_owner,_holder) {
        try{
            if(!_holder) _holder = this.tronWeb.address.fromHex(oscarPlayer.address);
            await this.oscarToken.withdrawUnstaked(_holder,_owner).send(this.trxParam);
            console.log('withdraw unstake deposit success,owner:' + _owner);
        }catch(error) {
            console.log('withdrawUnstaked error');
            console.error(error);
        }
    },

    //设置token合约黑名单
    async updateBlackList(_addr,_state){
        try {
            await this.oscarToken.updateBlackList(_addr,_state).send(this.params);
        } catch (error) {
            console.log('updateBlackList error');
            console.error(error);
        }
    },


    ////Ring GET
    ///////////////////////////////////////////////////////////

    async transferTrx(_to,_value) {
        try{
            await this.tronWeb.trx.sendTrx(_to,_value);
        } catch(error){
            console.log('transferTrx error');
            console.error(error);
        }
    },

    async sha3(msg){
        //console.log(1)
        return this.tronWeb.sha3(msg);
    },
  
    async sign(msg){
      //console.log(2)
      let res = await this.tronWeb.trx.sign(msg);
      return res;
    },
  

    decodeHexNum(_hex){
        let valueIn16 = _hex.substr(2);
        let valueIn10 = parseInt(valueIn16,16);
        return valueIn10;
    },

    formatDate(Date,_fmt){
        return Date.format(_fmt);
    },
    //获取随机数
    randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            default: 
                return 0; 
        } 
    },
    
    //公平的随机数
    async fairRandom(seed,maxNum){
        let sha3_1 = this.tronWeb.sha3(seed);
        //console.log('sha3_1===='+sha3_1);
        let sign = await this.tronWeb.trx.sign(sha3_1,this.randomPrivteKey);
        //console.log('sign==='+sign);
        let sha3_2 = this.tronWeb.sha3(sign);
        //console.log('sha3_2==='+sha3_2);
        let postfix6 = sha3_2.substr(sha3_2.length - 6);
        //console.log('postfix6==='+postfix6);
        let postfix6_10 = parseInt(postfix6,16);
        //console.log('postfix6_10===' + postfix6_10);
        let result = (postfix6_10 % maxNum + 1);
        //console.log('result===' + result);

        return {
            sha3_1:sha3_1,
            sign:sign,
            sha3_2:sha3_2,
            postfix6:postfix6,
            postfix6_10:postfix6_10,
            result:result
        };
    },

    //公平的随机数
    async fairRandom2(seed,maxNum){
        let sha3_1 = this.tronWeb.sha3(seed);
        //console.log('sha3_1===='+sha3_1);
        let sign = await this.tronWeb.trx.sign(sha3_1,this.randomPrivteKey);
        //console.log('sign==='+sign);
        let sha3_2 = this.tronWeb.sha3(sign);
        //console.log('sha3_2==='+sha3_2);
        let postfix9 = sha3_2.substr(sha3_2.length - 9);
        //console.log('postfix6==='+postfix6);
        let postfix9_10 = parseInt(postfix9,16);
        //console.log('postfix6_10===' + postfix6_10);
        let result = (postfix9_10 % maxNum + 1);
        //console.log('result===' + result);

        return {
            sha3_1:sha3_1,
            sign:sign,
            sha3_2:sha3_2,
            postfix9:postfix9,
            postfix9_10:postfix9_10,
            result:result
        };
    },

    generateSalt(length){
        let data = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i',
                    'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B',
                    'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U',
                    'V','W','X','Y','Z'];
        let result = '';
        for(let i = 0;i < length;i++){
            let num = this.randomNum(0,data.length - 1);
            result += data[num];
        }

        return result;
    },


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    FormatNumberLength(num, length) {
        var r = '' + num;
        while (r.length < length) {
            r = '0' + r;
        }
        return r;
    }
};

export default utilsTron;
//module.exports = utilsTron;