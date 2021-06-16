<template>
  <!-- 
    侧边栏 :unique-opened="true"只打开一个菜单 :collapse="true"开启折叠
    active-text-color="#ffd04b"设置高亮颜色
    :collapse-transition="false" 取消动画效果
    :router="true"开启路由 点击二级菜单会跳转到index所绑定的路由中(加入之后高亮显示失效)
    :default-active="$route.path" 根据路由高亮
  -->
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <el-menu
      background-color="#324158"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="$route.path"
    >
      <div :style="{left:(isCollapse? '64px' : '200px')}" @click="isCollapseBut" class="but">
        <span>{{ val }}</span>
      </div>

      <!-- :index="index+''" 绑定唯一值，点击不会影响到其他区域-->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item :index="'/user'">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户列表</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="2-1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>角色列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2-2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>权限列表</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3-2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>分类参数</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3-3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品分类</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品列表</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="5-1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      val: "<",
    };
  },
  methods: {
    isCollapseBut() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.val = ">";
      } else {
        this.val = "<";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-aside {
  background-color: #324158;
  //transition: all 0.5s;
  .el-menu {
    border-right: none;
  }
  .but {
    width: 20px;
    height: 45px;
    transition: all 0.5s;
    background-color: #324158;
    line-height: 45px;
    cursor: pointer;
    color: #fff;
    text-align: center;
    position: fixed;
    left: 64px;
    bottom: 50%;
  }

}
</style>