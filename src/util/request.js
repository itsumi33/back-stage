import axios from 'axios'
import qs from 'qs';

const addUrl = '/api'

// 响应拦截器
axios.interceptors.response.use(res=>{
    console.log(res);
    return res
})


// 获取菜单列表
export const reqGetMenuList = (params)=>{
    return axios({
        url:addUrl + '/api/menulist',
        method:'get',
        params:params
    })
}

// 菜单添加
export const reqMunuAdd=(form)=>{
    return  axios({
        url:addUrl+'/api/menuadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 菜单删除
export const reqMenuDel=(id)=>{
    return  axios({
        url:addUrl+'/api/menudelete',
        method:'post',
        data:id
    })
}

// 菜单获取一条数据
export const reqMenuOne=(params)=>{
    return  axios({
        url:addUrl+'/api/menuinfo',
        method:'get',
        params:params
    })
}



// 菜单修改
export const reqMenuEdit=(form)=>{
    return  axios({
        url:addUrl+'/api/menuedit',
        method:'post',
        data:form
    })
}

////////////////////////////////////////////////////////////////////////////////////


// 角色添加
export const reqRoleAdd=(form)=>{
    return  axios({
        url:addUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(form)
    })
}
// 角色列表
export const reqRoleList=()=>{
    return  axios({
        url:addUrl+'/api/rolelist',
        method:'get',
    })
}

// 角色删除
export const reqRoleDel=(id)=>{
    return  axios({
        url:addUrl+'/api/roledelete',
        method:'post',
        data:id
    })
}

// 角色获取一条数据
export const reqRoleOne=(params)=>{
    return  axios({
        url:addUrl+'/api/roleinfo',
        method:'get',
        params:params
    })
}



// 角色修改
export const reqRoleEdit=(form)=>{
    return  axios({
        url:addUrl+'/api/roleedit',
        method:'post',
        data:form
    })
}