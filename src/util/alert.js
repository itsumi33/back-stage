import Vue from 'vue'
let vm = new Vue();


export const alertSuccess=(msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
      });
}

export const alertwarning=(msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
      });
}