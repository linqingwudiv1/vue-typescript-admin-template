import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import router, { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
import { IRole } from './user'

import Layout from '@/layout/index.vue'
import { getUserRoute } from '@/api/users'
import { loadView, loadViewToMap } from '@/utils/route'
/**
 * 
 * @param roles 
 * @param route 
 */
const hasPermission = (roles: IRole[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) 
  {
    return roles.some(role => route.meta.roles.includes(role.key));
  } 
  else 
  {
    return true;
  }
}

/**
 * 
 * @param routes 
 * @param roles 
 */
export const filterAsyncRoutes = (routes: RouteConfig[], roles: IRole[]) => {
  const res: RouteConfig[] = [];
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res;
}

/**
 * 
 * @param routes 
 */
export const filterUserRoutes = (routes:Array<any>):RouteConfig[] => 
{
  //const ret_route: RouteConfig[] = [];

  let ret_route = routes.map(route => {
      let r:RouteConfig = {
        path      : route.path,
        name      : route.name,
        redirect  : route.redirect,
        component : loadViewToMap(route.component),
        meta: {
          id : route.id,
          title : route.meta.title,
          activeMenu: route.meta.activeMenu,
          hidden : route.meta.hidden,
          icon   : route.meta.icon,
          noCache : route.meta.noCache,
          affix : route.meta.affix,
          alwaysShow: route.meta.affix
        }
      };
      if (route.children != null )
      {          
        r.children  = filterUserRoutes(route.children);
      }

      return r;
    });

  return ret_route;
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}
@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes; 
  }


  

  @Action
  public async GenerateRoutes(roles: IRole[]) {
    let accessedRoutes:RouteConfig[] = [];
    
    let { data } = await getUserRoute();

    if ( (typeof data) != "string" )
    {
      let user_route =  filterUserRoutes(data);
      accessedRoutes = user_route;
    }

    /*
    if ( true ) 
    {
      //accessedRoutes = asyncRoutes;
    } 
    else 
    {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }*/
    
    this.SET_ROUTES(accessedRoutes)
  }
}

export const PermissionModule = getModule(Permission)
