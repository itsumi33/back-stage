import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import menu from './modules/menu'
import role from './modules/role'
export default new Vuex.Store({
        modules:{
            menu,
            role
        }
})