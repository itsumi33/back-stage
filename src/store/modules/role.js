import {reqRoleList} from '../../util/request'

const state ={
    list:[]
}

const mutations = {
    changeList(state,arr){
        state.list = arr
    }
}

const actions = {
    reqRoleList(context){
        reqRoleList().then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    //如果需要导出给index使用，必须添加
    namespaced:true 
}