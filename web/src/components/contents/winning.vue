<template>
  <div class='winning-box'>
    <div class='winning-title'>
      <p class='winning-number' >{{$t('betting.LotteryNumber')}}</p>
      <el-tooltip  effect="dark" placement="right">
        <div slot="content" style='width:230px;'>{{$t('betting.Randomly')}}</div>
        <el-button style='background: transparent;border:0px;'><p class='winning-detail'>?</p></el-button>
      </el-tooltip>
    </div>
    <div class='winning-content'>
      <div class='winning-picture'>
        <img v-if="num1==''" src="../../assets/imgs/kapai2.png" alt="">
        <img v-else src="../../assets/imgs/bgNum.png" alt="">
        <span class="zjStyle" >{{num1}}</span>
      </div>

      <div class='winning-picture'>
        <img v-if="num2==''" src="../../assets/imgs/kapai2.png" alt="">
        <img v-else src="../../assets/imgs/bgNum.png" alt="">
        <span class="zjStyle" >{{num2}}</span>
      </div>

      <div class='winning-picture'>
        <img v-if="num3==''" src="../../assets/imgs/kapai2.png" alt="">
        <img v-else src="../../assets/imgs/bgNum.png" alt="">
        <span class="zjStyle" >{{num3}}</span>
      </div>

      <div class='winning-picture'>
        <img v-if="num4==''" src="../../assets/imgs/kapai2.png" alt="">
        <img v-else src="../../assets/imgs/bgNum.png" alt="">
        <span class="zjStyle" >{{num4}}</span>
      </div>

      <div class='winning-picture'>
        <img v-if="num5==''" src="../../assets/imgs/kapai2.png" alt="">
        <img v-else src="../../assets/imgs/bgNum.png" alt="">
        <span class="zjStyle" >{{num5}}</span>
      </div>

      <div class='winning-picture'>
        <img v-if="num6==''" src="../../assets/imgs/kapai2.png" alt="">
        <img v-else src="../../assets/imgs/bgNum.png" alt="">
        <span id="zt" class="zjStyle" >{{num6}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getLotteryResult} from '@/service/api';
export default {
  data(){
    return {
      //content:this.$t('betting.Randomly'),
      num1:'',
      num2:'',
      num3:'',
      num4:'',
      num5:'',
      num6:'',
    }
  },
  methods:{
    initData(){
      setInterval(() => {
        this.getLotteryResultInfo()
      }, 10000);
    },
    //开奖结果
    getLotteryResultInfo(){
      /*let _this = this
      getLotteryResult().then(res =>{ //xxxxxx
        //res = '000533'
        let numA = res.substring(0,1)
        let numB = res.substring(1,2)
        let numC = res.substring(2,3)
        let numD = res.substring(3,4)
        let numE = res.substring(4,5)
        let numF = res.substring(5,6)
        if(numF!='x'){this.num6= numF}
        if(numE!='x'){this.num5= numE}
        if(numD!='x'){this.num4= numD}
        if(numC!='x'){this.num3= numC}
        if(numB!='x'){this.num2= numB}
        if(numA!='x'){this.num1= numA}
      })
      // console.log('num1:===>',this.num1);
      // console.log('num6:===>',this.num6);
      */
    }

  },
  mounted(){
    this.initData();
    this.getLotteryResultInfo()
    
  },
}
</script>

<style lang='less' scoped>
    .winning-box{
      width: 980px;
      //height: 100%;
      margin: 0 auto;
      .winning-title{
        display: flex;
        justify-content: center;
        align-items: center;
        .winning-number{
          color: #fff;
          font-size: 20px;
          padding: 0px 10px;
        }
        .winning-detail{
          height: 18px;
          width: 18px;
          line-height: 18px;
          border:1px solid #039074;
          border-radius: 50%;
          color: #039074;
          cursor: pointer;
          text-align: center;
        }
      }

      .winning-content{
        display: flex;
        margin: 0 30px;
        .winning-picture{
          position: relative;
          flex:1;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .zjStyle{
      position: absolute;
      top: 45px;
      left: 56px;
      color: #039074;
      font-size: 80px;
    }
  .atooltip{
      background: #e4f0f0 !important;
    }
    
</style>
