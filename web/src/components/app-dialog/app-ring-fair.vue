<template>
  <!-- 公平 -->
  <div class='app-ring-fair-dialog'>
    <div class="player-box">
      <img @click="closeAppDialog()" class="del-icon" src="../../assets/img/delete.png" alt="">
      <p class="title">{{$t('betting.fairTitle')}}</p>
      <p class="dec">{{$t('betting.ringDec')}}</p>
      <div class="content">
        <p style="color:#00E9E1;font-size:8px;line-height:10px;">{{$t('betting.ringFairContent')}}</p>
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
    props: [ 'baseInfo1'],

    data(){
      return {
        info: {}
      }
    },

    mounted() {
    },

    methods: {
      closeAppDialog() {
        this.$emit('closeAppFairModule');
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
    }
  }
</script>

<style lang="less">
  .app-ring-fair-dialog{
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
      margin-top: 50px;
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
        //background: #F0ECE2;
        padding: 10px 10px 10px;
        box-sizing: border-box;
        .table-box{
          width: 100%;
          border:1px solid #ccc;
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
              width: 37%;
              font-weight: 600;
            }
            td:nth-child(2){
              width: 40%;
              font-weight: 400;
              font-size: 9px;
              overflow: hidden;
            }
            td:nth-child(3){
              width: 23%;
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
