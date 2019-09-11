<template>
  <div class='result-box'>
    <div class='result-content'>
      <div class='result-title'>
        <p class='prior-result'>{{$t('betting.Result')}}</p>
        <img class='picture' src="../../assets/imgs/title1.png" alt="">
      </div>
      <div class='content'>
        <div class='result-picture'>
          <img class='picture' src="../../assets/imgs/mase.png" alt="">
        </div>
        <div class='car'>{{$t('betting.MaseratiCar')}}</div>
        <div class='number'>{{$t('betting.LuckyNumber')}}：<span>{{luckyNumber}}</span></div>
        <div class='userName'>{{$t('betting.LuckyUser')}}：<span>{{luckyUser | addFilter}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLastTime} from '@/service/api';
export default {
  data(){
    return {
      luckyNumber: '',
      luckyUser: ''
    }
  },

  mounted(){
    this.getLastResult();
  },

  methods:{
      getLastResult(){
        getLastTime().then(res =>{
          this.luckyNumber = res.resultNum;
          this.luckyUser = res.prizeAddr;
        })
      }
  },

  filters: {
        priceFormat(vaule) {
            if (vaule == undefined) {
            return "";
            }
            return parseInt(vaule / Math.pow(10, 6));
        },

        addFilter(vaule) {
            if (vaule == undefined) {
                return "";
            }
            if(vaule.length>12){
                return vaule.substr(0,5) + '...' + vaule.substr(vaule.length-5, vaule.length);
            }
        }
    }
}
</script>

<style lang='less' scoped>
  .result-box{
    width: 100%;
    height: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
    margin-top: 20px;
    .result-content{
      .result-title{
        box-sizing: border-box;
        position: relative;
        .prior-result{
          position: absolute;
          left: 50%;
          bottom:5px;
          transform: translateX(-50%);
          color: #fff;
          font-size: 14px;
        }
        .picture{
          display: block;
          margin: 0 auto;
          width: 100%;
        }
      }
      .content{
        padding: 40px 0px 10px;
        border: 1px solid #039074;
        border-top: 0px; 
        border-radius: 0px 0px 10px 10px;
        .result-picture{
          .picture{
            margin: 0 auto;
            display: block;
            width: 50%;
          }
        }
        .car{
          font-size: 22px;
          color: #EEAF2E;
          padding: 10px 0px;
          text-align: center;
        }
        .number{
          font-size: 18px;
          color: #0CD584;
          text-align: center;
        }
        .userName{
          font-size: 18px;
          color: #FFFFFF;
          text-align: center;
          padding: 10px 0px;
        }
      }
    }
  }
</style>
