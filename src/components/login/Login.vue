<template>
  <div class="login">
    <div class="login_box">
      <div class="log">
        <img src="../../assets/img/logo.png" alt />
      </div>
      <el-form label-width="0px" class="user_info" :model="form" :rules="rules" ref="login">
        <el-form-item label prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form />
        <el-form-item label></el-form-item>
      </el-form>
      <el-row class="btns">
        <el-button type="primary" @click="submitForm('login')">登录</el-button>
        <el-button type="info" @click="resetForm('login')">重置</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import {login} from '../../network/login'
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((flag) => {
        if (flag) {
        login(this.form.username,this.form.password).then(res=>{
          console.log(res);
          if(res.meta.status==200){
            this.$message({
              message:res.meta.msg,
              type: 'success',
              offset:300,
              duration:1000,
              center:true,
            })
            window.sessionStorage.setItem('token',res.data.token)
            window.sessionStorage.setItem('username',res.data.username)
            console.log(window.sessionStorage.getItem('token').length);
            this.$router.push('home')
          }else{
            this.$message({
              message:res.meta.msg,
              type: 'error',
              offset:300,
              duration:1000,
              center:true
            })
          }
        })
        } else {
          console.log("格式不对");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped lang="less">
.login {
  height: 100%;
  background-color: skyblue;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  .log {
    width: 130px;
    height: 130px;
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    img {
      width: 100%;
      border-radius: 50%;
      margin: 0 auto;
      background-color: #eee;
    }
  }
  .user_info {
    margin-top: 100px;
    padding: 0 25px;
  }
  .btns {
    float: right;
    bottom: 15px;
    padding-right: 25px;
  }
}
</style>
