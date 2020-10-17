import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/Login'
import Home from './components/home/home'
import HomeWelcome from './components/home/children/HomeWelcome'
import Users from './components/user/users.vue'
import PowerList from './components/power/powerList/powerList'
import RoleList from './components/power/roleList/roleList'
import Goods from '@/components/goods/goods/goods'
import GoodsCategories from '@/components/goods/goodsCategories/goodsCategories'
import GoodsParams from '@/components/goods/goodsParams/goodsParams'
import Orders from '@/components/orders/orders'
import Reports from '@/components/reports/reports'
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
      component: Home,
      redirect:'/welcome',
      children:[
          {
          path:'/welcome',
          component:HomeWelcome    
          },{
            path:'/users',
            component:Users   
          },{
            path:'/roles',
            component:RoleList   
          }
          ,{
            path:'/rights',
            component:PowerList   
          },
          {
            path:'/goods',
            component:Goods   
          },
          {
            path:'/params',
            component:GoodsParams   
          },
          {
            path:'/categories',
            component:GoodsCategories   
          },
          {
            path:'/orders',
            component:Orders   
          },
          {
            path:'/reports',
            component:Reports   
          }
      ]
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
