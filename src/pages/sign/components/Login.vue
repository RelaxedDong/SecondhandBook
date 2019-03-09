<template>
  <div class="loginBox">
    <div class="return">
      <router-link to="/">
        ← 返回
      </router-link>
    </div>
    <div class="title">登陆</div>
    <div class="inputBox">
      <div class="phone">
        <input type="text" class="border" placeholder="请输入邮箱" v-model="email">
      </div>
      <div class="word">
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="forget">
        <router-link to="/forget">
          忘记密码?
        </router-link>
      </div>
      <div class="buttonbox">
        <button class="loginBtn" @click="login">登陆</button>
        <button class="registerBtn" @click="RegisterNow">没有账号？立即注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  csrf_token: '',
  data () {
    return {email: '', password: ''}
  },
  mounted () {
    axios.get('/api/login/').then((res) => {
      if (res.data.data) {
        this.csrf_token = res.data.data
      }
    })
    var oldToken = localStorage.getItem('token')
    if (oldToken) {
      axios.post('/api/login/', {token: oldToken}).then(this.HandleaxiosDone)
      return false
    }
  },
  methods: {
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color})
    },
    login () {
      const length = this.password.length
      const emaillen = this.email.length
      if (length === 0 || emaillen === 0) {
        this.handleemit('请输入完整信息', '#ffa1ab')
        return false
      }
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(this.email)) {
        this.handleemit('邮箱格式错误', '#ffa1ab')
        return false
      }
      if (length < 6 || length > 12) {
        this.handleemit('密码长度错误', '#ffa1ab')
        return false
      }
      axios.post('/api/login/', {email: this.email, password: this.password, csrf_token: this.csrf_token}).then(this.HandleaxiosDone)
    },
    HandleaxiosDone (res) {
      var data = res.data
      if (res.status === 200 && data) {
        if (data.code === 200) {
          this.handleemit('身份验证成功,请稍后...', '#b1ff5b')
          setTimeout(() => {
            this.$router.push('/me')
            localStorage.setExpire('token', res.headers.token, 1000 * 60 * 60 * 24 * 2) // 设置两天过期
          }, 2500)
        } else {
          this.handleemit(data.message, '#F08080')
        }
      }
    },
    RegisterNow () {
      this.$emit('register')
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
    .forget
      float right
      padding-bottom .1rem
      color #c4b9c1
  .buttonbox
    margin-top .1rem
    .loginBtn,.registerBtn
      width 100%
      height .64rem
      line-height .64rem
      color #ffffff
      border-radius .1rem
      cursor pointer
    .loginBtn
      background #fc513f
    .registerBtn
      margin-top .1rem
      background #99c480
</style>
