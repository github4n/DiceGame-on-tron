<template>
  <!-- 公平 -->
  <div class='fair-dialog'>
    <div class="player-box">
      <img @click="closeDialog()" class="del-icon" src="../../assets/img/delete.png" alt="">
      <p class="title">{{$t('betting.fairTitle')}}</p>
      <p class="dec">{{$t('betting.fairDec')}}</p>
      <div class="content">
        <p style="color:#00E9E1;font-size:14px;line-height:20px;">{{$t('betting.fairContent')}}</p>
        <table class="table-box" style="width: 100%" border="1"  cellspacing="0">
          <tr><td>bet-id:</td> <td>{{baseInfo.betId}}</td></tr>
          <tr><td>user-addr:</td> <td>{{baseInfo.addr}}</td></tr>
          <tr><td>bet-num</td> <td>{{baseInfo.betNum}}</td></tr>
          <tr><td>bet-amount</td> <td>{{baseInfo.betAmt}}</td></tr>
          <tr><td>timestamp</td> <td>{{baseInfo.timestamp}}</td></tr>
          <tr><td>combine-seed</td> <td>{{baseInfo.combSeed}}</td></tr>
          <tr><td>combine-seed(sha3)</td> <td>{{baseInfo.combSeedSha3}}</td></tr>
          <tr><td>public-key</td> <td>{{baseInfo.publicKey}}</td></tr>
          <tr><td>public-key-addr</td> <td>{{baseInfo.publicKeyAddr}}</td></tr>
          <tr><td>sign</td> <td>{{baseInfo.sign}}</td></tr>
          <tr><td>sha3(sig):</td> <td>{{baseInfo.sha3Sig}}</td></tr>
          <tr><td>last-6-digits:</td> <td>{{baseInfo.last6digits}}</td></tr>
          <tr><td>lucky-num:</td> <td>{{baseInfo.luckNum}}</td></tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FairDialog',

    props: [ 'baseInfo'],

    data(){
      return {
        info: {}
      }
    },

    mounted() {
    },

    methods: {
      closeDialog() {
        this.$emit('closeFairModule');
      }
    }
  }
</script>

<style lang="less">
  .fair-dialog{
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
      width: 700px;
      margin-top: 50px;
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
        color:#00E9E1;
        a {
          text-decoration: none;
          color: #fff;
        }
      }

      .title{
        color:#fff;
        font-size: 18px;
        text-align: center;
        padding: 10px;
      }

      .dec{
        //background: #DFC1BE;
        color: #fff;
        font-size: 14px;
        padding: 10px;
        line-height: 16px;
      }

      .content{
        width: 100%;
        //background: #F0ECE2;
        padding: 15px;
        box-sizing: border-box;
        .table-box{
          width: 100%;
          border:1px solid #00E9E1;
          tr{
            height: 25px;
            line-height: 25px;
            td{
              color: #00E9E1;
              padding: 0 10px;
              text-align: center;
              word-wrap: break-word;
              word-break:break-all;
            }
            td:nth-child(1){
              width: 30%;
              font-weight: 600;
            }
            td:nth-child(2){
              font-weight: 400;
              font-size: 9px;
              overflow: hidden;
            }
          }

        }
      }
    }
  }
</style>
