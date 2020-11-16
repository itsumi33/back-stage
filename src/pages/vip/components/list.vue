<template>
 <div>
     <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="uid"
      label="用户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="scope">
          <div>
               <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
            </el-switch>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
          <div>
              <el-button type='primary' @click="update(scope.row.uid)">修改</el-button>
          </div>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {confirm, cancel} from '../../../util/alert'

export default {
 data() {
 return {
     
 };
 },
 computed:{
     ...mapGetters({
          list: 'vip/getVipList'
      }),
     
 },
 watch:{
 },
 methods: {
     ...mapActions({
         vipList: 'vip/vipList'
     }),
      // 更新
      update(id) {
          this.$emit('edit', id)
      }
 },
 mounted() {
     this.vipList()
 }
};
</script>

<style lang='' scoped>

</style>
