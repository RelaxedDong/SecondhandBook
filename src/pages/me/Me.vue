<template>
    <div class="main">
      <alert v-show="changeavatar"></alert>
      <me-header @changedusername="changedusername" @changeAlertbox="changeAlertbox" :username="username" :email="email" @closeShow="handleshow" :avatar="avatar" @haschange="haschange"></me-header>
      <pagefooter></pagefooter>
    </div>
</template>

<script>
import axios from 'axios'
import Pagefooter from '@/common/footer/Myfooter'
import MeHeader from './components/Header'
import Alert from 'common/alert/Alert'
export default {
  name: 'Me',
  data () {
    return {
      username: '',
      email: '',
      changeavatar: true,
      avatar: ''
    }
  },
  components: {
    Alert,
    MeHeader,
    Pagefooter
  },
  mounted () {
    var oldToken = localStorage.getItem('token')
    if (oldToken) {
      axios.post('/api/userinfo/', {token: oldToken}).then(this.HandleaxiosDone)
      return false
    } else {
      this.$router.push('/sign')
    }
  },
  methods: {
    changedusername (val) {
      this.username = val
    },
    changeAlertbox (val) {
      setTimeout(() => {
        this.changeavatar = false
      }, 3000)
      this.changeavatar = true
    },
    haschange (val) {
      this.avatar = val
    },
    handleshow () {
      setTimeout(() => {
        this.changeavatar = false
      }, 3000)
      this.changeavatar = true
    },
    HandleaxiosDone (res) {
      var data = res.data
      if (data) {
        this.username = data.username
        this.email = data.email
        this.avatar = data.avatar
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .main
    background #F0F0F0
    min-height 18rem
</style>
