<style lang="less">
    @import '../style/common.less';
    @import '../style/index.less';
</style>
 
<template>
<div>
    <div class="main" @click="diss"> 
        <app-header v-if="!isPcDeviceType"></app-header>
        <app-chatroom  ref='chatroom' v-if="!isPcDeviceType"></app-chatroom>
        <div v-if="isPcDeviceType" class='content1' >
            <left></left>
            <div  class='header-box'>
                <pc-header v-if="isPcDeviceType"></pc-header>
                <div class="main-content1">
                    <!-- <vue-slider></vue-slider> -->
                    <div class='main-center'>
                        <router-view></router-view>
                    </div>
                </div>
                <div class='footer-box' v-if="isPcDeviceType"  style="background:#181845;height: 60px;line-height: 60px;">
                    <div class='footer-line'></div>
                    <p class='res' style="color:#fff;font-family: -webkit-body;padding:0px 40px;margin:0;">{{$t('inviterPage.Details')}}</p>
                    <div class='footer-line'></div>
                </div>
            </div>
        </div>
        
        <div v-if="!isPcDeviceType" class="main-content3">
            <router-view></router-view> 
        </div> 
    </div>
    <div class="footer-fixe">
        <app-footer v-if="!isPcDeviceType"></app-footer>
    </div>
</div>
</template>
  
<script>
import pcHeader from '../components/public/header' // 头部
import pcFooter from '../components/public/footer' // 底部

import appHeader from '../components/public/app-header' // 头部
import appFooter from '../components/public/app-footer' // 底部
import vueSlider from '../components/public/vue-slider' // 公告
import left from '../components/public/left'

import appChatroom from '@/views/app-components/app-chatroom' // 排行

export default {
    components: { pcHeader , appHeader , vueSlider , pcFooter , appFooter , left , appChatroom},

    data(){
        return {
            isPcDeviceType: this.$isPcDeviceType
        }
    },

    methods:{
        diss(){
            let a = this.$refs.chatroom;
        }
    }
}
</script>

<style lang="less" scoped>

@media screen and (max-width: 1440px) and (min-width: 992px) {
    .main{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-weight: 400;
        vertical-align: initial;
        box-sizing: border-box;
        background: #141F27;
        .content1{
            width: 1200px;
            height: 100%;
            display: flex;
            margin: 0 auto;
            position: relative;
            overflow-x: hidden;
            .header-box{
                width: 1010px;
                position: relative;
                left: 190px;
            }
            .main-content1{
                width: 1010px;
                box-sizing: border-box;
                position: relative;
                .main-center{
                    width: 1010px;
                    margin: 0 auto;
                }
            }
            .footer-box{
                width: 1010px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0px 80px;
                box-sizing: border-box;
                .footer-line{
                    width: 30%;
                    height: 1px;
                    background: #fff;
                }
                .res{
                    font-size: 14px;
                }
            }
        }
        
    }
}

@media screen and (max-width: 3000px) and (min-width: 1440px) {
    .main{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-weight: 400;
        vertical-align: initial;
        box-sizing: border-box;
        background: #141F27;
        .content1{
            width: 1440px;
            height: 100%;
            display: flex;
            margin: 0 auto;
            position: relative;
            .header-box{
                width: 1250px;
                position: relative;
                    left: 190px;
                }
            .main-content1{
                width: 1250px;
                box-sizing: border-box;
                .main-center{
                    width: 1250px;
                    margin: 0 auto;
                }
            }
            .footer-box{
                width: 1250px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0px 80px;
                box-sizing: border-box;
                .footer-line{
                    width: 30%;
                    height: 1px;
                    background: #fff;
                }
                .res{
                    font-size: 14px;
                }
            }
        }
    }
}
@media screen and (max-width: 500px) {
    .main{
        width: 100%;
        height: 100%;
        position: relative;
        margin-bottom: 40px;
        background: #141F27;
    }
    .footer-fixe{
        width: 100%;
        left:0px;
        position: fixed;
        z-index: 99;
        bottom: 0px;
        // background: #141F27;
    }
}
  
</style>