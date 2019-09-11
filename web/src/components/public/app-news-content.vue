<template>
  <div class='content'>
    <app-header v-if="!isPcDeviceType"></app-header>
    <div v-if="!isPcDeviceType" class='app-content'>
      <app-banner></app-banner>
      <div class='app-box'>
          <app-new-count></app-new-count>
      </div>
    </div>
    
  </div>
</template>

<script>

import appHeader from './app-header' // 头部
import appBanner from '../app-contents/app-banner' // app banner图
import appNewCount from '../app-news/new-count' // app 进度条


export default {
   components: {  appHeader,
    appBanner ,appNewCount
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
