<template>
  <div>
    <!-- 导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区域 -->
    <el-card>
      <!--  搜索与添加区域 -->
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model="queryInfo.query"
            clearable
            @clear="clearSearch"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="add-user" size="small" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户数据列表区域 -->
      <el-table :data="userlist" stripe border>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="100"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="statechange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑用户信息" placement="top">
              <el-button size="mini" type="primary" @click="getUser(scope.row)">编辑</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改用户权限" placement="top">
              <el-button size="mini" type="warning" @click="setRole(scope.row)">分配角色</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </template>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="addDialogClose"
    >
      <!-- 添加用户信息的form表单 -->
      <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="70px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!--  密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <!--  邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <!--  手机号 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息的对话框 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose"
      @close="editDialogClose"
    >
      <!-- 修改用户的form表单 -->
      <el-form :model="editForm" :rules="addRules" ref="editFormRef" label-width="70px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <!--  邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!--  手机号 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUser">确 定</el-button>
        <el-button @click="dialogVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--  分配用户角色的对话框 -->
    <el-dialog
      title="分配用户角色"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="userInfo" :rules="addRules" ref="editFormRef" label-width="70px">
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled></el-input>
        </el-form-item>
        <!--  邮箱 -->
        <el-form-item label="角色">
          <el-input v-model="userInfo.role_name" disabled></el-input>
        </el-form-item>
      </el-form>
      <template>
        <span>分配角色</span>
        <el-select v-model="value" placeholder="请选择角色" size="small">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :value="item.id"
            :label="item.roleName"
          ></el-option>
        </el-select>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeRole">确 定</el-button>
        <el-button @click="dialogVisible2 = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
      
  </div>
</template>

<script>
import {
  getUsers,
  changeState,
  addUser,
  deleteUser,
  getUserInfoById,
  editUserInfo,
  editUserRole,
} from "../../network/users";
import { getRoles } from "../../network/rights";

export default {
  name: "user",
  data() {
    //邮箱的验证规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的邮箱地址"));
      }
    };
    //手机号的验证规则
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的手机号"));
      }
    };
    return {
      //展示条数，页数及搜索信息
      queryInfo: {
        //搜索关键字
        query: "",
        //第几页的数据
        pagenum: 1,
        //每页显示几条数据
        pagesize: 5,
      },
      //用户列表
      userlist: [],
      //用户数量
      total: 0,
      //添加用户对话框状态
      dialogVisible: false,
      //添加用户的信息
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //用户信息验证的规则
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      //修改用户信息对话框状态
      dialogVisible1: false,
      //分配用户角色对话框状态
      dialogVisible2: false,
      //修改用户的信息
      editForm: {
        username: "",
        email: "",
        mobile: "",
      },
      //分配角色的用户信息
      userInfo: {},
      //所有的角色信息列表
      rolesList: [],
      value: "",
    };
  },
  created() {
    /* 获取用户数据信息 */
    getUsers(this.queryInfo).then((res) => {
      console.log(res);
      this.toast(res);
    });
  },
  methods: {
    //更新列表消息提示
    toast(res) {
      if (res.meta.status !== 200) {
        return this.$message({
          message: "获取列表失败",
          type: "error",
          duration: 1000,
          center: true,
        });
      } else this.userlist = res.data.users;
      this.total = res.data.total;
    },
    //监听每页显示页码值得改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      getUsers(this.queryInfo).then((res) => {
        this.toast(res);
      });
    },
    //监听页码值得改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      getUsers(this.queryInfo).then((res) => {
        this.toast(res);
      });
    },
    //switch开关状态的改变
    statechange(userInfo) {
      changeState(userInfo.id, userInfo.mg_state).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message({
            message: "更新状态失败",
            type: "error",
            duration: 1000,
            center: true,
          });
        } else
          return this.$message({
            message: res.meta.msg,
            type: "success",
            duration: 500,
            center: true,
          });
      });
    },
    //用户的搜索
    searchUsers() {
      getUsers(this.queryInfo).then((res) => {
        this.toast(res);
      });
    },
    //清除搜索
    clearSearch() {
      getUsers(this.queryInfo).then((res) => {
        this.toast(res);
      });
    },
    //清除添加用户的信息及验证信息
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    //添加用户
    add() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addUser(this.addForm).then((res) => {
          console.log(res);
          if (res.meta.status !== 201) {
            return this.$message.error( "用户添加失败");
          } else
          getUsers(this.queryInfo).then((res) => {
          this.userlist = res.data.users;
          this.total = res.data.total;
      });
          this.dialogVisible = false;
          return this.$message.success("用户添加成功");
        });
      });
    },
    //根据ID获取用户信息
    getUser(userInfo) {
      this.dialogVisible1 = true;
      getUserInfoById(userInfo.id).then((res) => {
        console.log(res);
        this.editForm = res.data;
      });
    },
    //修改用户信息
    editUser() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editUserInfo(this.editForm).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error("用户信息更新失败");
          } else this.dialogVisible1 = false;
           getUsers(this.queryInfo).then((res) => {
          this.userlist = res.data.users;
          });
          return this.$message.success("用户信息更新成功");
        });
      });
    },
    //清除修改用户的信息及验证信息
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    //删除用户
    deleteUser(userInfo) {
      this.$confirm("确定讲永久删除次用户吗")
        .then((_) => {
          deleteUser(userInfo.id).then((res) => {
            if (res.meta.status == 200) {
              getUsers(this.queryInfo).then((res) => {
                this.userlist = res.data.users;
                this.total = res.data.total;
              });
              return this.$message.success("用户删除成功");
            }
            return this.$message.error("用户删除失败");
          });
        })
        .catch((err) => {
          console.log(err);
          return this.$message.error("取消删除");
        });
    },
    //展示分配角色提示框
    setRole(userInfo) {
      this.dialogVisible2 = !this.dialogVisible2;
      this.userInfo = userInfo;
      getRoles().then((res) => {
        console.log(res);
        this.rolesList = res.data;
      });
    },
    //确定修改用户角色
    changeRole() {
      if (!this.value) {
        return this.$mssage.error("请选择角色");
      }
      editUserRole(this.userInfo.id, this.value).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          getUsers(this.queryInfo).then((res) => {
            this.userlist = res.data.users;
          });
          this.dialogVisible2 = !this.dialogVisible2;
          return this.$message.success("角色设置成功");
        }
        return this.$message.error("角色设置失败");
      });
    },
    //确认关闭提示窗口
    handleClose(done) {
      this.$confirm("确定关闭吗")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
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
