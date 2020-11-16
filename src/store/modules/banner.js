import {reqBannerList} from '../../util/request'

const state = {
    list: []
}

const mutations = {
    getBanner (state, arr) {
        state.list = arr;
    }
}

const actions = {
    bannerList(context) {
        reqBannerList({istree: true}).then(res => {
            context.commit('getBanner', res.data.list)
        })
    }
}

const getters = {
    getBannerList(state) {
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