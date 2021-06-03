<template>
  <div class="login">
    <div class="loginBox">
      <div class="boxImg">
        <img src="../assets/imgs/head.jpg" alt="" />
      </div>
      <div class="loginFrom">
        <el-form label-width="80px">
          <el-form-item label="用户名:">
            <el-input prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input prefix-icon="el-icon-goods"></el-input>
          </el-form-item>
          <el-form-item class="loginBut">
            <el-button type="primary">登录</el-button>
            <el-button type="info">注销</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
    box-shadow: 0 0 3px #63B0FF;
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
    .loginBut{
        display: flex;
        justify-content: flex-end;
    }
  }
}
</style>