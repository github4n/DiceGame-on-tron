<template>
  <div class='app-progress-box'>
    <div class='progress-picture'>
      <div class='picture-box'>
        <img v-if="currentTickets >0 &&  currentTickets < 3201"  style='width:50px;' src="../../assets/imgs/icon1_in.png" alt="">
        <img v-else-if='currentTickets == 0 || currentTickets >6401' style='width:50px;' src="../../assets/imgs/icon1_small.png" alt="">
        <img v-else-if="currentTickets >= 3201 && currentTickets <= 6400" style='width:60px;' src="../../assets/imgs/icon1_small.png" alt="">
        <div class='price'><div>408,888TRX</div></div>
      </div>
      <div class='picture-box'>
        <img v-if='currentTickets < 3201 || currentTickets > 12001'  style='width:50px;' src="../../assets/imgs/icon2_small.png" alt="">
        <img v-else-if="currentTickets >= 6401 && currentTickets <= 12000" style='width:60px;' src="../../assets/imgs/icon2_small.png" alt="">
        <img v-else-if="currentTickets >=3201 &&  currentTickets < 6401" style='width:50px;' src="../../assets/imgs/icon2_in.png" alt="">
        <div class='price'><div>828,888TRX</div></div>
      </div>
      <div class='picture-box'>
        <img v-if="currentTickets >= 6401 && currentTickets < 12001" style='width:50px;' src="../../assets/imgs/icon3_in.png" alt="">
        <img v-else-if='currentTickets < 12001 || currentTickets > 31500' style='width:50px;' src="../../assets/imgs/icon3_small.png" alt="">
        <img v-else-if="currentTickets >= 12001 && currentTickets <= 31500" style='width:60px;' src="../../assets/imgs/icon3_small.png" alt="">
        <div class='price'><div>1,566,666TRX</div></div>
      </div>
      <div class='picture-box'>
        <img v-if="currentTickets >= 12001 && currentTickets < 31507" style='width:50px;' src="../../assets/imgs/icon4_in.png" alt="">
        <img v-else-if='currentTickets <31507 || currentTickets > 77500' style='width:50px;' src="../../assets/imgs/icon4_small.png" alt="">
        <img v-else-if="currentTickets >= 31507 && currentTickets <= 77500" style='width:60px;' src="../../assets/imgs/icon4_small.png" alt="">
        <div class='price'><div>4,066,666TRX</div></div>
      </div>
      <div class='picture-box'>
        <img v-if="currentTickets >= 31507 && currentTickets < 77500" style='width:50px;' src="../../assets/imgs/icon5_in.png" alt="">
        <img v-else-if='currentTickets < 77500'  style='width:50px;' src="../../assets/imgs/icon5_small.png" alt="">
        <img v-else-if="currentTickets >= 77500" style='width:60px;' src="../../assets/imgs/icon5_small.png" alt="">
        <div class='price'><div>10,000,000TRX</div></div>
      </div>
    </div>

    <div class='progress-content'>
      <el-progress :text-inside="true" :stroke-width="8" :percentage="100" color="#065446"></el-progress>
      <div class='progress-back'><img class='back-img' src="../../assets/imgs/jindutioa.png"></div>
      <div class='coupons' style='font-size:8px;color:#fff;text-align:right;'><p style='position:relative;left:16px;'>{{coupons}}%</p></div>
      <div class='progress-list'>
        <div v-if='currentTickets == 0' class='progress-circle circle1'></div>
        <div v-else-if="currentTickets > 0" class='progress-circle1 circle1'><div class='circle-center1'></div></div>
        <div v-if='currentTickets == 0 || currentTickets < 3201' class='progress-circle circle2'></div>
        <div v-else-if="currentTickets >= 3201" class='progress-circle1 circle2'><div class='circle-center1'></div></div>
        <div v-if='currentTickets == 0 || currentTickets < 6401' class='progress-circle circle3'></div>
        <div v-else-if="currentTickets >= 6401" class='progress-circle1 circle3'><div class='circle-center1'></div></div>
        <div v-if='currentTickets == 0 || currentTickets < 12001' class='progress-circle circle4'></div>
        <div v-else-if="currentTickets >= 12001" class='progress-circle1 circle4'><div class='circle-center1'></div></div>
        <div v-if='currentTickets == 0 || currentTickets < 31501' class='progress-circle circle5'></div>
        <div v-else-if="currentTickets >= 31501" class='progress-circle1 circle5'><div class='circle-center1'></div></div>
        <div v-if='currentTickets == 0 || currentTickets <77500' class='progress-circle circle6'></div>
        <div v-else-if="currentTickets >= 77500" class='progress-circle1 circle6'><div class='circle-center1'></div></div>
      </div>
    </div>

    <div class='price-value'>
      <div class='value'>3,200{{$t('betting.copies')}}</div>
      <div class='value'>6,400{{$t('betting.copies')}}</div>
      <div class='value'>12,000{{$t('betting.copies')}}</div>
      <div class='value'>31500{{$t('betting.copies')}}</div>
      <div class='value'>77500{{$t('betting.copies')}}</div>
    </div>

    <div class='total-pool'> 
      <div class='total'>
        <span>{{$t('betting.TotalLottery')}}：</span><span>{{currentTickets}}</span>
      </div>
    </div>
    <div class='exchange-coupons'>
      <div class='exchange1'>
        <a style='color:#fff;text-decoration: none;' href="#buy">{{$t('betting.Buy')}}</a>
      </div>
      <div class='exchange2'>
        <a style='color:#039074;text-decoration: none;' href="#myTickets">{{$t('betting.MyTicket')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getLotteryTicketInfo} from '@/service/api';

export default {
  data(){
    return {
      totalTickets: '',
      currentTickets: '',
      coupons: ''
    }
  },

  mounted(){
    this.getLotteryTicketInfo();
  },

  methods:{
    getLotteryTicketInfo(){
      getLotteryTicketInfo().then(res =>{
        this.totalTickets = parseInt(res.totalBetWeekly);
        this.currentTickets = parseInt(res.ticketCount);
        this.getPercentage();
      });
    },

    getPercentage(){
      let progressW = parseInt($('.progress-content').css('width'));
      if(this.currentTickets < 3201){
        let backW = (progressW*0.2);
        let couponsW = (progressW*0.1);
        let imgW = ((this.currentTickets/3200)*backW);
        this.coupons = parseFloat(((this.currentTickets/3200*100))).toFixed(2);
        $('.progress-back').css('width',backW)
        $('.back-img').css('width',imgW)
        $('.coupons').css('width',couponsW)
      }else if(this.currentTickets >= 3201 && this.currentTickets < 6401){
        let backW = (progressW*0.4);
        let couponsW = (progressW*0.3);
        let backW1 = (progressW*0.2);
        let imgW = (((this.currentTickets-3200)/(6400-3200))*backW1)+backW1;
        this.coupons = parseFloat((((this.currentTickets-3200)/(6400-3200)*100))).toFixed(2);
        $('.progress-back').css('width',backW)
        $('.back-img').css('width',imgW)
        $('.coupons').css('width',couponsW)
      }else if(this.currentTickets >= 6401 && this.currentTickets < 12001){
        let backW = (progressW*0.6);
        let couponsW = (progressW*0.5);
        let backW1 = (progressW*0.2);
        let backW2 = (progressW*0.4);
        let imgW = (((this.currentTickets-6400)/(12000-6400))*backW1)+backW2;
        this.coupons = parseFloat((((this.currentTickets-6400)/(12000-6400)*100))).toFixed(2);
        $('.progress-back').css('width',backW)
        $('.back-img').css('width',imgW)
        $('.coupons').css('width',couponsW)
      }else if(this.currentTickets >= 12001 && this.currentTickets < 31501){
        let backW = (progressW*0.8);
        let couponsW = (progressW*0.7);
        let backW1 = (progressW*0.2);
        let backW2 = (progressW*0.6);
        let imgW = (((this.currentTickets-12000)/(31500-12000))*backW1)+backW2;
        this.coupons = parseFloat((((this.currentTickets-12000)/(31500-12000)*100))).toFixed(2);
        $('.progress-back').css('width',backW)
        $('.back-img').css('width',imgW)
        $('.coupons').css('width',couponsW)
      }else if(this.currentTickets >= 31501){
        let backW = (progressW*1);
        let couponsW = (progressW*0.9);
        let backW1 = (progressW*0.2);
        let backW2 = (progressW*0.8);
        let imgW = (((this.currentTickets-31500)/(77500-31500))*backW1)+backW2;
        this.coupons = parseFloat((((this.currentTickets-31500)/(77500-31500)*100))).toFixed(2);
        $('.progress-back').css('width',backW)
        $('.back-img').css('width',imgW)
        $('.coupons').css('width',couponsW)
      }
    }
  }
}
</script>

<style lang='less'>
  .el-progress-bar__innerText{
    color: #065446;
    
  }
  .app-progress-box{
    width: 100%;
    margin: 0 auto;
    padding: 10px 10px;
    box-sizing: border-box;
    .progress-picture{
      display: flex;
      padding: 10px 0px;
      align-items: flex-end;
      .picture-box{
        flex:1;
        display: flex;
        align-items: center;
        flex-direction: column;
        align-content: space-between;
        .price{
          color: #fff;
          font-size: 8px;
          border: 1px solid #039074;
          padding: 2px 4px;
          border-radius: 20px;
          background: #039074;
          margin-top: 10px;
        }
      }
    }
    .price-value{
      display: flex;
      .value{
        flex: 1;
        color: #0CD584;
        font-size: 8px;
        text-align: center;
      }
    }

    .total-pool{
      padding: 10px 0px 0px;
      .total{
        color: #fff;
        font-size: 18px;
        text-align: center;
      }
    }

    .exchange-coupons{
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .exchange1{
        color: #fff;
        font-size: 12px;
        text-align: center;
        padding: 3px 30px;
        border-radius: 20px;
        background: #039074;
        height: 20px;
        line-height: 20px;
      }
      .exchange2{
        background: #fff;
        color: #039074;
        font-size: 12px;
        border: 1px solid #039074;
        text-align: center;
        padding: 3px 30px;
        border-radius: 20px;
        height: 20px;
        line-height: 20px;

      }
    }

    .message{
      text-align: left;
      color: #039074;
    }

    .progress-content{
      width: 100%;
      margin: 0 auto;
      padding: 9px 0px;
      position: relative;
      box-sizing: border-box;

      .progress-back{
        //width: 0%;
        background: #039074;
        height: 8px;
        display: flex;
        align-items: center;
        position: relative;
        top: -10px;
        .back-img{
          height: 8px;
          //width: 0%;
        }
      }
      
      .progress-circle{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        //background: #ffff;
        background: #065446;
      }
      .progress-circle1{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        //background: #ffff;
        background: #879998;
        display: flex;
        justify-content: center;
        align-items: center;
        .circle-center1{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
        }
      }
      .circle1{
        position: absolute;
        left: 0;
        top: 0;
        transform:translate(-50%,50%);
      }
      .circle2{
        position: absolute;
        left: 20%;
        top: 0;
        transform:translate(-50%,50%);
      }
      .circle3{
        position: absolute;
        left: 40%;
        top: 0;
        transform:translate(-50%,50%);
      }
      .circle4{
        position: absolute;
        left: 60%;
        top: 0;
        transform:translate(-50%,50%);
      }
      .circle5{
        position: absolute;
        left: 80%;
        top: 0;
        transform:translate(-50%,50%);
      }
      .circle6{
        position: absolute;
        left: 100%;
        top: 0;
        transform:translate(-50%,50%);
      }
    }
  }
</style>
