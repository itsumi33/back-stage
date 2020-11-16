import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manager'
import classify from './modules/classify'
import spec from './modules/spec'
import goods from './modules/goods'
import vip from './modules/vip'
import banner from './modules/banner'
import seckill from './modules/seckill'
import user from './modules/user'
export default new Vuex.Store({
    modules: {
        menu,
        role,
        manger,
        classify,
        spec,
        goods,
        vip,
        banner,
        seckill,
        user
    }
})