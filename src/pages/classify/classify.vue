<template>
  <div>
      <el-button type='primary' @click="add">添加</el-button>
      <v-add :info='info' ref="one"></v-add>
      <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components:{
    vAdd,
    vList
  },
  data(){
    return{
      info:{
        isShow:false,
        isAdd:true,
        title:'商品分类添加'
      }
    }
  },
  methods:{
    add(){
      this.info.isShow = !this.info.isShow
      this.info.isAdd = true
      this.info.title = '商品分类添加'
    },
    edit(id){
      this.info.isShow = true
      this.info.isAdd = false
      this.info.title = '商品分类修改'
      this.$refs.one.lookOne(id)
    }
  }
}
</script>

<style scoped>

</style>