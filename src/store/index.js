import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    message: '默认值',
    color: ''
  },
  mutations: {
    msgchange (state, res) {
      state.message = res.message
      state.color = res.color
      setTimeout(() => {
        state.message = ''
        state.color = ''
      }, 3000)
    }
  }
})
