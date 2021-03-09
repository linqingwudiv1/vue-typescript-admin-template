<template>
  <div class="app-doc-mgr-view">
    <div class="app-doc-mgr-view-header">
      <!-- <el-button
        style="margin-right: 20px"
        type="primary"
        v-on:click="onclick_openCreate"
        >创建</el-button> -->

      <span style="padding: 0 15px">App :</span>
      <el-select v-model="query.data.appName" placeholder="请选择">
        <el-option
          v-for="item in appType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span style="padding: 0 15px">语言 :</span>
      <el-select v-model="query.data.lang" placeholder="请选择">
        <el-option
          v-for="item in opt_lang"
          :key="item.key"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </div>
    <div class="app-doc-mgr-view-content">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="320px" style="padding: 0px">
          <el-tree
            style="padding: 6px"
            highlight-current
            v-bind:data="tree_catalog"
            default-expand-all
            node-key="id"
            v-on:node-click="onclick_nav"
            v-bind:props="defaultProps"
            v-bind:expand-on-click-node="false"
            v-bind:render-content="render_Nav"
          >
          </el-tree>
        </el-aside>
        <el-main>
          <div>
            <el-row style="padding-bottom: 8px">
              
              <el-button style="margin-left: 16px;" size="mini" type="primary">保存上传</el-button>
              <el-input v-model="editState.backup.label" style="padding-left: 16px;width:200px;"></el-input>
              <el-checkbox v-model="editState.backup.bDir" style="padding-left: 16px" size="mini"
                >目录</el-checkbox
              >
              <el-checkbox v-model="editState.backup.bEnable" style="padding-left: 0px" size="mini"
                >启用</el-checkbox
              >
            </el-row>

            <markdown-editor v-model="editState.md"></markdown-editor>
          </div>
        </el-main>
      </el-container>
    </div>

    <el-dialog width="30vw" title="添加新的文档" v-bind:visible.sync="dialog.bShowCreate">
      <el-form label-width="100px">
        <!-- -->
        <el-form-item label="父类Key">
          {{ getCOSKey( createState.parent) }}
        </el-form-item>
        <el-form-item>
          <el-input v-model="createState.data.label"> </el-input>
        </el-form-item>
        <!-- -->
        <el-form-item>
          <el-checkbox v-model="createState.data.bDir" style="padding-left: 16px" size="mini">目录</el-checkbox>
          <el-checkbox v-model="createState.data.bEnable" style="padding-left: 0px" size="mini">启用</el-checkbox>
        </el-form-item>

        <el-form-item>
          <div style="text-align: right">
            <el-button type="danger" @click="dialog.bShowCreate = false">
              取消
            </el-button>
            <el-button v-on:click="onclick_submitCreate" type="primary">
              确认
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./app-doc-mgr.tsx">
</script>

<style lang="stylus" scoped>
.app-doc-mgr-view {
  padding: 15px;

  &-header {
    padding-bottom: 15px;
  }

  &-content {
    padding-bottom: 15px;
  }
}
</style>