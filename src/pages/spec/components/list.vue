<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" width="120">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope="scope">
            <el-tag type="success" v-for='item in scope.row.attrs' :key='item'>{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="2" :current-page='page' background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" @prev-click="handleCurrentChange" @next-click="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { confirm, cancel } from "../../../util/alert";
import {reqSpecDel} from '../../../util/request'

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      list: "spec/getSpecList",
      total: 'spec/specTotalPages',
      page: 'spec/specPage'
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      specList: "spec/specList",
      specCount: 'spec/specCount',
      specCurrentPage: 'spec/specCurrentPage'
    }),
    // 删除
    del(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          reqSpecDel({id: id}).then(res => {
            this.specList();
            this.specCount();
            this.specCurrentPage(1);
            confirm(res.data.msg);
          })
        })
    },
    // 更新
    update(id) {
      this.$emit("edit", id);
    },
    handleCurrentChange(p) {
      this.specCurrentPage(p);

    }
  },
  mounted() {
    this.specList();
    this.specCount();
    this.specCurrentPage(1);
  },
};
</script>

<style lang='' scoped>
</style>
