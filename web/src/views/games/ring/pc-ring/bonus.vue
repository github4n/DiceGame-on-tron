<template>
  <div class='bonus-box'>
      <div class='bonus-content'>
          <img @click="closeBouns()"  class="del-icon" src="@/assets/img/delete.png" alt="">
          <img class='picture' :src='imgSrc'>
          <!-- <img class='picture' src="../../assets/imgs/en1.png" alt=""> -->
      </div>
  </div>
</template>

<script>
import { getRing } from '@/service/api';
export default {
  props:['imgSrc'],

  data(){
    return {

    }
  },

   methods: {
      closeBouns() {
        this.$emit('closeBounsModule');
      }
    }
}
</script>

<style lang='less' scoped>
  .bonus-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9;
    background-color: rgba(0,0,0,.77);
    .bonus-content{
      margin: auto;
      width: 400px;
      padding: 0 20px;
      margin-top: 150px;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
      //border: 1px solid #565656;
      background:transparent;
      position: relative;
      .picture{
        width: 100%;
      }
      .del-icon{
        position: absolute;
        top: -14px;
        right: -10px;
        width: 25px;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 500px){
    .bonus-box{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 9;
      background-color: rgba(0,0,0,.77);
      .bonus-content{
        margin: auto;
        width: 300px;
        padding: 0 20px;
        margin-top: 150px;
        font-size: 14px;
        color: #fff;
        border-radius: 5px;
        //border: 1px solid #565656;
        background:transparent;
        position: relative;
        .picture{
          width: 100%;
        }
        .del-icon{
          position: absolute;
          top: -14px;
          right: -10px;
          width: 25px;
          cursor: pointer;
        }
      } 
    }
  }
</style>
