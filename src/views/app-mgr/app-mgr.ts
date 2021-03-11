import { createAppInfo, deleteAppInfo, getAppInfos, updateAppInfo } from '@/api/appmgr';
import { Settings } from '@/layout/components';
import { ElUpload } from 'element-ui/types/upload';
import { cloneDeep } from 'lodash'
import { Component, Vue } from 'vue-property-decorator'

import COS from 'cos-js-sdk-v5';
import { file } from 'jszip';
import { getUserCOSToken } from '@/api/users';
import { GConst } from '@/Global/GConst';
import { NewCOS } from '@/utils/cos';

/**
 * 
 */
interface IAppInfo
{
    id: number,
    appName: string,
    appVersion: string,
    url: string,
    bLatest: boolean,
    bEnable: boolean,
    createTime?: string,
    updateTime?: string,
    bBeta: boolean,
    bForceUpdate: boolean

}

interface IQuery
{
    pageNum: number,
    pageSize: number,
    data: {
        appName: string
    }
}

interface IDialogInfo
{
    bShowEdit: boolean,
    bShowCreate: boolean,
    bSetupFileUploadCompleted: boolean
}

const default_query: IQuery =
{
    pageNum: 1,
    pageSize: 10,
    data: {
        appName: ''
    }
};

/**
 * 
 */
const default_appinfo: IAppInfo =
{
    id: 0,
    appName: 'aw',
    appVersion: '1.0.0',
    url: '',
    bLatest: true,
    bEnable: true,
    bBeta: false,
    bForceUpdate: true,
    createTime: '',
    updateTime: ''
};

@Component({
    name: 'AppMgrView',
    components: {
    }
})
export default class AppMgrView extends Vue 
{
    /**
     * 
     */
    private appinfo_data: Array<IAppInfo> = [];
    private appinfo_total: number = 0;
    private query: IQuery = Object.assign({}, default_query);
    /** 副本 */
    private appinfo_copy: IAppInfo = Object.assign({}, default_appinfo);

    private dialog: IDialogInfo = {
        bShowEdit: false,
        bShowCreate: false,
        bSetupFileUploadCompleted: false
    };

    private loading: any = {
        bLoadingMainTable: false,
        bUploading: false,
        uploadingTitle: '上传中'
    };

    private appType: any = [
        {
            value: '',
            label: '全部'
        }, {
            value: 'aw',
            label: 'amazingWork'
        }];


    async mounted() 
    {
        await this.http_getAppInfos();

        this.$on('on-setup-progress', (percent: number) => 
        {
            this.loading.uploadingTitle = `上传进度:${(percent * 100).toFixed(2)}%  请勿关闭当前窗口.`;
        });

        //console.log(data);
    }

    /**
     * 
     **/
    async http_getAppInfos()
    {
        this.loading.bLoadingMainTable = true;
        let { data } = await getAppInfos(this.query);

        this.loading.bLoadingMainTable = false;
        this.appinfo_data = data.data;
        this.query.pageNum = data.pageNum;
        this.appinfo_total = data.total;
    }

    /**
     * 
     **/
    async http_createAppInfo()
    {
        this.loading.uploadingTitle = '等待中...'
        this.loading.bUploading = true;
        try 
        {
            let param = cloneDeep(this.appinfo_copy);
            delete param.createTime;
            delete param.updateTime;
            let { data } = await createAppInfo(param);
            this.appinfo_copy.id = data.id;
            this.$message({ type: 'success', message: '添加成功' });

            this.dialog.bShowCreate = false;
            this.dialog.bSetupFileUploadCompleted = false;
            setTimeout(async () =>
            {
                await this.http_getAppInfos();
            }, 200);
        }
        catch (err)
        {
            this.dialog.bSetupFileUploadCompleted = true;
        }
        this.loading.bUploading = false;
    }

    /**
     * 
     */
    async on_current_change_main()
    {
        await this.http_getAppInfos();
    }


    /**
     * 
     */
    async onchange_AppType()
    {
        this.query.pageNum = 1;
        await this.http_getAppInfos();
    }


    async onclick_remove(item: IAppInfo)
    {
        this.$confirm(`将永久删除[${item.appVersion}]版本, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () =>
        {
            await deleteAppInfo(item.id);
            setTimeout(async () =>
            {
                await this.http_getAppInfos()
            }, 200);
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(async () =>
        {
            this.$message({
                type: 'info',
                message: '已取消'
            });
        });
    }

    /**
     * 
     * @param item 
     */
    async onclick_openEdit(item: IAppInfo)
    {
        this.appinfo_copy = cloneDeep(item);
        this.dialog.bShowEdit = true;
    }

    /**
     * 
     */
    async onclick_openCreate()
    {
        this.appinfo_copy = cloneDeep(default_appinfo);
        this.dialog.bShowCreate = true;
        this.dialog.bSetupFileUploadCompleted = false;
    }

    /**
     * 
     * @param data 
     */
    async uploading_setup(data: any)
    {
        let file: File = data.file;
        let cos = NewCOS();

        const cos_key = `AppInfo/${this.appinfo_copy.appName}/package/${this.appinfo_copy.appVersion}/setup.exe`.toLocaleLowerCase();
        cos.sliceUploadFile({
            Bucket: GConst.COSBucket, // Bucket 格式：test-1250000000
            Region: GConst.COSRegion,
            Key: cos_key, /* 必须 */
            Body: file,
            onTaskReady: (progressData) =>
            {
                this.loading.bUploading = true;
                //console.log('onHashProgress', JSON.stringify(progressData));
            },
            onProgress: async (progressData) =>
            {
                this.$emit('on-setup-progress', progressData.percent);
            }
        },
            async (err, res) =>
            {
                if (err)
                {
                    this.$message({ type: 'error', message: err.message });
                }
                else 
                {
                    this.appinfo_copy.url = `http://${res.Location}`;
                    await this.http_createAppInfo();
                }
            });
    }

    async onclick_submitCreate()
    {
        //关闭逻辑在COS 完成事件中
        const upload = (this.$refs['setup-uploader'] as ElUpload);
        if ((upload as any).uploadFiles.length > 0)
        {
            if (this.dialog.bSetupFileUploadCompleted)
            {
                await this.http_createAppInfo();
            }
            else 
            {
                upload.submit();
            }

        }
        else 
        {
            this.$message({ type: 'error', message: '请选择上传exe文件' });
        }
    }

    /**
     * 
     */
    async onclick_submitEdit()
    {
        try 
        {
            await updateAppInfo(this.appinfo_copy);
            this.dialog.bShowEdit = false;

            for (let i = 0; i < this.appinfo_data.length; i++)
            {
                let item = this.appinfo_data[i];
                if (item.id == this.appinfo_copy.id)
                {
                    this.$set(this.appinfo_data, i, Object.assign({}, this.appinfo_copy));
                    this.$message({ type: 'success', message: '更新成功...' });
                    return;
                }
            }
        }
        catch (err)
        { }

    }
}