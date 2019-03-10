import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Detail from '@/pages/detail/Detail'
import Me from '@/pages/me/Me'
import Upload from '@/pages/upload/Upload'
import Sign from '@/pages/sign/Sign'
import HomeBookSearch from '@/pages/search/BookSearch'
import MyUpload from '@/pages/my/MyUpload'
import MyComments from '@/pages/my/MyComments'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }, {
      path: '/me',
      name: 'Me',
      component: Me
    }, {
      path: '/sell',
      name: 'Upload',
      component: Upload
    }, {
      path: '/sign',
      name: 'Sign',
      component: Sign
    }, {
      path: '/myupload',
      name: 'MyUpload',
      component: MyUpload
    }, {
      path: '/search',
      name: 'HomeBookSearch',
      component: HomeBookSearch
    }, {
      path: '/comments',
      name: 'MyComments',
      component: MyComments
    }
  ]
})
