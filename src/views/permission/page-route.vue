<template>
  <div class="app-container">
    <h1>页面管理</h1>

    <el-row>
      <el-col>
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="routesTreeData"
          :props="defaultProps"
          show-checkbox
          node-key="hierarchyPath"
          class="permission-tree"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" src="./page-route.ts">
</script>
