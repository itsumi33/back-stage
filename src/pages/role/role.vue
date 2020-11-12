<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-list @updata='updata($event)'></v-list>
      <v-add :info='info' ref='get'></v-add>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  data(){
    return{
      info:{
        isShow:false,
        isAdd:true,
        title:'角色添加'
      }
    }
  },
  components:{
    vAdd,
    vList
  },
  methods:{
    add(){
      this.info.isShow = !this.info.isShow
      this.info.isAdd = true
      this.info.title = '角色添加'
    },
    updata(e){
      this.info.isShow = true
      this.info.isAdd = false
      this.info.title = '角色修改'
      this.$refs.get.lookOne(e)
    }
  }
}
</script>

<style scoped>

</style>