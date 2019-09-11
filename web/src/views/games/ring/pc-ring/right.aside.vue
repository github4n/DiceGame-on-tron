<template>
    <div class="aside-box">
        <el-row>
            <ul v-if="isPcDevice" class='pc-aside'>
                <li style='list-style:none;' v-for="(item,index) in historyList" v-bind:key="index">
                    <!-- <el-tooltip class="item" effect="dark" placement="bottom-end" width="100"> -->
                        <!-- <div slot="content"><span style="color: #039074">Salt:</span><br/>{{item.salt}}<br/><span style="color: #039074">Hash:</span><br/>{{item.hash}}</div> -->
                        <div v-show ='item.lotteryNum == 1' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-2x1"></div>
                        </div>
                    <!-- </el-tooltip> -->

                    <!-- <el-tooltip class="item" effect="dark" placement="bottom-end"> -->
                        <!-- <div slot="content"><span style="color: #1977ce">Salt:</span><br/>{{item.salt}}<br/><span style="color: #1977ce">Hash:</span><br/>{{item.hash}}</div> -->
                        <div v-show ='item.lotteryNum == 2' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-3x1"></div>
                        </div>
                    <!-- </el-tooltip> -->

                    <!-- <el-tooltip class="item" effect="dark" placement="bottom-end"> -->
                        <!-- <div slot="content"><span style="color: #8541af">Salt:</span><br/>{{item.salt}}<br/><span style="color: #8541af">Hash:</span><br/>{{item.hash}}</div> -->
                        <div v-show ='item.lotteryNum == 3' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-5x1"></div>
                        </div>
                    <!-- </el-tooltip> -->

                    <!-- <el-tooltip class="item" effect="dark" placement="bottom-end"> -->
                        <!-- <div slot="content"><span style="color: #FBC904">Salt:</span><br/>{{item.salt}}<br/><span style="color: #FBC904">Hash:</span><br/>{{item.hash}}</div> -->
                        <div v-show ='item.lotteryNum == 4' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-30x1"></div>
                        </div>
                    <!-- </el-tooltip> -->
                </li>
            </ul>
            <div v-else class="mobile-aside" style='padding: 0px 10px;box-sizing:border-box;'>
                <div v-for="(item,index) in historyList" v-bind:key="index">
                    
                        <div v-show ='item.lotteryNum == 1' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-2x"></div>
                        </div>
                    

                    
                        <div v-show ='item.lotteryNum == 2' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-3x"></div>
                        </div>
                    

                    
                        <div v-show ='item.lotteryNum == 3' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-5x"></div>
                        </div>
                    

                   
                        <div v-show ='item.lotteryNum == 4' class='aside-list' @click='getFairData(item.gId)'>
                            <div class="bet-record-30x"></div>
                        </div>
                   
                </div>
                
            </div>
        </el-row>

        <ring-fair  :baseInfo='baseInfo' v-show="showFairDialog" @closeFairModule='closeFairModule'></ring-fair>
        

        <!-- <app-fair :baseInfo1='baseInfo1' v-show="showAppFairDialog" @closeAppFairModule='closeAppFairModule'></app-fair> -->
    </div>
</template>

<script>
import RingFair from '../../../../components/dialog/ring-fair.vue';
import appFair from '../../../../components/app-dialog/app-ring-fair.vue';
import { getHistory , ringGetVerifyRandom } from '@/service/api';
import { all } from 'q';
export default {
    name: 'rightAside',

    components:{ RingFair , appFair }, 

    // props: {
    //     historyList: {
    //         type: Array,
    //         default: ()=> []
    //     }
    // },

    data(){
        return {
             historyList:[],
             isPcDevice: this.$isPcDeviceType,
             showFairDialog: false,
             showAppFairDialog: false,
             baseInfo: {},
             //baseInfo1: {},
             //baseInfo1: {},
        }
    },

    mounted(){
        this.getHistory();
        //this.initData();
    },

    methods:{
        // initData(){
        //     this.interval = setInterval(this.getHistory, 1000);
        // },

        getHistory(){
            getHistory().then(res =>{
                this.historyList = res.reverse();
                //this.historyList = res
            })
        },

        getFairData(info) {
            this.showFairDialog = true;
            let params = {'GId':  info}
            // let params = {'Addr':  'TGahEPj2Nr6EbvdXW3rFH9BUR6oXxoaXVW'}
            ringGetVerifyRandom(params).then( res => {
                this.baseInfo = res;
            //this.showFairDialog = true;
            })
        },

        closeFairModule() {
            this.showFairDialog = false;
        },

        // getAppFairData(info) {
        //     this.showAppFairDialog = true;
        //     let params = {'GId':  info}
        //     // let params = {'Addr':  'TGahEPj2Nr6EbvdXW3rFH9BUR6oXxoaXVW'}
        //     ringGetVerifyRandom(params).then( res => {
        //         this.baseInfo1 = res;
        //     //this.showFairDialog = true;
        //     })
        // },

        // closeAppFairModule() {
        //     this.showAppFairDialog = false;
        // },

        a(){
            this.getHistory();
        }
    }
}
</script>

<style lang="less" scoped>
    .aside-list{
        //width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 6px;
        cursor: pointer;
        .bet-record-2x{
            border-radius: 5px;
            background: #00E9E1;
            margin-bottom: 10px;
            height: 30px;
            width: 5px;
        }
        .bet-record-2x1{
            border-radius: 5px;
            background: #00E9E1;
            margin-bottom: 10px;
            height: 5px;
            width: 50px;
        }

        .bet-record-3x{
            border-radius: 5px;
            background: #827EF1;
            margin-bottom: 10px;
            height: 30px;
            width: 5px;
        }
        .bet-record-3x1{
            border-radius: 5px;
            background: #827EF1;
            margin-bottom: 10px;
            height: 5px;
            width: 50px;
        }

        .bet-record-5x{
            border-radius: 5px;
            background: #FFFFFF;
            margin-bottom: 10px;
            height: 30px;
            width: 5px;
        }
        .bet-record-5x1{
            border-radius: 5px;
            background: #FFFFFF;
            margin-bottom: 10px;
            height: 5px;
            width: 50px;
        }

        .bet-record-30x{
            margin-bottom: 10px;
            border-radius: 5px;
            background: #FFC559;
            height: 30px;
            width: 5px;
        }
        .bet-record-30x1{
            margin-bottom: 10px;
            border-radius: 5px;
            background: #FFC559;
            height: 5px;
            width: 50px;
        }
    }
    
    .aside-content{
        padding: 10px;
    }
    
</style>