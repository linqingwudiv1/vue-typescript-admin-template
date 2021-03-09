import path from 'path'
import { cloneDeep } from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
//import { RouteConfig } from 'vue-router'
import { Tree } from 'element-ui'
import { getRoutes, getRoles, createRole, deleteRole, updateRole } from '@/api/roles'

interface IRole {
  key: number
  name: string
  displayName: string
  description: string
  routes: IRoutesTreeData[],
  routes_key:number[]
}

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

const defaultRole: IRole = {
  key: 0,
  name: '',
  displayName: '',
  description: '',
  routes: [],
  routes_key: []
}

@Component({
  name: 'RolePermission'
})
export default class extends Vue {
  private role = Object.assign({}, defaultRole)
  private reshapedRoutes: IRoutesTreeData[] = []
  private serviceRoutes: IRoutesTreeData[] = []
  private rolesList: IRole[] = []
  private dialogVisible = false;
  private dialogType = 'new';
  private checkStrictly = false;
  private defaultProps = {
    children: 'children',
    label: 'title'
  }

  get routesTreeData() {
    return this.generateTreeData(this.reshapedRoutes)
  }

  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  }

  private async getRoutes() {
    const { data } = await getRoutes({ /* Your params here */ })
    this.serviceRoutes = data.routes
    this.reshapedRoutes = this.reshapeRoutes(data.routes)
  }

  private async getRoles() {
    const { data } = await getRoles({ /* Your params here */ })
    this.rolesList = data
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
      tmp.title = this.$t(`route.${route.meta.title}`).toString()
      tmp.path = route.path
      tmp.id = route.id;
      tmp.hierarchyPath = route.hierarchyPath;

      if (route.children) {
        tmp.children = this.generateTreeData(route.children)
      }
      data.push(tmp)
    }
    return data
  }

  // Reshape the routes structure so that it looks the same as the sidebar
  private reshapeRoutes(routes: IRoutesTreeData[]) {
    const reshapedRoutes: IRoutesTreeData[] = []
    for (let route of routes) {
      // Skip hidden routes
      if (route.meta && route.meta.hidden) {
        continue
      }
      const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
      if (route.children && onlyOneShowingChild && (!route.meta || !route.meta.alwaysShow)) {
        route = onlyOneShowingChild
      }
      const data: IRoutesTreeData = {
        id : route.id,
        name: route.name,
        title: route.title,
        hierarchyPath : route.hierarchyPath,
        path: route.path,//path.resolve(basePath, route.path),
        meta: {
          title: route.meta && route.meta.title
        }
      }
      // Recursive generate child routes
      if (route.children && route.children.length > 0) {
        data.children = this.reshapeRoutes(route.children)
      }
      reshapedRoutes.push(data)
    }
    return reshapedRoutes
  }

  /**
   * Tree结构转List
   * @param routes 
   */
   private flattenRoutes(routes: IRoutesTreeData[]) {
     let data: IRoutesTreeData[] = []
     routes.forEach(route => {

       data.push(route)
       if (route.children) {
         const temp = this.flattenRoutes(route.children)
         if (temp.length > 0) {
           data = [...data, ...temp]
         }
       }
     })
     console.log('from flatt', routes);
     return data
   }

  private flattenRoutesToKey(routes: IRoutesTreeData[]):number[]
  {
    let data: number[] = []

    routes.forEach(route => {
      data.push(route.id)
      if (route.children) {
        const temp = this.flattenRoutesToKey(route.children)
        if (temp.length > 0) {
          data = [...data, ...temp ]
        }
      }
    })

    return data;
  }


  private handleCreateRole() {
    this.role = Object.assign({}, defaultRole)
    const tree = (this.$refs.tree as Tree)
    if (tree) {
      tree.setCheckedKeys([])
    }
    this.dialogType = 'new'
    this.dialogVisible = true
  }

  private handleEdit(scope: any) {
    
    this.dialogType = 'edit'
    this.dialogVisible = true
    this.checkStrictly = true
    this.role = cloneDeep(scope.row)
    this.$nextTick(() => {
      const treeCom = (this.$refs.tree as Tree);
      console.log('role routes', this.role.routes, this.reshapeRoutes(this.role.routes))
      const routes:IRoutesTreeData[] = this.flattenRoutes(this.role.routes)
      console.log(routes);
      const treeData = this.generateTreeData(routes);
      const treeDataKeys = routes.map(t => t.hierarchyPath);
      // console.log(treeDataKeys, '\n treedata : ', treeData , '\n role.routes : ', this.role.routes);
      if (treeCom)
      {
        treeCom.setCheckedKeys(treeDataKeys)
      }
      else 
      {
        console.error('tree com is invalid')
      }
      
      // set checked state of a node not affects its father and child nodes
      this.checkStrictly = false
    })
  }

  private handleDelete(scope: any) {
    const { $index, row } = scope
    this.$confirm('确定移除当前选中角色?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(async() => {
        await deleteRole(row.key)
        this.rolesList.splice($index, 1)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })
      })
      .catch(err => { console.error(err) })
  }

  private generateTree(routes: any[], checkedKeys: string[]) {
    const res: any[] = []
    for (const route of routes) {
      //const routePath = path.resolve(basePath, route.path)
      // recursive child routes
      if (route.children) {
        route.children = this.generateTree(route.children, checkedKeys)
      }
      if (checkedKeys.includes(route.hierarchyPath)  || (route.children && route.children.length >= 1)) {
        res.push(route)
      }
    }
    return res
  }

  /**
   * 
   */
  private async confirmRole() {
    const isEdit = this.dialogType === 'edit';
    const tree = (this.$refs.tree as Tree);
    const checkedKeys = tree.getCheckedKeys() //[...];
    this.role.routes_key = this.flattenRoutesToKey(this.generateTree(cloneDeep(this.serviceRoutes), checkedKeys));
    this.role.routes = this.generateTree(cloneDeep(this.serviceRoutes), checkedKeys);
    // this.role.viewRoutes = this.generateTree(cloneDeep(this.serviceRoutes), '/', checkedKeys)
    // this.role.routes = checkedKeys;
    console.log(this.role.routes, this.role.routes_key);
    if (isEdit) {
      await updateRole(this.role.key, { role: 
        {
            key: this.role.key,
            name: this.role.name,
            displayName: this.role.displayName,
            description: this.role.description,
            routes: this.role.routes_key   
        } /*this.role*/ })

      for (let index = 0; index < this.rolesList.length; index++) 
      {
        if (this.rolesList[index].key === this.role.key) 
        {
          this.rolesList.splice(index, 1, Object.assign({}, this.role));
          break;
        }
      }
    } else {
      const { data } = await createRole({ role: {
            key: this.role.key,
            name: this.role.name,
            displayName: this.role.displayName,
            description: this.role.description,
            routes: this.role.routes_key   
        }
      });
      this.role.key = data;
      this.rolesList.push(this.role);
    }

    const { description, key, name, displayName } = this.role
    this.dialogVisible = false
    this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: `
          <div>Role Key: ${key}</div>
          <div>Role Name: ${name}</div>
          <div>Role DisplayName : ${displayName} </div>
          <div>Description: ${description}</div>
        `,
      type: 'success'
    })
  }

  // Reference: src/layout/components/Sidebar/SidebarItem.vue
  private onlyOneShowingChild(children: IRoutesTreeData[] = [], parent: IRoutesTreeData) {
    let onlyOneChild = null
    const showingChildren = children.filter(item => !item.meta || !item.meta.hidden)
    // When there is only one child route, the child route is displayed by default
    if (showingChildren.length === 1) {
      onlyOneChild = showingChildren[0]
      onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
      return onlyOneChild
    }
    // Show parent if there are no child route to display
    if (showingChildren.length === 0) {
      onlyOneChild = { ...parent, path: '' }
      return onlyOneChild
    }
    return false
  }
}