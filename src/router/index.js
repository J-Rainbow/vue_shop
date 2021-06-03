import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../components/LoginView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LoginView
  }
]

const router = new VueRouter({
  routes
})

export default router
