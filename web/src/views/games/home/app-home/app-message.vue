<template>
  <div class='messages'>
    <div class='lxtSty'>
      <img class='lxtImg' v-if="langularType == 'zh'" src='@/assets/img/lxtch.png' alt=""/>
      <img class='lxtImg'  v-if="langularType == 'en'" src='@/assets/img/lxten.png' alt=""/>
    </div>
    <div class='messages-content'>
      <p class='messages-header'>Please arrange your time reasonably, and do not over-indulge</p>
      <p class='messages-center'>If you reside in a location where lottery, gambling, sports betting or betting over the internet is illegal, please do not click on anything related to these activities on this site. You must be 21 years of age to click on any betting or gambling related items even if it is legal to do so in your location. Recognising that the laws and regulations involving online gaming are different everywhere, readers are advised to check with the laws that exist within their own jurisdiction to ascertain the legality of the activities which are covered.</p>
      <p class='messages-footer'>The games provided by TRONOSCAR are based on blockchain, fair and transparent. When you start playing these games, please note that online gambling and lottery is an entertainment vehicle and that it carries with it a certain degree of financial risk. Players should be aware of this risk, and govern themselves accordingly.</p>
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
  .messages{
    width: 100%;
    padding: 0px 10px 10px 10px;
    box-sizing: border-box;
    .lxtSty{
      width: 100%;
     //padding: 0px 10px;
      box-sizing: border-box;
      .lxtImg{
        width: 100%;
      }
    }
    .messages-content{
      color: #999;
      font-size: 12px;
      .messages-header{
        white-space:normal;
        word-wrap:break-word; 
        text-align: center;
      }
      .messages-center{
        white-space:normal;
        word-wrap:break-word; 
        text-align: left;
        font-size: 10px;
        text-indent: 2em;
      }
      .messages-footer{
        white-space:normal;
        word-wrap:break-word; 
        text-align: left;
        font-size: 10px;
        text-indent: 2em;
      }
    }
  }
</style>
