<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for ='item of swiperList' :key="item.id">
        <img class="swiper-img" :src="item.url" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        loop: true,
        pagination: '.swiper-pagination'
      },
      swiperList: [
        {
          id: '123',
          url: 'http://www.read-cycling.org/wp-content/uploads/2018/01/FB_page_event_banner2018-02.jpg'
        }, {
          id: '456',
          url: 'http://img0.kfzimg.com/operation/30/1d/301dee4f52183c9a5ac27100182f697f.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background: #ffffff
  .wrapper
    margin-top 1.2rem
    width 100%
    height 0
    padding-bottom 31.25%
    .swiper-img
      width 100%
      height 2.1rem
</style>
