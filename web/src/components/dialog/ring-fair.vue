<template>
  <!-- 公平 -->
  <div class='ring-fair-dialog'>
    <div class="player-box">
      <img @click="closeDialog()" class="del-icon" src="../../assets/img/delete.png" alt="">
      <p class="title">{{$t('betting.fairTitle')}}</p>
      <p class="dec">{{$t('betting.ringDec')}}</p>
      <!-- <div v-if="isPcDevice" class='fair-copy' @click="addAll">{{$t('betting.copy')}}</div> -->
      <div v-if="!isPcDevice" class='fair-copy' @click="addAll" v-clipboard:copy="tabledatas">{{$t('betting.copy')}}</div>
      <div v-if="isPcDevice" class="content">
        <p class='content-title'>{{$t('betting.ringFairContent')}}</p>
        <table class="table-box" style="width: 100%" border="1"  cellspacing="0">
          <tr><td>gID:</td> <td>{{baseInfo.gID}}</td></tr>
          <tr><td>combSeed:</td> <td>{{baseInfo.combSeed}}</td></tr>
          <tr><td>combSeedSha3</td> <td>{{baseInfo.combSeedSha3}}</td></tr>
          <tr><td>publicKey</td> <td>{{baseInfo.publicKey}}</td></tr>
          <tr><td>publicKeyAddr</td> <td>{{baseInfo.publicKeyAddr}}</td></tr>
          <tr><td>sign</td> <td>{{baseInfo.sign}}</td></tr>
          <tr><td>sha3Sig</td> <td>{{baseInfo.sha3Sig}}</td></tr>
          <tr><td>last6digits</td> <td>{{baseInfo.last6digits}}</td></tr>
          <tr><td>luckNum</td> <td>{{baseInfo.luckNum}}</td></tr>
        </table>
      </div>
      <div v-if="!isPcDevice"  class="content">
        <p class='content-title'>{{$t('betting.ringFairContent')}}</p>
        <table class="table-box" style="width: 100%" border="1"  cellspacing="0">
          <tr>
            <td>gID:</td> <td>{{baseInfo.gID }}</td>
            <td><a @click="addAllInfo('gID:'+baseInfo.gID)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>combSeed:</td> <td>{{baseInfo.combSeed | dddressatFormat}}</td>
            <td><a @click="addAllInfo('combSeed:'+baseInfo.combSeed)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>combSeedSha3</td> <td>{{baseInfo.combSeedSha3 | dddressatFormat}}</td>
            <td><a @click="addAllInfo('combSeedSha3:'+baseInfo.combSeedSha3)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>publicKey</td> <td>{{baseInfo.publicKey | dddressatFormat}}</td>
            <td><a @click="addAllInfo('publicKey:'+baseInfo.publicKey)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>publicKeyAddr</td> <td>{{baseInfo.publicKeyAddr | dddressatFormat}}</td>
            <td><a @click="addAllInfo('publicKeyAddr:'+baseInfo.publicKeyAddr)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>sign</td> <td>{{baseInfo.sign | dddressatFormat}}</td>
            <td><a @click="addAllInfo('sign:'+baseInfo.sign)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>sha3Sig</td> <td>{{baseInfo.sha3Sig | dddressatFormat}}</td>
            <td><a @click="addAllInfo('sha3Sig:'+baseInfo.sha3Sig)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>last6digits</td> <td>{{baseInfo.last6digits }}</td>
            <td><a @click="addAllInfo('last6digits:'+baseInfo.last6digits)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr>
            <td>luckNum</td> <td>{{baseInfo.luckNum }}</td>
            <td><a @click="addAllInfo('luckNum:'+baseInfo.luckNum)" v-clipboard:copy="baseInfoData" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
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
        info: {},
        isPcDevice: this.$isPcDeviceType,
        tabledatas: '',
        baseInfoData:''
      }
    },

    mounted() {
    },

    methods: {
      closeDialog() {
        this.$emit('closeFairModule');
      },

      addAll() {
          if (this.baseInfo.length == 0) {
              let list = {
                  title: "",
                  text: ""
              }
              this.tabledatas.push(list)
          } else {
              this.tabledatas = JSON.stringify(this.baseInfo);
          }
      },

      addAllInfo(str){
        this.baseInfoData = JSON.stringify(str);
      }
    },

    filters:{
      priceFormat(vaule) {
        if (vaule == undefined) {
          return "";
        }
        return parseInt(vaule / Math.pow(10, 6));
      },
      
      dddressatFormat(addr) {
        if (addr == undefined) {
          return "";
        }
        let addStr = addr.substring(0,5) + '...' + addr.substring(addr.length-5, addr.length);
        return addStr;
      }
    },
  }
</script>

<style lang="less">
  .ring-fair-dialog{
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
        .content-title{
          color:#00E9E1;
          font-size:14px;
          line-height:20px;
        }
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
          .dice-fair-copy{
            text-align: center;
            background: #00E9E1;
            width: 80px;
            line-height: 20px;
            border-radius: 10px; 
            color: #181845;
            cursor: pointer;
            padding: 0 6px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px){
     .ring-fair-dialog{
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
        width: 340px;
        margin-top: 150px;
        font-size: 14px;
        color: #fff;
        border-radius: 5px;
        border: 1px solid #00E9E1;
        background:#181845;
        .del-icon{
          position: absolute;
          top: -30px;
          right: -15px;
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
          font-size: 8px;
          text-align: center;
          padding:0px 10px 0px;
        }

        .dec{
          //background: #DFC1BE;
          color: #fff;
          font-size: 8px;
          padding: 0px 10px;
          line-height: 10px;
        }

        .fair-copy{
          text-align: center;
          background: #00E9E1;
          width: 80px;
          height: 20px;
          line-height: 20px;
          border-radius: 20px; 
          font-size: 12px;
          color: #181845;
          font-weight: 700;
          cursor: pointer;
        }

        .content{
          width: 100%;
          //background: #F0ECE2;
          padding: 10px 10px 10px;
          box-sizing: border-box;
          .content-title{
            color:#00E9E1;
            font-size:8px;
            line-height:10px;
          }
          .table-box{
            width: 100%;
            border:1px solid #00E9E1;
            tr{
              height: 15px;
              line-height: 15px;
              td{
                color: #00E9E1;
                padding: 0 10px;
                text-align: center;
                word-wrap: break-word;
                word-break:break-all;
                font-size: 8px;
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
  }
</style>
