import {reqVipList} from '../../util/request'

const state = {
    list: []
}

const mutations = {
    getVip (state, arr) {
        state.list = arr;
    }
}

const actions = {
    vipList(context) {
        reqVipList({istree: true}).then(res => {
            context.commit('getVip', res.data.list)
        })
    }
}

const getters = {
    getVipList(state) {
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