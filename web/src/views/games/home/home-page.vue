<template>
  <div class="page-box">
    <div v-if="isPcDeviceType" class='home-box'>
        <div class="main-box1">
            <pc-banner></pc-banner>
          <div class='pc-content'>
            <picture-list></picture-list>
            <table-list></table-list>
          </div>
          <cooperative></cooperative>
        </div>
    </div>
   
   
    <div v-else>
      <div class='content'>
        <!-- <app-chatroom></app-chatroom> -->
        <app-banner></app-banner>
        <app-reward></app-reward>
        <app-links></app-links>
        <app-rank-list></app-rank-list>
      </div>
      <div class='content2'>
        <app-wallet-list></app-wallet-list>
        <app-message></app-message>
      </div>
    </div>
  </div>
</template>

<script>  
  import pcBanner from '@/views/components/banner';
  import pictureList from './pc-home/picture-list.vue';
  import tableList from '@/views/components/table-list.vue';
  import cooperative from './pc-home/cooperative.vue';

  import appChatroom from '@/views/app-components/app-chatroom';
  import appBanner from '@/views/app-components/app-banner';
  import appReward from './app-home/app-reward.vue';
  import appLinks from './app-home/app-links.vue';
  import appMessage from './app-home/app-message.vue';
  import appRankList from '@/views/app-components/app-rankList.vue';
  import appWalletList from './app-home/app-walletList.vue';
  

  export default {
    name: 'home',

    components: {pcBanner , pictureList , tableList , cooperative , appBanner , appChatroom , appReward, appLinks,
      appMessage , appRankList , appWalletList
    },

    mounted() {
    },

    data(){
      return {
        isPcDeviceType: this.$isPcDeviceType,
        isHomePayout:false,
      }
    },

    methods: {
      handleClick(){
        this.isHomePayout = !this.isHomePayout;
      },

      closeModule() {
        this.isHomePayout = false;
      },
    }
  }
</script>

<style lang="less" scoped>
  @media screen and (max-width: 1440px) and (min-width: 992px) {
    .page-box{
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: 400;
      vertical-align: initial;
      box-sizing: border-box;
      .home-box{
        width: 100%;
        height: 100%;
        background: #141F27;
        .main-box1{
          width:1010px;
          background: url(../../../assets/img/bg1.png) no-repeat;
          background-size: 100% 100%; 
          padding: 10px 0px 0px;
          box-sizing: border-box;
          .pc-content{
            width: 100%;
            padding: 20px 25px 0px;
            box-sizing: border-box;
            
          }
        }
      }
    }
  }

  @media screen and (max-width: 3000px) and (min-width: 1440px) {
    .page-box{
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: 400;
      vertical-align: initial;
      box-sizing: border-box;
      .home-box{
        width: 100%;
        height: 100%;
        .main-box1{
          width:1250px;
          box-sizing: border-box;
          background: url(../../../assets/img/bg1.png) no-repeat;
          background-size: 100% 100%;
          padding: 10px 0px 0px; 
          .pc-content{
            width: 100%;
            padding: 20px 25px 0px;
            box-sizing: border-box;
            
          }
        }
      }
    }
  }

  .content{
    background: url(../../../assets/img/bg1.png) no-repeat;
    background-size: 100% 100%; 
    width: 100%;
    height: 100%;
    padding: 0px;
  }

  .content2{
    background: url(../../../assets/img/bg2.png) no-repeat;
    background-size: 100% 100%; 
    width: 100%;
    height: 100%;
    padding: 0px;
  }
 
</style>
