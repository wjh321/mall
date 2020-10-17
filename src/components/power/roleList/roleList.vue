<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" class="add-user" size="small" @click="dialogVisible1 = true">添加角色</el-button>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" stripe border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :gutter="10"
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="150"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑角色权限" placement="top">
              <el-button size="mini" type="primary" @click="getInfo(scope.row)">编辑</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
              <el-button size="mini" type="danger" @click="deleteR(scope.row)">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色权限" placement="top">
              <el-button size="mini" type="warning" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 权限列表的树结构Dialog -->
    <el-dialog title="分配用户权限" :visible.sync="dialogVisible" width="30%" @close="setDefaultKeys">
      <!-- 分配权限树形结构 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultkeys"
        ref="treeRef"
      ></el-tree>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="allotRight">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose"
      @close="addDialogClose"
    >
      <!-- 添加角色信息的form表单 -->
      <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="80px">
        <!-- 角色名称 -->
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <!--  密码 -->
        <el-form-item label="工作描述" prop="roleDesc">
          <el-input type="textarea" v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确 定</el-button>
        <el-button @click="dialogVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息的对话框 -->
    <el-dialog
      title="编辑角色用户"
      :visible.sync="dialogVisible2"
      width="50%"
      :before-close="handleClose"
      @close="editDialogClose"
    >
      <!-- 修改角色信息的form表单 -->
      <el-form :model="editForm" :rules="addRules" ref="editFormRef" label-width="80px">
        <!-- 角色名称 -->
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <!--  密码 -->
        <el-form-item label="工作描述" prop="roleDesc">
          <el-input type="textarea" v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editRole" >确 定</el-button>
        <el-button @click="dialogVisible2 = false">取 消</el-button>
      </span>
    </el-dialog>

      
  </div>
</template>

<script>
import {
  getRoles,
  deleteRights,
  getTreeRights,
  updateRights,
  addRole,
  getRoleInfoById,
  editRoleInfo,
  deleteRole
} from "../..//../network/rights";
export default {
  name: "roleList",
  data() {
    return {
       addRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "角色名长度在 2到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入工作职能", trigger: "blur" },
        ],
      },
      rolesList: [],
      dialogVisible: false,
      rightsList: [],
      treeProps: {
        children: "children",
        label: "authName",
      },
      defaultkeys: [],
      roleID: "",
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      dialogVisible1: false,
       dialogVisible2: false,
      editForm:{
        roleName: "",
        roleDesc: "",
        }
    };
  },
  created() {
    //获取权限列表
    getRoles().then((res) => {
      if (res.meta.status !== 200) {
        return this.$message.err("获取角色列表失败");
      }
      this.rolesList = res.data;
      return this.$message.success("获取角色列表成功");
    });
  },
  methods: {
    //根据ID删除对应权限
    removeRightById(roleInfo, rightId) {
      this.$confirm("确定要删除次权限吗")
        .then((res) => {
          deleteRights(roleInfo.id, rightId).then((res) => {
            if (res.meta.status !== 200) {
              return this.$message.err("删除权限失败");
            }
            getRoles().then((res) => {
              this.rolesList = res.data;
              return this.$message.success("删除权限成功");
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //展示分配权限的消息框
    showSetRightDialog(role) {
      this.dialogVisible = !this.dialogVisible;
      this.roleID = role.id;
      getTreeRights().then((res) => {
        this.rightsList = res.data;
      });
      //获取三级权限的ID，保存到defaultKeys数组中
      this.getLeafKeys(role, this.defaultkeys);
      console.log(this.defaultkeys);
    },
    //递归获取所有三级权限的ID值,将值存在数组中
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    //将默认选中项数组归零
    setDefaultKeys() {
      this.defaultkeys = [];
    },
    //将选中的权限进行更新
    allotRight() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      console.log(keys);
      const idStr = keys.join(",");
      updateRights(this.roleID, idStr).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("权限更新失败");
        }
        this.dialogVisible = !this.dialogVisible;
        this.$message.success("权限更新成功");
        getRoles().then((res) => {
          this.rolesList = res.data;
        });
      });
    },

    //添加角色
    add() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addRole(this.addForm).then((res) => {
         /*  console.log(res); */
          if (res.meta.status !== 201) {
            return this.$message.error("角色添加失败");
          } else this.dialogVisible1 = false;
          getRoles().then(res => {this.rolesList = res.data});
          return this.$message.success("角色添加成功");
        });
      });
    },
      //清除添加角色的信息及验证信息
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
     //根据ID获取角色信息
    getInfo(userInfo) {
      this.dialogVisible2 = true;
      getRoleInfoById(userInfo.id).then((res) => {
       /*  console.log(res); */
        this.editForm = res.data;
      });
    },
      //修改角色信息
    editRole() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editRoleInfo(this.editForm).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error("角色信息更新失败");
          } else this.dialogVisible2 = false;
          getRoles().then(res => {this.rolesList = res.data});
          return this.$message.success("角色信息更新成功");
        });
      });
    },
    //清除修改角色的信息及验证信息
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
        //删除角色
    deleteR(userInfo) {
      this.$confirm("确定讲永久删除次用户吗")
        .then((_) => {
          deleteRole(userInfo.id).then((res) => {
            if (res.meta.status == 200) {
              getRoles().then(res => {this.rolesList = res.data});
              return this.$message.success("角色删除成功");
            }
            return this.$message.error("角色删除失败");
          });
        })
        .catch((err) => {
          return this.$message.error("取消删除");
        });
    },


    //关闭窗口弹窗确认提示
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
.el-button {
  margin-bottom: 15px;
}
.el-table {
  margin-bottom: 15px;
}
.el-tag {
  margin: 7px;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
