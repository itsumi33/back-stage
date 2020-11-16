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
      prop="id"
      label="商品编号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="goodsname"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格">
    </el-table-column>
    <el-table-column
      prop="market_price"
      label="市场价格">
    </el-table-column>
    
    <el-table-column
      prop="img"
      label="图片">
      <template slot-scope="scope">
            <img :src='$preImg+scope.row.img' alt="">
        </template>
    </el-table-column>

    <el-table-column
      prop="isnew"
      label="是否新品">
      <template slot-scope="scope">
          <div>
               <el-switch
            v-model="scope.row.isnew"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
            </el-switch>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="ishot"
      label="是否热卖">
      <template slot-scope="scope">
          <div>
               <el-switch
            v-model="scope.row.ishot"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
            </el-switch>
          </div>
      </template>
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
      label="操作"
      width="180">
      <template slot-scope="scope">
          <div>
              <el-button type='primary' @click="update(scope.row.id)">修改</el-button>
              <el-button type='danger' @click="del(scope.row.id)">删除</el-button>
          </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination :page-size="2" :current-page='GoodsPage' background layout="prev, pager, next" :total="GoodsTotalPages" @current-change="handleCurrentChange" @prev-click="handleCurrentChange" @next-click="handleCurrentChange">
  </el-pagination>
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {reqGoodsDel} from '../../../util/request'
import {confirm, cancel} from '../../../util/alert'

export default {
 data() {
 return {
     
 };
 },
 computed:{
     ...mapGetters({
          list: 'goods/getGoodsList',
          GoodsTotalPages: 'goods/GoodsTotalPages',
          GoodsPage: 'goods/GoodsPage'
      }),
     
 },
 watch:{
 },
 methods: {
     ...mapActions({
         goodsList: 'goods/goodsList',
         goodsCount: 'goods/goodsCount',
         goodsCurrentPage: 'goods/goodsCurrentPage'
     }),
      // 删除
      del(id) {
        // console.log(id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除操作
          reqGoodsDel({id:id}).then(res => {
            this.goodsList();
            this.goodsCount();
            this.goodsCurrentPage(1);
            confirm(res.data.msg);
          })
         
        })

      },
      // 更新
      update(id) {
          this.$emit('edit', id)
      },
      handleCurrentChange(p) {
        this.goodsCurrentPage(p);
      }
 },
 mounted() {
     this.goodsList();
     this.goodsCount();
    this.goodsCurrentPage(1);
 }
};
</script>

<style lang='' scoped>
img {
  width: 100px;
}
</style>
