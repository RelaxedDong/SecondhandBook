<template>
  <div class="home">
      <router-link to="/search" id="start">
        <search></search>
      </router-link>
      <div ref="wrapper" class="wrapper">
        <div>
          <home-swiper></home-swiper>
          <home-icon></home-icon>
          <HomeBookList :hotlist="hotlist" :page="page"></HomeBookList>
          <vue-loading v-if="isLoading" type="cylon" color="green"></vue-loading>
          <div class="end" v-if="end">到底啦，老弟......</div>
        </div>
      </div>
    <pagefooter></pagefooter>
    <div class="gototop" v-if="topbtn"><button @click="clicktoTop"><span class="iconfont">&#xe63d;</span></button></div>
  </div>
</template>

<script>
import Search from '@/common/search/Search'
import HomeSwiper from './components/Swiper'
import HomeIcon from './components/Icon'
import HomeBookList from './components/BookList'
import Pagefooter from '@/common/footer/Myfooter'
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  name: 'Home',
  components: {
    Search,
    HomeSwiper,
    HomeIcon,
    HomeBookList,
    Pagefooter
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 回弹时间
      startY: 0,
      click: true,
      bounceTime: 100,
      pullUpLoad: {
        // 当上拉距离超过盒子高度的的时候,就派发一个上拉加载的事件
        threshold: 0
      },
      momentum: true,
      bounce: {
        top: true,
        bottom: true,
        left: true,
        right: true
      },
      useTransition: false
    })
    this.scroll.on('pullingUp', () => {
      axios.get('/api/booklist/?start=' + this.start).then(this.handleAxiosSuccess)
      this.isLoading = true
    })
    this.scroll.on('scroll', (pos) => {
      if (pos.y < -2500) {
        this.topbtn = true
      } else {
        this.topbtn = false
      }
    })
    this.isLoading = true
    axios.get('/api/booklist/?start=' + this.start).then(this.handleAxiosSuccess)
  },
  methods: {
    clicktoTop () {
      this.scroll.scrollTo(0, 0, 1234)
    },
    handleAxiosSuccess (res) {
      var data = res.data.data
      if (data.length !== 0) {
        if (data.length < 2) {
          this.isLoading = false
        }
        this.hotlist.push(data)
        this.start = this.start + this.per_page
        this.page.push(this.start)
        this.scroll.finishPullUp()
      } else {
        this.end = true
        this.isLoading = false
      }
    }
  },
  data () {
    return {
      hotlist: [],
      start: 0,
      per_page: 10,
      end: false,
      page: [],
      isLoading: false,
      topbtn: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    height 10.5rem
  .end
    text-align center
    color #8e8aff
    margin-top .3rem
    padding-bottom .2rem
  .gototop
    position fixed
    right 0
    bottom 1rem
    margin .1rem
    button
      background #ffc043
      color #fff4f7
      border-radius .1rem
      padding .1rem .2rem
      box-sizing border-box
</style>
