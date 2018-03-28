import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import swal from 'sweetalert'

Vue.use(Vuex)

const $http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default new Vuex.Store({
  state: {
    postsList: [],
    token: localStorage.getItem('token'),
    userId: ''
  },
  getter: {},
  mutations: {
    getPosts: function (state, payload) {
      state.postsList = payload.map(val => val)
    },
    emitLike: function (state, payload) {
      let filteredPosts = state.postsList.map(val => val._id)
      let indexLike = filteredPosts.indexOf(payload)
      if (state.postsList[indexLike].likes.indexOf(payload) === -1) {
        state.postsList[indexLike].likes.push(payload)
        console.log('like')
        console.log(state.postsList[indexLike])
      } else {
        state.postsList[indexLike].likes.splice(indexLike, 1)
        console.log('unlike')
      }
    },
    getUserId: function (state, payload) {
      state.userId = payload
      console.log(state.userId)
    },
    updateUser: function (state) {
      state.token = localStorage.getItem('token')
    },
    clearUser: function (state) {
      state.token = ''
    }
  },
  actions: {
    getPosts: function (context, payload) {
      $http({
        method: 'get',
        url: '/posts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('success fetch data')
          console.log(response.data.data)
          context.commit('getPosts', response.data.data)
        })
    },
    emitLike: function (context, payload) {
      $http({
        method: 'post',
        url: `/posts/${payload}/like`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('success like foto')
          context.commit('emitLike', payload)
          // context.dispatch('getPosts')
        })
    },
    emitUpload: function (context, payload) {
      $http({
        method: 'post',
        url: '/posts',
        data: payload,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          swal.close()
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserId: function (context, payload) {
      $http({
        method: 'get',
        url: '/users/id',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.commit('getUserId', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    emitDelete: function (context, payload) {
      $http({
        method: 'delete',
        url: `posts/${payload}`
      })
        .then(response => {
          console.log(response)
          console.log('success delete')
          context.dispatch('getPosts')
        })
    },
    emitLogin: function (context, payload) {
      $http({
        method: 'post',
        url: '/users/signin',
        data: {
          username: payload.email,
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          console.log(`Response Login : ${JSON.stringify(response)}`)
          localStorage.setItem('token', response.data.data.token)
          context.commit('updateUser')
        })
    },
    emitSignup: function (context, payload) {
      $http({
        method: 'post',
        url: '/users/signup',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          name: payload.name
        }
      })
        .then(response => {
          console.log(`Response Signup : ${JSON.stringify(response)}`)
          localStorage.setItem('token', response.data.token)
          context.commit('updateUser')
        })
    },
    clearUser: function (context) {
      context.commit('clearUser')
    }
  }
})
