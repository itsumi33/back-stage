<template>
  <div class="login">
      <div class="con">
        <h2>登录</h2>
        <div><input type="text" placeholder="请输入用户名" v-model="user.username"></div>
        <div><input type="password" placeholder="请输入密码" v-model="user.password"></div>
        <div><button @click="login">登录</button></div>
      </div>
  </div>
</template>

<script>
import {userLogin} from '../../util/request'
import {mapGetters, mapMutations} from 'vuex'
export default {
data() {
 return {
     user: {
         username: '',
         password: ''
     }
 };
 },
 computed:{
 },
 watch:{
 },
 methods: {
     ...mapMutations({
         getUser: 'user/getUser'
     }),
     login() {
         userLogin(this.user).then(res => {
             console.log(res);
            this.getUser(res.data.list);
            this.$router.push('/index');
         })  
         
     }
 },
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#563544,#2F3D60);
}
.con{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  height: 300px;
  width: 550px;
  background: #fff;
  border-radius: 15px;
}
.con h2{
  margin: 20px;
}
.con input{
  height: 18px;
  width: 278px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #333;
  font-size: 14px;
  /* text-indent: 1em; */
}
.con button{
    width: 300px;
    min-height: 20px;
    display: block;
    background-color: #4a77d4;
    border: 1px solid #3762bc;
    color: #fff;
    padding: 9px 14px;
    font-size: 15px;
    line-height: normal;
    border-radius: 5px;
    margin-top: 10px;
    margin: auto;
}
</style>