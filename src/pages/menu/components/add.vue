<template>
  <div>
    <el-dialog title="菜单添加" :visible.sync="info.isShow" :show-close="false">
      <el-form :model="form">

        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级菜单" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label='1'>目录</el-radio>
          <el-radio v-model="form.type" :label='2'>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
           <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option label="星星" value="el-icon-star-on">
                <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="电脑" value="el-icon-s-platform">
                <i class="el-icon-s-platform"></i>
            </el-option>
             <el-option label="摄像机" value="el-icon-camera-solid">
                <i class="el-icon-camera-solid"></i>
            </el-option>
             <el-option label="铃铛" value="el-icon-message-solid">
                <i class="el-icon-message-solid"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option v-for='item in indexRouters' :key='item.path' :label="'/'+item.path" :value="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch  v-model="form.status"  active-color="#13ce66" inactive-color="#ff4949" :active-value="1"   :inactive-value="2">
                </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="add" v-if='info.isAdd'>添加</el-button>
        <el-button type="primary" @click="updata(form)" v-else>修改</el-button>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {indexRouters} from '../../../router/index'
import {reqMunuAdd,reqMenuOne,reqMenuEdit} from '../../../util/request'
import {mapActions,mapGetters} from 'vuex'
export default {
    props:['info'],
    data(){
        return{
            form:{
                pid:0,
                title:'',
                url:'',
                status:1,
                type:1,
                icon:''
            },
            formLabelWidth:'100px',
            indexRouters:indexRouters,
        }
    },
    methods:{
         //  让弹框隐藏
        hide(){
            this.info.isShow = false
        },
        ...mapActions({
          reqMenuList:'menu/reqMenuList'
        }),
        add(){
            reqMunuAdd(this.form).then(res=>{
              this.hide()
              this.reqMenuList()
              this.reset()
            })
        },
        look(id){
          reqMenuOne({id:id}).then(res=>{
              this.form = res.data.list
              // 目的就是为了更新数据的时候获取id
              this.form.id=id
          })  
        },
        updata(form){
          reqMenuEdit(this.form).then(res=>{
                this.hide()
                this.reqMenuList()
                this.reset()
          })
        },
        reset(){
          this.form.pid=0,
          this.form.title='',
          this.form.icon='',
          this.form.type=1,
          this.form.url='',
          this.form. status=1
        },
        close(){
          this.info.isShow = false
          this.reset()
        }
    }
};
</script>

<style>
</style>