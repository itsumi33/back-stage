<template>
  <div>
    <el-container>
      <el-aside width="200px">
       <el-menu
          default-active="/index/home"
          router
          class="el-menu-vertical-demo"
          unique-opened
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">

            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>系统设置</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/manger">管理员管理</el-menu-item>
            </el-menu-item-group>

          </el-submenu>

          <el-submenu index="3">

            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>商城管理</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="/index/classify">商品分类</el-menu-item>
              <el-menu-item index="/index/spec">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/vip">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>

         <el-header> 
            <div class="admin">
                <span>{{list.username}}</span>
                <i class="el-icon-setting" @click="quit">out</i>
            </div>
        </el-header>


        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <div class="login_btn">
            <router-view></router-view>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data() {
 return {
 };
 },
 computed:{
   ...mapGetters({
     list: 'user/getUserList',
     menulist: 'menu/getList'
   })
 },
 watch:{
 },
 methods: {
   ...mapMutations({
     getUser: 'user/getUser',
     getMenuList: 'menu/menuList'
   }),
   quit() {
     // 清空缓存
     this.getUser({});
     this.$router.push('/login');
   }
 },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.admin {
    float: right;
    line-height: 48px;
}

.el-aside {
  height: 100vh;
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}
.login_btn{
  margin-top: 20px;
}
</style>