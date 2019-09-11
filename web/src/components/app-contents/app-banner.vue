<template>
  <div class='app-banner'> 
    <img v-if="langularType == 'zh'" class='app-picture' src="../../assets/imgs/title_zh.png" alt="">
    <img v-if="langularType == 'en'" class='app-picture' src="../../assets/imgs/title_en.png" alt="">
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
    }
  }
}
</script>

<style lang='less' scoped>
  .app-banner{
    width: 100%;
    height: 100%;
    position: relative;
    top:2px;
    .app-picture{
      width: 100%;
      display: block;
    }
  }
</style>
