<template>
  <div class="app-cooperative">
    <div class='content'>
      <div class='wallet'>
        <h2 class='content-title'>{{$t('header.wallet')}}</h2>
        <div class='conetnt-list'>
          <a class='wallet-link' style='text-decoration:none;' target="_blank" href="http://www.bankowallet.com">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon27.png" alt="">
              </div>
              
            </div>
          </a>
          
          <a class='wallet-link' style='text-decoration:none;' target="_blank" href="http://www.mathwallet.org/cn/">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon28.png" alt="">
              </div>
              
            </div>
          </a>

          <a class='wallet-link' style='text-decoration:none;' target="_blank" href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon29.png" alt="">
              </div>
             
            </div>
          </a>

          <a class='wallet-link' style='text-decoration:none;' target="_blank" href="https://chrome.google.com/webstore/detail/tronpay/gjdneabihbmcpobmfhcnljaojmgoihfk?hl=zh-CN">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon30.png" alt="">
              </div>
              
            </div>
          </a>

          <a class='wallet-link' style='text-decoration:none;' target="_blank" href="http://pi-download.tokpick.com/#/en?channel=ocdap">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon31.png" alt="">
              </div>
              
            </div>
          </a>
        </div>
      </div>

      <div class='ranking'>
        <h2 class='content-title'>Dapp {{$t('betting.leaderboard')}}</h2>
        <div class='conetnt-list'>
          <a class='conetnt-list' style='text-decoration:none;' target="_blank" href="https://www.dapp.com/zh">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon32.png" alt="">
              </div>
              
            </div>
          </a>

          <a class='conetnt-list' style='text-decoration:none;' target="_blank" href="https://dapp.review/">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon33.png" alt="">
              </div>
              
            </div>
          </a>


          <a class='conetnt-list' style='text-decoration:none;' target="_blank" href="https://dappradar.com/">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon34.png" alt="">
              </div>
             
            </div>
          </a>


          <a class='conetnt-list' style='text-decoration:none;' target="_blank" href="http://dappbirds.com/">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon35.png" alt="">
              </div>
              
            </div>
          </a>


          <a class='conetnt-list' style='text-decoration:none;' target="_blank" href="https://godapp.com/">
            <div class='phone'>
              <div class='phone-content'>
                <img class='phone-picture' src="@/assets/img/icon36.png" alt="">
              </div>
             
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style lang='less' scoped>
  .app-cooperative{
    width: 100%;
    margin: 0 auto;
    padding:0px 10px;
    box-sizing: border-box;
    position: relative;
    .content-title{
      line-height: 20px;
      color: #fff;
      font-size: 13px;
      margin: 0px;
      padding: 15px 0px;
    }
    .conetnt-list{
      display: flex;
      justify-content: space-between;
      .wallet-link{
        flex:1;
      }
      .phone{
        .phone-content{
          .phone-picture{
            width: 60px;
          }
        }
        .phone-title{
          //line-height: 16px;
          color: #fff;
          font-size: 10px;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
</style>
