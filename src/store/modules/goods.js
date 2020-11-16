import {reqGoodsList, reqGoodsCount} from '../../util/request'

const state = {
    list: [],
    size: 2,
    page: 2,
    total: 0
}

const mutations = {
    getGoods(state, arr) {
        state.list = arr;
    },
    getGoodsTotal(state, page) {
        state.total = page;
    },
    getGoodsPage(state, page) {
        state.page = page;
    }
}

const actions = {
    goodsList(context) {
        reqGoodsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            // console.log(res);
            context.commit('getGoods', res.data.list)
        })
    },
    // 请求总数
    goodsCount(context) {
        reqGoodsCount().then(res => {
            context.commit('getGoodsTotal', res.data.list[0].total)
        })
    },
    // 改变当前页
    goodsCurrentPage(context, page) {
        context.commit('getGoodsPage', page);
        context.dispatch('goodsList');
    }
}

const getters = {
    getGoodsList(state) {
        return state.list;
    },
    GoodsTotalPages(state) {
        return state.total;
    },
    GoodsPage(state) {
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