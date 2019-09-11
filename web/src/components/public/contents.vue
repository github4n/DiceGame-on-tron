<template>
  <div class='content'>
    <app-header v-if="!isPcDeviceType"></app-header>
    <div v-if="!isPcDeviceType" class='app-content'>
      <app-banner></app-banner>
      <div class='app-box'>
        <app-progress></app-progress>
        <app-count></app-count>
        <app-winning></app-winning>
        <app-tables></app-tables>
        <app-result></app-result>
        <app-buy></app-buy>
        <app-coupons></app-coupons>
        <app-rules></app-rules>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '../contents/banner' // banner图
import appProgress from '../contents/progress-list' // 进度条
import countDown from '../contents/countDown' // 倒计时
import tableList from '../contents/table-list' // 用户奖券排行榜
import previousPeriodResult from '../contents/previousPeriodResult' // 上期结果
import rules from '../contents/rules' // 规则详情
import coupons from '../contents/coupons' // 我的奖券
import winning from '../contents/winning' //中奖号码
import pcHeader from './header' // 头部
import appHeader from './app-header' // 头部

import appBanner from '../app-contents/app-banner' // app banner图
import appCount from '../app-contents/app-count' // app banner图
import appWinning from '../app-contents/app-winning' // app banner图
import appTables from '../app-contents/app-tables' // app banner图
import appResult from '../app-contents/app-result' // app banner图
import appBuy from '../app-contents/app-buy' // app banner图
import appRules from '../app-contents/app-rules' // app banner图
import appCoupons from '../app-contents/app-coupons' // app banner图

export default {
   components: { banner, appProgress,  countDown, tableList , previousPeriodResult , rules, coupons, winning , pcHeader, appHeader,
    appBanner ,appCount , appWinning ,appTables , appResult , appBuy , appRules, appCoupons
   }, 

  data(){
    return {
        isPcDeviceType: this.$isPcDeviceType
    }
  }
}
</script>

<style lang='less' scoped>
  .content-box{
    background: url(../../assets/imgs/background.png) no-repeat;
    background-size: 100% 100%; 
    width: 100%;
    height: 100%;
  }

  .app-content{
    width: 100%;
    height: 100%;
    .app-box{
      background: url(../../assets/imgs/bg@2x1.png) no-repeat;
      background-size: 100% 100%; 
      width: 100%;
      height: 100%;
      position: relative;
      top:-2px;
    }
  }
</style>
