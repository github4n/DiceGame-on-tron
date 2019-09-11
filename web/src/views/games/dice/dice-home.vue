<template>
  <div class=''>
    <div v-if="isPcDeviceType" class="main-content">
      <!-- <pc-banner></pc-banner> -->

      <div class="main-header">
        <div class="header">
          <div class="head-num">
            <span v-if='betNum==0' class="num-span" style="">{{lotteryNumber}}</span>
            <span v-else class="num-span" style="">{{betNum}}</span>
          </div>
          <div class="contentdice">
            <el-tabs class="contentdice-tabs" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="Under" name="first">
                <div class="tab-pane2">
                  <div v-if="activeName=='first'" class="content-pic">
                    <loss :betPrice='betPrice' ref="childLoss" :activeName='activeName' @showOdds="showOdds"></loss>
                  </div>
                </div> 
              </el-tab-pane>
              <el-tab-pane label="Over" name="second">
                <div class="tab-pane2">
                   <div v-if="activeName=='second'" class="content-pic">
                    <loss :betPrice='betPrice' ref="childLoss" :activeName='activeName' @showOdds="showOdds"></loss>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        <!--   <div class="dice-tz">
            <div class="dice-bet">
              <span class="bet-span" >BET</span><br/>
            </div>
            <span style="color:#fff;">AUTO BET</span>&nbsp;&nbsp;
            <el-switch style="margin:10px 0;" v-model="auto" active-color="#00E9E1" ></el-switch>
          </div> -->
          <div class="dice-xz">
            <p class="amount-span">{{$t('betting.dicexz')}}</p>
            <img style="position: absolute;margin: 10px -400px;" src='@/assets/imgs/zsicon.png' />
            <div class="amount3">
              <el-input class="input-xz" type="number" v-model="betPrice" @blur="inputFunc()"></el-input>
            </div>
            <div class="amount2">
               <div class="sp-num" @click="toCalculate(2)">2X</div> 
               <div class="sp-num" @click="toCalculate(1)">1/2</div>
               <div class="sp-num" @click="toCalculate(3)">MAX</div>
               <span class="sp-span" @click="getMinVal">MIN</span>
            </div>
          </div>
          <div class="dice-footer">
            <div class="footer">
              <p class="foot-p">{{$t('betting.balance')}}</p>
              <div class="input-footer" >
                <div class="tp-sty">
                  <img class="img" src='@/assets/imgs/zsicon.png'>
                </div>
                <span style="margin-top: -10px;">{{trxFreeBalance}}</span>
              </div>
              
            </div>
            <div class="footer">
               <p class="foot-p">{{$t('betting.payout')}}</p>
                <div class="input-footer" >
                  <div class="tp-sty">
                    <img class="img" src='@/assets/imgs/zsicon.png'>
                  </div>
                  <span>{{odds}}</span>
                </div>
            </div>
            <div class="footer">
               <p class="foot-p">{{$t('betting.odin')}}</p>
                <div class="input-footer" >
                  <div class="tp-sty">
                    <img class="img" src='@/assets/img/dpicon.png'>
                  </div>
                  <span>{{odinFreeBalance}}</span>
                </div>
            </div>
          </div>
        </div>
     
      </div>

      <div class="content">
        <!-- <div class="content-pic">
          <loss :betPrice='betPrice'></loss>
        </div> -->
        <Bet :betPrice='betPrice'></Bet>
        <tableList></tableList>
        <tableTz></tableTz>
        <!-- <order-record></order-record> -->
      </div>
    </div>

    <div v-else class="app-main-content">
        <div class="main-content2">
          <div class="content-pic">
            <div class="pic-number">
              <div v-if='betNum==0' class="num-span">{{lotteryNumber}}</div>
              <div v-else class="num-span">{{betNum}}</div>
            </div>
            <div class="contentdice-app">
            <el-tabs class="contentdice-tabs-app" v-model="activeNameApp" @tab-click="handleClickApp">
              <el-tab-pane label="Under" name="first">
                <div class="tab-pane2-app">
                  <div v-if="activeNameApp=='first'" class="content-pic-app">
                    <app-loss :betPrice='betPrice' class="text-box" ref="childLossApp" :activeNameApp='activeNameApp' @showOddsApp="showOddsApp"></app-loss>
                  </div>
                </div> 
              </el-tab-pane>
              <el-tab-pane label="Over" name="second">
                <div class="tab-pane2-app"> 
                   <div v-if="activeNameApp=='second'" class="content-pic-app">
                    <app-loss :betPrice='betPrice' class="text-box" ref="childLossApp" :activeNameApp='activeNameApp' @showOddsApp="showOddsApp"></app-loss>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

          <div class='bet-amount'>
          <div class='bet-title'>{{$t('betting.dicexz')}}</div>
          <div class='bet-contents'>
            <div class='bet-inp'>
              <input @keyup.native="number" type="number" v-model="betPrice" @blur="inputFunc()">
            </div>
            <div class='bet-prices'>
              <div class="sp-str" @click="toCalculate(2)">2X</div>
              <div class="sp-str" @click="toCalculate(1)">1/2</div>
              <div class="sp-str" @click="toCalculate(3)">MAX</div>
              <div class="sp-str" @click="getMinVal">MIN</div>
            </div>
          </div>
        </div>
        <div class='bet-balance'>
            <div class='balance-content'> 
              <div class='balance-title'>{{$t('betting.balance')}}</div>
              <div class="balance-item">
                <img class='imgs'  src="@/assets/img/zsicon.png" alt="">
                <div class="bonus-str">{{trxFreeBalance}}</div>
              </div>
            </div>

            <div class='balance-content'> 
              <div class='balance-title'>{{$t('betting.payout')}}</div>
              <div class="balance-item">
                <img class='imgs'  src="@/assets/img/zsicon.png" alt="">
                <div class="bonus-str">{{oddsApp}}</div>
              </div>
            </div>

            <div class='balance-content'> 
              <div class='balance-title'>{{$t('betting.odin')}}</div>
              <div class="balance-item">
                <img class='imgs' src="@/assets/img/dpicon.png" alt="">
                <div class="bonus-str">{{odinFreeBalance}}</div>
              </div>
            </div>
          </div> 
          </div>
          <app-bet :betPrice='betPrice'></app-bet>
          <app-rank-list></app-rank-list>
          <app-record></app-record>
        </div>
  
    </div>
  </div>
</template> 

<script>
  import pcBanner from '@/views/components/banner' // 轮盘组件
  import Loss from './pc-dice/loss.vue'; //进度条赔率计算
  import Bet from './pc-dice/bet.vue' // 阶段投注框
  // import ranking from '@/views/components/ranking' // 排行
  import tableList from '@/views/components/table-list' // 排行
  import tableTz from '@/views/games/home/pc-home/table-tz' // 排行
  import OrderRecord from './pc-dice/record.vue'; //订单记录
  import utilsTron from '@/utilsTron';

  import appBanner from '@/views/app-components/app-banner' // 轮盘组件
  import appChatroom from '@/views/app-components/app-chatroom' // 排行
  import appLoss from './app-dice/app-loss.vue'; //进度条赔率计算
  import appBet from './app-dice/app-bet.vue' // 阶段投注框
  import appRankList from '@/views/app-components/app-rankList' // 排行
  import appRecord from './app-dice/app-record.vue'; //订单记录
  import { setTimeout } from 'timers';

  import { getMyBetList } from '@/service/api';


 

  export default {
    name: 'Main',

    components: { Loss, Bet, OrderRecord, tableList , tableTz , pcBanner , appBanner , appChatroom ,
      appLoss , appBet , appRankList ,  appRecord
    } ,

    computed: {
      'isLogin': function() {
        return this.$store.getters.IS_USER_LOGIN;
      },

      'tronwebObj': function() {
        return this.$store.getters.GET_RING_TRON_WEB;
      },

      'trxFreeBalance': function() {
        if(this.$store.getters.GET_TRX_FREE_BALANCE > 0){
          this.isDisabled = false;
          return this.$store.getters.GET_TRX_FREE_BALANCE.toFixed(0);
        }
      },
     

      'odinFreeBalance': function() {
        return this.$store.getters.GET_ODIN_FREE_BALANCE;
      },

      'maxValue': function() {
        return this.$store.getters.GET_DICE_MAX_WAGER_PRICE;
      },
      'betNum':function(){
        return this.$store.getters.GET_LOTTERY_NUMBER;
      },
      'odds': function() {
        if(this.activeName=='first'){
          let value = this.showOddsVal.odds*this.betPrice;
          if(!isNaN(value)){
            return value.toFixed(4)
          }else{
            return ((97 / (50-1))*this.betPrice).toFixed(4);
          }
        }else if(this.activeName=='second'){
          let overVal = this.showOddsVal.oddsover*this.betPrice;
          if(!isNaN(overVal)){
             return overVal.toFixed(4)
          }else{
            return ((97 / (100-50))*this.betPrice).toFixed(4);
          }
        }
        
      },
      'oddsApp': function() {
        if(this.activeNameApp=='first'){
          let value = this.showOddsValApp.odds*this.betPrice;
          if(!isNaN(value)){
            return value.toFixed(4)
          }else{
            return ((97 / (50-1))*this.betPrice).toFixed(4);
          }
        }else if(this.activeNameApp=='second'){
          let overVal = this.showOddsValApp.oddsover*this.betPrice;
          if(!isNaN(overVal)){
             return overVal.toFixed(4)
          }else{
            return ((97 / (100-50))*this.betPrice).toFixed(4);
          }
        }
        
      },
    },

    data() {
      return{
        isShowText: true,
        auto:false,
        value:20,
        activeName: 'first',
        activeNameApp: 'first',
        betPrice: 50, // 投注金额
        // maxValue: 100.0000,
        isDisabled: true,
        minBetPrice: 50.0000,
        isPcDeviceType: this.$isPcDeviceType,
        showOddsVal:{},
        showOddsValApp:{},
        lotteryNumber:50,
      }
    },

    mounted() {
      this.initPrice();
      this.initDiceMinimal();
      this.initData();
      window.setInterval(this.getBalance, 1000);
    },

    methods: {
      initData(){
        setInterval(this.getMyBetList, 2000);
      },
      getBalance(){
        this.tronData(this.$store.getters.GET_TOKEN);
      }, 

      async tronData(_addr) {
        if(this.tronwebObj){
          if(_addr){
            let trxBalance = await this.tronwebObj.trx.getBalance(_addr);
            if(trxBalance > 0) {
              let trxFreeBalance = trxBalance / Math.pow(10,6);
              this.$store.commit('SET_TRX_FREE_BALANCE', trxFreeBalance);
            }
            let odinFreeBalance = await utilsTron.getFreeBalanceOf(_addr);
            this.$store.commit('SET_ODIN_FREE_BALANCE', odinFreeBalance);
          }
        }
      },

      /* 获取我的上一轮投注 */ 
      getMyBetList(){
        let params = {'Count': 30, 'Addr': localStorage.getItem('token')};
        getMyBetList(params).then(result => {
          if(result.length>0){ 
            this.lotteryNumber = result[0].lotteryNumber;
              let betId = parseInt(result[0].betId);
              this.$store.commit('SET_NEW_BET_RECORD', betId);
              // console.log("parseInt(this.dataBetList[0].betId):---------->",betId);
            }
        })
      },  
      async getMinVal(){
         this.betPrice = await utilsTron.getDiceMinimal() / Math.pow(10, 6);
      },
      /*  奖金 shif*/
      showOdds(showOdds){
        // console.log('showOdds:===>',showOdds);
        this.showOddsVal = showOdds
      },
       /*  奖金 shif*/
      showOddsApp(showOddsApp){
        // debugger
        // console.log('showOddsApp:===>',showOddsApp);
        this.showOddsValApp = showOddsApp
      },
      handleClick(tab, event) {
        let name = this.activeName;
        if(name=='second'){
          $(".contentdice-tabs .el-tabs__active-bar").css('margin-left','422px')
          // this.$refs.childLoss.changeStyle2();
          $('.content-pic .loss .loss-box .progress-bar .scale .ant-slider-track').css('background','red');
          // $('.text-box /deep/ .loss .loss-box .progress-bar .scale .ant-slider-track').css('background','#00E9E1');
          // $('.loss .loss-box .progress-bar .scale').css('background','#565656');
        }else if(name=='first'){
          $(".contentdice-tabs .el-tabs__active-bar").css('margin-left','208px')
          this.$refs.childLoss.changeStyle1();
        }
      },
      handleClickApp(tab, event) {
        let name = this.activeNameApp;
        if(name=='second'){
          $(".contentdice-tabs-app .el-tabs__active-bar").css('margin-left','130px')
          //  this.$refs.childLossApp.changeStyleApp2();
        }else if(name=='first'){
          $(".contentdice-tabs-app .el-tabs__active-bar").css('margin-left','64px')
          // this.$refs.childLossApp. changeStyleApp1();
        }
      },
      initPrice(){
        let that = this;
        let timer = setTimeout(function() { 
          that.getDiceMinimals();
        }, 1000);
      }, 

      initDiceMinimal() {
          let _this = this;
          document.addEventListener('visibilitychange', function(){
              _this.isHidden = document.hidden;
              if(_this.isHidden === false){
                //_this.getDiceMinimals();
              }else{
                 _this.getDiceMinimals();
              }
          })
      },

      async getDiceMinimals(){
        let price= await utilsTron.getDiceMinimal() / Math.pow(10, 6);
        this.betPrice = price;
        //alert(this.betPrice);
      },

      changeTitle(){
        //window.document.title = 'DICE';
      },

      toCalculate(index) {
        // debugger
        switch(index) {
          case 1:
           let betP = Math.round(this.betPrice / 2).toFixed(0);/* .toFixed(4) */
          if(betP < this.minBetPrice){
            this.betPrice = Math.round(this.minBetPrice).toFixed(0);/* .toFixed(4) */
          }else{
            this.betPrice = betP;
          }
          break;

          case 2:
            if(this.betPrice<=5000){
              if(this.betPrice > (this.maxValue / 2)){
                  this.betPrice =  Math.round(this.maxValue).toFixed(0);/* .toFixed(4) */
              }else{
                this.betPrice =  Math.round(this.betPrice * 2).toFixed(0); /* .toFixed(4) */
              }
            }else{
              this.betPrice = this.maxValue / Math.pow(10, 6);
            }
          break;

          case 3:
            this.betPrice = this.maxValue / Math.pow(10, 6);
          break;

          default:
          break;
        }
      },

      inputFunc() {
        let val = this.maxValue/ Math.pow(10, 6);
        // debugger
        if(this.betPrice < this.minBetPrice){
          // this.betPrice = this.minBetPrice;
          this.$message({
            message: this.$t('betting.miniPrice') + this.minBetPrice + '!',
            type: 'error'
          });
          this.betPrice = 50
        }else if(this.betPrice > val){
          this.betPrice = val;
        }/* else{
          this.betPrice = parseFloat(this.betPrice) .toFixed(0);
        } */
      }
    }
  }
</script>

<style scoped>

/* .content-pic >>> .loss .loss-box .progress-bar .scale .ant-slider-track{
   background:red;
} */

</style>
<style lang='less'>
/* .text-box /deep/ .loss .loss-box .progress-bar .scale .ant-slider-track{
   background:red;
} */
  .sd{
    color: #ccc;;
  }
  //$("#table").addClass("sd");
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }

  input[type="number"]{
      -moz-appearance: textfield;
  }

@media screen and (max-width: 1440px) and (min-width: 992px) {

 .main-content{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background: url(../../../assets/imgs/Background-dice.png) no-repeat;
    background-size: 100% 100%;
    .main-header{
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .header{
        margin: 0 auto;
        width: 1010px;
        height: 700px;
        margin-top:15px;
     
        background: url(../../../assets/imgs/small_bgDice.png) no-repeat; 
        background-size:100% 100%;
        .head-num{
          margin:34px auto;
          width:366px;
          height:160px;
          border-radius:10px;
          border:1px solid #00E9E1;
          .num-span{
            font-family:'PingFangSC-Semibold';
            font-size:140px;
            font-weight:600;
            color:rgba(0,233,225,1);
            line-height:160px;
          }
        }
        img{
          height: 34px;
        }
        .sp-str{
          cursor: pointer;
          height: 34px;
          line-height: 34px;
          color: #039074;
          padding: 0 20px;
          font-size: 20px;
        }
        .bonus-str{
          height: 34px;
          line-height: 34px;
          color: #fff;
          padding: 0 60px;
          font-size: 20px;
        }
        .bonus{
          height: 34px;
          line-height: 34px;
          color: #039074;
          font-size: 18px;
        }
        .sp-str:hover{
          opacity: .7;
        }
      }
      .contentdice{
        width: 990px;
        margin: 0 auto;
        .contentdice-tabs .el-tabs__item.is-active{
          font-weight: 500;
          color: #01E2DB !important;
        }
        .contentdice-tabs .el-tabs__item:hover{
          color: #01E2DB !important;
        }
        .contentdice-tabs .el-tabs__active-bar{
          background-color: #01E2DB !important;
          margin-left: 210px;
        }
        .contentdice-tabs .el-tabs__nav-scroll {
          background: transparent;
          margin-left: 100px;
        }
        .contentdice-tabs .el-tabs__item {
          font-size:24px;
          margin-left: 210px;
        }
        .tab-pane1{
          width:945px;
          text-align: right;
        }
        .tab-pane2{
          width:991px;
          .content-pic {
            height: 100%;
            margin: 0 auto;
          }
        }
      }
      .dice-tz{
        width:260px;
        margin:15px auto;
        .dice-bet{
          width:260px;
          height:50px;
          background:rgba(0,233,225,1);
          border-radius:10px;
          .bet-span{
            color:#181845;
            font-size:46px;
            font-family:'PingFangSC-Semibold';
            font-weight:600;
            line-height: 50px;
          }
        }
      }
      .dice-xz{
        width: 990px;
        margin: 0 auto;
        margin-top: 15px;
        margin-left: 230px;
        height: 80px;
        .amount-span{
          opacity:0.5;
          font-size:14px;
          text-align: left;
          margin-left:62px;
          color:rgba(255,255,255,1);
          font-weight:400;
          font-family:'PingFangSC-Regular';
        }
        .amount2{
          width:278px;
          height:54px;
          float: left;
          margin-left:25px;
          border:1px solid rgba(255,255,255,1);
          border-radius:10px;
          .sp-num{
            width:68px;
            float: left;
            font-size:18px;
            font-weight:400;
            cursor: pointer;
            line-height: 54px;
            color:rgba(255,255,255,1);
            font-family:'PingFangSC-Regular';
            border:1px solid #fff; border-top:none; border-bottom:none;border-left:none;
          }
          .sp-span{
            font-size:18px;
            font-weight:400;
            padding: 0 13px;
            cursor: pointer;
            line-height: 54px;
            color:rgba(255,255,255,1);
          }
        }
        .amount3{
          float: left;
          margin-left:40px;
          .input-xz .el-input__inner{
            height: 56px;
            width: 310px;
            text-align: center;
            background: transparent;/* #181845 */
            margin-left: 20px;
            font-size: 22px;
            border-radius: 10px;
            padding: 0 10px;
            border: 1px solid #00E9E1;
            color: #fff;
            outline: none;
          }
        }
      }
      .dice-footer{
        width: 990px;
        height: 100px;
        margin: 0 auto;
        margin-top: 20px;
        .footer{
          float:left;
          padding: 0 54px;
          .foot-p{
            opacity:0.5;
            font-size:14px;
            text-align: left;
            font-weight:400;
            line-height: 28px;
            color:rgba(255,255,255,1);
            font-family:'PingFangSC-Regular';
          }
          .input-footer {
            height: 54px;
            width: 200px;
            line-height: 54px;
            margin-top: -10px;
            font-size: 22px;
            border-radius: 10px;
            padding: 0 10px;
            border: 1px solid #fff;
            color: #fff;
            outline: none;
            background: transparent;
            .tp-sty{
              float:left;
              width:10px;
              .img{
                vertical-align: middle;
              }
            }
          }
        }

       
      }
    }

    .content{
      width: 1010px;
      margin: 0 auto ;
    }
  }
}



@media screen and (max-width: 3000px) and (min-width: 1440px) {
  .main-content{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background: url(../../../assets/imgs/Background-dice.png) no-repeat;
    background-size: 100% 100%;
    .main-header{
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .header{
        margin: 0 auto;
        width: 1200px;
        height: 700px;
        margin-top:15px;
     
        background: url(../../../assets/imgs/small_bgDice.png) no-repeat; 
        background-size:100% 100%;
        .head-num{
          margin:34px auto;
          width:366px;
          height:160px;
          border-radius:10px;
          border:1px solid #00E9E1;
          .num-span{
            font-family:'PingFangSC-Semibold';
            font-size:140px;
            font-weight:600;
            color:rgba(0,233,225,1);
            line-height:160px;
          }
        }
        img{
          height: 34px;
        }
        .sp-str{
          cursor: pointer;
          height: 34px;
          line-height: 34px;
          color: #039074;
          padding: 0 20px;
          font-size: 20px;
        }
        .bonus-str{
          height: 34px;
          line-height: 34px;
          color: #fff;
          padding: 0 60px;
          font-size: 20px;
        }
        .bonus{
          height: 34px;
          line-height: 34px;
          color: #039074;
          font-size: 18px;
        }
        .sp-str:hover{
          opacity: .7;
        }
      }
      .contentdice{
        width: 990px;
        margin: 0 auto;
        .contentdice-tabs .el-tabs__item.is-active{
          font-weight: 500;
          color: #01E2DB !important;
        }
        .contentdice-tabs .el-tabs__item:hover{
          color: #01E2DB !important;
        }
        .contentdice-tabs .el-tabs__active-bar{
          background-color: #01E2DB !important;
          margin-left: 210px;
        }
        .contentdice-tabs .el-tabs__nav-scroll {
          background: transparent;
          margin-left: 100px;
        }
        .contentdice-tabs .el-tabs__item {
          font-size:24px;
          margin-left: 210px;
        }
        .tab-pane1{
          width:945px;
          text-align: right;
        }
        .tab-pane2{
          width:991px;
          .content-pic {
            height: 100%;
            margin: 0 auto;
          }
        }
      }
      .dice-tz{
        width:260px;
        margin:15px auto;
        .dice-bet{
          width:260px;
          height:50px;
          background:rgba(0,233,225,1);
          border-radius:10px;
          .bet-span{
            color:#181845;
            font-size:46px;
            font-family:'PingFangSC-Semibold';
            font-weight:600;
            line-height: 50px;
          }
        }
      }
      .dice-xz{
        width: 990px;
        margin: 0 auto;
        margin-top: 15px;
        margin-left: 230px;
        height: 80px;
        .amount-span{
          opacity:0.5;
          font-size:14px;
          text-align: left;
          margin-left:62px;
          color:rgba(255,255,255,1);
          font-weight:400;
          font-family:'PingFangSC-Regular';
        }
        .amount2{
          width:278px;
          height:54px;
          float: left;
          margin-left:25px;
          border:1px solid rgba(255,255,255,1);
          border-radius:10px;
          .sp-num{
            width:68px;
            float: left;
            font-size:18px;
            font-weight:400;
            cursor: pointer;
            line-height: 54px;
            color:rgba(255,255,255,1);
            font-family:'PingFangSC-Regular';
            border:1px solid #fff; border-top:none; border-bottom:none;border-left:none;
          }
          .sp-span{
            font-size:18px;
            font-weight:400;
            padding: 0 13px;
            cursor: pointer;
            line-height: 54px;
            color:rgba(255,255,255,1);
          }
        }
        .amount3{
          float: left;
          margin-left:40px;
          .input-xz .el-input__inner{
            height: 56px;
            width: 310px;
            text-align: center;
            background: transparent;/* #181845 */
            margin-left: 20px;
            font-size: 22px;
            border-radius: 10px;
            padding: 0 10px;
            border: 1px solid #00E9E1;
            color: #fff;
            outline: none;
          }
        }
      }
      .dice-footer{
        width: 990px;
        height: 100px;
        margin: 0 auto;
        margin-top: 20px;
        .footer{
          float:left;
          padding: 0 54px;
          .foot-p{
            opacity:0.5;
            font-size:14px;
            text-align: left;
            font-weight:400;
            line-height: 28px;
            color:rgba(255,255,255,1);
            font-family:'PingFangSC-Regular';
          }
          .input-footer {
            height: 54px;
            width: 200px;
            line-height: 54px;
            margin-top: -10px;
            font-size: 22px;
            border-radius: 10px;
            padding: 0 10px;
            border: 1px solid #fff;
            color: #fff;
            outline: none;
            background: transparent;
            .tp-sty{
              float:left;
              width:10px;
              .img{
                vertical-align: middle;
              }
            }
          }
        }

       
      }
    }

    .content{
      width: 1200px;
      margin: 0 auto ;
    }
  }
}
  .app-main-content{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background: url(../../../assets/img/diceB.png);
    background-size: 100% 100%; 
    .app-main-header{
      padding: 10px 10px 0px;
      .app-header{
        flex: 1;
        display: flex;
        flex-direction: row;
        border:1px solid #039074;
        border-radius: 4px;
        padding: 9px 15px;
        box-sizing: border-box;
        align-items: center;

        img{
          height: 28px;
        }
        input{
          width: 40%;
          flex: 2;
          height: 28px;
          background:#039074;
          margin-left: 10px;
          font-size: 18px;
          border-radius: 2px;
          padding: 0 10px;
          border: none;
          color: #fff;
          outline: none;
          text-align: center;
        }
        .sp-str{
          flex: 1;
          cursor: pointer;
          height: 28px;
          line-height: 28px;
          color: #039074;
          font-size: 18px;
        }
        .sp-str:hover{
          opacity: .7;
        }
      }

      .app-main-content1{
        display: flex;
        padding-top: 30px;
        .content{
          flex: 1;
          display: flex;
          align-items: center;
          padding: 4px 0px 4px 15px;
          box-sizing: border-box;
          border-radius: 4px;
          border:1px solid #039074;

          img{
            height: 30px;
            margin-right: 15px;
          }
          .bonus-str{
            flex: 1;
            height: 28px;
            line-height: 28px;
            color: #fff;
            font-size: 16px;
          }
          .bonus{
            flex: 1;
            height: 28px;
            line-height: 28px;
            color: #039074;
            font-size: 16px;
          }
        }
      }
    }

    .main-content2{
      padding: 10px;
      .content-pic {
        height: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        background: url(../../../assets/img/diceBg.png) no-repeat;
        background-size: 100% 100%; 
        .pic-number{
          width: 60%;
          margin: 0 auto;
          padding-top: 20px;
          .num-span{
            width: 100%;
            box-sizing: border-box;
            padding: 10px 30px;
            font-size: 50px;
            border: 1px solid #00E9E1;
            border-radius: 10px;
            color: #00E9E1;
          }
        }
        .contentdice-app{
          width: 100%;
          margin: 0 auto;
          .contentdice-tabs-app .el-tabs__item.is-active{
            font-weight: 500;
            color: #01E2DB !important;
          }
          .contentdice-tabs-app .el-tabs__item:hover{
            color: #01E2DB !important;
          }
          .contentdice-tabs-app .el-tabs__active-bar{
            background-color: #01E2DB !important;
            margin-left: 64px;
          }
          .contentdice-tabs-app .el-tabs__nav-scroll {
            background: transparent;
            margin-left: 42px;
          }
          .contentdice-tabs-app .el-tabs__item {
            font-size:16px;
            margin-left: 65px;
          }
          .tab-pane1{
            width:100%;
            text-align: right;
          }
          .tab-pane2-app{
            width:100%;
            .content-pic-app {
              // padding-top: 10px;
              height: 100%;
              margin: 0 auto;
              // padding-bottom: 20px;
            }
          }
        }
  .bet-amount{
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
    .bet-title{
      width: 100%;
      text-align: left;
      font-size: 10px;
      color: #ccc;
      padding: 5px 10px;
    }
    .bet-contents{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .bet-inp{
        width: 45%;
        input{
          height: 26px;
          line-height: 26px;
          text-align: center;
          border: 1px solid #00E9E1;
          background: transparent;
          border-radius: 4px; 
          color: #fff;
          font-size: 12px;
        }
      }

    .bet-prices{
      width: 45%;
      border: 1px solid #fff;
      border-radius: 4px; 
      display: flex;
      align-items: center;
      .sp-str{
        flex: 1;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 12px;
        border-right: 1px solid #fff;
      }
      .current{
        background: #00E9E1;
        color: #181845;
      }

    .sp-str:hover{ 
      opacity: 0.4;
    }
    }
  }
}
.bet-balance{
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .balance-content{
    width: 32%;
    .balance-title{
      font-size: 12px;
      color: #ccc;
      text-align: left;
      padding: 6px 0px;
    }
    .balance-item{
      border: 1px solid #fff;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      padding: 0px 10px;
      .imgs{
        width: 18px;
      }
      .bonus-str{
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
      }
    }
  }
</style>
