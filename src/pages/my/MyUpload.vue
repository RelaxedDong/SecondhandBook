<template>
  <div>
    <div class="header">
      我的上传
    </div>
    <alert v-show="ishowalere" class="alertbox"></alert>
    <div class="content" v-if="bookList.length>0">
      <ul>
        <li class="bookbox" v-for="book in bookList" :key="book.id">
          <div class="imgbox">
            <img :src="book.images[0].url" alt="">
          </div>
          <div class="boxinfo">
            <router-link class="title" :to="'/detail/' + book.id">
              {{book.name}}
            </router-link>
            <div class="uploadtile">
              {{book.upload_time}}
            </div>
            <div class="price">
             ￥ {{book.price}}
            </div>
            <div class="buttonbox">
              <button @click="handleDelBookclick" :bookid="book.id">删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="none">
      空空如也......
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from 'common/alert/Alert'
export default {
  name: 'MyUpload',
  components: {
    Alert
  },
  data () {
    return {
      bookList: [],
      oldToken: '',
      ishowalere: false
    }
  },
  mounted () {
    var oldToken = JSON.parse(localStorage.getItem('token')).data
    if (oldToken) {
      this.oldToken = oldToken
      axios.post('/api/myupload/', {token: oldToken}).then(this.HandleaxiosDone)
      return false
    } else {
      this.$router.push('/sign')
    }
  },
  methods: {
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color})
      this.ishowalere = true
    },
    handleDelBookclick (e) {
      var cur = e.target.parentNode.parentNode.parentNode
      cur.parentNode.removeChild(cur)
      var bookid = e.target.getAttribute('bookid')
      axios.post('/api/delbook/', {bookid: bookid, token: this.oldToken}).then((res) => {
        this.handleemit('删除成功~', '#b1ff5b')
      })
    },
    HandleaxiosDone (res) {
      this.bookList = res.data.books
    }
  }
}
</script>

<style scoped lang="stylus">
  .alertbox
    position fixed
    bottom  0
    left 0
    right 0
  .none
    margin-top .5rem
    text-align center
    color #85846c
  .header
    width 100%
    height .86rem
    line-height .86rem
    background #ffc4be
    text-align center
    color #ffff
    .left
      float left
      margin-left .1rem
  .bookbox
    width 100%
    height 2.3rem
    margin-top .1rem
    border-bottom .01rem solid #F2F3F4
    .imgbox
      margin-left .2rem
      float left
      width 20%
      img
        padding .1rem
        box-sizing border-box
        float left
        width 1.5rem
    .boxinfo
      margin-top .2rem
      width 70%
      margin-left .2rem
      float left
      .title,.price,.buttonbox,.uploadtile
        margin-top .1rem
      .title
        font-size 0.3rem
        font-weight bold
      .uploadtile
        color #99c480
        margin-top .2rem
      .price
        margin-top .2rem
        color red
      .buttonbox
        float right
        button
          padding .1rem
          background #83ff86
          color #ffffff
          box-sizing border-box
          border-radius .1rem
</style>
