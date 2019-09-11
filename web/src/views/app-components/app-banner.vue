<template>
  <div>
    <div>
      <swiper v-if="bannerList.length && langularType == 'zh'" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
          <img class="swipe-img" :src="item.banner" :alt="index" style="opacity: 1;">
        </swiper-slide>
         <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    
    <div>
      <swiper v-if="bannerList.length && langularType == 'en'" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
          <img class="swipe-img" :src="item.banner_en" :alt="index" style="opacity: 1;">
        </swiper-slide>
         <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  // https://blog.csdn.net/qq_35775675/article/details/82285041
  import { getBannerList } from '@/service/api';

  export default {
    name: 'Banner',

    data() {
      return {
        swiperOption: {
          pagination: { el:".swiper-pagination" },
          loop: true, // loop:true使轮播图可以循环轮播
          autoplay: true,
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
        bannerList: []
      }
    },

    computed:{
      'langularType': function(){
        return this.$store.getters.GET_LANGUAR_TYPE;
      }
    },

    mounted() {
      this.getBannerList();
    },

    methods: {
      getBannerList() {
        getBannerList().then(res => {
          this.bannerList = res;
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

<style scoped>
  .swiper-container{
    max-height: 200px;
  }

  .swipe-img{
    max-height: 200px;
    width: 100%;
    display: block;
    cursor: pointer;
  }
</style>
