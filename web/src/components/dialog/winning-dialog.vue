<template>
  <div class='pc-move'>
    <div class='pc-move-content'>
      <div class='pc-box'>
          <img @click="closeMove()"  class="del-icon" src="../../assets/img/delete.png" alt="">
          <div class='text-picture'>
            <img  v-if="langularType == 'zh'" class='picture1' src="../../assets/imgs/win-text.png">
            <img  v-if="langularType == 'en'" class='picture1' src="../../assets/imgs/win-textEn.png">
          </div>

          <div class='title'><p class='title-content'>{{$t('betting.MaseratiTotal')}}</p></div>

          <div class='car'>
            <img class='picture2' src="../../assets/imgs/win-car.png">
            <div class='car-footer'>
              <img class='picture3' src="../../assets/imgs/win-btc.png">
              <p class='picture4'>45BTC</p>
            </div>
          </div>

          <div class='userInfo'>
            <p class='userInfo-message'><span style='color:#04A5BD;'>{{$t('betting.TRXWallet')}}：</span><span style='color:#fff;'>TPvzGvjMHbSjjkvXgRvhENtCzi7ETccA49</span></p>
            <p  class='userInfo-message'><span style='color:#04A5BD;'>{{$t('betting.BTCWallet')}}：</span><span style='color:#fff;'>18UqfeGE2avFfpWveXEEi8vaGTJsK3PBV1</span></p>
            <p  class='userInfo-message'><span style='color:#04A5BD;'>{{$t('betting.TransactionHash')}}：</span><span style='color:#fff;'>6b589e07e2045f1f090c1c4110c75c0c70fb0066266074f2bdee392fec7d1978</span></p>
          </div>                        
          <!-- <div class='partake'><a style='color:#fff;text-decoration: none;' href="https://www.oscar.pro/ring/">{{$t('betting.PlayNow')}}</a></div> -->
          <div class='partake'><a style='color:#fff;text-decoration: none;' href="http://192.168.12.190/ring/">{{$t('betting.PlayNow')}}</a></div>

          <div class='next-activity'><a href="https://medium.com/@Oscar/oscar-next-event-in-planning-88f2b1fba0a9" target="_blank" class='next-detail'>{{$t('betting.DetailsNext')}}</a></div>

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
export default {
    data(){
        return {
            isPcDeviceType: this.$isPcDeviceType
        }
    },

    computed:{
        'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
        }
    },

    methods:{
        closeMove(){
        this.$emit('closeContentGg');
        }
    }
}
</script>

<style lang='less' scoped>
  .pc-move{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    overflow-y: auto;
    .pc-box{
      background: url(../../assets/imgs/win-bg.png) no-repeat;
      background-size: 100% 100%; 
      width: 100%;
      width: 980px;
      //height: 1412px;
      margin: 20px auto;
      position: relative;
      padding-bottom: 100px;
      .del-icon{
        position: absolute;
        top: -18px;
        right: -35px;
        width: 25px;
        cursor: pointer;
      }
      .text-picture{
        width: 50%;
        margin: 0 auto;
        padding-top: 20px;
        height: 318px;
        .picture1{
          width: 100%;
        }
      }

      .title{
        width: 50%;
        margin: 0 auto;
        margin-top: 20px;
        height: 30px;
        position: relative;
        top: 60px;
        .title-content{
          width: 100%;
          background: url(../../assets/imgs/win-rectangle.png) no-repeat;
          background-size: 100% 100%; 
          color: #fff;
          padding: 0;
          margin: 0;
          font-size: 30px;
        }
      }

      .car{
        width: 60%;
        margin: 0 auto;
        height: 824px;
        .picture2{
          position: relative;
          top: 240px;
          width: 100%;
        }
        .car-footer{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          top: 70px;
          .picture3{
            width: 40%;
            height: 100%;
          }
          .picture4{
            width: 55%;
            background: url(../../assets/images/border@2x.png) no-repeat;
            background-size: 100% 100%; 
            color: #C1CD00;
            text-align: center;
            padding: 0;
            margin: 0;
            font-size: 60px;
            height: 178px;
            line-height: 140px;
            position: relative;
            top: 10px;
          }
        }
      }

      .userInfo{
        position: relative;
        top: 60px;
        width: 95%;
        height: 186px;
        margin: 0 auto;
        border: 1px solid #058194;
        .userInfo-message{
          height: 40px;
          line-height: 40px;
          font-size: 18px;
        }
      }

      .partake{
        width: 257px;
        height: 252px;
        margin: 10px auto 0px;
        background: url(../../assets/images/button@2x.png) no-repeat;
        background-size: 100% 100%; 
        color: #fff;
        font-weight: 700;
        position: relative;
        top: 60px;
        line-height: 252px;
        font-size: 30px;
      }

      .next-activity{
        width: 80%;
        margin: 0px auto;
        padding: 10px 0px 0px;
        position: relative;
        top: 80px;
        cursor: pointer;
        .next-detail{
          width: 335px;
          height: 105px;
          margin: 0 auto;
          line-height: 115px;
          background: url(../../assets/images/border2@2x.png) no-repeat;
          background-size: 100% 100%; 
          color: #fff;
          font-size: 20px;
          display: block;
          text-decoration: none;
        }
      }

      .footer{
        position: relative;
        top: 100px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        height: 30px;
        .hrSty{
          //float:left;
          width:30%;
          height: 1px; 
          border: none; 
          background-color: rgba(150, 141, 141, 0.65);
        }
        .spanSty{
          width: 70%;
          //float:left;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.43);
        }
      }
    }
  }
</style>
