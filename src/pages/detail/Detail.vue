<template>
  <div>
    <alert v-show="showalertbox" class="alertbox"></alert>
    <detail-banner :images="images" :bookname="bookname" :face="face"></detail-banner>
    <detail-header></detail-header>
      <detail-book :book="book"></detail-book>
      <detail-comment :bookid="book.id" :comments="comments" @handlemsg="handlemsg"></detail-comment>
    </div>
</template>

<script>
import DetailHeader from './components/Header'
import DetailBanner from './components/Banner'
import DetailBook from './components/Book'
import DetailComment from './components/Comment'
import axios from 'axios'
import Alert from 'common/alert/Alert'
export default {
  name: 'Detail',
  data () {
    return {
      book: {
        owner: {}
      },
      images: [],
      face: '',
      bookname: '',
      comments: [],
      commentslen: '',
      showalertbox: false
    }
  },
  components: {
    DetailComment,
    DetailHeader,
    DetailBanner,
    DetailBook,
    Alert
  },
  mounted () {
    const id = this.$route.path.substr(8)
    axios.get('/api/bookdetail/?book_id=' + id).then(this.handleData)
  },
  methods: {
    handlemsg (value, color) {
      this.handleemit(value, color)
    },
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color})
      this.showalertbox = true
      setTimeout(() => {
        this.showalertbox = false
      }, 2000)
    },
    handleData (res) {
      const data = res.data
      this.comments = data.comments
      this.book = data
      this.bookname = data.name
      this.face = data.images[0].url
      var arr = []
      for (var i = 0; i < data.images.length; i++) {
        arr[i] = data.images[i].url
      }
      this.images = arr
    }
  }
}
</script>

<style lang="stylus" scoped>
  .alertbox
    position fixed
    top .86rem
    left 0
    right 0
  .content
    height 60rem
    overflow auto
</style>
