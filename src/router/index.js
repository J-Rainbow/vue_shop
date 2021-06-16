import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../components/LoginView'
import HomeView from '../components/HomeView'
import WelcomeView from '../components/WelcomeView'
import UserView from '../components/user/UserView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/home',
    component: HomeView,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: WelcomeView },
      { path: '/user', component: UserView }
    ]
  },
  // {
  //   path: '/welcome',
  //   component: WelcomeView
  // }
]

const router = new VueRouter({
  routes
})

export default router
