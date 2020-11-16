<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="form">
        
        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <!-- <el-upload
            action="#"
            multiple
            list-type="picture-card"
            :on-change="changeImg">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imageUrl" alt="">
          </el-dialog> -->
           <el-upload
            class="avatar-uploader"
            action="#"
            multiple
            :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import {reqBannerAdd, reqBannerOne, reqBannerEdit} from '../../../util/request';

export default {
  props: ["info"],
  data() {
    return {
      dialogVisible: true,
      isShow: true,
      form: {
        title: "",
        img: null,
        status: 1,
      },
      width: "120px",
      imageUrl: ''
    };
  },
  computed: {
     ...mapGetters({
          list: 'banner/getBannerList'
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
        title: "",
        img: null,
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
    // 添加按钮
    add() {
      reqBannerAdd(this.form).then(res => {
        this.hide();
        this.bannerList();
        this.empty();
        this.imageUrl = '';
        confirm(res.data.msg);
      })
    },
    ...mapActions({
      bannerList: 'banner/bannerList'
    }),
    // 获取某一条数据
    look(id) {
      reqBannerOne({id: id}).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg+res.data.list.img;
      })
    },
    // 修改按钮
    update() {
      this.$confirm("此操作将修改数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 修改操作
          reqBannerEdit(this.form).then(res => {
            this.bannerList();
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
