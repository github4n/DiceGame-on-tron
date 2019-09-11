<template>
  <div class='app-player-dialog'>
    <div class="player">
      <img @click="closeDialog()"  class="del-icon" src="../../assets/img/delete.png" alt="">
      <!-- <i class="fa fa-times del-icon" aria-hidden="true" @click="closeDialog()"></i> -->
      <h5>{{$t('betting.howToPlay')}}</h5>
      <p>{{$t('betting.TRXAccount')}} <a href="https://medium.com/coinmonks/create-your-own-eos-account-easily-using-the-non-service-fee-Oscar-signupeoseos-b15c5347f2fc">{{$t('betting.course')}} </a> {{$t('betting.create')}} </p>
      <p>{{$t('betting.follow')}}
        <!-- <a  href="https://chrome.google.com/webstore/detail/tronpay/gjdneabihbmcpobmfhcnljaojmgoihfk"> TRONPAY.</a> -->
        <a  href="https://chrome.google.com/webstore/detail/guildwallet/nanjmdknhkinifnkgdcggcfnhdaammmj"> GUILD WALLET</a>
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
  .app-player-dialog{
    width: 95%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 10px;
    right: 10px;
    z-index: 9;
    background-color: rgba(0,0,0,.77);
    .player{
      position: relative;
      margin: auto;
      padding: 10px;
      margin-top: 150px;
      font-size: 12px;
      color: #fff;
      border-radius: 5px;
      //border: 1px solid #00E9E1;
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
      }
    }
  }
</style>
