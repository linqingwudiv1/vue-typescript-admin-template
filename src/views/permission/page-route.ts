import { getRoutes } from '@/api/roles'
import { DeletePageRoute, CreatePageRoute, UpdatePageRoute } from '@/api/routepage';
import { cloneDeep } from 'lodash';
import { Component, Vue } from 'vue-property-decorator'
import SwitchRoles from './components/SwitchRoles.vue'


/**
 * 
 */
interface RouteMeta
{
  title        ?:string ,
  icon         ?:string ,
  activeMenu   ?:string ,
  hidden       ?:boolean,
  noCache      ?:boolean,
  affix        ?:boolean,
  alwaysShow   ?:boolean
}


interface IRoutesTreeData {
    id:number,
    name?:string,
    children?: IRoutesTreeData[]
    viewLabel?: string,
    path: string,
    hierarchyPath: string,
    parentId?: number,
    redirect?:string,
    component?:string,
    platfrom?:  string,
    groupName?: string,
    meta?:RouteMeta,
  }


const defaultRoute:IRoutesTreeData = 
{
  id : 0,
  children: [],
  viewLabel: '',
  path: '',
  hierarchyPath: '',
  parentId: undefined,
  redirect: '',
  component :'',
  platfrom: ''  ,
  groupName: '',
  name: '',
  meta: {
    icon         : "",
    title        : "",
    activeMenu   : "",
    hidden       : false,
    noCache      : false,
    affix        : false,
    alwaysShow   : false
  }
};
@Component({
  name: 'PageRoute',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
    private defaultProps = {
        children: 'children',
        label: 'name'
      }
    serviceRoutes: any = [];
    private cur_route:IRoutesTreeData = cloneDeep(defaultRoute);
    private cur_route_parent:IRoutesTreeData[] = [];
    private cur_route_target:IRoutesTreeData = cloneDeep(defaultRoute);
    private editMode:'edit'|'add' = 'add';
    private dialogVisible = false;
    private checkStrictly = false;
    private routesTreeData:IRoutesTreeData[] = [];

    /**
     * 
     */
    created() {
      // Mock: get all routes and roles list from server
      this.getRoutes()
    }
  
    private async getRoutes() {
      const { data } = await getRoutes({ /* Your params here */ })
      this.serviceRoutes = data.routes;
      this.routesTreeData = this.generateTreeData(this.serviceRoutes);
    }


    private generateTreeData(routes: IRoutesTreeData[]) {
      const data: IRoutesTreeData[] = []
      for (const route of routes) {

        const tmp : IRoutesTreeData = cloneDeep(defaultRoute); /*= 
        {
          id : 0,
          hierarchyPath: '0',
          children: [],
          viewLabel: '',
          path: ''
        }*/

        const i18n_key = `route.${route.meta?.title}`;
        let viewLabel     = this.$t(i18n_key).toString() == i18n_key ?  route.name : this.$t(i18n_key).toString();
        tmp.viewLabel     = viewLabel; // label
        tmp.id            = route.id;
        tmp.name          = route.name;
        tmp.path          = route.path;
        tmp.component     = route.component;
        tmp.redirect      = route.redirect;
        tmp.hierarchyPath = route.hierarchyPath;
        tmp.groupName     = route.groupName;
        tmp.platfrom      = route.platfrom  ;
        tmp.meta          = route.meta;
        
        if ( route.children && route.children.length > 0 ) 
        {
          tmp.children = this.generateTreeData(route.children)
        }
        data.push(tmp)
      }

      return data
    }

    //#region event

    private oncurrent_change(node:any,data:IRoutesTreeData)
    {
      // const newChild = { id: id++, label: 'testtest', children: [] };

      if (!data.children) {
        this.$set(data, 'children', []);
      }

      // data.children.push(newChild);
    }

    /** */
    private append( data:IRoutesTreeData):void
    {
      this.dialogVisible = true;
      this.editMode = 'add';
      if (!data.children)
      {
        data.children = [];
      }
      this.cur_route_parent = data.children;
      this.cur_route = cloneDeep(defaultRoute);

      this.cur_route.parentId = data.id;
      this.cur_route.hierarchyPath = data.hierarchyPath;
    }

    /** */
    private edit(node:any,data:IRoutesTreeData)
    {
      this.dialogVisible = true;
      this.editMode = 'edit';
      const parent:any = node.parent;
      this.cur_route_parent = parent.data.children || parent.data;
      // console.log(' ------ test ------ ', children, node);
      this.cur_route = cloneDeep(data);
      this.cur_route_target = data;
    }


    /** */
    private async remove(node:any,data:IRoutesTreeData)
    {  
      const res = await DeletePageRoute(data.id);
      
      const parent = node.parent;
      const children:IRoutesTreeData[] = parent.data.children || parent.data;
      const index = children.findIndex(d => d.hierarchyPath === data.hierarchyPath);
      children.splice(index, 1);
      
      this.$notify({
          title:    `删除${data.id} 成功`,
          message: `删除${data.id} 成功`
      });
    }

    /** */
    private async onclick_confirm()
    {
      switch( this.editMode )
      {
        case 'add':
        {
          const res:any = await CreatePageRoute({route : this.cur_route});
          if (res.data > 0)
          {
            this.cur_route.id = res.data;
            let newHierarchyPath = this.cur_route.hierarchyPath == '' ? res.data.toString() : this.cur_route.hierarchyPath += `.${res.data}`;
            this.cur_route.hierarchyPath = newHierarchyPath;
            const i18n_key = `route.${this.cur_route.meta?.title}`;
            let viewLabel = this.$t(i18n_key).toString() == i18n_key ?  this.cur_route.name : this.$t(i18n_key).toString();
            this.cur_route.viewLabel = viewLabel; // label

            this.cur_route_parent.push(this.cur_route);  
          }
          else 
          {
            this.$message({type:'error', message: `  - ${res.desc}`});
          }


          break;
        }
        case 'edit':
        {
          const res = await UpdatePageRoute({route: this.cur_route });

          const i18n_key = `route.${this.cur_route.meta?.title}`;
          let viewLabel = this.$t(i18n_key).toString() == i18n_key ?  this.cur_route.name : this.$t(i18n_key).toString();
          this.cur_route_target.viewLabel = viewLabel; // label

          this.cur_route_target.name        = this.cur_route.name?.trim();
          this.cur_route_target.path        = this.cur_route.path?.trim();
          this.cur_route_target.component   = this.cur_route.component?.trim();
          this.cur_route_target.redirect    = this.cur_route.redirect?.trim();
          this.cur_route_target.meta        = Object.assign({}, this.cur_route.meta);

          this.$notify({
            title:'Update',
            type:'success',
            message: `更新成功 ${this.cur_route.id}`
          });

          break;
        }
      }

      this.dialogVisible = false;
    }
    
    /**
     * 
     */
    private onclick_CreateRootRoute():void
    {
      this.editMode = 'add';

      this.cur_route = cloneDeep(defaultRoute);
      this.cur_route_parent = this.routesTreeData;
      
      this.dialogVisible = true;
    }

    //#endregion


}