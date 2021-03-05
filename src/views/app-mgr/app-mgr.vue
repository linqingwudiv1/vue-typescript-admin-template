<template>
    <div class="app-mgr-view" >
        <div class="app-mgr-view-header">
            <el-button style="margin-right:20px;" type="primary" v-on:click="onclick_openCreate"> 创建</el-button>
            <el-select v-model="query.data.appName" v-on:change="onchange_AppType" placeholder="请选择">
                <el-option
                v-for="item in appType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="app-mgr-view-content"  v-loading="loading.bLoadingMainTable">
            <div class="app-mgr-view-content-table">
                <el-table v-bind:data="appinfo_data"  stripe border >
                    <el-table-column width="100" label="Id" prop="id"></el-table-column>
                    <el-table-column width="200" label="app名称" prop="appName"></el-table-column>
                    <el-table-column width="200" label="版本" prop="appVersion"></el-table-column>
                    <el-table-column label="Info">
                        <template slot-scope="scope">
                            <div>
                                <el-tag style="margin-right:5px" 
                                        v-if="scope.row.bLatest"
                                        :type="primary">
                                    最近版本
                                </el-tag>
                                <el-tag style="margin-right:5px"
                                v-if="scope.row.bBeta"
                                :type="primary">
                                Beta 
                                </el-tag>
                                <el-tag style="margin-right:5px" 
                                :type="scope.row.bEnable? 'success' : 'danger'">
                                    {{scope.row.bEnable? '启用' : '未启用'}}
                                </el-tag>
                                <el-tag style="margin-right:5px" 
                                        v-if="scope.row.bEnable" :type="primary">
                                    强制更新版本
                                </el-tag>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" v-on:click="onclick_openEdit(scope.row)"> 编辑    </el-button>
                            <el-button size="small" type="danger"  v-on:click="onclick_remove(scope.row)"> 删除      </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                style="text-align :center;padding-top:10px;"
                background
                layout="prev, pager, next"
                @current-change="on_current_change_main"
                :current-page.sync="query.pageNum"
                :page-size.sync="query.pageSize"
                :total="appinfo_total">
                </el-pagination>
            </div>
        </div>


        <el-dialog width="550px" v-bind:visible.sync="dialog.bShowEdit" title="编辑">
            <el-form label-width="100px">
                <el-form-item label="Id:">
                    {{appinfo_copy.id}}
                </el-form-item>

                <el-form-item label="应用名称:">
                    {{appinfo_copy.appName}}
                </el-form-item>

                <el-form-item label="App版本:">
                    <el-input v-model="appinfo_copy.appVersion"></el-input>
                </el-form-item>

                <el-form-item label="启用模式:">
                    <el-checkbox v-model="appinfo_copy.bEnable">启用</el-checkbox>
                    <el-checkbox v-model="appinfo_copy.bBeta">Beta版本</el-checkbox>
                    <el-checkbox v-model="appinfo_copy.bLatest">最新版本</el-checkbox>
                    <el-checkbox v-model="appinfo_copy.bForceUpdate">强制更新</el-checkbox>
                </el-form-item>

                <el-form-item>
                    <div style="text-align:right;">
                        <el-button
                        type="danger"
                        @click="dialog.bShowEdit=false"
                        >
                        取消
                        </el-button>
                        <el-button
                        type="primary"
                        @click="onclick_submitEdit"
                        >
                        确定
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog v-loading="loading.bUploading"
                   :element-loading-text="loading.uploadingTitle"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                    :close-on-click-modal="false" 
                   :close-on-press-escape="false" width="550px" v-bind:visible.sync="dialog.bShowCreate" title="创建">
            <el-form label-width="100px">

                <el-form-item label="应用名称:">
                    {{appinfo_copy.appName}}
                </el-form-item>


                <el-form-item>
                    <el-upload
                    v-if="dialog.bShowCreate"
                    ref="setup-uploader"
                    :multiple="false"
                    action="#"
                    list-type="text"
                    :show-file-list="true"
                    :limit="1"
                    :drag="true"
                    accept=".exe"
                    :http-request="uploading_setup"
                    :on-exceed="()=> $message({type:'error', message:'只允许上次一个*.exe'})"
                    :auto-upload="false">
                        <div slot="default" >
                            <br/>
                            <h3>拖拽或点击上传*.exe</h3>
                            <div slot="tip" class="el-upload__tip">只能上传.exe文件</div>
                        </div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="App版本:">
                    <el-input v-model="appinfo_copy.appVersion"></el-input>
                </el-form-item>

                <el-form-item label="启用模式:">
                    <el-checkbox v-model="appinfo_copy.bEnable">        启用        </el-checkbox>
                    <el-checkbox v-model="appinfo_copy.bBeta">          Beta版本    </el-checkbox>
                    <el-checkbox v-model="appinfo_copy.bLatest">        最新版本    </el-checkbox>
                    <el-checkbox v-model="appinfo_copy.bForceUpdate">   强制更新    </el-checkbox>
                </el-form-item>

                <el-form-item>
                    <div style="text-align:right;">
                        <el-button
                        type="danger"
                        @click="dialog.bShowCreate=false">
                        取消
                        </el-button>
                        <el-button
                        @click="onclick_submitCreate"
                        type="primary">
                        确认
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script lang="ts" src="./app-mgr.ts">
</script>

<style lang="stylus" scoped>
.app-mgr-view
    padding 15px;
    &-header
        padding-bottom:15px;
    &-content
        padding-bottom :15px;
        &-table
            padding : 5px;
</style>