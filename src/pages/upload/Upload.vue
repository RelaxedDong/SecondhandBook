<template>
    <div>
      <div class="main">
        <div class="container">
          <div class="inputbox">
            <input type="text" name="title" placeholder="请输入书名" v-model="title">
          </div>
          <div class="inputbox">
            <input type="text" name="author" placeholder="请输入作者" v-model="author">
          </div>
          <div class="inputbox">
            <input type="text" name="price" placeholder="价格:元" v-model="price">
          </div>
          <div class="inputbox">
            <input type="text" name="publish" placeholder="出版社" v-model="publish">
          </div>
          <div class="inputbox">
          <textarea class="textarea" placeholder="售卖简介" rows="10" v-model="desc"></textarea>
          </div>
        </div>
        <div class="uploadimg">
          <button @click="newBtn">上传书籍图片</button>
          <input type="file" style="display:none;" @change="handleimgClick" id="imgBtn" multiple ref="imm">
        </div>
        <div class="addimg">
          <vue-images v-if="images.length" :imgs="images" :modalclose="modalclose" :showclosebutton="showclosebutton" :showcaption="showcaption"></vue-images>
        </div>
        <div class="buttongroup">
          <button class="clearbtn" @click="clearBtn">清空图片</button>
          <button class="submitbtn" @click="submitbtn">立即上传</button>
        </div>
        <alert v-show="showalert"></alert>
        <vue-loading v-if="isloading" type="cylon" color="green"></vue-loading>
      </div>
      <pagefooter></pagefooter>
    </div>
</template>

<script>
import Alert from 'common/alert/Alert'
import vueImages from 'vue-images'
import Pagefooter from '@/common/footer/Myfooter'
import axios from 'axios'

export default {
  name: 'Upload',
  components: {
    Pagefooter,
    vueImages,
    Alert
  },
  mounted () {
    var oldToken = localStorage.getExpire('token')
    if (oldToken) {
      this.oldToken = oldToken
      this.isLogin = true
    } else {
      this.$router.push('/sign')
    }
    axios.get('/api/bookadd/').then((res) => {
      const csrf = res.data.data
      if (csrf) {
        this.csrf_token = csrf
      }
    })
  },
  data () {
    return {
      images: [],
      modalclose: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: true,
      title: '',
      showalert: false,
      author: '',
      desc: '',
      price: '',
      csrf_token: '',
      publish: '',
      isloading: false,
      formdata: new FormData(),
      files: []
    }
  },
  methods: {
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color})
    },
    newBtn () {
      var fileBtn = document.getElementById('imgBtn')
      fileBtn.click()
    },
    createImgurl (file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    handleimgClick (e) {
      var files = document.getElementById('imgBtn').files
      var _this = this
      if (_this.images.length > 2 || files.length > 3) {
        this.handleemit('最多上传3张图片', '#F08080')
        this.showfalsemessage()
        return false
      }
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var imgType = file.type
        if (imgType !== 'image/jpeg' && imgType !== 'image/jpg' && imgType !== 'image/png') {
          this.handleemit('含有格式错误图片，请重新上传', '#F08080')
          this.showfalsemessage()
          return false
        }
        this.files.push(file)
        // this.formdata.append('file' + i, file)
        var imgUrl = _this.createImgurl(file)
        _this.images.push({
          imageUrl: imgUrl,
          caption: file.name
        })
      }
    },
    showfalsemessage () {
      this.showalert = true
      setTimeout(() => {
        this.showalert = false
      }, 2500)
    },
    clearBtn () {
      document.getElementById('imgBtn').value = null
      this.images = []
    },
    submitbtn () {
      if (!this.title || !this.desc || !this.price || !this.publish || !this.author) {
        this.handleemit('请输入完整信息', '#F08080')
        this.showfalsemessage()
        return
      }
      if (this.images.length === 0) {
        this.handleemit('至少上传一个图片', '#F08080')
        this.showfalsemessage()
        return false
      }
      const param = {
        title: this.title,
        price: parseInt(this.price),
        desc: this.desc,
        author: this.author,
        oldToken: this.oldToken,
        csrf_token: this.csrf_token,
        publish: this.publish
      }
      for (var key in param) {
        this.formdata.append(key, param[key])
      }
      for (var i = 0; i < this.files.length; i++) {
        this.formdata.append('file' + i, this.files[i])
      }

      this.handleemit('书籍正在发布中哦，请等待片刻...', '#b1ff5b')
      this.showfalsemessage()
      this.isloading = true
      axios.post('api/bookadd/', this.formdata, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(this.handleAxiosDone)
    },
    handleAxiosDone (res) {
      var data = res.data
      if (res.status === 200 && data) {
        if (data.code === 200) {
          this.handleemit('书籍发布成功......', '#b1ff5b')
          this.isloading = false
          this.showfalsemessage()
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          this.formdata = new FormData()
          this.handleemit(data.message, '#F08080')
          this.showfalsemessage()
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .main
    background #F0F0F0
    min-height 18rem
  .container
    padding-top .2rem
    margin 0 .2rem
    .inputbox
      margin-top .1rem
      .textarea
        font-size .3rem
        letter-spacing .005rem
        width 100%
        box-sizing border-box
        padding-left .1rem
    .inputbox>input
      width 100%
      border-radius .1rem
      height .76rem
      line-height .76rem
      box-sizing border-box
      padding-left .3rem
  .uploadimg
    margin .2rem
    button
      padding .1rem
      color #ffffff
      border-radius .1rem
      background #c487a5
  .addimg
    margin .2rem
  .buttongroup
    text-align center
    margin .2rem
    overflow hidden
    .submitbtn,.clearbtn
      float left
      margin-left .2rem
      width 45%
      background #8382ff
      border-radius .1rem
      height .6rem
      line-height .6rem
      color #fff
    .clearbtn
      float left
      background #83ff86
  .wrapper
    flex 0
    img
      width 2rem
      height 2rem
</style>
