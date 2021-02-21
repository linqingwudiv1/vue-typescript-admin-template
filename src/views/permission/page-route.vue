<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="onclick_CreateRootRoute">
      新增
    </el-button>

    <el-row>
      <el-col v-bind:span="24">
        <div class="permission-container">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesTreeData"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            :expand-on-click-node="false"
            node-key="hierarchyPath"
            v-on:current-change="oncurrent_change"
            class="permission-tree">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}
                  <el-tag size="mini" type="primary" style="margin-left:10px;">{{data.hierarchyPath}}</el-tag>
                  <el-tag size="mini" type="primary" style="margin-left:10px;">{{data.viewLabel}}</el-tag>
                  <el-tag size="mini" type="primary" style="margin-left:10px;">{{data.path}}</el-tag>
                  <el-tag size="mini" type="primary" style="margin-left:10px;">{{data.component}}</el-tag>
                  <el-tag size="mini" type="primary" style="margin-left:10px;">{{data.meta.icon}}</el-tag>
                </span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    Append
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => edit(node,data)">
                    Edit
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    Delete
                  </el-button>
                </span>
              </span>
            </el-tree>
        </div>

      </el-col>
    </el-row>

    <el-dialog v-bind:visible.sync="dialogVisible" width="500px">
      <el-form v-bind:model="cur_route"
               label-width="100px"
               label-position="left">
        <el-form-item label="Name">
          <el-input
            v-model="cur_route.name"
            placeholder="Route Name"
          />
        </el-form-item>
        <el-form-item label="Path">
          <el-input
            v-model="cur_route.path"
            placeholder="Route path"
          />
        </el-form-item>
        <el-form-item label="Component">
          <el-input
            v-model="cur_route.component"
            placeholder="Route Component"
          />
        </el-form-item>
        <el-form-item label="Redirect">
          <el-input
            v-model="cur_route.redirect"
            placeholder="Route Redirect"
          />
        </el-form-item>
        <hr/>
        <el-form-item label="Title">
          <el-input
            v-model="cur_route.meta.title"
            placeholder="Route Title"
          />
        </el-form-item>
        <el-form-item label="Icon">
          <el-input
            v-model="cur_route.meta.icon"
            placeholder="Route Icon"
          />
        </el-form-item>
        <el-form-item label="ActionMenu">
          <el-input
            v-model="cur_route.meta.actionMenu"
            placeholder="Route ActionMenu"
          />
        </el-form-item>
        <hr/>
        <el-form-item label="Switch">
          <el-checkbox v-model="cur_route.meta.hidden">Hidden</el-checkbox>
          <el-checkbox v-model="cur_route.meta.noCache">NoCache</el-checkbox>
          <el-checkbox v-model="cur_route.meta.affix">affix</el-checkbox>
          <el-checkbox v-model="cur_route.meta.alwaysShow">alwaysShow</el-checkbox>
        </el-form-item>
      </el-form>
      <!-- <hr/> -->
      <div style="text-align: right;padding-top:30px;">
        <el-button
          type="primary"
          size="small"
          @click="() => { dialogVisible = false; }"
        >
          {{ $t('permission.cancel')  }}
        </el-button>
        <el-button
          type="danger"
          size="small"
          v-on:click="onclick_confirm"
        >
          {{ $t('permission.confirm') }}
        </el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script lang="ts" src="./page-route.ts">
</script>


<style lang="stylus" scoped>
.app-container
  .permission-container
    border-right 1px solid rgba(128, 128, 128, 0.2);
    padding-right: 20px;
    height:80vh;
    overflow-y: auto;
    >>>.custom-tree-node 
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    >>>.el-tree-node__content
      height 32px;
      vertical-align:middle;
</style>
