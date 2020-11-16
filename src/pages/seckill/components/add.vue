<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">

        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="width">
         <div class="block">
            <el-date-picker
              v-model="timerPicker"
              :picker-options='pickerOptions'
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option label="请选择分类" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.catename" :value="item.id" v-for="item in classifyList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" @change="changeGoods">
            <el-option label="请选择分类" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.catename" :value="item.id" v-for="item in secondList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid">
            <el-option label="请选择商品" :value="0" disabled></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.goodsname" :value="item.id" v-for="item in thirdList" :key="item.id"></el-option>
          </el-select>
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

import {reqSeckillAdd, reqSeckillOne, reqSeckillEdit} from '../../../util/request'
import {mapGetters, mapActions} from 'vuex'
import {confirm, cancel} from '../../../util/alert'

export default {
    props: ['info'],
  data() {
      return {
        isShow: true,
        form: {
          title: '',
          begintime: '',
          endtime: '',
          first_cateid: 0,
          second_cateid: 0,
          goodsid: 0,
          status: 1
        },
        width: '120px',
        secondList: [],
        thirdList: [],
        timerPicker: '',
        begin: '',
        end: '',
        pickerOptions: {
          onPick: ({maxDate, minDate}) => {
            return this.changeTimer({maxDate, minDate});
          }
        }
      };
    },
  computed: {
      ...mapGetters({
        list: 'seckill/getSeckillList',
        classifyList: 'classify/getClassifyList',
        goodsList: 'goods/getGoodsList', 
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
          title: '',
          begintime: '',
          endtime: '',
          first_cateid: 0,
          second_cateid: 0,
          goodsid: 0,
          status: 1
        } 
      },
      closed() {
        this.empty();
        
      },
      changeTimer({maxDate, minDate}) {
        this.begin = new Date(minDate).getTime();
        this.end = new Date(maxDate).getTime();
      },
      // 选择一级分类得到二级分类
      changeCate() {
      this.secondList = this.classifyList.find(item => {return item.id == this.form.first_cateid}).children;
      // console.log(this.secondList);
    },
    changeGoods() {
      this.thirdList = this.goodsList.filter(item => {return item.first_cateid == this.form.first_cateid && item.second_cateid == this.form.second_cateid});
      // console.log(this.goodsList);
      console.log(this.thirdList);
    },
      // 添加按钮
      add() {
        this.form.begintime = JSON.stringify(this.begin);
        this.form.endtime = JSON.stringify(this.end);
        // console.log(this.begin, this.end);

          reqSeckillAdd(this.form).then(res => {
            console.log(res);
            this.hide();
            this.seckillList();
            this.empty();
            confirm(res.data.msg);
            this.begin = '';
            this.end = '';
          })
      },
      ...mapActions({
          seckillList: 'seckill/seckillList',
          getClassifyList: 'classify/classifyList',
          getGoodsList: 'goods/goodsList',
      }),
      // 获取某一条数据
      look(id) {
          reqSeckillOne({id:id}).then(res => {
              this.form = res.data.list;
              this.form.id = id;
          })
      },
      // 修改按钮
      update() {

          this.$confirm('此操作将修改数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.form.begintime = this.begin;
          // this.form.endtime = this.end;
        this.form.begintime = JSON.stringify(this.begin);
        this.form.endtime = JSON.stringify(this.end);

          // 修改操作
           reqSeckillEdit(this.form).then(res => {
            this.hide();
            this.seckillList();
            this.empty();
            confirm(res.data.msg);
            this.begin = '';
            this.end = '';
          });
        })
      }
  },
  mounted() {
    this.seckillList();
    this.getClassifyList();
    this.getGoodsList();
  }
};
</script>

<style lang='' scoped>
</style>
