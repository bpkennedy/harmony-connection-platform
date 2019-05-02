import Vue from 'vue'
import Vuex from 'vuex'
import { Notification } from 'element-ui'
import { firebase } from './firebase'
import router from './router'
import { api } from './api'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    loggedIn: false,
    authMessage: {},
    user: {},
    profile: {},
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  actions: {
    async login ({ commit, state }, formData) {
      if (state.loggedIn) {
        return
      }
      try {
        await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
        router.push('/')
        commit('resetAuthMessage', null)
      } catch (error) {
        commit('setAuthMessage', error)
      }
    },
    async logout ({ commit }) {
      try {
        router.push('/login')
        await firebase.auth().signOut()
        commit('cleanState')
      } catch (error) {
        console.log(error)
      }
    },
    async getUserProfile ({ commit }, uid) {
      try {
        const response = await api.get(`users/${uid}`)
        commit('setUserProfile', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async sendResetEmail (store, email) {
      try {
        await firebase.auth().sendPasswordResetEmail(email)
        Notification.success({
          title: 'Success',
          message: 'Password reset email sent. Check your inbox.',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
        Notification.error({
          title: 'Error',
          message: 'Problem sending reset password email! 😢',
          type: 'error'
        })
      }
    },
  },
  mutations: {
    login (state, user) {
      this._vm.$set(state, 'user', user)
      this._vm.$set(state, 'loggedIn', true)
    },
    logout (state) {
      this._vm.$set(state, 'loggedIn', false)
    },
    setAuthMessage (state, message) {
      this._vm.$set(state, 'authMessage', { ...message })
    },
    resetAuthMessage (state) {
      this._vm.$set(state, 'authMessage', {})
    },
    setUserProfile (state, profile) {
      this._vm.$set(state, 'profile', profile)
    },
    cleanState (state) {
      Object.assign(state, getDefaultState())
    },
  },
})
