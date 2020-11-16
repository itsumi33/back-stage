<template>
  <div>
    <el-button type='primary' @click="willAdd">添加</el-button>
    <v-add :info='info' ref="one"></v-add>
    <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";

export default {
  components: {
      vAdd,
      vList
  },
  data() {
    return {
        info: {
            isShow: false,
            isAdd: true,
            title: '活动添加'
        }
    };
  },
  computed: {},
  watch: {},
  methods: {
      willAdd() {
          this.info = {
            isShow: true,
            isAdd: true,
            title: '活动添加'
          }
      },
      // 修改
      edit(e) {
        //   console.log(e);
           this.info = {
            isShow: true,
            isAdd: false,
            title: '活动修改'
          }
          this.$refs.one.look(e);
      }
  },
};
</script>

<style lang='' scoped>
</style>
