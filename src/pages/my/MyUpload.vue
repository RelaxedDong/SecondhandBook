<template>
  <div>
    <div class="header">
      <div class="left">
        <router-link to="/me" tag="span">
          返回
        </router-link>
      </div>
      我的上传
    </div>
    <div class="content">
      <ul>
        <li class="bookbox" v-for="book in bookList" :key="book.id">
          <div class="imgbox">
            <img :src="book.images[0].url" alt="">
          </div>
          <div class="boxinfo">
            <div class="title">
              {{book.name}}
            </div>
            <div class="uploadtile">
              {{book.upload_time}}
            </div>
            <div class="price">
             ￥ {{book.price}}
            </div>
            <div class="buttonbox">
              <button>删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyUpload',
  data () {
    return {
      bookList: []
    }
  },
  mounted () {
    var oldToken = localStorage.getItem('token')
    if (oldToken) {
      console.log(oldToken)
      axios.post('/api/myupload/', {token: oldToken}).then(this.HandleaxiosDone)
      return false
    } else {
      this.$router.push('/sign')
    }
  },
  methods: {
    HandleaxiosDone (res) {
      const data = res.data.books
      console.log(data)
      this.bookList = data
    }
  }
}
</script>

<style scoped lang="stylus">
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
