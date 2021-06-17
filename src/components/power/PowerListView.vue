<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table :data="powerList" style="width: 100%" stripe border>
        <el-table-column type="index" width="100" label="编号">
        </el-table-column>
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      powerList: [],
    };
  },
  created() {
    this.getPowerList();
  },
  methods: {
    async getPowerList() {
      await axios({
        method: "POST",
        url: "/api/power/findAllPower",
      }).then((res) => {
        this.powerList = res.data;
      });
    },
  },
};
</script>