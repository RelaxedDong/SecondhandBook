<template>
  <div class="home">
      <router-link to="/search">
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
        // 当上拉距离超过盒子高度的10px的时候,就派发一个上拉加载的事件
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
    this.isLoading = true
    axios.get('/api/booklist/?start=' + this.start).then(this.handleAxiosSuccess)
  },
  methods: {
    handleAxiosSuccess (res) {
      if (res.data.length !== 0) {
        this.hotlist.push(res.data)
        this.start = this.start + 2
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
      end: false,
      page: [],
      isLoading: false
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
</style>
