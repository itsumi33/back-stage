<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" :show-close='false'>
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
           <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option v-for='item in list' :key='item.id' :label='item.rolename' :value='item.id' ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="skyblue"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="add" v-if='info.isAdd'>添加</el-button
        >
        <el-button type='primary' @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqUserAdd, reqUserOne, reqUserEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
    props:['info'],
    computed:{
        ...mapGetters({
            list:'role/list',
            page:'manger/list',
            total:'manger/total'
        })
    },
    data(){
        return{
            form:{
                roleid:0,
                username:'',
                password:'',
                status:1
            },
            formLabelWidth:'130px'
        }
    },
    methods:{
        ...mapActions({
            reqRoleList: "role/reqRoleList",
            requestUserList: "manger/requestUserList",
            requestUserCount: "manger/requestUserCount",
            getCurrentPage: "manger/getCurrentPage",
        }),
        add(){
            // this.info.isShow = false;
            reqUserAdd(this.form).then(res=>{
              this.hide()
              this.requestUserCount();
              this.requestUserList()
              this.reset();
            })
        },
        hide(){
          this.info.isShow = false
        },
        reset(){
          this.form={
            roleid:0,
            username:'',
            password:'',
            status:1
          }
        },
        lookOne(id){
          reqUserOne({uid:id}).then(res=>{
            this.form = res.data.list;
            this.form.password = ''
          })
        },
        updata(){
          reqUserEdit(this.form).then(res=>{
            this.hide();
            this.requestUserList();
            this.reset()
          })
        },
        close(){
          this.hide();
          this.reset()
        }
    },
    mounted(){
        this.reqRoleList();
        this.requestUserCount();
        this.requestUserList();
    }
};
</script>

<style>
</style>