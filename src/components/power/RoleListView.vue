<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6"> </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addRoleDialog">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="roleList" style="width: 100%" stripe border>
        <el-table-column type="expand" width="50">
          <template v-slot:default="scope">
            <!--:class="['bdbottom', i1 === 0 ? 'bdtop' : '']"-->
            <el-tag
              v-for="(item, index) in scope.row.operationList"
              :key="index"
              >{{ item.oname }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="编号"></el-table-column>
        <el-table-column prop="rname" label="角色名称"></el-table-column>
        <el-table-column prop="rdescribe" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot:default="scope">
            <el-button
              v-model="scope.row"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              v-model="scope.row"
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteRole(scope.row)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="small"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- :visible.sync="true" 是否显示-->
    <el-dialog title="添加角色" :visible.sync="isRoleDialog" width="30%">
      <el-form :model="roleFrom" label-width="80px" :rules="roleRules">
        <el-form-item label="角色名称" prop="rname">
          <el-input v-model="roleFrom.rname"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="rdescribe">
          <el-input v-model="roleFrom.rdescribe"></el-input>
        </el-form-item>
        <el-form-item label="角色等级" prop="rlevel">
          <el-select v-model="roleFrom.rlevel" placeholder="请选择">
            <el-option label="超级管理员" key="0" value="0"></el-option>
            <el-option label="管理员" key="1" value="1"></el-option>
            <el-option label="普通员工" key="2" value="2"></el-option>
          </el-select>
          <!-- <el-input v-model="roleFrom.rlevel"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- :visible.sync="true" 是否显示-->
    <el-dialog title="修改角色" :visible.sync="isShowEditDialog" width="30%">
      <el-form :model="roleFrom" label-width="80px" :rules="roleRules">
        <el-form-item label="角色名称" prop="rname">
          <el-input v-model="roleFrom.rname" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="rdescribe">
          <el-input v-model="roleFrom.rdescribe"></el-input>
        </el-form-item>
        <el-form-item label="角色等级" prop="rlevel">
          <el-select v-model="roleFrom.rlevel" placeholder="请选择">
            <el-option label="超级管理员" key="0" value="0"></el-option>
            <el-option label="管理员" key="1" value="1"></el-option>
            <el-option label="普通员工" key="2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isRoleDialog: false,
      isShowEditDialog: false,
      roleList: [],
      roleFrom: {
        rname: "",
        rdescribe: "",
        rlevel: "",
      },
      roleRules: {
        rname: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        rdescribe: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
        rlevel: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async editRole() {
      if (
        this.roleFrom.rname == "" ||
        this.roleFrom.rdescribe == "" ||
        this.roleFrom.rlevel == ""
      ) {
        return;
      }
      const confirmResult = await this.$confirm(
        "此操作将永久修改该角色, 是否继续?",
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
        url: "/api/role/editRole",
        params: this.roleFrom,
      }).then((res) => {
        if (res.data.num == 1) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getRoleList();
        this.isShowEditDialog = false;
      });
    },
    async showEditDialog(val) {
      this.isShowEditDialog = true;
      let rid = { rid: val.rid };
      await axios({
        method: "GET",
        params: rid,
        url: "/api/role/findIdRole",
      }).then((res) => {
        this.roleFrom = res.data;
      });
    },
    async deleteRole(val) {
      let rid = { rid: val.rid };
      const confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
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
        method: "GET",
        params: rid,
        url: "/api/role/deleteRole",
      }).then((res) => {
        if (res.data.num == 1) {
          this.$message.success("删除角色成功");
        }
      });
      this.getRoleList();
    },
    addRoleDialog() {
      this.isRoleDialog = true;
    },
    async addRole() {
      if (
        this.roleFrom.rname == "" ||
        this.roleFrom.rdescribe == "" ||
        this.roleFrom.rlevel == ""
      ) {
        return;
      }
      await axios({
        method: "POST",
        params: this.roleFrom,
        url: "/api/role/addRole",
      }).then((res) => {
        if (res.data.num == 1) {
          this.$message.success("添加角色成功");
        }
      });
      this.isRoleDialog = false;
      this.getRoleList();
    },
    async getRoleList() {
      await axios({
        method: "GET",
        url: "/api/role/findAllRole",
      }).then((res) => {
        this.roleList = res.data;
      });
    },
  },
};
</script>
<style lang="less" scoped>
// .el-row {
//     display: flex;
//     float: left;
// }
.el-tag {
  margin: 7px;
}
// .bdtop {
//   border-top: 1px solid #eee;
// }
// .bdbottom {
//   border-bottom: 1px solid #eee;
// }
</style>