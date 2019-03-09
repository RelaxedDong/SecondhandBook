<template>
   <div>
     <alert></alert>
     <login v-show="showLogin" @register="HandleRegister"></login>
     <register v-show="!showLogin" @login="HandleLogin"></register>
   </div>
</template>

<script>
import Login from './components/Login'
import Register from './components/Register'
import Alert from 'common/alert/Alert'
export default {
  name: 'Sign',
  data () {
    return {
      showLogin: true
    }
  },
  components: {
    Alert,
    Login,
    Register
  },
  methods: {
    HandleRegister () {
      this.showLogin = false
    },
    HandleLogin () {
      this.showLogin = true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
