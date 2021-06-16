<template>
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
      <el-button type="primary" @click="isdialog = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  methods: {},
  data() {
    return {
      from: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      formRules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机", trigger: "blur" }],
      },
    };
  },
  props: {
    isdialog: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
};
</script>