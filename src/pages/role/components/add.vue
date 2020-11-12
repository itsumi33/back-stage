<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      :show-close="false"
    >
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="list"
            show-checkbox
            ref="tree"
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
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
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleAdd, reqRoleOne, reqRoleEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      width: "130px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqRoleList: "role/reqRoleList",
      reqMenuList: "menu/reqMenuList",
    }),
    hide() {
      this.info.isShow = false;
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.reqRoleList();
        this.hide();
      });
    },
    lookOne(id) {
      reqRoleOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        this.form.id = id;
      });
    },
    reset() {
      this.form = {
        rolename: "",
        menus:  this.$refs.tree.setCheckedKeys([5]),
        status: 1,
      }
    },
    close(){
      this.info.isShow = false
      this.reset()
    }
  },
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style>
</style>