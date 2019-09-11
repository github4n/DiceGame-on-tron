<template>
    <div align="center" class="home">
        <div class="home-content" >
            <el-row>
                <div v-if="isPcDeviceType">
                    <!-- <pc-banner></pc-banner> -->
                </div>
                <div v-else>
                    <!-- <app-chatroom></app-chatroom> -->
                    <!-- <app-banner></app-banner> -->
                </div>

            </el-row>
            <!--el-row>
                <div class="wrapper" ref="wrapper">
                <ul class="ulName">
                <li class="liName" v-for="(img, index) in imgArray" :key="index">
                    <a href="#">
                        <img class="person-item" :src='img'>
                    </a>
                </li>
                </ul>
                </div>
            </el-row>

            <el-row :gutter="15">
                <el-col :lg="18" :md="18" :sm="16" :xs="24">
                    <div class="roulette-content block-box">
                        <roulette @hisList="hisList"></roulette>
                    </div>
                </el-col>

                <el-col :lg="6" :md="6" :sm="8" :xs="24">
                    <div class="aside-content">
                        <right-aside :historyList="hisDataList"></right-aside>
                    </div>
                </el-col>
            </el-row-->

            <el-row>
                <div class="bet-content1"><bet-box ref="betbox"></bet-box></div>
            </el-row>

            <el-row>
                <div v-if="isPcDeviceType">
                    <div class="bet-content"><phase ref="phasework"></phase></div>
                </div>
                <div v-else>
                    <div class="bet-content"><app-phase ref="phasework"></app-phase></div>
                </div>
               
            </el-row>

            <el-row><bet-group ref="betgroup"></bet-group></el-row>

            <el-row>
                <div v-if="isPcDeviceType">
                    <pc-table></pc-table>
                </div>
                <div v-else>
                    <app-table></app-table>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import pcBanner from '@/views/components/banner' // 轮盘组件
    import appBanner from '@/views/app-components/app-banner' // 轮盘组件
    import roulette from './pc-ring/roulette' // 轮盘组件
    import rightAside from './pc-ring/right.aside' // 右侧排行榜
    import betBox from './pc-ring/bet' // 投注框
    import phase from '@/views/components/phase' // 阶段投注框
    import appPhase from './app-ring/app-phase' // 阶段投注框
    import betGroup from './pc-ring/bet.group' // 投注分组条目数据
    import pcTable from '@/views/components/table-list' // 排行
    import appTable from '@/views/app-components/app-rankList' // 排行
    import appChatroom from '@/views/app-components/app-chatroom' // 排行
    import utilsTron from '@/utilsTron'
    import bg1 from '@/assets/images/bg1.png'
    import bg2 from '@/assets/images/bg2.png'
    import bg3 from '@/assets/images/bg3.png'
    import bg4 from '@/assets/images/bg4.png'
    import BScroll from 'better-scroll'

    export default {
        name: 'home',

        components: {pcBanner , appBanner , roulette, rightAside, betBox, phase, appPhase , pcTable, appTable , betGroup , appChatroom},

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

        data() {
            return {
                hisDataList: [],
                isPcDeviceType: this.$isPcDeviceType,
                mark: 0, //比对图片索引的变量
                imgArray: [
                    bg1,
                    bg2,
                    bg3,
                    bg4,
                    bg1,
                    bg2,
                    bg3,
                    bg4,
                    bg1,
                    bg2,
                    bg3,
                    bg4,
                    bg1,
                    bg2,
                    bg3,
                    bg4,
                ]
            }
        },
        
        created() {
            // this.checkChromPlug();
            //window.onload = this.play;
        },

        methods: {
            play () {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.wrapper, {
                            //click: true,
                            scrollX: true,
                            scrollY: false,
                            //eventPassthrough: "vertical"
                            snap: {
                                loop: true, // 开启循环播放
                                stepX: 35, // 每页宽度为 200px
                                stepY: 45, // 每页高度为 100px
                                threshold: 0.3, // 滚动距离超过宽度/高度的 30% 时切换图片
                                speed: 400 // 切换动画时长 400ms
                            },
                        });
                        //this.scroll.directionX = 1;
                        //this.scroll.minScrollX = 35*16,
                        this.scroll.on('touchEnd', this.touchStart);
                    } else {
                        this.scroll.refresh();
                    }
                });
            },

            touchStart(pos){
                //this.scroll.scrollToElement(this.scroll.scroller.children[3], 1, true, true, this.scroll.scroller.easeBackIn);
                this.scroll.scrollTo(-100, 0);
                this.scroll.hasHorizontalScroll = true;
                this.scroll.maxScrollX = -1289;
                //this.scroll.wrapperWidth = 35*16;
                //this.scroll.refresh();
            },

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

        },
    }
</script>

<style lang='less'>
    .home-content{
        /* //width: 1200px; */
        margin: 0px auto;
        overflow:hidden;
        background: url(../../../assets/img/bg1.png) no-repeat;
        background-size: 100% 100%; 
        box-sizing: border-box;
        .bet-content1{
            background: url(../../../assets/img/bg.png) no-repeat;
            background-size: 100% 100%; 
            margin-top: 10px;
        }
    }

    .wrapper{
        /*position: absolute;*/
        left: 0;
        top: 0;
        overflow: hidden;
    }
    .ulName{
        display:inline;
        white-space:nowrap;
        overflow:hidden;
        padding:0px;
        margin: 0px;
        width: 560px;
    }
    .liName{
        width: 35px;
        padding:0px;
        display: inline-block;
        margin: 0px;
        overflow-x: auto;

        float: left;
    }
    .person-item {
        /*display: inline-block;*/
        height: 80%;
        width: 80%;
        /*margin-right: 10px;
        border: 1px solid #ccc;*/
    }


    .image-enter-active {
        transform: translateX(0);
        transition: all 1.5s ease;
    }
    .image-leave-active {
        transform: translateX(-100%);
        transition: all 1.5s ease;
    }
    .image-enter {
        transform: translateX(100%);
    }
    .image-leave {
        transform: translateX(0);
    }

    @media screen and (max-width: 1440px) and (min-width: 992px) {
        .home-content{
            /* //width: 1200px; */
            margin: 0px auto;
            overflow:hidden;
            background: url(../../../assets/img/bg1.png) no-repeat;
            background-size: 100% 100%; 
            box-sizing: border-box;
            .bet-content1{
                background: url(../../../assets/img/bg.png) no-repeat;
                background-size: 100% 100%; 
                margin-top: 10px;
            }
        }
        .roulette-content{
            width: 810px;
        }
        .aside-content{
            width: 200px;
            box-sizing: border-box;
            float: right;
        }
    }

    @media screen and (max-width: 3000px) and (min-width: 1440px) {
        .home-content{
            /* //width: 1200px; */
            margin: 0px auto;
            overflow:hidden;
            background: url(../../../assets/img/bg1.png) no-repeat;
            background-size: 100% 100%; 
            padding: 0px 25px;
            box-sizing: border-box;
            .bet-content1{
                background: url(../../../assets/img/bg.png) no-repeat;
                background-size: 100% 100%; 
                margin-top: 10px;
            }
        }
        .roulette-content{
            width: 900px;
        }
        .aside-content{
            width: 300px;
            box-sizing: border-box;
        }
    }
</style>
