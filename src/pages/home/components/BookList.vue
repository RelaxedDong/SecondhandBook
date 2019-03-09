<template>
  <div >
    <div class="title">
      低价推荐
    </div>
    <div>
        <ul class="content" v-for="(p,index) in page" :key="index">
          <li class="item" v-for="item in hotlist[index]" :key="item.id">
            <div class="item-img-wrapper">
              <img class="item-img" :src="item.images[0].url" alt="">
            </div>
            <div class="item-info">
              <router-link tag="p" class="item-title" :to="'/detail/' + item.id">
                 {{item.name}}
              </router-link>
              <p class="item-desc">
                {{item.desc|desccut}}</p>
              <div class="userinfo">
                <img :src="item.owner.avatar" alt="" class="userimg">
                <router-link tag="span" class="username" to="/userdetail">
                  {{item.owner.username}}
                </router-link>
                <span class="price"><img @click="hanto" src="../../../../static/iconimg/元.png" alt="" class="yuan">
                <b class="pricenumber">{{item.price}}</b>
                </span>
              </div>
            </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBookList',
  props: ['hotlist', 'page'],
  methods: {
    hanto () {
      console.log('123')
    }
  },
  filters: {
    desccut (desc) {
      if (desc.length > 70) {
        return desc.substr(0, 70) + '...'
      } else {
        return desc
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .title
    line-height .8rem
    background #eee
    margin-top .2rem
    text-indent .2rem
  .content
    z-index 9999
    .item
      border-bottom  1px solid #cacaca
      display flex
      overflow hidden
      .item-img
        width 2.0rem
        height 2.7rem
        padding .1rem
    .item-info
      min-width 0
      flex 1
      padding .1rem
      .item-title
        z-index 123
        line-height .54rem
        font-size .32rem
      .item-desc
        line-height .4rem
        color #ccc
      .userinfo
        margin-top .1rem
        .username
          color #ff5d65
          margin-left .1rem
        .userimg
          width .5rem
          height  .5rem
          border-radius .3rem
        .price
          float right
          margin .1rem
          color #e215ff
          .yuan
            margin-bottom .15rem
          .pricenumber
            font-size .35rem
</style>
