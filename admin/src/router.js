import Vue from 'vue'
import Router from 'vue-router'
import { firebase } from './firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "auth" */ './views/Login.vue')
    },
    {
      path: '/forgotpass',
      name: 'forgotpass',
      component: () => import(/* webpackChunkName: "auth" */ './views/ForgotPassword.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
