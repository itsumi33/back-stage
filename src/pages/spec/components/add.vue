<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width" v-for="(item, index) in attr" :key="index">
          <el-row>
            <el-col :span='16'>
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span='4'>
              <el-button type='primary' v-if="index == 0" @click="addAttr">新增规格属性</el-button>
              <el-button type='danger' v-else @click="delAttr(index)">删除</el-button>
            </el-col>
          </el-row>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update(form)" v-else
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {confirm, cancel} from '../../../util/alert'
import {reqSpecAdd, reqSpecOne, reqSpecEdit} from '../../../util/request'

export default {
    props: ['info'],
  data() {
      return {
        isShow: true,
        form: {
          specsname: '',
          attrs: '',
          status: 1
        },
        width: '120px',
        attr: [
          {value: ''}
        ]
      };
    },
  computed: {
      ...mapGetters({
        list: "spec/getSpecList",
        total: 'spec/specTotalPages',
        page: 'spec/specPage'
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
          specsname: '',
          attrs: '',
          status: 1
        }
      },
      closed() {
         this.empty();
         this.attr = [{value: ''}];
      },
      // 添加属性
      addAttr() {
        this.attr.push({value: ''});
      },
      // 删除属性
      delAttr(index) {
        this.attr.splice(index, 1);
      },
      // 添加按钮
      add() {
        this.form.attrs = JSON.stringify(this.attr.map(item =>{return item.value}));
          reqSpecAdd(this.form).then(res => {
            this.hide();
            this.empty();
            this.specList();
            this.specCount();
            this.attr = [{value: ''}];
            confirm(res.data.msg);
          })
      },
      ...mapActions({
          specList: "spec/specList",
          specCount: 'spec/specCount',
          specCurrentPage: 'spec/specCurrentPage'
      }),
      // 获取某一条数据
      look(id) {
          reqSpecOne({id: id}).then(res => {
            console.log(res.data.list);
            this.form = res.data.list[0];
            this.form.id = id;
            this.attr = JSON.parse(this.form.attrs).map(item => {return {value: item}});
          })
      },
      // 修改按钮
      update() {
          this.$confirm('此操作将修改数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.form.attrs = JSON.stringify(this.attr.map(item =>{return item.value}));
          // 修改操作
          reqSpecEdit(this.form).then(res => {
            this.hide();
            this.empty();
            this.specList();
            this.specCount();
            this.specCurrentPage(this.page);
            this.attr = [{value: ''}];
            confirm(res.data.msg);
          })
        })
      }
  },
  mounted() {
    this.specList();
  }
};
</script>

<style lang='' scoped>
</style>
