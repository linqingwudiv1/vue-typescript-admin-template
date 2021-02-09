import { getRoutes } from '@/api/roles'
import { DeletePageRoute } from '@/api/routepage';
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
    private cur_route:IRoutesTreeData = cloneDeep(defaultRoute); //Object.assign({}, defaultRoute);
    private dialogVisible = false;
    private checkStrictly = false;
    
    /**
     * 
     */
    get routesTreeData() {
      return this.generateTreeData(this.serviceRoutes)
    }

    /**
     * 
     */
    created() {
      // Mock: get all routes and roles list from server
      this.getRoutes()
    }
  
    private async getRoutes() {
      const { data } = await getRoutes({ /* Your params here */ })
      //console.log(data.routes);
      this.serviceRoutes = data.routes
    }


    private generateTreeData(routes: IRoutesTreeData[]) {
      const data: IRoutesTreeData[] = []
      for (const route of routes) {

        const tmp: IRoutesTreeData = 
        {
          id : 0,
          hierarchyPath: '0',
          children: [],
          viewLabel: '',
          path: ''
        }

        const i18n_key = `route.${route.meta?.title}`;
        let viewLabel = this.$t(i18n_key).toString() == i18n_key ?  route.name : this.$t(i18n_key).toString();
        tmp.viewLabel = viewLabel; // label
        tmp.path = route.path
        tmp.id = route.id;
        tmp.hierarchyPath = route.hierarchyPath;
        tmp.name = route.name;
        if ( route.children && route.children.length > 0 ) 
        {
          tmp.children = this.generateTreeData(route.children)
        }
        data.push(tmp)
      }

      console.log(data);
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
    private async remove(node:any,data:IRoutesTreeData)
    {
      //await DeletePageRoute(data.id);
       
      const parent = node.parent;
      const children:IRoutesTreeData[] = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }

    /** */
    private append( data:IRoutesTreeData):void
    {
      this.dialogVisible = true;
    }

    /** */
    private onclick_CreateRoute():void
    {
      this.dialogVisible = true;
      this.cur_route = cloneDeep(defaultRoute);
    }

    //#endregion


}