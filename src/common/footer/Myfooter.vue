<template>
      <div class="footer">
        <div class="home">
          <router-link to="/" class="item" tag="div">
            <span class="iconfont icon"  :style="this.$route.path==='/'?isActive:''">&#xe615;</span>
            <span class="iconname" :style="this.$route.path==='/'?isActive:''">主页</span>
          </router-link>
        </div>
        <div class="book_sell" >
          <router-link to="/sell" class="item" tag="div">
            <span class="iconfont icon" :style="this.$route.path==='/sell'?isActive:''">&#xe621;</span>
            <span class="iconname" :style="this.$route.path==='/sell'?isActive:''">卖书</span>
          </router-link>
        </div>
        <div class="me">
          <router-link to="/me" class="item" tag="div">
            <span class="iconfont icon" :style="this.$route.path==='/me'?isActive:''">&#xe60b;</span>
            <span class="iconname" :style="this.$route.path==='/me'?isActive:''">账号</span>
          </router-link>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Pagefooter',
  computed: {
    isActive () {
      return {
        color: '#7CCD7C',
        fontWeight: 'bolder'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .footer
    border-top .01rem solid #dadada
    background #fff
    position fixed
    bottom 0
    left 0
    right 0
    height .86rem
    margin-top .1rem
    line-height .86rem
    z-index 20
    overflow hidden
    width 100%
    .home,.book_sell,.me
      float left
      text-align center
      width 33%
      .item
        width 100%
        height .86rem
        position relative
        span
          position absolute
          margin 0 auto
          color #85846c
        .icon
          top -.1rem
          left: 40%
          font-size .4rem
        .iconname
          top .3rem
          left: 40%
          font-size .2rem
</style>
