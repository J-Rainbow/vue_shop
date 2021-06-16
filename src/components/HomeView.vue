<template>
  <el-container class="box">
    <!-- 头部 -->
    <el-header>
      <div class="logo">
        <img src="@/assets/imgs/head.jpg" alt="" />
        <span>电商管理系统</span>
      </div>
      <div class="quit">
        <el-button type="info" round>退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <SidebarView />
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import SidebarView from "../views/SidebarView";
export default {
  components: {
    SidebarView,
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
}
.el-header {
  background-color: #242f42;
  display: flex;
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      border-radius: 5px;
    }
    span {
      padding-left: 10px;
      color: #fff;
      font-size: 24px;
    }
  }
  .quit {
    display: flex;
    align-items: center;
  }
}

.el-main {
  background-color: #f5f6f7;
}
</style>