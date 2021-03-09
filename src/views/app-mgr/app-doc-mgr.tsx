import { createAppInfo, deleteAppInfo, getAppInfos, updateAppInfo } from '@/api/appmgr';
import { Settings } from '@/layout/components';
import { ElUpload } from 'element-ui/types/upload';
import { assign, cloneDeep, random, template } from 'lodash'
import { v4 as UUIDv4 } from 'uuid';
import { Component, Vue } from 'vue-property-decorator'

import COS from 'cos-js-sdk-v5';
import { file } from 'jszip';
import { getUserCOSToken } from '@/api/users';
import { GConst } from '@/Global/GConst';

import MarkdownEditor from '@/components/MarkdownEditor/index.vue'



interface IQuery {
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
interface INavItem {
    /**
     * appInfo/{appIdentity}/{doc}/{lang}/{uuid}_{label}/{uuid}.md
     */
    key: any,
    uuid: string,
    label: string,
    bEnable: boolean,
    bDir: boolean,
    children: Array<INavItem>
}

/**
 * 
 */
interface IEditState {
    backup: INavItem,
    data: INavItem,
    md: string
}

interface ICreateState {
    parent: INavItem,
    data: INavItem
}

/**
 * 
 */
interface IDialogInfo {
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
    key: 'appInfo/doc',
    uuid: UUIDv4(),
    label: '新节点',
    bEnable: true,
    bDir: true,
    children: []
}

@Component({
    name: 'AppDocMgrView',
    components: {
        MarkdownEditor
    }
})
export default class AppDocMgrView extends Vue {

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


    private editState: IEditState = {
        backup: cloneDeep(default_navItem),
        data: cloneDeep(default_navItem),
        md: ''
    };

    private createState: ICreateState = {
        parent: cloneDeep(default_navItem),
        data: cloneDeep(default_navItem) ,
    };

    /**
     * 
     */
    private tree_catalog: Array<INavItem> =
        [
            {
                key: '',
                uuid: UUIDv4(),
                label: '根节点',
                bEnable: true,
                bDir: true,
                children: []
            }
        ];
    private query: IQuery = Object.assign({}, default_query);

    private dialog: IDialogInfo = {
        bShowCreate: false,
    };

    private loading: any = {
    };

    private getCOSKey(item: INavItem): string {
        if (item == this.tree_catalog[0]) {
            return `appInfo/doc/${this.query.data.appName}/${this.query.data.lang}`
        }
        else {
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


    /**
     * 
     */
    async mounted() {
    }

    /**
     * 
     */
    bRootNode(node: any): boolean {
        return node == this.tree_catalog[0];
    }

    /**
     * 
     * @param h 
     * @param param1 
     * @returns 
     */
    private render_Nav(h: any, { node, data, store }: any) {
        
        console.log(node, data, store);
        let ele = (
            <span class="custom-tree-node" style="width:100%;">
                <span>{node.label}</span>
                <span style="float: right;">
                    <el-button size="mini" type="text" on-click={() => this.append_nav(data)}>添加</el-button>
                    {
                        this.bRootNode(data) == false ?
                            <el-button size="mini" type="text" on-click={() => this.edit_nav(data)}>编辑</el-button>
                            :
                            <span></span>
                    }
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


    //#region event

    /**
     * 
     */
    private async onchange_lang() {

    }

    /**
     * 
     */
    private async onclick_nav(data:INavItem, node: any, com: any) {
        this.editState.backup = Object.assign({},data);
        this.editState.data = data;
    }

    private async onclick_submitCreate() {
        if (!this.createState.parent.children) {
            this.$set(this.createState.parent, 'children', []);
        }

        this.createState.parent.children.push(this.createState.data);
        this.dialog.bShowCreate = false;
    }

    /**
     * 
     */
    private async append_nav(data: any) {
        console.log(data);
        this.dialog.bShowCreate = true;
        this.createState.parent = data;

        this.createState.data = cloneDeep( default_navItem);
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
    private async remove_nav(node: any, data: any) {

        this.$confirm('确定移除当前选中文档?', 'Warning', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(async () => {

                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex((d: any) => d.id === data.id);
                children.splice(index, 1);

                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            })
            .catch(err => {
                // console.error(err) 
            })

    }

    //#endregion

}