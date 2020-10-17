<template>
      <el-header style="height: 80px;">
      <span class="title">
        <img src="../../../assets/img/heima.png" alt />
        电商后台管理系统
      </span>
      <el-dropdown>
        <span>{{username}}</span>
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
        <el-button round @click="exit">退出</el-button>
      </el-dropdown>
    </el-header> 
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      username:''
    }
  },
  created () {
    this.username=window.sessionStorage.getItem('username')
  },
  methods: {
  exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  }
}
</script>
<style lang='less' scoped>
.el-header {
  background-color: rgb(32, 32, 32);
  color: #fff;
  height: 100px; /*  */
  line-height: 80px;
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 30px;
    display: flex;
    align-items: center;
  }
  .el-button {
    align-self: center;
    height: 40px;
    margin-left: 20px;
  }
  .el-dropdown {
    color: #fff;
    font-size: 15px;
  }
}

</style>
