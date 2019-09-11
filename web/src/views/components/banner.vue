<template>
  <!-- 轮播图 -->
  <div class='banner-swipper'>
    <div class='banner-content'>
      <div class='banner'>
        <swiper v-if="bannerList.length && langularType == 'zh'" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in bannerList" :key="index">
            <img class="swipe-img" :src="item.banner" :alt="index" style="opacity: 1;">
            
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>

      <div class='banner'>
        <swiper v-if="bannerList.length && langularType == 'en'" :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in bannerList" :key="index">
            <img class="swipe-img" :src="item.banner_en" :alt="index" style="opacity: 1;">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  // https://blog.csdn.net/qq_35775675/article/details/82285041
  import { getBannerPC } from '@/service/api';
  
  export default {
    name: 'Banner',

    data() {
      return {
        swiperOption: {
          pagination: { el:".swiper-pagination" },
          loop: true, // loop:true使轮播图可以循环轮播
          notNextTick: true,
          autoplay: {
            disableOnInteraction: false,
            delay: 3000
          },
          initialSlide:0,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          speed:1000, // speed是一张图划过的时间长度
          on: {
            // 使用es6的箭头函数，使this指向vue对象
            click: ()=> {
              // alert(event.target.alt);
              let swiper = this.$refs.mySwiper.swiper;
					    //let index = (swiper.activeIndex-1)%2;
					    let index = 0;
              this.open(index);

            }
          }
        },
        bannerList: [],
        bannerZhList:[],
        bannerEnList:[],
        mySwiper : '',
        lang: ''
      }
    },

    computed:{
      'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      }
    },

    mounted() {
      this.getBannerPC();
    },

    methods: {
      getBannerPC() {
        getBannerPC().then(res => {
          this.bannerList = res;
          this.bannerList.forEach((item,index)=>{
            this.bannerZhList.push(item.banner);
            this.bannerEnList.push(item.banner_en);
          })
        })
      },

      open(index) {
        // let index = parseInt(event.target.alt);
        // //你的事件
        if(this.langularType == 'en'){
          if(this.bannerList[index].url_en){
            window.open(this.bannerList[index].url_en);
          }
        }else {
          if(this.bannerList[index].url) {
            window.open(this.bannerList[index].url);
          }
        }
      }
      
    },
  }
</script>

<style lang='less'>
  // .banner-swipper{
  //   width: 100%;
  //   background: #141F27;
  //   //margin: 10px auto;
  //   .banner-content{
  //     width: 1250px;
  //     padding: 25px 0px;
  //     box-sizing: border-box;
  //     margin: 0 auto;
  //     //padding: 0px 0px 11px;
  //     .swipe-img{
  //       width: 1200px;
  //       height: 300px;
  //       display: block;
  //       margin: 0 auto;
  //       cursor: pointer;
  //     }
  //   }
  // }
  .swiper-container{
    z-index:0;
  }
  @media screen and (max-width: 1440px) and (min-width: 992px) {
    .banner{
      width: 1010px;
      box-sizing: border-box;
      margin: 0 auto;
      //padding: 0px 25px;
      .swipe-img{
        width: 1010px;
        height: 200px;
        display: block;
        margin: 0 auto;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 3000px) and (min-width: 1440px) {
    .banner{
      width: 1250px;
      box-sizing: border-box;
      margin: 0 auto;
      //padding: 0px 25px;
      .swipe-img{
        width: 1250px;
        height: 300px;
        display: block;
        margin: 0 auto;
        cursor: pointer;
      }
    }
  }
  
</style>
