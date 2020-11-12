import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const home = () => import('../pages/home/home')
const banner = () => import('../pages/banner/banner')
const vip = () => import('../pages/vip/vip')
const goods = () => import('../pages/goods/goods')
const menu = () => import('../pages/menu/menu')
const role = () => import('../pages/role/role')
const seckill = () => import('../pages/seckill/seckill')
const spec = () => import('../pages/spec/spec')
const manger = () => import('../pages/manger/manger')
const classify = () => import('../pages/classify/classify')


export const indexRouters = [
  {
    path:'role',
    component:role,
    name:'角色管理'
  },
  {
    path:'banner',
    component:banner,
    name:'轮播图管理'
  },
  {
    path:'vip',
    component:vip,
    name:'会员管理'
  },
  {
    path:'goods',
    component:goods,
    name:'商品管理'
  },
  {
    path:'menu',
    component:menu,
    name:'菜单管理'
  },
  {
    path:'seckill',
    component:seckill,
    name:'秒杀管理'
  },
  {
    path:'spec',
    component:spec,
    name:'商品规格'
  },
  {
    path:'manger',
    component:manger,
    name:'管理员管理'
  },
  {
    path:'classify',
    component:classify,
    name:'商品分类'
  }
]

export default new Router({
  routes: [
    {
      path:'/',
      component:login
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'home',
          component:home
        },
        {
          path:'',
          redirect:'home'
        },
        ...indexRouters
      ]
    }
  ]
})
