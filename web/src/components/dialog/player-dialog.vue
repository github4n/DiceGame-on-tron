<template>
  <!-- 玩法介绍 -->
  <div class='player-dialog'>
    <div class="player-box">
      <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
      <h5>{{$t('betting.howToPlay')}}</h5>
      <p>{{$t('betting.TRXAccount')}}
        <a target="_blank" href="https://medium.com/tron-foundation/how-to-create-a-wallet-on-trons-explorer-ee9505a12615">
          {{$t('betting.course')}}
        </a>
        {{$t('betting.create')}}
      </p>
      <p>{{$t('betting.follow')}}
        <!-- <a target="_blank" href="https://chrome.google.com/webstore/detail/tronpay/gjdneabihbmcpobmfhcnljaojmgoihfk"> TRONPAY.</a> -->
        <a target="_blank" href="https://chrome.google.com/webstore/detail/guildwallet/nanjmdknhkinifnkgdcggcfnhdaammmj"> GUILD WALLET</a>
      </p>
      <p>{{$t('betting.through')}}</p>
      <p>{{$t('betting.currency')}}</p>
      <p>{{$t('betting.selectSetting')}}</p>
      <p>{{$t('betting.guessing')}}</p>
      <p style='color:#00E9E1;'>{{$t('betting.cheated')}}</p>
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
        this.$emit('closePlayerModule');
      }
    }
  }
</script>

<style lang="less" scoped>
  .player-dialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9;
    background-color: rgba(0,0,0,.77);
    .player-box{
      position: relative;
      margin: auto;
      width: 450px;
      padding: 10px 20px;
      margin-top: 150px;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #00E9E1;
      background:#181845;
      .del-icon{
        position: absolute;
        top: -30px;
        right: -35px;
        width: 25px;
        cursor: pointer;
      }
      p{
        margin: 0;
        padding: 0;
        line-height: 30px;
        text-align: left;
        font-size: 8px;
        color:#f7e9b3;
        a {
          text-decoration: none;
          color: #00E9E1;
        }
      }
    }
  }
</style>
