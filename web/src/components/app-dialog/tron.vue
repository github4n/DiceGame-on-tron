<template>
  <div class='app-tron-dialog'>
    <div class="player-box">
      <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
      <h5>{{$t('betting.chromPlus')}}</h5>
      <p>{{$t('betting.TRONdicePay')}}</p>
      <p style='word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;line-height:15px'>Tron Link：<a href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec">https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec</a></p>
      <!-- <p>Tron Pay：<a href="https://dwz.cn/FyIuFVay">https://dwz.cn/FyIuFVay</a></p> -->
      <p>{{$t('betting.noteNode')}}</p>
      <p>{{$t('betting.startGame')}}</p>
      <p>{{$t('betting.googleAppPay')}}</p>
      <p>
        <a href="https://s3.amazonaws.com/trondice/Chromewallet/TRONlink.zip">
          https://s3.amazonaws.com/trondice/Chromewallet/TRONlink.zip
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayerDialog',

    data(){
      return {}
    },

    methods: {
      closeDialog() {
        this.$emit('closeTronLinkModule');
      }
    }
  }
</script>

<style lang="less">
  .app-tron-dialog{
    width: 95%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 10px;
    right: 10px;
    z-index: 9;
    background-color: rgba(0,0,0,.77);
    .player-box{
      position: relative;
      margin: auto;
      padding: 10px;
      margin-top: 150px;
      font-size: 12px;
      color: #fff;
      border-radius: 5px;
      //border: 1px solid #565656;
      background:#181845;
      .del-icon{
        position: absolute;
        top: -14px;
        right: -10px;
        width: 25px;
        cursor: pointer;
      }
      p{
        margin: 0;
        padding: 0;
        line-height: 30px;
        text-align: left;
        font-size: 8px;
        color:#fff;
        a {
          text-decoration: none;
          color: #00E9E1;
        }
        a:hover{
          opacity: .7;
        }
      }
    }
  }
</style>
