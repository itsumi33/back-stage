<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened='changeEditor' @closed='closed'>
      <el-form :model="form">

        <el-form-item label="一级分类" :label-width="width" >
          <el-select v-model="form.first_cateid" @change='changeCate'>
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.catename" :value="item.id" v-for="item in classifyList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.catename" :value="item.id" v-for="item in secondList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
           <el-upload
            class="avatar-uploader"
            action="#"
            :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid"  @change='changeSpec'>
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item.specsname" :value="item.id" v-for="item in specList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option :label="item" :value="item" v-for="item in secondSpec" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
            <el-radio :label="1" v-model='form.isnew'>是</el-radio>
            <el-radio :label="2" v-model='form.isnew'>否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
            <el-radio :label="1" v-model='form.ishot'>是</el-radio>
            <el-radio :label="2" v-model='form.ishot'>否</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="width">
             <!-- <el-input type="textarea" v-model="form.description"></el-input> -->
             <div id="desc" v-if="info.isShow"></div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button>
        <el-button type="primary" @click="update(form)" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import { confirm, cancel } from "../../../util/alert";
import {reqGoodsAdd, reqGoodsOne, reqGoodsEdit} from '../../../util/request';

import E from 'wangeditor';

export default {
  props: ["info"],
  data() {
    return {
      isShow: true,
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: null,
        market_price: null,
        img: null,
        description: '',
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      width: "120px",
      imageUrl: '',
      secondList: [],
      secondSpec: []
    };
  },
  computed: {
     ...mapGetters({
          classifyList: 'classify/getClassifyList',
          specList: 'spec/getSpecList',
          list: 'goods/getGoodsList',  
          GoodsTotalPages: 'goods/GoodsTotalPages',
          GoodsPage: 'goods/GoodsPage'      
      }),
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
       first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: null,
        market_price: null,
        img: null,
        description: '',
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    closed() {
      this.empty();
      this.imageUrl = '';
    },
    changeImg(e) {
      console.log(e);
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 选择一级分类得到二级分类
    changeCate() {
      this.secondList = this.classifyList.find(item => {return item.id == this.form.first_cateid}).children;
      console.log(this.classifyList);
    },
    changeSpec() {
      this.secondSpec = this.specList.find(item => {return item.id == this.form.specsid}).attrs;
      console.log(this.specList);
    },
    // 富文本编辑器
    changeEditor() {
      this.editor = new E('#desc');
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    // 添加按钮
    add() {
      this.form.description = this.editor.txt.html();
      reqGoodsAdd(this.form).then(res => {
        this.hide();
        this.getSpecList();
        this.goodsCount();
        // this.goodsCurrentPage();
        this.empty();
        this.imageUrl = '';
        confirm(res.data.msg);
      })
    },
    ...mapActions({
      getClassifyList: 'classify/classifyList',
      getSpecList: 'spec/specList',
      goodsList: 'goods/goodsList',
      goodsCount: 'goods/goodsCount',
      goodsCurrentPage: 'goods/goodsCurrentPage'
    }),
    // 获取某一条数据
    look(id) {
      reqGoodsOne({id: id}).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg+res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(',')
        this.changeCate();
        // this.changeSpec();
      })
    },
    // 修改按钮
    update() {
      this.form.description = this.editor.txt.html();
      this.$confirm("此操作将修改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 修改操作
          reqGoodsEdit(this.form).then(res => {
            this.getSpecList();
            this.hide();
            this.empty();
            this.imageUrl = '';
            confirm(res.data.msg);
          })
          
        })
        .catch(() => {
          cancel(res.data.msg);
        });
    },
  },
  mounted() {
    this.getClassifyList();
    this.getSpecList();
    this.changeEditor();
  }
};
</script>

<style lang='' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
