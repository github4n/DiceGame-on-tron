<template>
  <div class="loss">
    <div class='loss-box'>
     <!--  <div class="header">
        <div class="header-title">
          <p class="title">{{$t('betting.rollUnderToWin')}}</p>
          <p class="val">{{baseValue}}</p>
        </div>
        <div class="header-title">
          <p class="title">{{$t('betting.payout')}}</p>
          <p class="val">{{odds}}X</p>
        </div>
        <div class="header-title">
          <p class="title">{{$t('betting.winChance')}}</p>
          <p class="val">{{probability}}</p>
        </div>
      </div> -->
      <div v-if="activeName=='first'" class="tab-pane1">{{probability}} {{$t('betting.winChance')}}</div><!-- CHANCE -->
      <div v-if="activeName=='second'" class="tab-pane1">{{probabilityOver}} {{$t('betting.winChance')}}</div><!-- CHANCE -->
      <div class="progress-bar">
        <div class="scale" id='bar'>
          <div id="sliderId" class="ant-slider-track"></div>
        </div>
        <div class="progress" id="btn">{{proValue}}</div>
      <!--   <div  v-show="randomNum > 0" class="progress-random blink"
          :class="{'active': randomNum > proValue}" id="btnRandomNumId">
          {{randomNum}} 
        </div> -->
      </div>
    </div>

    <login :baseValue='baseValue' :betPrice='betPrice' :activeName='activeName'></login>
  </div>
</template>

<script>
  import Login from './login.vue'; //登录

  export default {
    name: 'LOSS',
    components: { Login },
    props: ['betPrice','activeName'],
    data(){
      return{
        baseValue: 50, //小于该数获胜
        odds: 97 / (50-1), // 赔率
        oddsOver: 97 / (100-50), 
        probability: ((50 / 100)*100 - 1)+"%", //中奖概率
        probabilityOver: (100 -((50 / 100)*100))+"%", //over中奖概率 1/(100-50)%
        proValue: '',
        activeNameStatusData: this.activeName
      }
    },

    computed: {
      'randomNum': function() {
        if(this.$store.getters.GET_LOTTERY_NUMBER){
          // debugger
          let btnRandomNum = document.getElementById('btnRandomNumId');
          let proTotalNum = 850;
          let to = (proTotalNum / 100) * this.$store.getters.GET_LOTTERY_NUMBER;
          btnRandomNum.style.left = to + 'px';
        }
        return this.$store.getters.GET_LOTTERY_NUMBER;
      },
      'activeNameStatus':function(){
        let status = this.activeNameStatusData
        // debugger
        if(status=='first'){
          this.changeStyle1();
        }else if(status=='second'){
          this.changeStyle2();

        }
       /*  debugger
        return this.activeNameStatusData; */
      }
    },
    watch:{
      activeNameStatus (newV, oldV) { // watch监听props里status的变化，然后执行操作
        // console.log("newV:====>",newV, "oldV=====>",oldV)
        this.switchStatusData = newV
        // debugger
      }
    },
    mounted() {
      // this.changeStyle2()
      let vueThis = this;
      var scale = function (btn, bar, title, sliderId){
        this.btn = document.getElementById(btn);
        this.bar = document.getElementById(bar);
        this.title = document.getElementById(title);
        this.step = document.getElementById(sliderId);
        this.init();

       
      };

      scale.prototype = {
        init: function() {
          var that = this, g = document, b = window, m = Math;
          vueThis.proValue = 50;
          that.btn.style.left = 850 / 2 + 'px';
          this.step.style.width = Math.max(0, 850 / 2)+'px';
          that.btn.onmousedown = function (e){
            var x = (e||b.event).clientX;
            var l = this.offsetLeft;
            var max = that.bar.offsetWidth - this.offsetWidth;
            g.onmousemove = function (e) {
              var thisX = (e || b.event).clientX; 
              var to = m.min(max, m.max(-2, l + (thisX - x)));
              let numPos = m.round(m.max(0, to/max) * 100);
              vueThis.showOdds();
               if(vueThis.activeName=='first'){
                  if(numPos > 96 || numPos < 2){
                    return;
                  }else{
                    that.btn.style.left = to + 'px';
                    that.ondrag(that, numPos, to);
                    b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                  }
               }else if(vueThis.activeName=='second'){
                  if(numPos > 99 || numPos < 5){
                    return;
                  }else{
                    that.btn.style.left = to + 'px';
                    that.ondrag(that, numPos, to);
                    b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                  }
               }
             /*  if(numPos > 96 || numPos < 2){
                return;
              }else{
                that.btn.style.left = to + 'px';
                that.ondrag(that, numPos, to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
              } */
            };
            g.onmouseup = new Function('this.onmousemove=null');
          };
        },

        ondrag: function (that, pos, x) {
          // debugger
          this.step.style.width = Math.max(0,x)+'px';
          vueThis.proValue = pos;
          vueThis.baseValue = pos;
          if(vueThis.activeName=='first'){
            let pri = 97 / (pos-1);
            // let pri = (97 / (pos-1)).toFixed(4);
            // debugger
            vueThis.odds = pri;
            vueThis.probability = (((pos / 100)*100) - 1).toFixed(0)+"%";
          }else if(vueThis.activeName=='second'){
            // let pri = (97 / (100-pos)).toFixed(4);
            let pri = 97 / (100-pos);
            // vueThis.oddsOver = pri.substring(0,5);
            vueThis.oddsOver = pri;
            vueThis.probabilityOver = (100 -((pos / 100)*100)).toFixed(0)+"%";
            
          }
            // console.log("this.changeVal1111:======>",vueThis.activeName);
        },
        
      }

      new scale('btn', 'bar', 'title', 'sliderId');
    },
   
    methods: {
      changeStyle1(){
        $('.loss .loss-box .progress-bar .scale .ant-slider-track').css('background','#00E9E1');
        $('.loss .loss-box .progress-bar .scale').css('background','#565656');
      },
      changeStyle2(){
        // debugger
        $('.loss .loss-box .progress-bar .scale .ant-slider-track').css('background','#565656  !important');
        $('.loss .loss-box .progress-bar .scale').css('background','#00E9E1 !important');
      },
      showOdds(){
        let obj = {
          odds:this.odds,
          oddsover:this.oddsOver
        }
        this.$emit("showOdds",obj)
      }, 
    }
  }
</script>

<style lang='less'>
  /* 定义keyframe动画，命名为blink */
  @keyframes blink{
    0%{opacity: 1;}
    100%{opacity: 0;}
  }
  /* 添加兼容性前缀 */
  @-webkit-keyframes blink {
      0% { opacity: 1; }
      100% { opacity: 0; }
  }
  @-moz-keyframes blink {
      0% { opacity: 1; }
      100% { opacity: 0; }
  }
  @-ms-keyframes blink {
      0% {opacity: 1; }
      100% { opacity: 0;}
  }
  @-o-keyframes blink {
      0% { opacity: 1; }
      100% { opacity: 0; }
  }
  /* 定义blink类*/
  .blink{
      color: #dd4814;
      animation: blink 1s linear infinite;
      /* 其它浏览器兼容性前缀 */
      -webkit-animation: blink 1s linear infinite;
      -moz-animation: blink 1s linear infinite;
      -ms-animation: blink 1s linear infinite;
      -o-animation: blink 1s linear infinite;
  }

  

  @media screen and (max-width: 1440px) and (min-width: 992px) {
    .loss{
      width: 100%;
      .loss-box{
        width: 998px;
        margin: 0 auto;
        // padding: 10px 0px;
        padding-bottom: 15px;
        // background:#141F27;
        border-radius:4px;
        .header{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .header-title{
            .title{
              font-size: 15px;
              color: #fff;
            }
            .val{
              font-size: 32px;
              color: #fff;
              padding: 0;
              margin: 0;
            }
          }
        }
         .tab-pane1{
          width:900px;
          text-align: right;
        }
        .progress-bar{
          margin-top: 10px;
          margin-left: 46px;
          position: relative;
          .scale{
            height: 20px;
            width: 900px;
            // margin: 0 auto;
            position: relative;
            border-radius:20px;
            background:#565656;
            .ant-slider-track{
              position: absolute;
              // background:#039074;
              background:#00E9E1;
              border-radius:20px;
              height: 20px;
            }
          }

          .progress{
            position: absolute;
            cursor: pointer;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 50%;
            font-size: 18px;
            border: 5px solid #565656;
            // background:linear-gradient(0deg,rgba(28,28,28,1),rgba(86,86,86,1));
            // color: #fff;
            background: linear-gradient(0deg, #fff, #fff);
            color: #181845;
            font-weight: 900;
            top: -80%;
          }

          .progress-random{
            position: absolute;
            cursor: pointer;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            border-radius: 50%;
            font-size: 12px;
            border: 2px solid #12625e;
            background: #084744;
            color: #fff;
            top: 10;
            left: 0; //
          }

          .active{
            border: 2px solid #6d1912;
            background: #500c07;
          }

        }
      }
    }
  }

  @media screen and (max-width: 3000px) and (min-width: 1440px) {
    .loss{
      width: 100%;
      .loss-box{
        width: 991px;
        margin: 0 auto;
        padding-bottom: 15px;
        // padding: 10px 100px;
        // padding-bottom: 50px;
        // background:#141F27;
        border-radius:4px;
        .header{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .header-title{
            .title{
              font-size: 15px;
              color: #fff;
            }
            .val{
              font-size: 32px;
              color: #fff;
              padding: 0;
              margin: 0;
            }
          }
        }
        .tab-pane1{
          width:900px;
          text-align: right;
        }
        .progress-bar{
          margin-top: 10px;
          margin-left: 46px;
          // margin-top: 50px;
          position: relative;

          .scale{
            width: 900px;
            height: 20px;
            // margin: 0 auto;
            position: relative;
            background:#565656;
            border-radius:20px;
            .ant-slider-track{
              position: absolute;
              // background:#039074;
              background:#00E9E1;
              border-radius:20px;
              height: 20px;
            }
          }

          .progress{
            position: absolute;
            cursor: pointer;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 50%;
            font-size: 18px;
            border: 5px solid #565656;
            // background:linear-gradient(0deg,rgba(28,28,28,1),rgba(86,86,86,1));
            // color: #fff;
            background: linear-gradient(0deg, #fff, #fff);
            color: #181845;
            font-weight: 900;
            top: -80%;
          }

          .progress-random{
            position: absolute;
            cursor: pointer;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            border-radius: 50%;
            font-size: 12px;
            border: 2px solid #12625e;
            background: #084744;
            color: #fff;
            top: 10;
            left: 0; //
          }

          .active{
            border: 2px solid #6d1912;
            background: #500c07;
          }

        }
      }
    }
  }

 
</style>
