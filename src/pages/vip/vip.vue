<template>
  <div>
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
            title: '会员修改'
        }
    };
  },
  computed: {},
  watch: {},
  methods: {
      willAdd() {
          this.info = {
            isShow: true,
            title: '会员修改'
          }
      },
      // 修改
      edit(e) {
        //   console.log(e);
           this.info = {
            isShow: true,
            title: '会员修改'
          }
          this.$refs.one.look(e);
      }
  },
};
</script>

<style lang='' scoped>
</style>
