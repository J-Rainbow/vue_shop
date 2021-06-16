<template>
  <div class="login">
    <div class="loginBox">
      <div class="boxImg">
        <img src="../assets/imgs/head.jpg" alt="" />
      </div>
      <div class="loginFrom">
        <!-- :rules="loginRules" 验证规则 ref="loginFormRef"-->
        <el-form
          label-width="80px"
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
        >
          <!-- prop="username" 与rules使用-->
          <el-form-item label="用户名:" prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item class="loginBut">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reLoginFrom">注销</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        //trigger: "blur"在鼠标离开时验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    async login() {
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        return;
      }
      await axios({
        method: "POST",
        url: "/api/user/login",
        params: this.loginForm,
      }).then((res) => {
        let msg = res.data.msg;
        if (msg == 1) {
          this.$router.push({ path: "/home" });
        } else {
          this.$message({
            //element ui 带有
            message: "用户名或密码错误",
            type: "error",
          });
        }
      });
    },
    reLoginFrom() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  background-image: url(../assets/imgs/backgroundImg.jpg);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 3px #63b0ff;
    .boxImg {
      width: 125px;
      height: 125px;
      border-radius: 50%;
      box-shadow: 0 0 10px #ccc;
      position: absolute;
      top: 15%;
      img {
        width: 125px;
        height: 125px;
        border-radius: 50%;
      }
    }
  }
  .loginFrom {
    position: absolute;
    bottom: 30%;
    width: 30%;
    .loginBut {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>