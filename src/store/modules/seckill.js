import {reqSeckillList} from '../../util/request'

const state = {
    list: []
}

const mutations = {
    getSeckill (state, arr) {
        state.list = arr;
    }
}

const actions = {
    seckillList(context) {
        reqSeckillList().then(res => {
            console.log(res);
            context.commit('getSeckill', res.data.list)
        })
    }
}

const getters = {
    getSeckillList(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}