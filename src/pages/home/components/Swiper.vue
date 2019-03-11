<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for ='item of swiperList' :key="item.id">
        <img class="swiper-img" :src="item.url" alt="">
      </swiper-slide>
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
        effect: 'fade',
        autoplay: {
          delay: 4000,
          disableOnInteraction: true
        },
        on: {
          click: function (e) {
            window.open(e.target.src)
          }
        }
      },
      swiperList: [
        {
          id: '123',
          url: 'http://www.read-cycling.org/wp-content/uploads/2018/01/FB_page_event_banner2018-02.jpg'
        }, {
          id: '456',
          url: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/ed5f4115226306e48e6fad106a038afe.jpg_750x200_64df48d6.jpg'
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
