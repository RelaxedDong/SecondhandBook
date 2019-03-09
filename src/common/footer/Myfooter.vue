<template>
      <div class="footer">
        <div class="home">
          <router-link to="/" class="item">
            <img class="icon-img" src="../../../static/iconimg/主页.png" alt="">
          </router-link>
        </div>
        <div class="book_sell">
          <router-link to="/sell" class="item">
            <img class="icon-img" src="../../../static/iconimg/卖书.png" alt="">
          </router-link>
        </div>
        <div class="me">
          <router-link to="/me" class="item">
            <img class="icon-img" src="../../../static/iconimg/我的.png" alt="">
          </router-link>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Pagefooter'
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
        margin .1rem
        .icon-img
          margin-top .05rem
</style>
