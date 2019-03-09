<template>
  <div class="loginBox">
    <div class="return">
      <router-link to="/">
        ← 返回
      </router-link>
    </div>
    <div class="title">注册</div>
    <div class="inputBox">
      <div class="phone">
        <input type="text" class="border" placeholder="用户名" v-model="username">
      </div>
      <div class="word">
        <input type="text" placeholder="邮箱" v-model="email">
      </div>
      <div class="word">
        <input :type="mytype" placeholder="密码" v-model="password">
      </div>
      <span class="eye" @click="HandleSee">查看密码</span>
      <div class="buttonbox">
        <button class="registerBtn" @click="HancleRegister">立即注册</button>
        <button class="loginBtn" @click="LoginNow">已有账号？立即登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      mytype: 'password',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color, success: this.handleemitSuccess})
    },
    LoginNow () {
      this.$emit('login')
    },
    HandleSee () {
      this.mytype = this.mytype === 'text' ? 'password' : 'text'
    },
    HancleRegister () {
      const passwordlength = this.password.length
      const emaillen = this.email.length
      const usernamelen = this.username.length
      if (passwordlength === 0 || emaillen === 0 || usernamelen === 0) {
        this.handleemit('请输入完整信息', '#ffa1ab')
        return false
      }
      if (usernamelen < 2 || usernamelen > 20) {
        this.handleemit('用户名长度错误', '#ffa1ab')
        return false
      }
      if (passwordlength > 12 || passwordlength < 6) {
        this.handleemit('请输入6-12位数密码', '#ffa1ab')
        return false
      }

      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.email)) {
        this.handleemit('邮箱格式错误', '#ffa1ab')
        return false
      }
      axios.post('/api/regist/', {email: this.email, password: this.password, username: this.username}).then(this.HandleaxiosDone)
    },
    HandleaxiosDone (res) {
      var data = res.data
      if (res.status === 200 && data) {
        if (data.code === 200) {
          this.handleemit('邮件已发送，请进入邮箱激活账号！...', '#b1ff5b')
          setTimeout(() => {
            this.$emit('login')
          }, 2000)
        } else {
          this.handleemit(data.message, '#F08080')
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginBox
    position: absolute;
    top: 5%
    padding .5rem
    box-sizing border-box
    width 100%
    .return
      padding-bottom .5rem
    .title
      color: #0a1a4e;
      font-size: .5rem;
    .inputBox
      padding-top .2rem
      width 100%
      .phone,.word
        width 100%
        height .86rem
        line-height .86rem
        margin-bottom .3rem
        border-bottom  .01rem solid #666
        input
          width 100%
          height .64rem
          line-height .64rem
    .eye
      float right
    .buttonbox
      margin-top .1rem
      .loginBtn,.registerBtn
        width 100%
        height .64rem
        line-height .64rem
        color #ffffff
        margin-top .1rem
        border-radius .1rem
      .loginBtn
        background grey
      .registerBtn
        background #6f84ff
</style>
