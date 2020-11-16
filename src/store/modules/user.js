
const state = {
    list: sessionStorage.getItem('list')? JSON.parse(sessionStorage.getItem('list')) : {}
}

const mutations = {
    getUser (state, obj) {
        state.list = obj;
        sessionStorage.setItem('list',JSON.stringify(obj));
    }
}

const actions = {}

const getters = {
    getUserList(state) {
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