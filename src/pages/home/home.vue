<template>
 <div>
     <div id="main"></div>
 </div>
</template>

<script>
import echarts from 'echarts'
import {mapGetters, mapActions} from 'vuex'

export default {
 data() {
 return {
 };
 },
 computed:{
     ...mapGetters({
         list: 'classify/getClassifyList'
     })
 },
 watch:{
 },
 methods: {
     ...mapActions({
         classifyList: 'classify/classifyList'
     })
 },
 mounted() {
     this.classifyList();
 },
 watch: {
     list: {

         handler() {
             var myChart = echarts.init(document.getElementById('main'));
    
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '商品分类及数量'
                },
                tooltip: {},
                legend: {
                    data:['商品分类']
                },
                xAxis: {
                    data: this.list.map(item => {return item.catename})
                },
                yAxis: {},
                series: [{
                    name: '商品分类',
                    type: 'line',
                    data: this.list.map(item => {return item.children? item.children.length : 0})
                }]
            };
    
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
     }
     },
     deep:true
 }
};
</script>

<style lang='' scoped>
#main {
    width: 100%;
    height: 400px;

}
</style>
