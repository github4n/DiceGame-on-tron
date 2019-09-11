<template>
  <div class='app-winning-box'>
    <!-- <div class='ticket'>{{$t('betting.MyTicket')}}</div> -->
    <div class='winning-title'>
      <div style='width:60px;'></div>
      <p class='winning-number'>{{$t('betting.LotteryNumber')}}</p>
      <el-tooltip effect="dark" :content="content" placement="left">
        <el-button style='background: transparent;border:0px;'><p class='winning-detail'>?</p></el-button>
      </el-tooltip>
    </div>
    <div class='winning-content'>
      <div class='picture-box'>
        <div class='winning-picture'>
          <img v-show='!showNum1' class='picture' src="../../assets/imgs/kapai1.png" alt="">
          <img v-show='showNum1'  class='picture' src="../../assets/imgs/kapai2.png" alt="">
          <p v-show='!showNum1' class='number'>{{num1}}</p>
        </div>

        <div class='winning-picture'>
          <img v-show='!showNum2' class='picture' src="../../assets/imgs/kapai1.png" alt="">
          <img v-show='showNum2' class='picture' src="../../assets/imgs/kapai2.png" alt="">
          <p v-show='!showNum2' class='number'>{{num2}}</p>
        </div>

        <div class='winning-picture'>
          <img v-show='!showNum3' class='picture' src="../../assets/imgs/kapai1.png" alt="">
          <img v-show='showNum3' class='picture' src="../../assets/imgs/kapai2.png" alt="">
          <p v-show='!showNum3' class='number'>{{num3}}</p>
        </div>

        <div class='winning-picture'>
          <img v-show='!showNum4' class='picture' src="../../assets/imgs/kapai1.png" alt="">
          <img v-show='showNum4' class='picture' src="../../assets/imgs/kapai2.png" alt="">
          <p v-show='!showNum4' class='number'>{{num4}}</p>
        </div>

        <div class='winning-picture'>
          <img v-show='!showNum5' class='picture' src="../../assets/imgs/kapai1.png" alt="">
          <img v-show='showNum5' class='picture' src="../../assets/imgs/kapai2.png" alt="">
          <p v-show='!showNum5' class='number'>{{num5}}</p>
        </div>

        <div class='winning-picture'>
          <img v-show='!showNum6' class='picture' src="../../assets/imgs/kapai1.png" alt="">
          <img v-show='showNum6' class='picture' src="../../assets/imgs/kapai2.png" alt="">
          <p v-show='!showNum6' class='number'>{{num6}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLotteryResult} from '@/service/api';
export default {
  data(){
    return {
      content:this.$t('betting.Randomly'),
      num1:'',
      num2:'',
      num3:'',
      num4:'',
      num5:'',
      num6:'',
      showNum1: true,
      showNum2: true,
      showNum3: true,
      showNum4: true,
      showNum5: true,
      showNum6: true,
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
      let _this = this
      getLotteryResult().then(res =>{ //xxxxxx
        //res = '000533'
        let numA = res.substring(0,1)
        let numB = res.substring(1,2)
        let numC = res.substring(2,3)
        let numD = res.substring(3,4)
        let numE = res.substring(4,5)
        let numF = res.substring(5,6)
        if(numF!='x'){
          this.showNum1 = false;
          this.num6= numF;
        }
        if(numE!='x'){
          this.showNum2 = false;
          this.num5= numE;
        }
        if(numD!='x'){
          this.showNum3 = false;
          this.num4= numD;
        }
        if(numC!='x'){
          this.showNum4 = false;
          this.num3= numC;
        }
        if(numB!='x'){
          this.showNum5 = false;
          this.num2= numB;
        }
        if(numA!='x'){
          this.showNum6 = false;
          this.num1= numA;
        }
      })
      // console.log('num1:===>',this.num1);
      // console.log('num6:===>',this.num6);
      
    }

  },
  mounted(){
    this.initData();
    this.getLotteryResultInfo()
    
  },
}  
</script>

<style lang='less' scoped>
    .app-winning-box{
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0px 20px;
      box-sizing: border-box;
      .ticket{
        color: #EEAF2E;
        border: 1px solid #EEAF2E;
        width: 150px;
        padding: 6px 20px;
        margin: 20px auto 15px;
        border-radius: 20px; 
      }
      .winning-title{
        display: flex;
        justify-content: space-between;
        height: 60px;
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
        //margin: 0 30px;
        display: flex;
        // align-items: center;
        // justify-content: space-between;
        box-sizing: border-box;
        .picture-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .winning-picture{
            flex:1;
            position: relative;
            justify-content: center;
            align-items: center;
            .picture{
              width: 50px;
            }
            .number{
              position: absolute;
              color: #039074;
              font-size: 30px;
              top: 0;
              left: 50%;
              transform: translate(-50%,-43%)
            } 
          }
        }
      }
    }
</style>
