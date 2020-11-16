<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
            </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="update(form)">修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {reqVipEdit, reqVipOne} from '../../../util/request'
import {mapGetters, mapActions} from 'vuex'
import {confirm, cancel} from '../../../util/alert'

export default {
    props: ['info'],
  data() {
      return {
        isShow: true,
        form: {
          uid: 0,
          nickname: '',
          phone: '',
          password: '',
          status: 1
        },
        width: '120px',
      };
    },
  computed: {
      ...mapGetters({
        list: 'vip/getVipList'
      })
  },
  watch: {},
  methods: {
     // 弹出框隐藏
      hide() {
          this.info.isShow = false;
      },
      // 表单置空
      empty() {
        this.form = {
          uid: 0,
          nickname: '',
          phone: '',
          password: '',
          status: 1
        } 
      },
      closed() {
        this.empty();
      },
      ...mapActions({
          vipList: 'vip/vipList'
      }),
      // 获取某一条数据
      look(id) {
          reqVipOne({uid:id}).then(res => {
              this.form = res.data.list
              this.form.uid = id
          })
      },
      // 修改按钮
      update() {
          this.$confirm('此操作将修改数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 修改操作
           reqVipEdit(this.form).then(res => {
            this.hide();
            this.vipList();
            this.empty();
            confirm(res.data.msg);
          });
        })
      }
  },
  mounted() {
    this.vipList();
  }
};
</script>

<style lang='' scoped>
</style>
