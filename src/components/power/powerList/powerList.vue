<template>
  <div>    
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="rightsList" stripe border>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="300"></el-table-column>
        <el-table-column prop="path" label="路径" width="300"></el-table-column>
        <el-table-column prop="level" label="权限等级" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
         
    </div>
</template>

<script>
import{ getRights } from '../../../network/rights'
export default {
  name: 'powerList',
  data () {
    return {
      rightsList:[]
    }
  },
  created () {
    //获取权限列表
    getRights().then(res=>{
      console.log(res);
      if(res.meta.status!==200){return this.$message.err('获取权限列表失败')}
      this.rightsList=res.data
      return this.$message.success('获取权限列表成功')  
    })
  }
}
</script>

<style lang='less' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.add-user {
  margin-left: 10px;
}
.el-row {
  margin-bottom: 15px;
}
.el-table {
  margin-bottom: 15px;
}
</style>
