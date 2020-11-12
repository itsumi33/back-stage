

import {reqUserList,reqUserCount} from '../../util/request'

// 初始数据
const state={
    list:[],  //请求回来到数据,
    total:0,//管理员总数,
    size:5,//每页展示几条
    page:1,//当前页码数
}   
// 修改数据
const mutations={
    changeList(state,arr){
        state.list=arr
    },
    changeTotal(state,num){
        state.total = num
    },
    changePage(state,page){
        state.page = page
    }   
}
// 异步操作数据
const actions={
    requestUserList(context){
        reqUserList({
            size:context.state.size,
            page:context.state.page
        }).then(res=>{
            context.commit('changeList',res.data.list)
        })        
    },
    // 请求总数
    requestUserCount(context,res){
        reqUserCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 获取当前页码数
    getCurrentPage(context,page){
        context.commit('changePage',page)
        // 目的是为了根据page的不同发送axios请求，那么这个请求的数据在mutations中，那么mutations不能修改actions，所以需要用下面方法
        context.dispatch('requestUserList')
    }
}
// 导出数据
const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    page(state){
        return state.page
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