<template>
  <div class='rules-box'>
    <div class="divCalss" v-show="result">
        <a style="color:#fff;font-size:24px;">{{$t('betting.Result')}}</a><br/>
        <div style="height:300px;line-height: 26px;margin-top:-40px">
            <img src="@/assets/imgs/car.png" alt="">
            <p style="color:#EEAF2E;font-size:24px;">{{$t('betting.MaseratiCar')}}</p>
            <p style="color:#0CD584;font-size:24px;">{{$t('betting.LuckyNumber')}}：{{zjyh.resultNum}}</p>
            <p style="color:#FFFFFF;font-size:24px;">{{$t('betting.LuckyUser')}}：{{zjyh.prizeAddr}}</p>
        </div> 
    </div>
  </div>
</template>

<script>
import { getLastTime} from '@/service/api';
export default {
  data(){
    return {
        result:false,
        zjyh:{}
    }
  },
  mounted(){
      this.getLastTimeInfo()
  },
  methods:{
      getLastTimeInfo(){
        /*getLastTime().then(res =>{
            if (Object.keys(res).length === 0) {
                return false // 如果为空,返回false
            }else{
                if(res.resultNum==='xxxxxx'|| res.prizeAddr==''){
                    return false;
                }else{
                    this.zjyh = res // {resultNum : '000222',totalTicketCount : 1212311,prizeAddr : 'dddddddddd'}
                    this.result = true;
                }
            }
        })*/
      }
  }
}
</script>

<style lang='less'>
    .rules-box{
        width: 980px;
        margin: 22px auto;
        .divCalss{
            background: url(../../assets/imgs/border.png) no-repeat;
            height: 520px;
            width: 920px;
            line-height: 261px;
            margin: 0 auto;
        }
    }

    .winning-box .winning-title .winning-detail {
        margin: -1px 0;
    }
</style>
