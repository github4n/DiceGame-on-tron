<template>
  <div class='inviter-main'>
    <div class='reward-content'>
      <!-- <left v-if="isPcDeviceType"></left> -->
      <div class='header-box'>
        <!-- <pc-header v-if="isPcDeviceType"></pc-header>
        <app-header v-if="!isPcDeviceType"></app-header> -->
        <div class="main-content1">
          <rewards-content></rewards-content>
          <inviter-content></inviter-content>  
          <!-- <level-content></level-content>  -->
          <my-invite></my-invite> 
          <inviter-rule></inviter-rule>
          <!-- <div class='footer-box' v-if="isPcDeviceType"  style="height: 44px;line-height: 44px;">
            <p style="color:rgba(140, 144, 146, 0.85);font-family: -webkit-body;margin:0;">{{$t('betting.Reserved')}}</p>
          </div> -->
        </div>
       
      </div>
    </div>  
  </div>
</template>
<script>
import pcHeader from '../../components/public/header' //pc头部
import left from '../../components/public/left'
import appHeader from '../../components/public/app-header' //app头部
import rewardsContent from '../rewards/rewards-content' //图
import inviterContent from '../rewards/inviter-content' //分红池
import levelContent from '../rewards/level-content' //我的等级
import myInvite from '../rewards/my-invite' //我的邀请
import inviterRule from '../rewards/inviter-rule' //我的规则

export default {
  components: {pcHeader , appHeader , rewardsContent , inviterContent , levelContent , myInvite , left , inviterRule},
  data(){
    return {
      isPcDeviceType: this.$isPcDeviceType
    }
  }
}
</script>

<style lang='less' scoped>
@media screen and (max-width: 500px) {
  .inviter-main{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: 400;
    vertical-align: initial;
    box-sizing: border-box;
    background: #141F27;
    .reward-content{
      width: 100%;
      height: 100%;
      display: flex;
      margin: 0 auto;
      position: relative;
      overflow-x: hidden;
      .header-box{
        width: 100%;
        position: relative;
        margin: 0 auto;
        .main-content1{
          width: 100%;
          //height: 100%;
          box-sizing: border-box;
          position: relative;
          background: url(../../assets/img/bg4.png);
          background-size: 100% 100%;
        }
        .footer-box{
            width: 100%;
        }
      }
      
    }
  }
  
}


@media screen and (max-width: 1440px) and (min-width: 992px) {
  .inviter-main{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: 400;
    vertical-align: initial;
    box-sizing: border-box;
    background: #141F27;
    .reward-content{
      width: 1200px;
      height: 100%;
      display: flex;
      margin: 0 auto;
      position: relative;
      overflow-x: hidden;
      .header-box{
        width: 1010px;
        /* margin: 0 auto;
        width: 1250px; */
      }
      .main-content1{
        width: 1010px;
        //height: 100%;
        box-sizing: border-box;
        background: url(../../assets/img/bg4.png);
       
      }
      .footer-box{
          width: 1010px;
      }
    }
      
  }
}

@media screen and (max-width: 3000px) and (min-width: 1440px) {
  .inviter-main{
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: 400;
      vertical-align: initial;
      box-sizing: border-box;
      background: #141F27;
      .reward-content{
        width: 1440px;
        height: 100%;
        display: flex;
        margin: 0 auto;
        position: relative;
         .header-box{
          width: 1250px;
          
          // margin: 0 auto;
         
        }
        .main-content1{
          width: 1250px;
          //height: 100%;
          box-sizing: border-box;
          background: url(../../assets/img/bg4.png);
          
        }
        .footer-box{
          width: 1250px;
        }
      }
  }
}


</style>
