import {reqSpecList, reqSpecsCount} from '../../util/request'

const state = {
    list: [],
    size: 2,
    page: 2,
    total: 0
}

const mutations = {
    getSpec(state, arr) {
        state.list = arr;
    },
    getSpecTotal(state, page) {
        state.total = page;
    },
    getSpecPage(state, page) {
        state.page = page;
    }
}

const actions = {
    specList(context) {
        reqSpecList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            // console.log(res);
            var arr = res.data.list;
            arr.forEach(item => {
                item.attrs = JSON.parse(item.attrs);
            });
            context.commit('getSpec', arr)
            // console.log(arr);
        })
    },
    // 请求总数
    specCount(context) {
        reqSpecsCount().then(res => {
            context.commit('getSpecTotal', res.data.list[0].total)
        })
    },
    // 改变当前页
    specCurrentPage(context, page) {
        context.commit('getSpecPage', page);
        context.dispatch('specList');
    }
}

const getters = {
    getSpecList(state) {
        return state.list;
    },
    specTotalPages(state) {
        return state.total;
    },
    specPage(state) {
        return state.page;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
} 