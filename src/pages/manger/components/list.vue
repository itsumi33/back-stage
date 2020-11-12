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
      <el-table-column prop="id" label="用户编号" sortable width="120">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="130">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="140">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="danger" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="updata(scope.row.uid)"
              >修改</el-button
            >
            <el-button type="danger" @click="del(scope.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="5"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="changeCurrentPage"
      :current-page="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqUserDel } from "../../../util/request";
import { alertSuccess, alertwarning } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "manger/list",
      roleList: "role/list",
      total: "manger/total",
      page: "manger/page",
    }),
  },
  methods: {
    ...mapActions({
      requestUserList: "manger/requestUserList",
      reqRoleList: "role/reqRoleList",
      requestUserCount: "manger/requestUserCount",
      getCurrentPage: "manger/getCurrentPage",
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqUserDel({ uid: id }).then((res) => {
          this.requestUserList();
          alertSuccess(res.data.msg);
          // // 删除完成重新计算总数
        });
        this.requestUserCount();
        this.getCurrentPage(1);
      });
    },
    updata(id) {
      this.$emit("edit", id);
    },
    changeCurrentPage(p) {
      console.log(p);
      this.getCurrentPage(p);
    },
  },
  mounted() {
    this.requestUserList();
  },
};
</script>

<style>
</style>