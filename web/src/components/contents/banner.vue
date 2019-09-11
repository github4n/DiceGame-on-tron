<template>
  <div class='banner-box'>
    <!-- <div class='banner-picture'> -->
      <img v-if="langularType == 'zh'" class='picture' src="../../assets/imgs/banner3.png" alt="">
      <img v-if="langularType == 'en'" class='picture' src="../../assets/imgs/bannerEn.png" alt="">
    <!-- </div> -->
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
    .banner-box{
      //width: 1200px;
      //height: 100%;
      margin: 0 0;
      .picture{
        width: 1100px;
        display: block; 
      }
    }
</style>
