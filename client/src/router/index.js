import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import List from '@/components/List'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Home',
          component: List
        }
      ]
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }, {
      path: '/login',
      name: 'Login',
      component: Signin
    }, {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
