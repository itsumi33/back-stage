import {reqClassifyList} from '../../util/request'

const state = {
    list: []
}

const mutations = {
    getClassify (state, arr) {
        state.list = arr;
    }
}

const actions = {
    classifyList(context, id) {
        reqClassifyList({istree: true, pid: id}).then(res => {
            context.commit('getClassify', res.data.list)
        })
    }
}

const getters = {
    getClassifyList(state) {
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