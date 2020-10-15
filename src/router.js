import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/Login'
import Home from './components/home/home'

Vue.use(Router)

const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  if(to.path=='/login') return next()
  if(!tokenStr) return next('/login')
   next()
})
export default router
