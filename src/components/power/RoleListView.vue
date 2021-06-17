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
        <el-table-column
          type="expand"
          width="50"
        ></el-table-column>
        <el-table-column type="index" width="50" label="编号"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDescribe" label="角色描述"></el-table-column>
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
              content="分配角色"
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

    <!--添加用户弹窗-->
    <!-- :visible.sync="true" 是否显示-->
    <!-- <el-dialog title="添加用户" :visible.sync="isdialog" width="30%">
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
    </el-dialog> -->

    <!--修改用户弹窗-->
    <!-- :visible.sync="true" 是否显示-->
    <!-- <el-dialog title="修改用户" :visible.sync="isShowEditDialog" width="30%">
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
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      addRoleDialog: false,
      roleList: [{ roleName: "角色一", roleDescribe: "描述" }],
    };
  },
};
</script>