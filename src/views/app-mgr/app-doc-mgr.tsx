import { createAppInfo, deleteAppInfo, getAppInfos, updateAppInfo } from '@/api/appmgr';
import { Settings } from '@/layout/components';
import { ElUpload } from 'element-ui/types/upload';
import { cloneDeep } from 'lodash'
import { v4 as UUIDv4 } from 'uuid';
import { Component, Vue } from 'vue-property-decorator'

import COS, { CosObject } from 'cos-js-sdk-v5';
import { file } from 'jszip';
import { getUserCOSToken } from '@/api/users';
import { GConst } from '@/Global/GConst';

/** */
import axios from 'axios';

/** */
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { NewCOS } from '@/utils/cos';
import { request } from 'express';

interface IQuery
{
    pageNum: number,
    pageSize: number,
    data: {
        appName: string,
        lang: string
    }
}

/**
 * 
 */
interface INavItem
{
    /**
     * appInfo/{appIdentity}/{doc}/{lang}/{uuid}_{label}/{uuid}.md
     */
    key: any,
    uuid: string,
    label: string,
    bEnable: boolean,
    bDir: boolean,
    url: string,
    children: Array<INavItem>
}

/**
 * 
 */
interface IEditState
{
    backup: INavItem,
    data: INavItem,
    md: string,
    md_copy: string
}

interface ICreateState
{
    parent: INavItem,
    data: INavItem
}

/**
 * 
 */
interface IDialogInfo
{
    bShowCreate: boolean
}

const default_query: IQuery =
{
    pageNum: 1,
    pageSize: 10,
    data: {
        appName: 'aw',
        lang: 'zh_cn'
    }
};

const default_navItem: INavItem =
{
    key: 'appInfo/tmp',
    uuid: UUIDv4(),
    label: '新节点',
    bEnable: true,
    bDir: false,
    url: '',
    children: []
}

@Component({
    name: 'AppDocMgrView',
    components: {
        MarkdownEditor
    }
})
export default class AppDocMgrView extends Vue
{

    /**
     * 
     */
    private defaultProps: any = {
        children: 'children',
        label: 'label'
    };

    /** */
    opt_lang: Array<any> = [{
        key: 'zh_cn',
        label: '中文-简体',
    }, {
        key: 'en_us',
        label: 'English-USA',
    }];


    /**
     * 
     */
    private editState: IEditState = {
        backup: cloneDeep(default_navItem),
        data: cloneDeep(default_navItem),
        md: '',
        md_copy: ''
    };

    /**
     * 
     */
    private createState: ICreateState = {
        parent: cloneDeep(default_navItem),
        data: cloneDeep(default_navItem),
    };

    /**
     * 
     */
    private tree_catalog: Array<INavItem> = [
        {
            key: '',
            uuid: UUIDv4(),
            label: '根节点',
            bEnable: true,
            bDir: true,
            url: '',
            children: []
        }
    ];

    private query: IQuery = Object.assign({}, default_query);

    private dialog: IDialogInfo = {
        bShowCreate: false,
    };

    private loading: any = {
    };

    private getCOSKey(item: INavItem): string
    {
        if (item == this.tree_catalog[0])
        {
            return `appinfo/${this.query.data.appName}/doc/${this.query.data.lang}`.toLocaleLowerCase()
        }
        else
        {
            return item.key;
        }
    }

    /**
     * 
     */
    private appType: any = [{
        value: 'aw',
        label: 'amazingWork'
    }];


    private cos!: COS;

    /**
     * 
     */
    async mounted()
    {
        this.cos = NewCOS();

        await this.http_getCatalog();
    }


    get catalogKey()
    {
        const cos_key = `appinfo/${this.query.data.appName}/doc/${this.query.data.lang}/catalog.json`;
        return cos_key;
    }

    get bEditChange(): boolean
    {
        return this.bNavInfoChange || this.bMarkdownChange
    }

    get bMarkdownChange(): boolean
    {
        let bMarkdownChange = false;

        if (this.editState.md != this.editState.md_copy) { bMarkdownChange = true; }

        return bMarkdownChange;
    }

    get bNavInfoChange(): boolean
    {
        let bNavChange = false;
        if (this.editState.backup.label != this.editState.data.label) { bNavChange = true; }
        else if (this.editState.backup.bEnable != this.editState.data.bEnable) { bNavChange = true; }
        else if (this.editState.backup.bDir != this.editState.data.bDir) { bNavChange = true; }

        return bNavChange;
    }

    /**
     * 
     */
    bRootNode(node: any): boolean
    {
        return node == this.tree_catalog[0];
    }

    get bRoot():boolean
    {
        return this.tree_catalog[0] == this.editState.data;
    }

    /**
     * 
     * @param h 
     * @param param1 
     * @returns 
     */
    private render_Nav(h: any, { node, data, store }: any)
    {
        let ele = (
            <span class="custom-tree-node" style="width:100%;">
                <span>{node.label}</span>
                <span style="float: right;">
                    <el-button size="mini" type="text" on-click={() => this.append_nav(data)}>添加</el-button>
                    {/* {
                        this.bRootNode(data) == false ?
                            <el-button size="mini" type="text" on-click={() => this.edit_nav(data)}>编辑</el-button>
                            :
                            <span></span>
                    } */}
                    {
                        this.bRootNode(data) == false ?
                            <el-button size="mini" type="text" on-click={() => this.remove_nav(node, data)}>删除</el-button>
                            :
                            <span></span>
                    }
                </span>
            </span>);


        return ele;
    }


    //#region http
    async http_getCatalog()
    {
        const cos_key = this.catalogKey;

        console.log(window.location.origin);

        const url = await this.cos.getObjectUrl(
            {
                Key: cos_key,
                Bucket: GConst.COSBucket,
                Region: GConst.COSRegion
            }, (err) => { });

        try
        {
            await this.handle_updateData(url);
        }
        catch (err)
        {
            /**如果找到资源尝试上传后，在执行逻辑 */
            await this.http_UpdateCatalog();
            await this.handle_updateData(url);
        }
    }

    private async handle_updateData(url: string)
    {
        const res = await axios.get(url);
        if (res.status == 200)
        {
            this.tree_catalog = res.data;
        }
    }

    /**
     * 
     */
    async handle_saveDoc()
    {
        if (this.bMarkdownChange)
        {
            await this.http_updateMarkdown();
        }
        if (this.bNavInfoChange)
        {
            await this.handle_updateCalalogOnEdit();
        }
        
    }

    async handle_updateCalalogOnEdit()
    {
        this.editState.data.bDir = this.editState.backup.bDir;
        this.editState.data.bEnable = this.editState.backup.bEnable;
        this.editState.data.label = this.editState.backup.label;
        await this.http_UpdateCatalog();
    }

    private async http_updateMarkdown()
    {
        const cosKey = this.editState.data.key;
        const result = await this.cos.putObject({
            Key: `${this.editState.data.key}/index.md`,
            Bucket: GConst.COSBucket,
            Region: GConst.COSRegion,
            Body: this.editState.md_copy
        });

        this.$message({type:'success', message:'保存成功'});


        this.editState.md = this.editState.md_copy;
    }

    private async http_UpdateCatalog()
    {
        const cos_key = this.catalogKey;
        await this.cos.putObject(
            {
                Key: cos_key,
                Bucket: GConst.COSBucket,
                Region: GConst.COSRegion,
                Body: JSON.stringify(this.tree_catalog)
            }, (err) => { });

        this.$message({type:'success', message:'导航修改成功'});
    }


    //#endregion

    //#region event


    private async onchange_query()
    {
        await this.http_getCatalog();
    }


    /**
     * 
     */
    async onclick_saveEditor()
    {
        await this.handle_saveDoc();
    }


    /**
     * 当Tree 点击时
     */
    private async onclick_navItem(data: INavItem, node: any, com: any)
    {

        if (this.bEditChange )
        {
            this.$confirm('文档已修改是否保存?', 'Warning', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () =>
                {
                    if (this.bNavInfoChange)
                    {
                        await this.handle_updateCalalogOnEdit();
                    }
                    if (this.bMarkdownChange)
                    {
                        await this.http_updateMarkdown();
                    }
                    

                    await this.handle_onNavItemChange(data);
                })
                .catch(async () =>
                {
                    //this.$message({type:'info', message:'已取消'})
                    await this.handle_onNavItemChange(data);
                })
        }
        else 
        {
            await this.handle_onNavItemChange(data);
        }


    }

    private async handle_onNavItemChange(data: INavItem)
    {
        try
        {
            this.editState.backup = Object.assign({}, data);
            this.editState.data = data;

            let res = await axios.get(data.url);

            this.editState.md = res.data;
            this.editState.md_copy = res.data;
        }
        catch (err)
        {
            console.error(err);
            this.editState.md = '';
            this.editState.md_copy = '';
        }
    }

    private async onclick_submitCreate()
    {
        if (!this.createState.parent.children)
        {
            this.$set(this.createState.parent, 'children', []);
        }

        const parent_key = this.getCOSKey(this.createState.parent);
        this.createState.data.key = `${parent_key}/${this.createState.data.uuid}`;
        this.createState.parent.children.push(this.createState.data);

        let url = await this.cos.getObjectUrl(
            {
                Key: `${this.createState.data.key}/index.md`, //`${data.key}/index.md`,
                Bucket: GConst.COSBucket,
                Region: GConst.COSRegion
            }, (err)=>{});

        this.createState.data.url = url;

        await this.http_UpdateCatalog();
        this.dialog.bShowCreate = false;
    }

    /**
     * 
     */
    private async append_nav(data: any)
    {
        this.dialog.bShowCreate = true;
        this.createState.parent = data;

        this.createState.data = cloneDeep(default_navItem);
        this.createState.data.uuid = UUIDv4();
    }

    /**
     * 
     * @param data 
     */
    private async edit_nav(data: any)
    {
    }

    /**
     * 
     */
    private async remove_nav(node: any, data: any)
    {

        this.$confirm('确定移除当前选中文档?', 'Warning', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(async () =>
            {

                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex((d: any) => d.id === data.id);
                children.splice(index, 1);

                await this.http_UpdateCatalog();

                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                
            })
            .catch(err =>
            {
                // console.error(err) 
            })

    }

    //#endregion

}