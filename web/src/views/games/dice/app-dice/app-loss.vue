<template>
  <div class="">
    <div class='app-loss-box'>
      <div class='bet-number'>
        <!-- <div class='number'>{{baseValue}}</div>  -->
        <!-- <div class='bet-team'>
          <div class='bet-under' :class='{"current": currentIndex == 1}' @click="changeBet(1)">Under</div>
          <div class='bet-over'  :class='{"current": currentIndex == 2}' @click="changeBet(2)">Over</div>
        </div> -->
      </div>
      <div class="header">
        <!-- <div class="header-title">
          <p class="title">{{$t('betting.payout')}}</p>
          <p class="val">{{odds}}X</p> 
        </div>

        <div class="header-title">
          <p class="title">{{$t('betting.rollUnderToWin')}}</p>
          <p class="val" style="font-size:24px;font-weight:600;color:#a78d65">{{baseValue}}</p>
        </div> -->

        <div class="header-title" style='margin-right: 0px;position:relative;top:8px;'>
          <p v-if="activeNameApp=='first'" class="title">{{probability}} {{$t('betting.winChance')}}</p>
          <p v-if="activeNameApp=='second'" class="title">{{probabilityOver}} {{$t('betting.winChance')}}</p>
        </div>
      </div>
      <div class="progress-bar">
        <div class="scale" id='bar'>
          <div id="sliderId" class="ant-slider-track"></div>
        </div>
        <div class="progress" id="btn">{{proValue}}</div>
      </div>
     <!--  <div class="progress-bar">
        <div class="scale" id='bar'>
          <div id="sliderId" class="ant-slider-track"></div>
        </div>
        <div class="progress" id="btn">{{proValue}}</div>
        <div v-show="randomNum > 0" class="progress-random blink" :class="{'active': randomNum > proValue}" id="btnRandomNumId">{{randomNum}}</div>
      </div> -->
    </div>

    <app-login :baseValue='baseValue' :odds='odds' :betPrice='betPrice'  :activeNameApp='activeNameApp'></app-login>
  </div>
</template>

<script>
  import appLogin from './app-login.vue'; //登录

  export default {
    name: 'LOSS',

    components: { appLogin },

    props: ['betPrice','activeNameApp'],

    data(){
      return{
        baseValue: 50, //小于该数获胜
        odds: (97 / (50-1)), // under 赔率 /* .toFixed(3) */
        oddsOver: (97 / (100-50)), /* over 赔率     .toFixed(3) */
        probability: ((50 / 100)*100 - 1)+"%", //under 中奖概率
        probabilityOver: (100 -((50 / 100)*100))+"%", //over 中奖概率 1/(100-50)%
        proValue: '',
       /*  baseValue: 50, //小于该数获胜
        odds: (98.5 / (50-1)).toFixed(3), // 赔率
        probability: ((50 / 100)*100 - 1)+"%", //中奖概率
        proValue: '',
        currentIndex: 1 */
      }
    },

    computed: {
      'randomNum': function() {
        if(this.$store.getters.GET_LOTTERY_NUMBER){
          let btnRandomNum = document.getElementById('btnRandomNumId');
          let proTotalNum = 315;
          let to = (proTotalNum / 100) * this.$store.getters.GET_LOTTERY_NUMBER;
          btnRandomNum.style.left = to + 'px';
        }
        return this.$store.getters.GET_LOTTERY_NUMBER;
      }
    },

    mounted() {
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
          that.btn.style.left = 345 / 2 + 'px';
          this.step.style.width = Math.max(0, 345 / 2)+'px';
          // that.btn.onmousedown = function (e){
          //   var x = (e||b.event).clientX;
          //   var l = this.offsetLeft;
          //   var max = that.bar.offsetWidth - this.offsetWidth;
          //   g.ontouchmove = function (e) {
          //     var thisX = (e || b.event).clientX;
          //     var to = m.min(max, m.max(-2, l + (thisX - x)));
          //     let numPos = m.round(m.max(0, to/max) * 100);
          //     if(numPos > 96 || numPos < 1){
          //       return;
          //     }else{
          //       that.btn.style.left = to + 'px';
          //       that.ondrag(that, numPos, to);
          //       b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
          //     }
          //   };
          //   g.onmouseup = new Function('this.onmousemove=null');
          // };
          that.btn.addEventListener('touchmove', function(event){
            event.preventDefault();
            let width = 345;//灰色块的长度，用于计算红色块最大滑动的距离
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                //计算红色块的left值，pageX是相对于整个页面的坐标，减去15（红色块长度的一半）是为了让鼠标点显示在中间，可以更改值看看效果，如果灰色块不是紧挨着屏幕，那还需要计算灰色块距离左屏幕的距离，应为pageX！！！
                let moveleft = touch.pageX-15;
                if(moveleft<=0){//红色块的left值最小是0；
                  moveleft=0;
                };
                if(moveleft >= parseInt(width)-30){////红色块的left值最小是灰色块的width减去红色块的width；
                  moveleft = parseInt(width)-30;
                }
                let numPos = m.round(m.max(0, moveleft / 315) * 100);
                 vueThis.showOddsApp();
                 if(vueThis.activeNameApp=='first'){
                    if(numPos > 96 || numPos < 2){
                      return;
                    }else{
                      that.btn.style.left = moveleft+"px";//最后把left值附上。
                      that.ondrag(that, numPos, moveleft);
                    }
                 }else if(vueThis.activeNameApp=='second'){
                   if(numPos > 99 || numPos < 5){
                      return;
                    }else{
                      that.btn.style.left = moveleft+"px";//最后把left值附上。
                      that.ondrag(that, numPos, moveleft);
                    }
                 }
                 /* if(numPos > 96 || numPos < 2){
                      return;
                    }else{
                      that.btn.style.left = moveleft+"px";//最后把left值附上。
                      that.ondrag(that, numPos, moveleft);
                    } */
            }
          })
        },

        ondrag: function (that, pos, x) {
          this.step.style.width = Math.max(0,x)+'px';
          vueThis.proValue = pos;
          vueThis.baseValue = pos;
          if(pos == 1){
            vueThis.odds = 0;
            vueThis.oddsOver = 0;
          }else{
            if(vueThis.activeNameApp=='first'){
              // let pri = (97 / (pos-1)).toFixed(4);
              let pri = 97 / (pos-1);
              // vueThis.odds = pri.substring(0,5);
              vueThis.odds = pri;
              vueThis.probability = (((pos / 100)*100) - 1).toFixed(0)+"%";
            }else if(vueThis.activeNameApp=='second'){
              // let pri = (97 / (100-pos)).toFixed(4);
              let pri = 97 / (100-pos);
              // vueThis.oddsOver = pri.substring(0,5);
              vueThis.oddsOver = pri;
              vueThis.probabilityOver = (100 -((pos / 100)*100)).toFixed(0)+"%";
            }
           /*  let pri = (98.5 / (pos-1)).toFixed(4);
            vueThis.odds = pri.substring(0,5); */
          }
          // vueThis.probability = (((pos / 100)*100) - 1).toFixed(0)+"%";
        }
      }

      new scale('btn', 'bar', 'title', 'sliderId');
    },

    methods: {
      changeStyleApp2(){
        // debugger
        $('.app-loss-box .progress-bar .scale .ant-slider-track').css('background','#00E9E1');
        $('.app-loss-box .progress-bar .scale').css('background','#565656');
      },
      changeStyleApp1(){
        // debugger
        $('.app-loss-box .progress-bar .scale .ant-slider-track').css('background','#565656');
        $('.app-loss-box .progress-bar .scale').css('background','#00E9E1');
      },
      showOddsApp(){
        let obj = {
          odds:this.odds,
          oddsover:this.oddsOver
        }
        this.$emit("showOddsApp",obj)
        
      }, 
      changeBet(index){
        this.currentIndex = index;
      }
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

  .app-loss-box{
    width:100%;
    padding-bottom: 20px;
    // padding-top: 20px;
    .bet-number{
      width: 60%;
      margin: 0 auto;
      /* .number{
        width: 100%;
        box-sizing: border-box;
        padding: 10px 30px;
        font-size: 50px;
        border: 1px solid #00E9E1;
        border-radius: 10px;
        color: #00E9E1;
      } */
      .bet-team{
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        padding: 10px 0px;
        color: #fff;
        .bet-under{
          padding: 5px 0px;
        }
        .bet-over{
          padding: 5px 0px;
        }
        .current{
          color: #00E9E1;
          border-bottom: 1px solid #00E9E1; 
        }
      }
    }
    .header{
      box-sizing: border-box;
      .header-title{
        box-sizing: border-box;
        .title{
          width: 100%;
          text-align: right;
          font-size: 12px;
          color: #999 ;
          margin: 0px;
        }
      }
    }

    .progress-bar{
      margin-top: 20px;
      position: relative;

      .scale{
        position: relative;
        height: 10px;
        background:#565656;
        border-radius:20px;
        .ant-slider-track{
          position: absolute;
          background:#00E9E1;
          border-radius:20px;
          height: 10px;
        }
      }

      .progress{
        position: absolute;
        cursor: pointer;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        font-size: 14px;
        border: 5px solid #565656;
        background:#fff;
        color: #181839;
        top: -90%;
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
        left: 0;
      }

      .active{
        border: 2px solid #6d1912;
        background: #500c07;
      }

    }
  }
</style>
