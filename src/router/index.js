import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

// 懒加载
const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const home = () => import('../pages/home/home')
const menu = () => import('../pages/menu/menu')
const manager = () => import('../pages/manager/manager')
const role = () => import('../pages/role/role')
const classify = () => import('../pages/classify/classify')
const spec = () => import('../pages/spec/spec')
const banner = () => import('../pages/banner/banner')
const vip = () => import('../pages/vip/vip')
const seckill = () => import('../pages/seckill/seckill')
const goods = () => import('../pages/goods/goods')


export const indexRouters = [
  {
    path: 'menu',
    component: menu,
    name: '菜单管理',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'role',
    component: role,
    name: '角色管理',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'manager',
    component: manager,
    name: '管理员管理',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'classify',
    component: classify,
    name: '商品分类',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'spec',
    component: spec,
    name: '商品规格',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'goods',
    component: goods,
    name: '商品管理',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'vip',
    component: vip,
    name: '会员管理',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'banner',
    component: banner,
    name: '轮播图管理',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  },
  {
    path: 'seckill',
    component: seckill,
    name: '秒杀活动',
    beforeEnter(to, from, next) {
      if(from.path.includes('/index')) {
        next();
      }else {
        next('/index');
      }
    }
  } 
]

 const router = new Router({
  routes: [
    {
      path:'/',
      component: login
    },
    {
      path:'/login',
      component: login
    },
    {
      path:'/index',
      component: index,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: home
        },
        ...indexRouters
      ]
    }
  ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
  if(to.path == '/login') {
    next();
  }
  // 如果已经登录可以直接进入
  if(store.state.user.list) {
    next();
  }else {
    next('/login');
  }
})



export default router
