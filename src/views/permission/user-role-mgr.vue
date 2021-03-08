<template>
  <div class="user-role-mgr-view">
    <div class="user-role-mgr-view-header">
      <el-input
        style="width: 300px"
        placeholder="请输入内容"
        v-model="query.data.searchWord"
      >
        <template slot="append">
          <el-button @click="onclick_search"> 查询</el-button>
        </template>
      </el-input>

      <span style="padding-left: 15px">
        <el-checkbox v-model="query.data.bId">查询ID列</el-checkbox>
        <el-checkbox v-model="query.data.bEmail">查询Email列</el-checkbox>
        <el-checkbox v-model="query.data.bPhone">查询手机</el-checkbox>
        <el-checkbox v-model="query.data.bUserName">查询用户名</el-checkbox>
        <el-checkbox v-model="query.data.bPassport">查询通行证</el-checkbox>
      </span>
    </div>
    <div
      class="user-role-mgr-view-content"
      v-loading="loading.bLoadingMainTable"
    >
      <div class="user-role-mgr-view-content-table">
        <el-table v-bind:data="data_users" stripe border>
          <el-table-column width="100" label="Id" prop="id"></el-table-column>
          <el-table-column
            width="200"
            label="昵称"
            prop="name"
          ></el-table-column>
          <el-table-column
            width="220"
            label="email"
            prop="email"
          ></el-table-column>
          <el-table-column
            width="200"
            label="用户名"
            prop="username"
          ></el-table-column>
          <el-table-column
            width="200"
            label="手机号"
            prop="phone"
          ></el-table-column>
          <el-table-column label="拥有权限">
            <template slot-scope="scope">
              <el-tag
                style="margin-left: 8px"
                v-for="(item, idx) in scope.row.roles"
                v-bind:key="idx"
                >{{ item.displayName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column width="100" label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                v-on:click="onclick_openEdit(scope.row)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align: center; padding-top: 10px"
          background
          layout="prev, pager, next"
          @current-change="on_current_change_main"
          v-bind:current-page.sync="query.pageNum"
          v-bind:page-size.sync="query.pageSize"
          v-bind:total="total_data"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="提示"
      v-bind:visible.sync="dialog.bShowRoleList"
      width="30%"
    >
      <el-form>
        <el-form-item>
          <el-table
            :data="data_roles"
            ref="table_roles"
            style="width: 100%; margin-top: 30px"
            border>
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column align="center" width="100px" label="角色ID">
              <template slot-scope="scope">
                {{ scope.row.key }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="角色标识">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="角色名称">
              <template slot-scope="scope">
                {{ scope.row.displayName }}
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <div style="text-align: right">
            <el-button type="danger" @click="dialog.bShowRoleList = false">
              取消
            </el-button>
            <el-button type="primary" @click="onclick_submitEdit">
              确定
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./user-role-mgr.ts">
</script>
<style lang="stylus" scoped>
.user-role-mgr-view {
  padding: 15px;

  &-header {
    padding-bottom: 15px;
  }

  &-content {
    padding-bottom: 15px;

    &-table {
      padding: 5px;
    }
  }
}
</style>