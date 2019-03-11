<template>
  <div>
    <router-link v-show="showAbs" tag="div" to="/" class="header-abs">
      <div class="iconfont back-icon header-abs-back">
        <span style="color: #fff">&#xe6ff;</span>
      </div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs"  :style="opacityStyle">
      <router-link to="/">
        <div class="iconfont back-icon header-fixed-back">返回 </div>
      </router-link>
      书籍详情
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, { passive: false })
  },
  // 页面替换成新的页面时触发
  beforeDestroy () {
    console.log('deactivated')
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .header-abs
    position: absolute
    left .2rem
    top .2rem
    width .8rem
    height .8rem
    line-height .8rem
    border-radius .4rem
    text-align center
    background-color: #000
    color #ffffff
    opacity: .5
    .header-abs-back
      font-size .4rem
  .header-fixed
    z-index 20
    position fixed
    top 0
    left 0
    right 0
    overflow hidden
    height $headerHeight
    line-height $headerHeight
    color #ffffff
    background $bgColor
    text-align center
    font-size .32rem
    .header-fixed-back
      color #ffffff
      position absolute
      top 0
      left 0
      font-size .1rem
      width .64rem
</style>
