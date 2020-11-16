import axios from 'axios'
import qs from 'qs';

const addUrl = '/api'

// 响应拦截器
axios.interceptors.response.use(res => {
    console.log(res);
    return res
})


// 获取菜单列表
export const reqGetMenuList = (params) => {
    return axios({
        url: addUrl + '/api/menulist',
        method: 'get',
        params: params
    })
}

// 菜单添加
export const reqMunuAdd = (form) => {
    return axios({
        url: addUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(form)
    })
}

// 菜单删除
export const reqMenuDel = (id) => {
    return axios({
        url: addUrl + '/api/menudelete',
        method: 'post',
        data: id
    })
}

// 菜单获取一条数据
export const reqMenuOne = (params) => {
    return axios({
        url: addUrl + '/api/menuinfo',
        method: 'get',
        params: params
    })
}



// 菜单修改
export const reqMenuEdit = (form) => {
    return axios({
        url: addUrl + '/api/menuedit',
        method: 'post',
        data: form
    })
}

////////////////////////////////////////////////////////////////////////////////////


// 角色添加
export const reqRoleAdd = (form) => {
    return axios({
        url: addUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(form)
    })
}
// 角色列表
export const reqRoleList = () => {
    return axios({
        url: addUrl + '/api/rolelist',
        method: 'get',
    })
}

// 角色删除
export const reqRoleDel = (id) => {
    return axios({
        url: addUrl + '/api/roledelete',
        method: 'post',
        data: id
    })
}

// 角色获取一条数据
export const reqRoleOne = (params) => {
    return axios({
        url: addUrl + '/api/roleinfo',
        method: 'get',
        params: params
    })
}



// 角色修改
export const reqRoleEdit = (form) => {
    return axios({
        url: addUrl + '/api/roleedit',
        method: 'post',
        data: form
    })
}


////////////////////////管理员管理///////////////////////////////////////
// 管理员添加
export const reqUserAdd = (form) => {
    return axios({
        url: addUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(form)
    })
}
// 管理员列表
export const reqUserList = (params) => {
    return axios({
        url: addUrl + '/api/userlist',
        method: 'get',
        params: params
    })
}

// 管理员删除
export const reqUserDel = (id) => {
    return axios({
        url: addUrl + '/api/userdelete',
        method: 'post',
        data: id
    })
}

// 管理员获取一条数据
export const reqUserOne = (params) => {
    return axios({
        url: addUrl + '/api/userinfo',
        method: 'get',
        params: params
    })
}



// 角色修改
export const reqUserEdit = (form) => {
    return axios({
        url: addUrl + '/api/useredit',
        method: 'post',
        data: form
    })
}

// 管理员总数
export const reqUserCount = () => {
    return axios({
        url: addUrl + '/api/usercount',
        method: 'get',
    })
}

////////////////////////商品分类管理///////////////////////////////////////
// 商品分类添加
export const reqClassifyAdd = (form) => {
    //  {a:1,b:2}
    var data = new FormData();
    // data.append('a',1)
    // data.append('b',2)
    for (var i in form) {
        data.append(i, form[i])
    }

    return axios({
        url: addUrl + '/api/cateadd',
        method: 'post',
        data: data
    })
}
// 商品分类列表
export const reqClassifyList = (params) => {
    return axios({
        url: addUrl + '/api/catelist',
        method: 'get',
        params: params
    })
}

// 商品分类删除
export const reqClassifyDel = (id) => {
    return axios({
        url: addUrl + '/api/catedelete',
        method: 'post',
        data: id
    })
}

// 商品分类获取一条数据
export const reqClassifyOne = (params) => {
    return axios({
        url: addUrl + '/api/cateinfo',
        method: 'get',
        params: params
    })
}



// 商品分类修改
export const reqClassifyEdit = (form) => {
    var data = new FormData();
    for (var i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: addUrl + '/api/cateedit',
        method: 'post',
        data: data
    })
}


///////////商品规格///////////
// 商品规格添加
export const reqSpecAdd = (form) => {
    return axios({
        url: '/api/specsadd',
        method: 'post',
        data: qs.stringify(form)
    })
}

// 商品规格总数
export const reqSpecsCount = () => {
    return axios({
        url: '/api/specscount',
        method: 'get',
    })
}

// 商品规格列表
export const reqSpecList = (params) => {
    return axios({
        url: '/api/specslist',
        method: 'get',
        params: params
    })
}

// 商品规格获取（一条）
export const reqSpecOne = (params) => {
    return axios({
        url: '/api/specsinfo',
        method: 'get',
        params: params
    })
}

// 商品规格修改
export const reqSpecEdit = (form) => {
    return axios({
        url: '/api/specsedit',
        method: 'post',
        data: qs.stringify(form)
    })
}

// 商品规格删除
export const reqSpecDel = (params) => {
    return axios({
        url: '/api/specsdelete',
        method: 'post',
        data: params
    })
}



///////////商品管理///////////
// 商品管理添加
export const reqGoodsAdd = (form) => {
    var data = new FormData();
    for(var i in form) {
        data.append(i, form[i]);
    }
    return axios({
        url: '/api/goodsadd',
        method: 'post',
        data: data
    })
}

// 商品管理总数
export const reqGoodsCount = () => {
    return axios({
        url: '/api/goodscount',
        method: 'get',
    })
}

// 商品管理列表
export const reqGoodsList = (params) => {
    return axios({
        url: '/api/goodslist',
        method: 'get',
        params: params
    })
}

// 商品管理获取（一条）
export const reqGoodsOne = (params) => {
    return axios({
        url: '/api/goodsinfo',
        method: 'get',
        params: params
    })
}

// 商品管理修改
export const reqGoodsEdit = (form) => {
    var data = new FormData();
    for(var i in form) {
        data.append(i, form[i]);
    }
    return axios({
        url: '/api/goodsedit',
        method: 'post',
        data: data
    })
}

// 商品管理删除
export const reqGoodsDel = (params) => {
    return axios({
        url: '/api/goodsdelete',
        method: 'post',
        data: params
    })
}


///////////会员管理///////////
// 会员列表
export const reqVipList = () => {
    return axios({
        url: '/api/memberlist',
        method: 'get',
    })
}

// 会员获取（一条）
export const reqVipOne = (params) => {
    return axios({
        url: '/api/memberinfo',
        method: 'get',
        params: params
    })
}

// 会员修改
export const reqVipEdit = (form) => {
    return axios({
        url: '/api/memberedit',
        method: 'post',
        params: qs.stringify(form)
    })
}



///////////轮播图管理///////////
// 轮播图添加
export const reqBannerAdd = (form) => {
    var data = new FormData();
    for(var i in form) {
        data.append(i, form[i]);
    }
    return axios({
        url: '/api/banneradd',
        method: 'post',
        data: data
    })
}

// 轮播图列表
export const reqBannerList = () => {
    return axios({
        url: '/api/bannerlist',
        method: 'get',
    })
}

// 轮播图获取（一条）
export const reqBannerOne = (params) => {
    return axios({
        url: '/api/bannerinfo',
        method: 'get',
        params: params
    })
}

// 轮播图修改
export const reqBannerEdit = (form) => {
    var data = new FormData();
    for(var i in form) {
        data.append(i, form[i]);
    }
    return axios({
        url: '/api/banneredit',
        method: 'post',
        data: data
    })
}

// 轮播图删除
export const reqBannerDel = (params) => {
    return axios({
        url: '/api/bannerdelete',
        method: 'post',
        data: params
    })
}


///////////限时秒杀///////////
// 限时秒杀添加
export const reqSeckillAdd = (form) => {
    return axios({
        url: '/api/seckadd',
        method: 'post',
        data: qs.stringify(form)
    })
}

// 限时秒杀列表
export const reqSeckillList = () => {
    return axios({
        url: '/api/secklist',
        method: 'get',
    })
}

// 限时秒杀获取（一条）
export const reqSeckillOne = (params) => {
    return axios({
        url: '/api/seckinfo',
        method: 'get',
        params: params
    })
}

// 限时秒杀修改
export const reqSeckillEdit = (form) => {
    return axios({
        url: '/api/seckedit',
        method: 'post',
        data: form
    })
}

// 限时秒杀删除
export const reqSeckillDel = (params) => {
    return axios({
        url: '/api/seckdelete',
        method: 'post',
        data: params
    })
}