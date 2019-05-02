import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { firebase } from './firebase'

Vue.config.productionTip = false

let app = ''

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    try {
      await store.commit('login', user)
      await store.dispatch('getUserProfile', user.uid)
    } catch (error) {
      console.log(error)
    }
  } else {
    await store.commit('logout')
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
