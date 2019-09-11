<template>
    <div align="center" class="home">
        <div class="home-content" >
            <el-row>
                <div v-if="isPcDeviceType">
                    <pc-banner></pc-banner>
                </div>
                <div v-else>
                    <!-- <app-chatroom></app-chatroom> -->
                    <app-banner></app-banner>
                </div>

            </el-row> 

            <el-row :gutter="15">
                <iframe @load="onGameLoad" src="/static/tower/index.html" class="game-frame" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
            </el-row>

            <el-row>
                <div class="bet-content"><bet-box ref="betbox"></bet-box></div>
            </el-row>

            <el-row>
                <div class="bet-content"><phase ref="phasework"></phase></div>
            </el-row>

            <el-row><ranking></ranking></el-row>

            <el-row><ranking_1 ref="ranking_1"></ranking_1></el-row>
        </div>
    </div>
</template>

<script>
    import pcBanner from '@/views/components/banner' // 轮盘组件
    import appBanner from '@/views/app-components/app-banner' // 轮盘组件
    import betBox from './pc-tree/bet' // 投注框
    import phase from '@/views/components/phase' // 阶段投注框
    import ranking_1 from './pc-tree/ranking_1' // 排行
    import ranking from '@/views/components/ranking'
    import appChatroom from '@/views/app-components/app-chatroom' // 排行
    import utilsTron from '@/utilsTron';

    export default {
        name: 'home',

        components: {pcBanner, appBanner, betBox, phase, ranking_1, ranking, appChatroom},

        computed: {
            'tronwebObj': function() {
                return this.$store.getters.GET_RING_TRON_WEB;
            },

            'tranwebToken': function() {
                return this.$store.getters.GET_RING_TRON_WEB_TOKEN;
            },
            'langularType': function(){
                return this.$store.getters.GET_LANGUAR_TYPE;
            }
        },

        mounted () {
            // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
            window.addEventListener('message', this.handleMessage);
        },

        data() {
            return {
                hisDataList: [],
                isPcDeviceType: this.$isPcDeviceType,
            }
        },
        
        created() {
            // this.checkChromPlug();
        },

        methods: {
            async checkChromPlug() {
                // 1. check variable, 检查tronweb是否已经加载
                if(window.tronWeb) {
                    //console.log(window.tronWeb.contract,22)
                    //console.log('检查tronweb是否已经加载');
                    let tronweb = window.tronWeb;
                    // 2. check node connection，检查所需要的API是否都可以连通
                    const nodes = await tronWeb.isConnected();
                    const connected = !Object.entries(nodes).map(([name, connected]) => {
                        if (!connected) {
                            console.error(`Error: ${name} is not connected`);
                        }
                        return connected;
                    }).includes(false);
                    if (connected) {
                        //console.log('一切正常。');
                        this.$store.commit('SET_RING_TRON_WEB', tronweb);
                        this.checkTronLinkToken();
                    } else {
                        setTimeout(async () => {
                            await this.checkChromPlug();
                        }, 100);
                    }
                } else {
                    // 如果检测到没有注入tronWeb对象，则等待100ms后重新检测
                    // console.log('等待500ms后重新检测');
                    setTimeout(async () => {
                        await this.checkChromPlug();
                    }, 500);
                }
            },

            checkTronLinkToken() {
                if(this.tronwebObj) {
                    this.$store.commit('SET_RING_TRON_WEB',window.tronweb);
                    if(this.tronwebObj.defaultAddress.hex && this.tronwebObj.defaultAddress.base58){
                        let base58Name = '';
                        if(this.tronwebObj.defaultAddress.base58.length > 15){
                            this.$store.commit('SET_RING_TRON_WEB',window.tronweb);
                            base58Name = this.tronwebObj.defaultAddress.base58.substring(0,5) + '...' + this.tronwebObj.defaultAddress.base58.substring(this.tronwebObj.defaultAddress.base58.length-5, this.tronwebObj.defaultAddress.base58.length)
                        }else{
                            base58Name = this.tronwebObj.defaultAddress.base58;
                        }
                        this.$store.commit('SET_RING_TOKEN', this.tronwebObj.defaultAddress.base58);
                        utilsTron.setTronWeb(this.tronwebObj);
            
                        this.$refs.phasework.getMintLevelAndOverage();
                        this.$refs.betgroup.getWager();
                        this.$refs.betbox.getFreeBalanceOf(this.tronwebObj.defaultAddress.base58);
                        this.$refs.betbox.getBalanceOf(this.tronwebObj.defaultAddress.base58);
                        // this.$refs.betbox.getFreeBalanceOf();
                        // this.initTrontData(this.tronwebObj.defaultAddress.base58);
                    } else {
                        this.$message({
                            message:  this.$t('betting.PleaseTronLink'),
                            type: 'error'
                        });
                    }
                }
            },

            hisList(data) {
                this.hisDataList = data;
            },

            onGameLoad(event) {
                this.gameWindow = event.target.contentWindow;
                this.gameWindow.postMessage('hello world','*');
            },

            start_bet() {
                this.gameWindow.postMessage('{\"cmd\":\"startBet\"}','*');
            },

            start_bet_cb(resultNum) {
                this.gameWindow.postMessage('{\"cmd\":\"startBetBack\",\"resultNum\":' + resultNum + '}','*');
            },

            set_autobet(isAutoBet) {
                var sAutoBet = isAutoBet ? 'true' : 'false';
                this.gameWindow.postMessage('{\"cmd\":\"setAutoBet\",\"autoBet\":\"' + sAutoBet + '\"}','*');
            },

            cancel_bet(){
                this.gameWindow.postMessage('{\"cmd\":\"cancelBet\"}','*');
            },

            handleMessage(e) {
                const data = e.data;
                console.log(data);

                var sMsg = JSON.stringify(data);
                if (sMsg.indexOf('cmd') == -1){
                    return;
                }

                switch (data.cmd) {
                    case 'start_bet':
                        this.$refs.betbox.startBetBack(Number(data.strength));
                        this.$refs.ranking_1.setLastBetId();
                        // 业务逻辑
                        break;
                }
            }

        },
    }
</script>

<style>
    .home-content{
        margin: 0px auto;
    }

    .el-tooltip__popper {
        max-width: 18%;
    }

    .game-frame {
        width: 100vw;
        height: 105vw;
    }

    @media screen and (max-width: 1440px) and (min-width: 992px) {
        .aside-content{
            width: 200px;
            box-sizing: border-box;
            float: right;
        }

        .game-frame {
            width: 600px;
            height: 630px;
        }
    }

    @media screen and (max-width: 3000px) and (min-width: 1440px) {
        .aside-content{
            width: 300px;
            box-sizing: border-box;
        }

        .game-frame {
            width: 600px;
            height: 630px;
        }
    }
</style>
