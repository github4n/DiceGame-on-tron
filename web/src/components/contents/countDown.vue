<template>
  <div class='count-box'>
    <div class='count-content'>
      <div class='count-title'>{{$t('betting.LotteryCountdown')}}</div>
      <div class='count-down'>
        <div class='count-picture1'> 
          <img class='count-img1' src="../../assets/imgs/daojishi.png" alt="">
        </div>
       <!--  <p class='message'> -->
         <div style="display: flex;line-height: 66px;">
          <div align="center" class="lottery"><span class="date">{{maseratiDay}}</span></div><!-- {{maseratiDay}} -->
          <div align="center" class="lottery"><span class="date">{{maseratiTime}}</span></div><!-- {{maseratiTime}} -->
          <div align="center" class="lotteryTwo"><span class="dateTime">{{maseratiFen}}</span></div><!-- {{maseratiFen}} -->
          <div align="center" class="lotteryTwo"><span class="dateTime">{{maseratiMiao}}</span></div><!-- {{maseratiMiao}} -->
        </div>
         <!--  {{maseratiCountdown}} -->
          <!-- </p>  -->
        <div class='count-picture2'>
          <img class='count-img2' src="../../assets/imgs/daojishi.png" alt="">
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { getLotteryTicketInfo} from '@/service/api';
import utils from '../../utils';
export default { 
  data(){
    return {
      maseratiEndTime:'',
      maseratiRemainingTime:'',
      maseratiDay:'',
      maseratiTime:'',
      maseratiFen:'',
      maseratiMiao:'',
      maseratiTimer:'',
    }
  },
  watch: {

    maseratiRemainingTime(newVal, oldVal){
        this.maseratiDay = utils.translateTimeDate1(this.maseratiRemainingTime);
        this.maseratiTime = utils.translateTimeDate2(this.maseratiRemainingTime);
        this.maseratiFen = utils.translateTimeDate3(this.maseratiRemainingTime);
        this.maseratiMiao = utils.translateTimeDate4(this.maseratiRemainingTime); 
       
        if(this.maseratiRemainingTime == 0){
            clearTimeout(this.maseratiTimer);
            this.maseratiTimer = '';
            return;
        }
        this.maseratiTimer = setTimeout(() => {
            this.maseratiRemainingTime--;
        },1000);
    }
  },
  mounted(){
     this.getLotteryTicketInfoList();
  },
  methods:{
   
       /* 获取倒计时 */
      getLotteryTicketInfoList(){
          /*getLotteryTicketInfo().then(res =>{
              this.maseratiEndTime = res.endTime;
              if(this.maseratiEndTime > 0){
                  if(null != this.maseratiTimer && this.maseratiTimer != ""){

                  }else {
                      this.initMaseratiCountDown();
                  }
              }
          })*/
      },
      /* 对获取倒计时时间的处理 */
      initMaseratiCountDown(){
          let localSecon = parseInt(this.timest());
          let serviceSecon = this.maseratiEndTime / 1000;
          if(localSecon < serviceSecon) {
              this.maseratiRemainingTime = serviceSecon - localSecon; // 还剩余多长时间
              this.maseratiRemainingTime--;
          }else{
            this.maseratiRemainingTime = 0;
          }
      },
      //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数 获取本地的秒数
      timest() {
          var tmp = Date.parse( new Date() ).toString();
          tmp = tmp.substr(0,10);
          return tmp;
      },
  }
}
</script>

<style lang='less' scoped>
    .count-box{
      width: 980px;
      margin: 0 auto;
      .count-content{
        .count-title{
          color: #fff;
          font-size: 21px;
          padding: 20px 0px;
        }
        .count-down{
          display: flex;
          justify-content: center;
          .count-picture1{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 20px;
            .count-img{
              display: block;
              margin: auto;
            }
          }
          .count-picture2{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 20px;
            .count-img2{
              display: block;
              margin: auto;
              -ms-transform:rotate(180deg); 	/* IE 9 */
              -moz-transform:rotate(180deg); 	/* Firefox */
              -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
              -o-transform:rotate(180deg); 	/* Opera */
              
            }
          }
          .message{
            padding: 10px 25px;
            background: #039074; 
            color: #fff; 
            font-size: 20px;
          }
        }
      }
    }
  .lottery{
    width: 66px;
    height: 66px;
    background: rgb(3, 144, 116);
    margin: 0 3px;
  }
  .lotteryTwo{
    
    width: 66px;
    height: 66px;
    background: #ffffff;
    margin: 0 3px;
  }
  .date{
    color: #fff; 
    font-size: 34px;
  }
  .dateTime{
    color:rgb(3, 144, 116);
    font-size: 34px;
  }
</style>
