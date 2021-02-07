import { getRoutes } from '@/api/roles'
import { Component, Vue } from 'vue-property-decorator'
import SwitchRoles from './components/SwitchRoles.vue'


interface IRoutesTreeData {
    id:number,
    children?: IRoutesTreeData[]
    title?: string,
    path: string,
    hierarchyPath: string,
    parentId?: number,
    redirect?:string,
    component?:string,
    name?:string,
    meta?:any,
  }

@Component({
  name: 'PageRoute',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
    private defaultProps = {
        children: 'children',
        label: 'title'
      }
    serviceRoutes: any = [];
    private checkStrictly = false;
      get routesTreeData() {
        return this.generateTreeData(this.serviceRoutes)
      }
    
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
          const tmp: IRoutesTreeData = {
            id : 0,
            hierarchyPath: '0',
            children: [],
            title: '',
            path: ''
          }
          var label = this.$t(`route.${route.meta.title}`).toString() == 'route.' ?  route.path : this.$t(`route.${route.meta.title}`).toString();
          tmp.title =  label
          tmp.path = route.path
          tmp.id = route.id;
          tmp.hierarchyPath = route.hierarchyPath;
          tmp.name = route.name
    
          if (route.children && route.children.length > 0) {
            tmp.children = this.generateTreeData(route.children)
          }
          data.push(tmp)
        }

        console.log(data);
        return data
      }

}