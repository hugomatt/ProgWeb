import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import VueSessionStorage from 'vue-sessionstorage'

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueSessionStorage)
Vue.use(VueSession)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: require('@/components/Login.vue').default
  },
  {
    path: '/register',
    name: 'Register',
    component: require('@/components/Register.vue').default
  },
  {
    path: '/logout',
    name: 'Logout',
    component: require('@/components/Logout.vue').default
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
