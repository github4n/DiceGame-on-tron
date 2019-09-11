<template>
  <div class='move'>
    <app-header v-if="!isPcDeviceType"></app-header>
    <div v-if="!isPcDeviceType" class='app-move'>
      <div class='app-box'>
          <div class='text-picture'>
            <img  v-if="langularType == 'zh'" class='picture1' src="../../assets/images/text@2x.png">
            <img  v-if="langularType == 'en'" class='picture1' src="../../assets/images/text@1.png">
          </div>

          <div class='title'><p class='title-content'>{{$t('betting.MaseratiTotal')}}</p></div>

          <div class='car'>
            <img class='picture2' src="../../assets/images/car@2x.png">
            <div class='car-footer'>
              <img class='picture3' src="../../assets/images/btc@2x.png">
              <p class='picture4'>45BTC</p>
            </div>
          </div>

          <div class='userInfo'>
            <div class='userInfo-list'>
              <p class='userInfo-message'><span style='color:#04A5BD;'>{{$t('betting.TRXWallet')}}：</span><span style='color:#fff;'>TPvz......ccA49</span></p>
              <p  class='userInfo-message'><span style='color:#04A5BD;'>{{$t('betting.BTCWallet')}}：</span><span style='color:#fff;'>18Uq......PBV1</span></p>
              <p  class='userInfo-message'><span style='color:#04A5BD;'>{{$t('betting.TransactionHash')}}：</span><span style='color:#fff;'>6b589e......7d1978</span></p>
            </div>
           
          </div>                        
          <!-- <div class='partake'><a style='color:#fff;text-decoration: none;' href="https://www.oscar.pro/ring/">{{$t('betting.PlayNow')}}</a></div> -->
          <div class='partake'><a style='color:#fff;text-decoration: none;' href="https://www.tronoscar.pro/ring/">{{$t('betting.PlayNow')}}</a></div>

          <div class='next-activity'><a href="https://medium.com/@Oscar/oscar-next-event-in-planning-88f2b1fba0a9" class='next-detail'>{{$t('betting.DetailsNext')}}</a></div>

          <div class='footer'>
             <hr class="hrSty"/>
              <font class="spanSty">&nbsp;&nbsp;&nbsp;{{$t('betting.Reserved')}}</font>
            <hr class="hrSty"/>
            <p>&nbsp;</p>
          </div>
         
      </div>
    </div>
    
  </div>
</template>

<script>
import appHeader from './app-header' // 头部



export default {
   components: { appHeader, 
   }, 

  data(){
    return {
        isPcDeviceType: this.$isPcDeviceType
    }
  },

  computed:{
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    }
  }
}
</script>

<style lang='less' scoped>
  .app-move{
    width: 100%;
    height: 100%;
    .app-box{
      background: url(../../assets/images/bg@2x.png) no-repeat;
      background-size: 100% 100%; 
      width: 100%;
      .text-picture{
        width: 50%;
        height: 122px;
        margin: 0 auto;
        padding-top: 20px;
        .picture1{
          width: 100%;
        }
      }

      .title{
        width: 50%;
        margin: 0 auto;
        position: relative;
        top: 45px;
        height: 20px;
        .title-content{
          width: 100%;
          background: url(../../assets/images/rectangle@2x.png) no-repeat;
          background-size: 100% 100%; 
          color: #fff;
          padding: 0;
          margin: 0;
        }
      }

      .car{
        width: 50%;
        height: 318px;
        margin: 0 auto;
        .picture2{
          width: 100%;
          position: relative;
          top: 114px;
        }
        .car-footer{
          position: relative;
          top: 80px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .picture3{
            width: 40%;
            height: 100%;
          }
          .picture4{
            width: 55%;
            height: 60px;
            line-height: 47px;
            background: url(../../assets/images/border@2x.png) no-repeat;
            background-size: 100% 100%; 
            color: #C1CD00;
            text-align: center;
            position: relative;
            top: -30px;
            padding: 0;
            margin: 0;
            font-size: 23px;
          }
        }
      }

      .userInfo{
        width: 95%;
        height: 123px;
        margin: 0 auto;
        //border: 1px solid #058194;
        padding: 30px 0px;
        .userInfo-list{
          height: 123px;
          border: 1px solid #058194;
          .userInfo-message{
            height: 24px;
            font-size: 15px;
            line-height: 24px;
          }
        }
      }

      .partake{
        width: 120px;
        margin: 0px auto 0px;
        background: url(../../assets/images/button@2x.png) no-repeat;
        background-size: 100% 100%; 
        height: 112px;
        line-height: 112px;
        color: #fff;
        font-weight: 700;
        position: relative;
      }

      .next-activity{
        width: 80%;
        margin: 0px auto;
        padding: 10px 0px 10px;
        .next-detail{
          width: 70%;
          margin: 0 auto;
          height: 40px;
          line-height: 45px;
          background: url(../../assets/images/border2@2x.png) no-repeat;
          background-size: 100% 100%; 
          color: #fff;
          display: block;
          text-decoration: none;
        }
      }

      .footer{
        width: 90%;
        margin: 0 auto;
        display: flex;
        height: 30px;
        .hrSty{
          //float:left;
          width:10%;
          height: 1px; 
          border: none; 
          background-color: rgba(150, 141, 141, 0.65);
        }
        .spanSty{
          width: 70%;
          //float:left;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.43);
        }
      }
    }
  }
</style>
