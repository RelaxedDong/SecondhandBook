<template>
  <div>
    <div class="banner">
      <img v-show="!showGallary" @click="handleImgClick" :src="face"
           class="banner-img" alt="">
      <div class="banner-info">
        <div class="banner-title">{{bookname}}</div>
        <div class="banner-number"><span class="iconfont banner-icon">&#xe6bc;</span>39</div>
      </div>
    </div>
    <fade>
      <common-gallary @close="HandleClose" :imgs="images" v-show="showGallary"></common-gallary>
    </fade>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import Fade from 'common/fade/Fade'

export default {
  name: 'DetailBanner',
  data () {
    return {
      showGallary: false
    }
  },
  props: ['images', 'bookname', 'face'],
  methods: {
    handleImgClick () {
      this.showGallary = true
    },
    HandleClose () {
      this.showGallary = false
    }
  },
  components: {
    CommonGallary,
    Fade
  }
}
</script>

<style lang="stylus" scoped>
  .banner
    position relative
    overflow hidden
    height 0
    padding-bottom 55%
    .banner-img
      width 100%
    .banner-info
      position absolute
      color #ffffff
      left 0
      right 0
      bottom 0
      line-height .6rem
      background-image linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.8))
      display flex
      .banner-title
        font-size .32rem
        padding 0 .2rem
        flex 1
      .banner-number
        margin .14rem
        padding 0 .3rem
        line-height .4rem
        height .32rem
        font-size .24rem
        border-radius .2rem
        background rgba(0, 0, 0, 8)
        .banner-icon
          font-size .24rem
          padding .02rem
</style>
