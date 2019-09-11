<template>
  <!-- 分红 -->
  <div class='payout-dialog'>
    <div class="payout-box">
      <div class="header">
        <div class="item" :class="{'active': selIndex==1}" @click="selMenu(1)">{{$t('header.payout')}}</div>
        <div class="item" :class="{'active': selIndex==2}" @click="selMenu(2)">{{$t('header.pledge')}}</div>
        <div class="item" :class="{'active': selIndex==3}" @click="selMenu(3)">{{$t('header.payoutRecord')}}</div>
        <div class="item" :class="{'active': selIndex==4}" @click="selMenu(4)">{{$t('header.minePayout')}}</div>
        <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
      </div>

      <!-- 分红 -->
      <div v-show="selIndex==1" class="content">
        <div class="title">
          <span>{{$t('betting.accumulation')}}</span>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <p style="max-width:300px;">
                {{$t('betting.accumulate')}}
              </p>
            </div>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
          </el-tooltip>
        </div>

        <div class="payout-vaule price-pot">
          <span style="color:#fff;font-size:24px;">{{prizePot1 | priceFormatno}} TRX</span>
         
        </div>

        <div class="payout-count">
          <div class="item">
            <div v-if='earnings <=0' class='trx-tiem'>{{$t('betting.earnings')}} 0 TRX</div>
            <div v-if='earnings > 0' class='trx-tiem'>{{$t('betting.earnings')}} {{earnings | priceFormat2}} TRX</div>
            <!-- <div ></div> -->
          </div>
          <div class="right-item">
            <div v-if='odinEarnings <=0' class='trx-tiem'>{{$t('betting.million')}} 0 TRX</div>
            <div v-if='odinEarnings > 0' class='trx-tiem'>{{$t('betting.million')}} {{odinEarnings | priceFormat2}} TRX88</div>
            <!-- <div style='margin-left:4px;'></div> -->
          </div>
        </div>

        <div class="next-payout">
          <h5>{{$t('betting.shutdown')}}: {{luckPrizeCountdown}}</h5>
          <!-- <p style="font-size:12px; color: #fff; opacity: .4;">{{$t('betting.nextPayout')}}</p> -->
        </div>
      </div>

      <!-- 质押 -->
      <div v-show="selIndex==2" class="content">
        <div class="title">
          <span>{{$t('header.pledgeAmount')}}</span>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" style='width:500px;'>
              <p style='padding:0px 25px;'>
                {{$t('betting.lockedODIN')}}
              </p>
              <div class="tooltip-box" style='padding:0px 20px;'>
                <div class="tooltip-item tooltip-item-th">
                  <div  style='width:150px;'>{{$t('betting.dates')}}</div>
                  <div> &lt;1 </div>
                  <div>1 - 7</div>
                  <div>8 - 30</div>
                  <div>30+</div>
                </div>

                <div class="tooltip-item">
                  <div style='width:150px;'>{{$t('betting.DeductionRatio')}}</div>
                  <div>15</div>
                  <div>10</div>
                  <div>5</div>
                  <div>0</div>
                </div>
              </div> 
            </div>
            <i class="fa fa-question-circle icon" aria-hidden="true"></i>
          </el-tooltip>
        </div>

        <div class="payout-vaule  price-pot">
          <!-- <img src="../../assets/images/oct.png" alt=""> -->
          <span class="odin-total" style="font-size:24px;">{{totalDeposit | priceFormat3}} ODIN</span>
          <!-- <span class="odin-total" style="margin-top: -5px;">ODIN</span> -->
        </div>
        <p v-if='totalDepotSupply == 0'>{{$t('header.circulation')}} <span class="odin-total">{{totalDepotSupply}}ODIN</span> {{$t('header.the')}}
          <span class="odin-total"> 0%</span>
        </p>
        <p v-if='totalDepotSupply != 0'>{{$t('header.circulation')}} <span class="odin-total">{{totalDepotSupply | priceFormat6}} ODIN</span> {{$t('header.the')}}
          <span class="odin-total"> {{((totalDeposit / totalDepotSupply)*100).toFixed(2)}}%</span>
        </p>

        <div class='pledge-content'>
          <div class="pledge-item">
            <p>{{$t('header.toPledge')}} {{odinFreeBalance | priceFormat3}} ODIN</p>
            <div class="box">
              <!-- <img src="../../assets/images/oct.png" alt=""> -->
              <input type="text" v-model='pledgeValue' placeholder="输入质押数">
             
            </div>
            <div class='pledge-btn'>
              <button class="btn" @click="pledge(1)">{{$t('betting.all')}}</button>
              <button class="btn" @click="pledge(2)">{{$t('header.pledge')}}</button>
            </div>
          </div>

          <div class="pledge-item">
            <p v-if='deposit == 0'>{{$t('header.hasPledged')}} {{deposit}} ODIN ({{$t('header.ofPledged')}} 0%)</p>
            <p v-if='deposit != 0'>{{$t('header.hasPledged')}} {{deposit | priceFormat3}} ODIN ({{$t('header.ofPledged')}} {{((deposit / totalDeposit)*100).toFixed(2)}}%)</p>
            <div class="box">
              <!-- <img src="../../assets/images/oct.png" alt=""> -->
              <input type="text" v-model='redemptionValue' placeholder="输入赎回数">
              
            </div>
            <div class='pledge-btn'>
              <button class="btn" @click="redemption(1)">{{$t('betting.all')}}</button>
              <button class="btn" @click="redemption(2)">{{$t('betting.redemption')}}</button>
              <button class="btn btn-price" @click="getPrice()">{{$t('header.getPrice')}}</button>
            </div>
            <!-- <button class="btn" @click="getPrice()" :disabled='startCountTimer== 0|| startCountTimer==""'>{{$t('header.getPrice')}}</button> -->
          </div>
        </div>

        <div class="pledge-index" v-if="redempNum > 0">
          <p style='margin-right:30px;'>
            {{$t('betting.redemptioning')}}： {{redempNum}} ODIN
          </p>
          <p>
            <!-- <img class="count-img Rotation" src="../../assets/images/countdown.png" alt=""> -->
            <span>{{$t('betting.countdown')}}</span>
            <span style="color: #fff;font-weight:600"> {{countTimer}}</span>
          </p>
        </div>

        <p v-if="redempNum > 0" style='text-align:center;margin:0;'>{{$t('betting.pledgeRe')}}</p>
      </div>

      <!-- 分红记录 -->
      <div v-show="selIndex==3"  class="content">
        <div style="max-height: 450px;
          overflow-x: hidden;
          overflow-y: scroll;">
          <div style='text-align:center;font-size:12px;'>{{$t('betting.nextDay')}}</div>
          <div class="payout-list-table">
            <div class="table-header">
              <div class="timer">
                {{$t('betting.time')}}
              </div>
              <div class="num">
                {{$t('betting.count')}}
              </div>
            </div>
            <div v-for="(item, index) in rizeRecordList" class="item" :class="{'active': index % 2 == 0 }" :key='index'>
              <div class="timer">{{item.time | dateFormat}}</div>
              <div class="num">{{item.prize | priceFormat}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的分红 -->
      <div v-show="selIndex==4"  class="content">
        <div class="title">
          <span>{{$t('header.minePayout')}}</span>
        </div>

        <div class="payout-vaule">
          <!-- <img src="../../assets/images/trx.png" alt=""> -->
          <span v-if='myPrizes > 0' style="color:#fff;font-size:24px;">{{myPrizes | priceFormat}} TRX</span>
          <span v-if='myPrizes == 0' style="color:#fff;font-size:24px;">0 TRX</span>
          <!-- <span style="margin-top: -5px;font-size: 9px;"></span> -->
        </div>

        <div v-if="myPrizes" class="payout-but" @click="withdrawPrizes()">
          <span class="but">{{$t('header.toReceive')}}</span>
        </div>

        <div v-if="!myPrizes" class="payout-but">
          <span class="but">{{$t('betting.noPayout')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utilsTron from '@/utilsTron';
  import utils from '@/utils/index';
  import { getNextDividendTime, getPrizeRecords , getMyPrizes, withdrawPrizes } from '@/service/api';
  import { all } from 'q';
  let moment = require("moment");

  export default {
    name: 'PayoutDialog',

    computed: {
      'isLogin': function() {
        return this.$store.getters.IS_USER_LOGIN;
      },

      /* 当前可质押ODIN余额 */
      'odinFreeBalance': function() {
        return this.$store.getters.GET_ODIN_FREE_BALANCE;
      },

      /* 当前已质押的ODIN量 */
      'deposit': function() {
        return this.$store.getters.GET_CURRENT_DEPOSIT_ODIN;
      },

      /* 当前质押池ODIN总量 */
      'totalDeposit': function() {
        return this.$store.getters.GET_CURRENT_ODIN_TOTAL_DEPOSIT;
      },

       /* ODIN流通总量 */
      'totalDepotSupply': function() {
        return this.$store.getters.GET_ODIN_YOYAL_DEPOT_SUPPLY;
      },

      /* 每万收益 */
      'odinEarnings': function() {
        return this.$store.getters.GET_ODIN_EARNINGS;
      },

      /* 预期收益 */
      'earnings': function() {
        return this.$store.getters.GET_EARNINGS;
      },

      /* 获取分红奖池余额 */
      'prizePot': function() {
        return this.$store.getters.GET_PROZE_POT;
      },
      
      'getToken':function(){
         return this.$store.getters.GET_TOKEN;
      },
    },

    data(){
      return {
        selIndex: 1,
        rizeRecordList: [],
        totalDepositSupply: 0,
        pointScale: 0,
        myPrizes: 0,
        redemptionValue: 0,
        pledgeValue: 0,
        isRedemption: true,
        addr: localStorage.getItem('token'),
        redempNum: 0,
        countdown: 0,
        countTimer: '00:00:00',
        countdownTimer:'',
        dayTimer: 86400, //24小时换算成秒
        endCountTimer: 0,
        startCountTimer: 0,
        localTimer: 0, // 本地时间,
        residueTimer: 0, // 24小时倒计时剩余时间
        remainingTime: '',
        timer: '',
        luckPrizeCountdown: '',
        payoutEndTimer: '',

        prizePot1: 0,
        timer1: '',
        timer2: '',
      }
    },

    watch: {
      remainingTime(newVal, oldVal) {
        this.luckPrizeCountdown = utils.translateTime(this.remainingTime);
        if(this.remainingTime <= 0){
          clearInterval(this.timer);
          this.timer = '';
          return;
        }
        this.timer = setTimeout(() => {
          this.remainingTime--;
        },1000);
      }
    },

    mounted() {
      this.initData();
      this.getPrizePotRandom();
    },

    methods: {
      getPrizePotRandom(){
        let that = this;
        this.timer1 = setInterval(function(){
          if (that.prizePot1 == 0) {
            that.prizePot1 = parseInt(that.prizePot);
            return;
          }
          clearInterval(that.timer2);
          let rand_up = 250 + Math.random() * 250;
          let dist = 0;
          if (that.prizePot1 + 2000/250*50 > that.prizePot + rand_up){
              dist = -50;
          }
          if (that.prizePot1 - 2000/250*50 < that.prizePot - rand_up ||
              that.prizePot1 - 2000/250*50 < 0){
              dist = 50;//优先向上长
          }
          //console.log(that.prizePot1, that.prizePot, dist, rand_up)
          that.timer2 = setInterval(function () {
              that.prizePot1 = Number(that.prizePot1) + parseInt(Math.random()*dist);
              that.$store.commit('SET_PRIZEPOT_ANIMATE', that.prizePot1);
          },250)
        },2000);
      },

      initData() {
        if(this.deposit) {
          this.isRedemption = false;
        }
        this.getNextDividendTime();
      },

      getNextDividendTime() {
        getNextDividendTime().then(res => {
          this.payoutEndTimer = res;
          if(this.payoutEndTimer > 0) {
            if(null != this.timer && this.timer != ""){
            }else {
              this.initCountDown();
            }
          }
        })
      },

      initCountDown() {
        let localSecon = parseInt(this.timest());
        let serviceSecon = this.payoutEndTimer / 1000;
        if(localSecon < serviceSecon) {
          this.remainingTime = serviceSecon - localSecon; // 还剩余多长时间
          this.remainingTime--;
        }
      },

      //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数
      timest() {
        var tmp = Date.parse( new Date() ).toString();
        tmp = tmp.substr(0,10);
        return tmp;
      },

      formatSeconds(value) {
	        var secondTime = parseInt(value);// 秒
	        var minuteTime = 0;// 分
	        var hourTime = 0;// 小时
	        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
	            //获取分钟，除以60取整数，得到整数分钟
	            minuteTime = parseInt(secondTime / 60);
	            //获取秒数，秒数取佘，得到整数秒数
	            secondTime = parseInt(secondTime % 60);
	            //如果分钟大于60，将分钟转换成小时
	            if(minuteTime > 60) {
	                //获取小时，获取分钟除以60，得到整数小时
	                hourTime = parseInt(minuteTime / 60);
	                //获取小时后取佘的分，获取分钟除以60取佘的分
	                minuteTime = parseInt(minuteTime % 60);
	            }
          }
          let result = '';
          if(localStorage.getItem('langType') == 'en'){
            result = "" + parseInt(secondTime) + ".";
            if(minuteTime > 0) {
              result = "" + parseInt(minuteTime) + "." + result;
            }
            if(hourTime > 0) {
              result = "" + parseInt(hourTime) + "." + result;
            }
          }else{
            result = "" + parseInt(secondTime) + "秒";
            if(minuteTime > 0) {
              result = "" + parseInt(minuteTime) + "分" + result;
            }
            if(hourTime > 0) {
              result = "" + parseInt(hourTime) + "小时" + result;
            }
          }
	        return result;
	    },

      /* 当前已解除质押但未领取的ODIN量 */
      async getUnstake() {
        let tron = await utilsTron.getUnstake(this.getToken);
        this.redempNum = tron.value;
        this.startCountTimer = tron.time;
        if(this.startCountTimer) {
          this.localTimer = parseInt(this.timest());//获取本地时间
          this.endCountTimer = this.startCountTimer + this.dayTimer; //24小时结束时间点
          if(this.endCountTimer > this.localTimer){
            if(this.localTimer > this.startCountTimer) {
              let t = this.localTimer - this.startCountTimer; // 24小时中已经消耗了多长时间
              this.residueTimer = this.dayTimer - t; // 24小时倒计时剩余时间
            }else{
              this.residueTimer = this.dayTimer;
            }
            this.setCountDown();
          }else {
            if(this.countdownTimer){
              clearInterval(that.countdownTimer);
            }
          }
        }
      },

      setCountDown() {
        let that = this;
        if(!this.countdownTimer){
          this.countdownTimer = setInterval(() => {
            that.countTimer = that.formatSeconds(this.residueTimer);
            if(that.residueTimer <= 0){
              clearInterval(that.countdownTimer);
            }else{
              that.residueTimer -= 1;
            }
          }, 1000);
        }
      },

      selMenu(index) {
        switch(index){
          case 1: // 分红
            this.selIndex = index;
          break;

          case 2: // 质押
            //this.initDepositData();
            // this.selIndex = index;
            // this.getUnstake();

            if(!this.isLogin){
              this.$message({
                message: this.$t('betting.loginTronLink'),
                type: 'error'
              });
            } else {
              this.selIndex = index;
              this.getUnstake();
            }
          break;

          case 3: // 分红记录
            // this.selIndex = index;
            // this.getPrizeRecords();
            if(!this.isLogin){
              this.$message({
                message: this.$t('betting.loginTronLink'),
                type: 'error'
              });
            } else {
              this.selIndex = index;
              this.getPrizeRecords();
            }
          break;

          case 4: // 我的分红
            // this.selIndex = index;
            // this.getMyPrizes(); // 获取用户待领取分红
            if(!this.isLogin){
              this.$message({
                message: this.$t('betting.loginTronLink'),
                type: 'error'
              });
            } else {
              this.selIndex = index;
              this.getMyPrizes(); // 获取用户待领取分红
            }
          break;

          default:
          break;
        }
      },

      closeDialog() {
        clearInterval(this.countdownTimer);
        this.$emit('closeModule');
      },

      tableRowClassName({row, rowIndex}) {
        return 'success-row';
      },

      async initDepositData() {
        let pot = await utilsTron.getPrizePot(); //获取分红奖池余额
        let prizePotValue = pot / Math.pow(10, 6);
        this.$store.commit('SET_PRIZE_POT_BALANCE', prizePotValue); //获取分红奖池余额
        // console.log('获取分红奖池余额===', prizePotValue);

        let depositValue = await utilsTron.getDeposit(this.getToken); //当前已质押的ODIN量
        this.$store.commit('SET_CURRENT_DEPOSIT_ODIN', depositValue); //当前已质押的ODIN量
        // console.log('当前已质押的ODIN量===', depositValue);

        let totalDepositValue = await utilsTron.getTotalDeposit(); //当前质押池ODIN总量
        this.$store.commit('SET_CURRENT_ODIN_TOTAL_DEPOSIT',  totalDepositValue); //当前质押池ODIN总量
        // console.log('当前质押池ODIN总量===', totalDepositValue);

        let totalDepotSupplyValue = await utilsTron.getCirculatingSupply(); //ODIN流通总量 getTotalSupply
        this.$store.commit('SET_ODIN_YOYAL_DEPOT_SUPPLY', totalDepotSupplyValue); //ODIN流通总量
        // console.log('ODIN流通总量===', totalDepotSupplyValue);

        if(prizePotValue && totalDepositValue) {
          if(depositValue){
            let earningsValue = (depositValue / totalDepositValue * prizePotValue).toFixed(2); //预期收益
            this.$store.commit('SET_EARNINGS',  earningsValue); //预期收益
            // console.log('预期收益===', earningsValue);
          }

          let odinEarningsValue = (10000 / totalDepositValue * prizePotValue).toFixed(2); //每万收益
          this.$store.commit('SET_ODIN_EARNINGS',  odinEarningsValue); //每万收益
          // console.log('每万收益===', odinEarningsValue);
        }

        let odinBalanceValue = await utilsTron.getFreeBalanceOf(this.getToken); // 当前可质押ODIN余额
        this.$store.commit('SET_ODIN_FREE_BALANCE', odinBalanceValue);
        // console.log('当前可质押ODIN余额====', odinBalanceValue);
      },

      /* 赎回 */
      async redemption(type){
        if(type == 1) { // 全部
          this.redemptionValue = this.deposit;
        }
        if(this.redemptionValue > 0){
          let _value = this.redemptionValue;
          this.$message({
            message: this.$t('betting.frozen'),
            type: 'success'
          });
          // this.$loadingBox(this.$t('betting.redemptioning'), '', true);
          let pled = await utilsTron.unstakeDeposit(_value);
          // this.$loadingBox('', '', false);
          this.redemptionValue = 0;
          if(pled){
            this.$message({
              message: this.$t('betting.unstaked'),
              type: 'success'
            });
            this.initDepositData();
          }else{
            this.$message({
              message: this.$t('betting.networdFail'),
              type: 'error'
            });
          }
        }else{
          this.$message({
            message: this.$t('betting.redemptionNum'),
            type: 'error'
          });
        }
      },

      /* 质押 */
      async pledge(type){
        if(type == 1){
          this.pledgeValue = this.odinFreeBalance;;
        }
        if(this.pledgeValue > 0){
          let _value = this.pledgeValue;
          this.$message({
            message: this.$t('betting.frozen'),
            type: 'success'
          });
          // this.$loadingBox(this.$t('betting.pledgeOf'), '', true);
          let pled = await utilsTron.deposit(_value);
          // this.$loadingBox('', '', false);
          //alert(pled)
          this.pledgeValue = 0;
          if(pled){
            this.$message({
              message: this.$t('betting.staked'),
              type: 'success'
            });
            this.initDepositData();
          }else{
            this.$message({
              message: this.$t('betting.networdFail'),
              type: 'error'
            });
          }
        }else {
          this.$message({
            message: this.$t('betting.pledgeAccount'),
            type: 'error'
          });
        }
      },

      getPrizeRecords() {
        let params = {'Count': 7,}
        getPrizeRecords(params).then(result => {
          //console.log('rizeRecordList');
          this.rizeRecordList = result;
        })
      },

      getMyPrizes() {
        let params = {'Addr': this.getToken};
        getMyPrizes(params).then(result => {
          //console.log('getMyPrizes');
          //alert(typeof result)
          this.myPrizes = result;
          //this.myPrizes = 11417238480;
        })
      },

      withdrawPrizes() {
        let params = {'Addr': this.getToken, 'Value': this.myPrizes};
        //this.$loadingBox(this.$t('betting.receive'), '', true);
        withdrawPrizes(params).then(result => {
          //this.$loadingBox('', '', false);
          this.$message({
            message: this.$t('betting.Received'),
            type: 'success'
          });
          this.getMyPrizes();
        })
      },

      getPrice() {
        if(this.countdownTimer){
          this.$message({
              message: this.$t('betting.lockHitszero'),
              type: 'error'
          });
        }else {
            utilsTron.withdrawUnstaked(this.getToken);
            this.$message({
                message: this.$t('betting.patient'),
                type: 'success'
            });
        }
      },
     
    },

    filters:{
      /* 时间格式化 */
      dateFormat(date) {
        let tim = parseInt(date);
        if(tim) {
          let timer = moment(tim).format("YYYY-MM-DD HH:mm:ss");
          return timer;
        }
      },

      /* 价钱格式化 */
      priceFormat(price) {
      let zhi = (price / Math.pow(10, 6)).toFixed(2);
      let arr = (zhi.split(".")[1]).substr(0,2)
      let num =  parseInt(price / Math.pow(10, 6));
        if(num>0 &&(num + '').length>3){
          return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+'.'+arr;
        }else{
          return Number(price / Math.pow(10, 6)).toFixed(2)
        }
      },
      priceFormatno(vaule) {
        if(vaule>0 &&(vaule + '').length>3){
          return ("" +vaule).replace( /\B(?=(\d{3})+$)/g, ',' );
        }else{
          return vaule;
        }
      },
      priceFormat2(value) {
        if(value>0){
        //let zhi = value.toFixed(2);
        let arr = (value.split(".")[1]).substr(0,2)
        let num =  parseInt(value);
          if(num>0 &&(num + '').length>3){
            return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+'.'+arr;
          }else{
            return Number(value).toFixed(2)
          }
        }
      },
      priceFormat3(val) {
        if(val>0){
        let zhi = val.toFixed(2);
        let arr = (zhi.split(".")[1]).substr(0,2)
        let num =  parseInt(val);
          if(num>0 &&(num + '').length>3){
            return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+'.'+arr;
          }else{
            return Number(val).toFixed(2)
          }
        }
      },
      priceFormat6(val) {
        if(val>0){
        let zhi = val.toFixed(6);
        let arr = (zhi.split(".")[1]).substr(0,6)
        let num =  parseInt(val);
          if(num>0 &&(num + '').length>3){
            return ("" +num).replace( /\B(?=(\d{3})+$)/g, ',' )+'.'+arr;
          }else{
            return Number(val).toFixed(6)
          }
        }
      },
  
    }
  }
</script>

<style lang="less">
  .payout-dialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9;
    background-color: rgba(0,0,0,.77);
    .payout-box{
      margin: auto;
      width: 600px;
      padding: 0 20px;
      margin-top: 150px;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #00E9E1;
      background:#181845;
      .header{
        display: flex;
        flex-direction: row;
        padding-top: 15px;
        justify-content: space-between;
        position: relative;
        box-sizing: border-box;
        .item{
          flex: 1;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
          font-weight: 600;
          //-webkit-background-clip: text; 
          color: #00E9E1;
          border: 1px solid #00E9E1;
          border-radius: 6px; 
          padding: 0px 8px;
          margin-right: 4px;
        }
        .active{
          background: #00E9E1;
          color: #181845;
        }
        .item:hover{
          opacity: .7;
        }
        .del-icon{
          position: absolute;
          top: -30px;
          right: -55px;
          width: 25px;
          cursor: pointer;
        }
      }

      .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px 0;
        .title{
          color: #fff;
          font-size: 9px;
          .icon{
            cursor: pointer;
            margin-top: 10px;
            color: #fff;
            font-size: 16px;
          }
        }

        .price-pot{
          border: 1px solid #fff;
          width: 50%;
          margin:  0 auto;
          padding:  6px 10px;
          border-radius: 6px; 
        }

        .payout-vaule{
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
          height: 30px;
          line-height: 30px;
          img{
            height: 25px;
            margin-right: 10px;
          }
          .odin-total{
            color: #fff;
            font-size: 9px;
          }
        }

        .odin-total{
          color: #fff;
          font-size: 9px;
        }

        .payout-count{
          padding: 10px 0px;
          margin-top: 20px;
          display: flex;
          box-sizing: border-box;
          .item{
            flex: 1;
            display: flex;
            flex-direction: row;
            padding: 5px 0;
            font-size: 12px;
            color: #00E9E1;
          }
          .right-item{
            justify-content: flex-end;
            flex: 2;
            display: flex;
            flex-direction: row;
            padding: 5px 0;
            font-size: 12px;
            color: #00E9E1;
          }
        }

        .next-payout{
          //margin-top: 20px;
          p{
            color: #fff;
            padding: 0;
            margin: 0;
          }

        }
        .pledge-content{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 20px 0px;
          .pledge-item{
            flex: 1;
            p{
              padding: 6px 0px;
              margin: 0;
              text-align: center;
              font-size: 14px;
            }
            .box{
              display: flex;
              flex-direction: row;
              border-radius: 4px;
              position: relative;
              input{
                width: 50%;
                border: none;
                padding: 0 10px;
                border: 1px solid #fff;
                color: #fff;
                margin-right: 20px;
                height: 28px;
                line-height: 28px;
                background: transparent;
                margin: 0 auto;
                text-align: center;
                border-radius: 6px; 
              }
              .active{
                background: transparent;
                border: 1px solid #a78d65;
              }
              .btn:hover{
                opacity: .7;
              }
            }
            .count-img{
              height:16px;
              margin-top: 2px;
              margin-right: 5px;
            }
            .pledge-btn{
              //width: 80%;
              margin: 0 auto;
              padding-top: 6px;
              display: flex;
              justify-content: center;
              .btn{
                width: 100px;
                height: 28px;
                background: #00E9E1;
                border-radius: 4px; 
                box-shadow: none; 
                margin-right: 6px;
                border: none;
              }
            }
          }
        }

        .pledge-index{
          display: flex;
          justify-content: center;
          align-items: center;
        }

        

        .payout-but{
          margin-top: 20px;
          .but{
            cursor: pointer;
            padding: 5px 30px;
            border-radius: 13px;
            background: #00E9E1;
            color: #181845;
          }
          .but:hover{
            opacity: .7;
          }
        }

        .payout-list-table{
          display: flex;
          flex-direction: column;
          .table-header{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px 30px;
            //background: #2a576c;
            font-size: 13px;
            .timer{
              color: #00E9E1;
              text-align: center;
              //opacity: .4;
            }
            .num{
              color: #00E9E1;
              text-align: center;
              //opacity: .4;
            }
          }
          .item{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px 30px;
            border: 1px solid #00E9E1;
            border-radius: 10px; 
            font-size: 13px;
            margin-bottom: 10px;
            .timer{
              color: #fff;
              opacity: .7;
            }
            .num{
              color: #fff;
              opacity: .7;
            }
          }
        }
      }
    }
  }

  @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }

.Rotation{
  -webkit-transform: rotate(360deg);
  animation: rotation 3s linear infinite;
  -moz-animation: rotation 3s linear infinite;
  -webkit-animation: rotation 3s linear infinite;
  -o-animation: rotation 3s linear infinite;
}

.tooltip-box{
    padding: 0 20px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .tooltip-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #00E9E1;
    border-right: 1px solid #00E9E1;
    // border-top: 1px solid #A78D65;
    border-bottom: 1px solid #00E9E1;
    color: #00E9E1;
    div{
      width: 100px;
      text-align: center;
    }
  }

  .tooltip-up{
    padding: 20px 20px 0px;
    font-size: 13px;
    color: #00E9E1;
  }

  .tooltip-item-th{
    border-top: 1px solid #00E9E1;
  }

  .tooltip-h{
    text-align: center;
    font-size: 16px;
    color: #fff;
  }

</style>
