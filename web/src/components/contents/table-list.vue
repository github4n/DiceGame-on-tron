<template>
    <div class="table">
        <el-row>
            <div class="table-title">
                <img src="@/assets/images/icon4.png" alt="">
                <span class="table-list">{{$t('betting.LeaderBoard')}}</span>
                <!-- <span class="count-down"> (倒计时：{{partnerCountdown}}) </span> -->
            </div>
        </el-row>

        <el-row>
            <div class="table-header">
                <el-col :lg="6" :md="6" :sm="6" :xs="3">{{$t('betting.ranking')}}</el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="11">{{$t('betting.address')}}</el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="6">{{$t('betting.ticketsNumber')}}</el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="4">{{$t('betting.winningRate')}}</el-col>
            </div>
        </el-row>
        <div style="border: 1px #039074  solid;border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;">
        <el-row class="table-item" v-for='(item, index) in tableList' v-bind:key="index" >
            <div class="table-body" v-if="index == 0">
                <el-col :lg="6" :md="6" :sm="6" :xs="3">
                    <img src="@/assets/images/huangguan_1.png" alt=""> <span class="champion">{{item.id}}</span>
                </el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="11">
                    <span class="champion">{{item.pAddr}}</span>
                </el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="champion">{{item.count}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="champion">{{item.chance}}%</span></el-col>
            </div>

            <div class="table-body" v-if="index == 1">
                <el-col :lg="6" :md="6" :sm="6" :xs="3">
                    <img src="@/assets/images/huangguan_2.png" alt=""> <span class="runner-up">{{item.id}}</span>
                </el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="11"><span class="runner-up">{{item.pAddr}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="runner-up">{{item.count}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="runner-up">{{item.chance}}%</span></el-col>
            </div>

            <div class="table-body" v-if="index == 2">
                <el-col :lg="6" :md="6" :sm="6" :xs="3">
                    <img src="@/assets/images/huangguan_3.png" alt=""> <span class="bronze">{{item.id}}</span>
                </el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="11"><span class="bronze">{{item.pAddr}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="bronze">{{item.count}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="bronze">{{item.chance}}%</span></el-col>
            </div>

            <div class="table-body" v-if="index!=0 && index!=1 && index!=2">
                <el-col :lg="6" :md="6" :sm="6" :xs="3"><span class="norme">{{index+1}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="11"><span class="norme">{{item.pAddr}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="6"><span class="norme">{{item.count}}</span></el-col>

                <el-col :lg="6" :md="6" :sm="6" :xs="4"><span class="norme">{{item.chance}}%</span></el-col>
            </div>
        </el-row>
        </div>
    </div>
</template>

<script>
import { getUserLotteryTicketTop } from '@/service/api';
export default {
    name: 'TableList',
    
    data() {
        return {
            tableList: [
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
                // {'id': 1, 'addr': 'TRsjfiej34t5-5466yn9', 'trx': '1,180,000', 'fork': '10,000'},
            ],
            partnerRemainingTime: '',
            partnerTimer: '',
            partnerCountdown: '',
            partnerEndTime: ''
        } 
    },

    watch: {
        partnerRemainingTime(newVal, oldVal) {
            this.partnerCountdown = utils.translateTime(this.partnerRemainingTime);
            if(this.partnerRemainingTime == 0){
                clearTimeout(this.partnerTimer);
                this.partnerTimer = '';
                return;
            }
            this.partnerTimer = setTimeout(() => {
                this.partnerRemainingTime--;
            },1000);
        }
    },

    mounted(){
        // this.getUserLotteryTicketTop();
    },

    methods: {
        // getUserLotteryTicketTop(){
            /*getUserLotteryTicketTop().then(res =>{
                this.tableList = res;
            })*/
        // },


         /* 对获取倒计时时间的处理 */
        initParentCountDown() {
            let localSecon = parseInt(this.timest());
            let serviceSecon = this.partnerEndTime / 1000;
            if(localSecon < serviceSecon) {
                this.partnerRemainingTime = serviceSecon - localSecon; // 还剩余多长时间
                this.partnerRemainingTime--;
            }
        },
    }
}
</script>

<style lang='less' scoped>
    .table{
        width: 920px;
        margin: 0 auto;
        .table-title {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 20px 0;

            img{
                width: 30px;
                margin-right: 10px;
            }

            .table-list {
                font-size: 18px;
                color: #fff;
                margin-right: 10px;
            }

            .count-down{
                font-size: 14px;
                color: #fff;
            }
        }

        .table-header {
            height: 46px;
            line-height: 46px;
            background: #039074;
            color: #fff;
            font-size: 18px;
            //border-radius: 4px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        .table-item {
            line-height: 36px;
            //border: 1px #039074  solid;
            //background: #162a34;
            // border-radius: 4px;
            .table-body {
                font-size: 13px;
                .champion{
                    color: #FFC41F;

                }

                .runner-up{
                    color: #BDBDBD;
                }

                .bronze{
                    color: #66553C;
                }

                .norme{
                    color: #FFFFFF;
                }
            }
        }
    }   
</style>
