// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'styles/border.css'
import 'styles/reset.css'
import 'styles/iconfont.css'
import flaskClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store'
import 'common/common_js/localstorage'
import VueLoading from 'vue-loading-template'

Vue.config.productionTip = false
flaskClick.attach(document.body)

Vue.use(VueAwesomeSwiper)
Vue.use(VueLoading /** options **/)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
