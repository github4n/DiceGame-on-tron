<template>
  <div class='app-reward'>  
    <div class='reward'>
      <div class='reward-content'>
        <div class='total-reward'>
          <p class='reward-iteam'>{{$t('betting.totalDividends')}}</p>
          <p v-if="prizePot1>0" class='reward-price'>{{prizePot1.replace( /\B(?=(\d{3})+$)/g, ',' )}} <span style='font-size:16px;margin-left:4px;'> TRX</span></p>
          <p v-else class='reward-price'>{{prizePot1}} <span style='font-size:16px;margin-left:4px;'> TRX</span></p>
        </div>
        <div class='total-reward'>
          <p class='reward-iteam'>{{$t('betting.totalBuyBack')}}</p>
          <p v-if="buybackPrice>0" class='reward-price'>{{buybackPrice.replace( /\B(?=(\d{3})+$)/g, ',' )}} <span style='font-size:16px;margin-left:4px;'> TRX</span></p>
          <p v-else class='reward-price'>{{buybackPrice}} <span style='font-size:16px;margin-left:4px;'> TRX</span></p>
        </div>
      </div>

      <!-- <div v-if='!isLogin' class='reward-content'>  
        <div class='total-reward'>
          <p class='reward-iteam'>{{$t('betting.totalDividends')}}</p>
          <p style='color:#00E9E1;'>{{$t('betting.loginReward')}}</p>
        </div>
      </div> -->
       
      <div class='reward-clock' >
        <img class='reward-img' src="@/assets/img/icon20.png" alt="">
        {{$t('betting.shutdown')}}: {{luckPrizeCountdown}}
      </div>
    </div>
  </div>
</template>

<script>
import { getShareAmtTotal,  getNextDividendTime, getPrizePot } from '@/service/api';
import utilsTron from '@/utilsTron';
import utils from '@/utils';

export default {
  data(){
    return {
      shareAmtTotal: '',
      remainingTime: '',
      timer: '',
      luckPrizeCountdown: '',
      payoutEndTimer: '',

      prizePot1: 0,
      buybackPrice: 0,
      timer1: '',
      timer2: '',
    }
  },

  computed:{
    'isLogin': function() {
      return this.$store.getters.IS_USER_LOGIN;
    },
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

  mounted(){
    this.getShareAmtTotal();//获取总分红
    this.getNextDividendTime();
    this.getPrizePotRandom();
  },

  methods:{
    getPrizePotRandom(){
        let that = this;
        this.timer1 = setInterval(function(){
          that.prizePot1 = parseFloat((that.$store.getters.GET_PRIZEPOT_ANIMATE + that.shareAmtTotal)).toFixed(0);
          that.buybackPrice = parseFloat((that.$store.getters.GET_PRIZEPOT_ANIMATE + that.shareAmtTotal) / 5).toFixed(0);
        },250);
    },

    /* 获取总分红 */ 
    getShareAmtTotal(){
      let that = this;
      setInterval(function(){
        getShareAmtTotal().then(res =>{
          that.shareAmtTotal = (parseInt(res)/1000000);
        })
      },3000);
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
  },

  filters:{
    priceFormat(vaule) {
      if (vaule == undefined) {
        return "";
      }
      return parseInt(vaule / Math.pow(10, 6));
    },
  }
}
</script>

<style lang='less' scoped>
    .app-reward{
     width: 100%;
     padding: 0px 10px 10px 10px;
     box-sizing: border-box;
      .reward{
        .reward-content{
          display: flex;
          justify-content: center;
          align-items: center;
          .total-reward{
            padding: 0px 20px;
            .reward-iteam{
              color: #fff;
              font-size: 12px;
              text-align: center;
              margin: 0px;
              padding: 30px 0px 6px;
            }

            .reward-price{
              font-size: 30px;
              color: #00E9E1;
              margin: 0px;
              padding: 6px 0px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }

        .reward-clock{
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 14px;
          .reward-img{
            margin-right: 10px;
            width: 15px;
            padding:6px 0px; 
          }
        }
      }
    }
</style>

