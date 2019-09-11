<template>
  <div class='container'>
    <div class='share'>
      <div class='share-content'>
        <div class='contents'>
          <div class='total-item'>
            <p class='share-iteam'>{{$t('betting.totalDividends')}}</p>
            <p class='share-iteam first-total'>
              <span style='font-size:50px;color:#00E9E1;font-weight:700;'>{{prizePot1 | priceFormat}}</span>
              <span style='color:#00E9E1;margin-left:4px;'> TRX</span>
            </p>
          </div>
          <div  class='total-item'>
            <p class='share-iteam'>{{$t('betting.totalBuyBack')}}</p>
            <p class='share-iteam'>
              <span style='font-size:50px;color:#00E9E1;font-weight:700;'>{{buybackPrice | priceFormat}}</span>
              <span style='color:#00E9E1;margin-left:4px;'> TRX</span>
            </p>
          </div>

          <!-- <div v-if='!isLogin'  class='total-item'>
            <p class='share-iteam'>{{$t('betting.totalDividends')}}</p>
            <p  style='color:#00E9E1; font-size:30px;'>{{$t('betting.loginReward')}}</p>
          </div> -->
        </div>

        <div class='share-clock' >
          <img class='clock-img' src="@/assets/img/icon20.png" alt="">
          {{$t('betting.shutdown')}}: {{luckPrizeCountdown}}
        </div>
      </div>
    </div>

    <div class='container-box'>
      <div class='content'>
        <div class='content-top'>
          <div class='picture-link'>
            <router-link :to="{ path: '/dice' ,query:{from:fromAdd}}" style='text-decoration: none;'>
              <div class='picture-list'>
                <img class='picture' src="@/assets/img/icon21.png" alt="">
              </div>
              <p class='piccture-explain'>{{$t('betting.Dice')}}</p>
            </router-link>
          </div>
        </div>

        <div  class='content-top'>
          <div class='picture-link'>
            <router-link :to="{ path: '/ring' ,query:{from:fromAdd}}" style='text-decoration: none;'>
              <div class='picture-list' style='padding:32px 0px;'>
                <img class='picture' style='width: 56px;' src="@/assets/img/icon22.png" alt="">
              </div>
              <p class='piccture-explain'>{{$t('betting.RotaryTable')}}</p>
            </router-link>
          </div>
        </div>

        <div  class='content-top' style='margin-right: 0px;'>
          <div class='picture-link'>
            <div class='picture-list' style='padding:0px 0px;'>
              <el-tooltip class="item" effect="dark"   placement="top-start">
                <div slot="content" style='width: 270px;'>{{$t('betting.tooltip')}}</div>
                <div style='width: 100%; padding:32px 0px;'>
                  <img style='margin: 0 auto;width: 56px;' class='picture' src="@/assets/img/icon23.png" alt="">
                </div>
              </el-tooltip>
            </div>
            <p class='piccture-explain'>COMING SOON</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  getShareAmtTotal, getNextDividendTime, getMyPrizes, getPrizePot } from '@/service/api';
import utilsTron from '@/utilsTron';
import utils from '@/utils';

export default {

  data(){
    return {
  
      baseStepUrl: 'https://www.tronoscar.pro/dice/',
      diceLink: 'https://www.tronoscar.pro/dice/', // dice游戏地址
      ringLink: 'https://www.tronoscar.pro/ring/', // 轮盘游戏地址
      treeLink: 'https://www.tronoscar.pro/tree/', // 铁塔游戏地址

      shareAmtTotal: '',
      remainingTime: '',
      timer: '',
      luckPrizeCountdown: '',
      payoutEndTimer: '',

      prizePot1: 0,
      buybackPrice: 0,
      bonusPrice: 0,
      timer1: '',
      timer2: '',

      myPrizes: 0,
      fromAdd: '',
      

      contents: this.$t('betting.tooltip'),//chen
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

  computed:{
    'isLogin': function() {
      return this.$store.getters.IS_USER_LOGIN;
    },
  },

  mounted() {
    this.getShareAmtTotal();//获取总分红
    this.getNextDividendTime();
    this.initStepUrl();
    this.getPrizePotRandom();
    this.getMyPrizes();
  },

  methods: {
    getPrizePotRandom(){
        let that = this;
        this.timer1 = setInterval(function(){
          that.prizePot1 = parseFloat((that.$store.getters.GET_PRIZEPOT_ANIMATE + that.shareAmtTotal)).toFixed(0);
          that.buybackPrice = parseFloat((that.$store.getters.GET_PRIZEPOT_ANIMATE + that.shareAmtTotal) / 5).toFixed(0);
        },250);
    },

    getMyPrizes() {
        let that = this;
        setInterval(function(){
            let params = {'Addr': that.$store.getters.GET_TOKEN};
            getMyPrizes(params).then(result => {
                that.myPrizes = result;
            })
        },3000);
    },

    initStepUrl() {
      this.fromAdd = this.$route.query.from;
      if(this.fromAdd) {
        this.diceLink = this.diceLink + '?from=' + this.fromAdd;
        this.ringLink = this.ringLink + '?from=' + this.fromAdd;
        this.treeLink = this.treeLink + '?from=' + this.fromAdd;
      }
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
      if(vaule>0 &&(vaule + '').length>3){
        return ("" +vaule).replace( /\B(?=(\d{3})+$)/g, ',' );
      }else{
        return vaule;
      }
    },
  }
}
</script>

<style lang='less'>
  .container{
      width: 100%;
      height: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 0px 0px 50px;
      position: relative;
      .container-box{
        width: 100%;
        .content{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          @media screen and (max-width: 1440px) and (min-width: 992px) {
            .content-top{
              width: 300px;
              box-sizing: border-box;
              margin-right: 60px;
              .picture-link{
                width: 100%;
                border-radius: 10px;
                box-sizing: border-box;
                cursor: pointer;
                margin: auto;
                .picture-list{
                  width: 100%;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid #00E9E1;
                  padding: 25px 0px;
                  border-radius: 10px; 
                  .picture{
                    display: block;
                    width: 70px;
                  }
                }
                .piccture-explain{
                  line-height: 33px;
                  font-size: 24px;
                  text-align: center;
                  color: #00E9E1;
                  padding: none;
                  margin: 0;
                  padding: 10px 0px;
                }
              }
            }
          }
         
          @media screen and (max-width: 3000px) and (min-width: 1440px) {
            .content-top{
              width: 360px;
              height: 136px;
              box-sizing: border-box;
              .picture-link{
                border-radius: 10px;
                box-sizing: border-box;
                cursor: pointer;
                margin: auto;
                .picture-list{
                  width: 100%;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid #00E9E1;
                  padding: 25px 0px;
                  border-radius: 10px; 
                  .picture{
                    display: block;
                    width: 70px;
                  }
                }
                .piccture-explain{
                  line-height: 33px;
                  font-size: 24px;
                  text-align: center;
                  color: #00E9E1;
                  padding: none;
                  margin: 0;
                  padding: 10px 0px;
                }
              }
            }
          }
        }
      }

      .share{
        width: 100%;
        box-sizing: border-box;
        padding: 30px 0px 40px;
        .share-content{
          .contents{
            display: flex;
            justify-content: center;

            .share-iteam{
              font-size: 16px;
              color: #fff;
              margin: 0px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0px 20px;
            }
          }
          .share-clock{
            font-size: 22px;
            color: #fff;
            padding: 10px;
            .clock-img{
              position: relative;
              top:5px;
              margin-right: 6px;
              width: 20px;
            }
          }
        }
      }
  }
</style>
