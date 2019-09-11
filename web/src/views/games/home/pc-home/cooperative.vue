<template>
  <div class="cooperative">
    <div class='content'>
      <div class='wallet'>
        <h3 class='content-title'>{{$t('header.wallet')}}</h3>
        <div class='conetnt-list'>
          <a style='text-decoration:none;' target="_blank" href="http://www.bankowallet.com">
            <div class='phone tupian1'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon27.png" alt="">
              </div>
            </div>
          </a>
          
          <a style='text-decoration:none;' target="_blank" href="http://www.mathwallet.org/cn/">
            <div class='phone tupian2'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon28.png" alt="">
              </div>
            </div>
          </a>

          <a style='text-decoration:none;' target="_blank" href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec">
            <div class='phone tupian3'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon29.png" alt="">
              </div>
            </div>
          </a>

          <a style='text-decoration:none;' target="_blank" href="https://chrome.google.com/webstore/detail/tronpay/gjdneabihbmcpobmfhcnljaojmgoihfk?hl=zh-CN">
            <div class='phone tupian4'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon30.png" alt="">
              </div>
            </div>
          </a>

          <a style='text-decoration:none;' target="_blank" href="http://pi-download.tokpick.com/#/en?channel=ocdap">
            <div class='phone tupian5'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon31.png" alt="">
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class='ranking'>
        <h3 class='content-title' style='padding: 60px 0px 30px;'>Dapp {{$t('betting.leaderboard')}}</h3>
        <div class='conetnt-list'>
          <a style='text-decoration:none;' target="_blank" href="https://www.dapp.com/zh">
            <div class='phone tupian1'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon32.png" alt="">
              </div>
            </div>
          </a>

          <a style='text-decoration:none;' target="_blank" href="https://dapp.review/">
            <div class='phone tupian2'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon33.png" alt="">
              </div>
            </div>
          </a>


          <a style='text-decoration:none;' target="_blank" href="https://dappradar.com/">
            <div class='phone tupian3'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon34.png" alt="">
              </div>
            </div>
          </a>


          <a style='text-decoration:none;' target="_blank" href="http://dappbirds.com/">
            <div class='phone tupian4'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon35.png" alt="">
              </div>
            </div>
          </a>


          <a style='text-decoration:none;' target="_blank" href="https://godapp.com/">
            <div class='phone tupian5'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon36.png" alt="">
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <img v-if="langularType == 'zh'" style="margin-top: 30px;" src='@/assets/img/lxtch.png' alt=""/>
    <img v-if="langularType == 'en'" style="margin-top: 30px;" src='@/assets/img/lxten.png' alt=""/>
    <div class='character'>
      <p class='character-header'>Please arrange your time reasonably, and do not over-indulge</p>
      <p class='character-content'>If you reside in a location where lottery, gambling, sports betting or betting over the internet is illegal, please do not click on anything related to these activities on this site. You must be 21 years of age to click on any betting or gambling related items even if it is legal to do so in your location. Recognising that the laws and regulations involving online gaming are different everywhere, readers are advised to check with the laws that exist within their own jurisdiction to ascertain the legality of the activities which are covered.</p>
      <p class='character-footer'>The games provided by TRONOSCAR are based on blockchain, fair and transparent. When you start playing these games, please note that online gambling and lottery is an entertainment vehicle and that it carries with it a certain degree of financial risk. Players should be aware of this risk, and govern themselves accordingly.</p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        
    }
  },
  computed:{
    'langularType': function(){
      return this.$store.getters.GET_LANGUAR_TYPE;
    },
  }
}
</script>

<style lang='less' scoped>
  .cooperative{
    width:100%;
    margin: 0 auto;
    padding:20px 10px;
    box-sizing: border-box;
    position: relative;
    background: #242854;
    .content-title{
      color: #fff;
      padding: 0px 0px 30px;
      
    }
    .conetnt-list{
      width: 100%;
      height: 170px;
      display: flex;
      justify-content: space-between;
      background: url(../../../../assets/img/pict.png) no-repeat;
      background-size: 100% 100%; 
      position: relative;
      margin-top: 30px;
      @media screen and (max-width: 1440px) and (min-width: 992px) {
         .phone{
          box-sizing: border-box;
          .phone-content{
            .phone-picture{
              width: 100px;
            }
          }
          .phone-title{
            line-height: 30px;
            color: #fff;
          }
        }
        .tupian1{
          position: absolute;
          left: 135px;
          top: -10px;
        }
        .tupian2{
          position: absolute;
          left: 445px;
          top: -10px;
        }
        .tupian3{
          position: absolute;
          left: 755px;
          top: -10px;
        }
        .tupian4{
          position: absolute;
          left: 290px;
          top: 85px;
        }
        .tupian5{
          position: absolute;
          left: 600px;
          top: 85px;
        }
      }
      @media screen and (max-width: 3000px) and (min-width: 1440px) {
        .phone{
          box-sizing: border-box;
          .phone-content{
            .phone-picture{
              width: 110px;
            }
          }
          .phone-title{
            line-height: 30px;
            color: #fff;
          }
        }
        .tupian1{
          position: absolute;
          left: 175px;
          top: -20px;
        }
        .tupian2{
          position: absolute;
          left: 560px;
          top: -20px;
        }
        .tupian3{
          position: absolute;
          left: 945px;
          top: -20px;
        }
        .tupian4{
          position: absolute;
          left: 365px;
          top: 85px;
        }
        .tupian5{
          position: absolute;
          left: 750px;
          top: 85px;
        }
      }
    }

    .character{
      color:#999;
      font-size: 16px;
      margin-top: 60px;
      padding: 0px 15px;
      .character-header{
        padding: 10px 0px;
        text-align: center;
        font-size: 18px;
        white-space:normal;
        word-wrap:break-word; 
      }
      .character-content{
        text-align: left;
        line-height: 36px;
        white-space:normal;
        word-wrap:break-word; 
      }
      .character-footer{
        text-align: left;
        line-height: 36px;
        white-space:normal;
        word-wrap:break-word; 
      }
    }
  }
</style>
