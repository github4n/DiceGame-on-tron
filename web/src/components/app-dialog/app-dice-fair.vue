<template>
  <!-- 公平 -->
  <div class='app-dice-fair-dialog'>
    <div class="player-box">
      <img @click="closeDialog()" class="del-icon" src="../../assets/img/delete.png" alt="">
      <p class="title">{{$t('betting.fairTitle')}}</p>
      <p class="dec">{{$t('betting.fairDec')}}</p>
      <div class='fair-copy' @click="addAllList()" v-clipboard:copy="tableAlldatas">{{$t('betting.copy')}}</div>
      <div class="content">
        <div style="color:#00E9E1;font-size:8px;line-height:10px;box-sizing:border-box;text-align: left;padding: 4px 0;">{{$t('betting.fairContent')}}</div>
        <table class="table-box" style="width: 100%" border="1"  cellspacing="0">
          <tr><td>bet-id</td> <td>{{baseInfo.betId}}</td>
          <td><a @click="addAll('bet-id:'+baseInfo.betId)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>user-addr</td> <td>{{baseInfo.addr | dddressatFormat}}</td>
          <td><a @click="addAll('user-addr:'+baseInfo.addr)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>bet-num</td> <td>{{baseInfo.betNum }}</td>
          <td><a @click="addAll('bet-num:'+baseInfo.betNum)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>bet-amount</td> <td>{{baseInfo.betAmt}}</td>
          <td><a @click="addAll('bet-amount:'+baseInfo.betAmt)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>timestamp</td> <td>{{baseInfo.timestamp}}</td>
          <td><a @click="addAll('timestamp:'+baseInfo.timestamp)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>combine-seed</td> <td>{{baseInfo.combSeed | dddressatFormat}}</td>
          <td><a @click="addAll('combine-seed:'+baseInfo.combSeed )" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>combine-seed(sha3)</td> <td>{{baseInfo.combSeedSha3 | dddressatFormat}}</td>
          <td><a @click="addAll('combine-seed(sha3):'+baseInfo.combSeedSha3)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>public-key</td> <td>{{baseInfo.publicKey | dddressatFormat}}</td>
          <td><a @click="addAll('public-key:'+baseInfo.publicKey)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>public-key-addr</td> <td>{{baseInfo.publicKeyAddr | dddressatFormat}}</td>
          <td><a @click="addAll('public-key-addr:'+baseInfo.publicKeyAddr)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>sign</td> <td>{{baseInfo.sign | dddressatFormat}}</td>
          <td><a @click="addAll('sign:'+baseInfo.sign)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>sha3(sig)</td> <td>{{baseInfo.sha3Sig | dddressatFormat}}</td>
          <td><a @click="addAll('sha3(sig):'+baseInfo.sha3Sig)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>last-6-digits</td> <td>{{baseInfo.last6digits}}</td>
          <td><a @click="addAll('last-6-digits:'+baseInfo.last6digits)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
          </tr>
          <tr><td>lucky-num</td> <td>{{baseInfo.luckNum}}</td>
          <td><a @click="addAll('lucky-num:'+baseInfo.luckNum)" v-clipboard:copy="tabledatas" class='dice-fair-copy'>{{$t('betting.copy')}}</a></td>
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
        tableAlldatas: ''
      }
    },

    mounted() {
    },

    methods: {
      closeDialog() {
        this.$emit('closeFairModule');
      },

      addAll(str) {
          if (this.baseInfo.length == 0) {
              let list = {
                  title: "",
                  text: ""
              }
              this.tabledatas.push(list)
          } else {
              this.tabledatas = JSON.stringify(str);
          }
      },

      addAllList(){
        if (this.baseInfo.length == 0) {
              let list = {
                  title: "",
                  text: ""
              }
              this.tableAlldatas.push(list)
          } else {
              this.tableAlldatas = JSON.stringify(this.baseInfo);
          }
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
        let addStr = addr.substring(0,6) + '...' + addr.substring(addr.length-6, addr.length);
        return addStr;
      }
    },
  }
</script>

<style lang="less">
  .app-dice-fair-dialog{
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
      width: 330px;
      margin-top: 50px;
      font-size: 12px;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #00E9E1;
      background:#181845;
      .del-icon{
        position: absolute;
        top: -25px;
        right: -20px;
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
        padding: 0px 10px 0px;
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
        margin: 0 auto;
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


      .content{
        width: 100%;
        //height: 370px;
        //background: #F0ECE2;
        padding: 6px 10px;
        box-sizing: border-box;
        //overflow-y:scroll;
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
              width: 46%;
              font-weight: 600;
            }
            td:nth-child(2){
              width: 34%;
              font-weight: 400;
              font-size: 9px;
              overflow: hidden;
            }
            td:nth-child(3){
              width: 20%;
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
