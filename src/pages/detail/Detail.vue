<template>
  <div>
    <detail-banner :images="images" :bookname="bookname" :face="face"></detail-banner>
    <detail-header></detail-header>
    <detail-book :book="book"></detail-book>
    <detail-comment></detail-comment>
  </div>
</template>

<script>
import DetailHeader from './components/Header'
import DetailBanner from './components/Banner'
import DetailBook from './components/Book'
import DetailComment from './components/Comment'
import axios from 'axios'
export default {
  name: 'Detail',
  data () {
    return {
      book: {
        owner: {}
      },
      images: [],
      face: '',
      bookname: ''
    }
  },
  components: {
    DetailComment,
    DetailHeader,
    DetailBanner,
    DetailBook,
  },
  mounted () {
    const id = this.$route.path.substr(8)
    axios.get('/api/bookdetail/?book_id=' + id).then(this.handleData)
  },
  methods: {
    handleData (res) {
      const data = res.data
      this.book = data
      this.bookname = data.name
      this.face = data.images[0].url
      var arr = []
      for (var i = 0; i < data.images.length; i++) {
        arr[i] = data.images[i].url
      }
      this.images = arr
      console.log(arr)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    height 60rem
    overflow auto
</style>
