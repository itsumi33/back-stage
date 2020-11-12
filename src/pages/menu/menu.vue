<template>
  <div>
      <el-button type='primary' @click='add'>添加</el-button>
      <v-list @edit='edit($event)'></v-list>
      <v-add :info='info' ref='one'></v-add>
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
        isAdd:true
      }
    }
  },
  methods:{
    add(){
      this.info.isShow = !this.info.isShow
      this.info.isAdd = true
    },
    edit(e){
        console.log(e);  //此时获取的是每一条数据的id
        this.info.isShow = true,
        this.info.isAdd = false
        this.$refs.one.look(e)
    }
  }
}
</script>

<style scoped>

</style>