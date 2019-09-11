<template>
<div  class='tc-box'>
    <!--audio id="eventAudio" autoplay loop="true" preload="auto"></audio-->
    <div id="leftDiv">
    <div class="tuClass" @click='complete(0)' >
        <img width='140' src="../../assets/img/left.png">
    </div>
    <div class='sliders-list'>
        <router-link :to="{ path: '/', query:{from:fromAdd}}" style='text-decoration: none;'>
            <div class='list-item first-item' :class="{'current': selIndex == 1}" @click='complete(1)'>
                <div v-show='HomeShow' class='list-picture'>
                    <img class='picture' src="../../assets/imge/home_no_click.png">
                    <p class='list-title' style='color:#fff;opacity: 0.5;'>Home</p>
                </div>
                <div v-show='!HomeShow' class='list-picture'>
                    <img class='picture' src="../../assets/imge/home_click.png">
                    <p class='list-title'>Home</p>
                </div>
            </div>
        </router-link>

        <div class='list-item game-item' :class="{'current': selIndex == 2}" @click='complete(2)'>
            <div class='list-picture' v-show='GamesShow'>
                <img class='picture' src="../../assets/imge/game_no_click.png">
                <p class='list-title'  style='color:#fff;opacity: 0.5;'>Games</p>
            </div>
            <div class='list-picture' v-show='!GamesShow'>
                <img class='picture' src="../../assets/imge/game_click.png">
                <p class='list-title'>Games</p>
            </div>
        </div>

        <div class='games-style' v-show='gamesShow'>
            <router-link :to="{ path: '/dice' , query:{from:fromAdd}}" style='text-decoration: none;'>
                <div class='games-item games-item top-item' :class="{'current1': selIndex1 == 1}" @click='complete1(1)'>
                    <div class='list-picture'  v-show='diceShow' >
                        <img class='picture' src="../../assets/imge/dice_no_click.png">
                        <p class='list-title'  style='color:#fff;opacity: 0.5;'>{{$t('betting.Dice')}}</p>
                    </div>
                    <div class='list-picture'  v-show='!diceShow' >
                        <img class='picture' src="../../assets/imge/dice_click.png">
                        <p class='list-title'>{{$t('betting.Dice')}}</p>
                    </div>
                </div>
            </router-link>

            <router-link :to="{ path: '/ring', query:{from:fromAdd}}" style='text-decoration: none;'>
                <div class='games-item' :class="{'current1': selIndex1 == 2}" @click='complete1(2)'>
                    <div class='list-picture' v-show='ringShow'>
                        <img class='picture' src="../../assets/imge/tr_no_click.png">
                        <p class='list-title'  style='color:#fff;opacity: 0.5;'>{{$t('betting.RotaryTable')}}</p>
                    </div>
                    <div class='list-picture' v-show='!ringShow'>
                        <img class='picture' src="../../assets/imge/tr_click.png">
                        <p class='list-title'>{{$t('betting.RotaryTable')}}</p>
                    </div>
                </div>
            </router-link>
        </div>

        

        <div class='list-item' :class="{'current': selIndex == 3}" @click='complete(3)'>
            <div class='list-picture' v-show='ChatroomShow'>
                <img class='picture' src="../../assets/imge/chatroom_no_click.png">
                <p class='list-title'  style='color:#fff;opacity: 0.5;'>Chatroom</p>
            </div>
            <div class='list-picture' v-show='!ChatroomShow'>
                <img class='picture' src="../../assets/imge/chatroom_click.png">
                <p class='list-title'>Chatroom</p>
            </div>
        </div>

        <div class='list-item' :class="{'current': selIndex == 4}" @click='complete(4)'>
            <router-link :to="{ path: '/reward',query:{from:fromAdd} }" style='text-decoration: none;'>
                <div class='list-picture' v-show='ReferralShow'>
                    <img class='picture' src="../../assets/imge/movable_no_click.png">
                    <p class='list-title'  style='color:#fff;opacity: 0.5;'>Referral</p>
                </div>
                <div class='list-picture' v-show='!ReferralShow'>
                    <img class='picture' src="../../assets/imge/movable_click.png">
                    <p class='list-title'>Referral</p>
                </div>
            </router-link>
        </div>

        <div class='list-item' :class="{'current': selIndex == 5}" @click='complete(5)'>
            <div class='list-picture' v-show='MailboxShow'>
                <img class='picture' src="../../assets/imge/mail_no_click.png">
                <p class='list-title'  style='color:#fff;opacity: 0.5;'>Mailbox</p>
            </div>
            <div class='list-picture' v-show='!MailboxShow'>
                <img class='picture' src="../../assets/imge/mail_click.png">
                <p class='list-title'>Mailbox</p>
            </div>
        </div>
    </div>


    <ChatroomDialog v-show='isChatroomDialog' ref="ChatroomDialog" @closeContent='closeContent'></ChatroomDialog>
    <emailDialog v-show='isEmailDialog' ref="emailDialog" @closeEmailContent='closeEmailContent'></emailDialog>
    </div>
</div>
</template>
<script>

import ChatroomDialog from '../../components/dialog/chatroom-dialog'
//import bgMusic from '@/assets/sound/bg.mp3'

import emailDialog from '../../components/dialog/email-dialog'
export default {
   name: 'left',
   components: { ChatroomDialog , emailDialog},
   data () {
      return {
        gamesShow: false,
        isChatroomDialog: false,
        isEmailDialog: false,
        isPcDevice: this.$isPcDeviceType,
        // baseStepUrl: 'https://www.oscar.pro/dice/',
        // diceLink: 'https://www.oscar.pro/dice/', // dice游戏地址
        // ringLink: 'https://www.oscar.pro/ring/', // 轮盘游戏地址
        // treeLink: 'https://www.oscar.pro/tree/', // 铁塔游戏地址

        baseStepUrl: 'https://www.tronoscar.pro/dice/',
        diceLink: 'https://www.tronoscar.pro/dice/', // dice游戏地址
        ringLink: 'https://www.tronoscar.pro/ring/', // 轮盘游戏地址
        treeLink: 'https://www.tronoscar.pro/tree/', // 铁塔游戏地址

        selIndex: 0,
        selIndex1: 0,
        gamesShow: false,

        HomeShow: true,
        GamesShow: true,
        diceShow: true,
        ringShow: true,
        ChatroomShow: true,
        ReferralShow: true,
        MailboxShow: true,
        fromAdd: ''
      }
    },
    mounted(){
        this.initStepUrl();
    },
    methods:{
        playBGMusic(){
            let bgAudio = document.getElementById('eventAudio');
            bgAudio.setAttribute('src', bgMusic);
            bgAudio.load();

            setInterval(function () {
                if (bgAudio.paused){
                    bgAudio.play();
                }
            }, 3000);
        },

        initStepUrl() {
            this.fromAdd = this.$route.query.from;
            if(this.fromAdd) {
                this.diceLink = this.diceLink + '?from=' + this.fromAdd;
                this.ringLink = this.ringLink + '?from=' + this.fromAdd;
                this.treeLink = this.treeLink + '?from=' + this.fromAdd;
            }
        },

        complete(index){
            this.selIndex = index;
            if(this.selIndex == '1'){
                this.isChatroomDialog = false;
                this.gamesShow = false;

                this.HomeShow = false;
                this.GamesShow = true;
                this.ChatroomShow = true;
                this.ReferralShow = true;
                this.MailboxShow = true;
                this.selIndex1 = 0;
            }else if(this.selIndex == '2'){
                this.isChatroomDialog = false;
                this.gamesShow = true;
                //this.playBGMusic();

                this.HomeShow = true;
                this.GamesShow = false;
                this.ChatroomShow = true;
                this.ReferralShow = true;
                this.MailboxShow = true;
                this.selIndex1 = 0;
            }else if(this.selIndex == '3'){
                this.isChatroomDialog = true;
                this.messageContents = '';
                this.gamesShow = false;

                this.$refs.ChatroomDialog.checkChromPlug();
                this.$refs.ChatroomDialog.getChatHistoryInfo();

                this.HomeShow = true;
                this.GamesShow = true;
                this.ChatroomShow = false;
                this.ReferralShow = true;
                this.MailboxShow = true;
                this.selIndex1 = 0;
            }else if(this.selIndex == '4'){
                this.isChatroomDialog = false;
                this.gamesShow = false;

                this.HomeShow = true;
                this.GamesShow = true;
                this.ChatroomShow = true;
                this.ReferralShow = false;
                this.MailboxShow = true;
                this.selIndex1 = 0;
            }else if(this.selIndex == '5'){
                this.isEmailDialog = true;
                this.isChatroomDialog = false;
                this.gamesShow = false;

                this.HomeShow = true;
                this.GamesShow = true;
                this.ChatroomShow = true;
                this.ReferralShow = true;
                this.MailboxShow = false;
                this.selIndex1 = 0;
            }
        },

        complete1(index){
            this.selIndex1 = index;
            if(this.selIndex1 == '1'){
                this.ringShow = true;
                this.diceShow = false;
            }else if(this.selIndex1 == '2'){
                this.ringShow = false;
                this.diceShow = true;
            }
        },

         //弹框关闭方法
        closeContent(){
            this.isChatroomDialog = false;
        },

        closeEmailContent(){
            this.isEmailDialog = false;
        },
    }
    
}
</script>
<style lang='less' scoped>
.tc-box{
    width:190px;
    background:#13133C;
    position: fixed;
    height: 100%;
    z-index: 999;
    .tuClass{
        width:190px;
        height:100px;
        margin: 30px 0;
    } 
    .sliders-list{
        margin-top: 20px;
        .list-item{
          padding: 10px 0px 10px;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc; 
          .list-picture{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:10px 50px;
            .picture{
                width: 38px;
            }
            .list-title{
                font-size: 14px;
                font-weight: 700;
                color: #fff;
                text-align: center;
                line-height: 30px;
                position: relative;
                top: 4px;
                margin: 0px;
                margin-left: 10px;
                cursor: pointer;
            }
          }
          
        }

        .first-item{
            border-top: 1px solid #ccc;
        }

        .game-item{
            border-bottom: 1px solid #ccc;
        }

        .games-style{
            border-bottom: 1px solid #ccc;
            .games-item{
                //padding: 10px 0px 10px;
                box-sizing: border-box;
                .list-picture{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding:10px 35px 10px 55px;
                    .picture{
                        width: 25px;
                    }
                }
                .list-title{
                    font-size: 12px;
                    font-weight: 700;
                    color: #fff;
                    text-align: left;
                    line-height: 30px;
                    position: relative;
                    top: 4px;
                    margin: 0px;
                    width: 50px;
                    cursor: pointer;
                    
                }
            }
            
            .top-item{
                border-bottom: 1px solid #ccc;
            }
        }
    }
}

.current{
    background: #020229;
}

.current1{
    background: #020229;
}
</style>
 