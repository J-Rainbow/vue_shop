<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input> -->
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUserDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" style="width: 100%" stripe border>
        <el-table-column type="index" width="50" label="编号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          width="180"
        ></el-table-column>
        <el-table-column label="状态">
          <template v-slot:default="scope">
            <!-- 
                {{scope.row}} 获取到当前值 通过作用域插槽渲染switch 会覆盖prop
                @change 监听switch状态改变
            -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot:default="scope">
            <el-button
              v-model="scope.row"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              v-model="scope.row"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 current-page当前展示的页码-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!--添加用户弹窗-->
    <!-- :visible.sync="true" 是否显示-->
    <el-dialog title="添加用户" :visible.sync="isdialog" width="30%">
      <el-form :model="from" label-width="80px" :rules="formRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="from.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="from.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="from.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isdialog = false">取 消</el-button>
        <el-button type="primary" @click="addFrom">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改用户弹窗-->
    <!-- :visible.sync="true" 是否显示-->
    <el-dialog title="修改用户" :visible.sync="isShowEditDialog" width="30%">
      <el-form :model="from" label-width="80px" :rules="formRules">
        <el-form-item label="用户名">
          <el-input v-model="from.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="from.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="from.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      from: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机", trigger: "blur" }],
      },
      userList: [],
      total: 5,
      isdialog: false,
      isShowEditDialog: false,
      pageInfo: {
        //每页条数
        pageSize: 5,
        //当前页码
        currentPage: 1,
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //一页多少条数据 切换时会触发 page-sizes
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      console.log(this.pageSize);
      this.getUserList();
    },
    //监听页码值改变
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getUserList();
    },
    addUserDialog() {
      this.isdialog = true;
    },
    async showEditDialog(val) {
      this.isShowEditDialog = true;
      let id = { id: val.id };
      await axios({
        method: "POST",
        url: "/api/user/findUserById",
        params: id,
      }).then((res) => {
        this.from = res.data;
      });
    },
    //修改用户状态
    async userStateChange(val) {
      let idAndState = {
        id: val.id,
        state: val.mg_state,
      };
      await axios({
        method: "POST",
        url: "/api/user/userStateChange",
        params: idAndState,
      }).then((res) => {
        let num = res.data.num;
        if (num != 0) {
          this.$message.success("更新用户状态成功");
        }
      });
    },
    //添加用户
    async addFrom() {
      if (
        this.from.username == "" ||
        this.from.password == "" ||
        this.from.email == "" ||
        this.from.mobile == ""
      ) {
        return;
      }
      await axios({
        url: "api/user/addUser",
        method: "POST",
        params: this.from,
      }).then((res) => {
        if (res.data.num == 1) {
          this.$message({
            message: "添加用户成功",
            type: "success",
          });
        }
      });
      this.isdialog = false;
    },

    //删除用户
    async deleteUser(val) {
      let id = { id: val.id };
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //点击确定返回confirm 点击取消返回cancel 如果不加async+await返回的是一个premise
      if (confirmResult !== "confirm") {
        this.$message({
          message: "取消删除",
          type: "info",
        });
        return;
      }
      await axios({
        method: "POST",
        url: "/api/user/deleteUser",
        params: id,
      }).then((res) => {
        if (res.data.num == 1) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        this.getUserList();
      });
    },

    //修改用户
    async editUser() {
      if (this.from.email == "" || this.from.mobile == "") {
        return;
      }
      const confirmResult = await this.$confirm(
        "此操作将永久修改该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //点击确定返回confirm 点击取消返回cancel 如果不加async+await返回的是一个premise
      if (confirmResult !== "confirm") {
        this.$message({
          message: "取消修改",
          type: "info",
        });
        return;
      }
      await axios({
        method: "POST",
        url: "/api/user/editUser",
        params: this.from,
      }).then((res) => {
        if (res.data.num == 1) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getUserList();
        this.isShowEditDialog = false;
      });
    },
    //根据id查询用户
    findUserById() {},
    //获取用户数据
    async getUserList() {
      await axios({
        method: "POST",
        url: "/api/user/findAllUser",
        params: this.pageInfo,
      }).then((res) => {
        this.userList = res.data;
        this.total = res.data[0].total;
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>