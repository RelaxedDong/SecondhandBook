<template>
  <div>
    <div class="header">
      设置
    </div>
    <div class="userBox">
      <div class="avatar">
        <input @change="handleAvatarChange" id="avatarimg" type="file" style="opacity: 0;z-index: 20" class="avatarimg">
        <template>
          <img  v-if="avatar" class="avatarimg" :src="avatar" alt="">
          <img  v-else class="avatarimg" :src="img" alt="">
        </template>
      </div>
      <div class="usreinfo">
        <div class="username">
          <span v-show="!changeinfo">{{username}}</span>
          <input v-show="changeinfo" type="text" :value="username" class="input-username" ref="userinput">
          <button v-show="changeinfo" class="input-save" @click="input_save">保存</button>
        </div>
        <div class="email">{{email}}</div>
      </div>
    </div>
    <div class="boardlist">
      <ul>
        <router-link tag="li" to="/myupload">
          <div class="icon">
            <span class="iconfont" style="color: #1196db">&#xe605;</span>
          </div>
          <div class="iconname"> 我的上传</div>
          <span class="rightcion">></span>
        </router-link>
        <li>
          <div class="icon">
            <span class="iconfont" style="color: #ff90cd">&#xe6c4;</span>
          </div>
          <div class="iconname">喜欢</div>
          <span class="rightcion">></span>
        </li>
        <router-link tag="li" to="/comments">
          <div class="icon">
            <span class="iconfont" style="color: #77ff5e">&#xe608;</span>
          </div>
          <div class="iconname">评论</div>
          <span class="rightcion">></span>
        </router-link>
        <li>
          <div class="icon">
            <span class="iconfont" style="color: #f4ea2a">&#xe601;</span>
          </div>
          <div class="iconname">收藏</div>
          <span class="rightcion">></span>
        </li>
        <li @click="HandleInfochange">
          <div class="icon">
            <span class="iconfont" style="color: #c48dc3">&#xe61b;</span>
          </div>
          <div class="iconname">编辑信息</div>
          <span class="rightcion">></span>
        </li>
      </ul>
      <div class="logout" v-show="!isLogin">
        <router-link to="/sign">登陆</router-link>
      </div>
      <div class="logout" v-show="isLogin">
        <div @click="handlelogout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MeHeader',
  props: ['username', 'email', 'avatar'],
  data () {
    return {
      isLogin: false,
      img: 'http://www.gx8899.com/uploads/allimg/2018012309/ednekuj4h2q.jpg',
      changeinfo: false
    }
  },
  mounted () {
    var oldToken = localStorage.getExpire('token')
    if (oldToken) {
      this.oldToken = oldToken
      this.isLogin = true
    } else {
      this.$router.push('/sign')
    }
  },
  methods: {
    HandleInfochange () {
      this.changeinfo = !this.changeinfo
    },
    handlelogout () {
      if (this.oldToken) {
        localStorage.removeItem('token')
        this.$router.push('/sign')
      }
    },
    handleAvatarChange () {
      var formdate = new FormData()
      var file = document.getElementById('avatarimg').files[0]
      formdate.append('file', file)
      formdate.append('email', this.email)
      this.handleemit('正在修改改头像,请等待......', '#b1ff5b')
      this.$emit('closeShow')
      axios.post('/api/changeavatar/', formdate, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((res) => {
        var data = res.data
        console.log(data)
        if (res.status === 200 && data) {
          if (data.code !== 200) {
            this.handleemit(data.message, '#F08080')
          } else {
            this.$emit('haschange', data.data)
            this.handleemit('修改成功......', '#b1ff5b')
          }
        }
      })
    },
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color})
    },
    input_save () {
      var username = this.$refs.userinput.value
      axios.post('/api/changeusername/', {'username': username, 'token': this.oldToken}).then(this.handlechangeusername)
    },
    handlechangeusername (res) {
      var data = res.data
      if (res.status === 200) {
        if (data.code === 200) {
          this.changeinfo = false
          this.$emit('changedusername', this.$refs.userinput.value)
        } else {
          this.handleemit(data.message, '#F08080')
          this.$emit('changeAlertbox', data.message)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    height .86rem
    line-height .86rem
    background #ffafa5
    padding-left .2rem
    color #fff
  .userBox
    position relative
    background #ffafa5
    box-shadow: .1rem .1rem 0 .1rem #ffc4be
    width 100%
    min-height 5rem
    .avatar
      width 100%
      text-align center
      .avatarimg
        cursor pointer
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        position absolute
        width 3rem
        height  3rem
        border-radius 50%
        margin 0 auto
        border .1rem solid white
    .usreinfo
      left: 0;
      right: 0;
      bottom: .2rem;
      position absolute
      margin 0 auto
      color #fffffb
      text-align center
      font-weight lighter
      .username
        font-size .5rem
        text-align center
        .input-username
          margin-left 1rem
          border-radius .1rem
          width 40%
          height .64rem
          line-height .64rem
          font-size .4rem
        .input-save
          border-radius .1rem
          padding .05rem
          box-sizing border-box
          background #77ff5e
          color white
          font-size .3rem
      .email
        font-size .3rem
        margin-top .2rem
  .boardlist
    margin-top .2rem
    line-height .86rem
    height .86rem
    ul>li
      margin-top .1rem
      overflow hidden
      background: #ffffff
    .icon,.iconname
      margin-left .4rem
      float left
    .rightcion
      float right
      margin-right .2rem
  .logout
    text-align center
    color red
</style>
