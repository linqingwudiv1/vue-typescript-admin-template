/**
 * 业务模块路由
 */

import { RouteConfig } from "vue-router";

import Layout from '@/layout/index.vue';
import { loadViewToMap } from "@/utils/route";

const bizAsncRoute:RouteConfig[] = 
[
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/directive',
        meta: {
          title: 'permission',
          icon: 'lock',
          alwaysShow: true // will always show the root menu
        },
        children: [
          {
            path: 'pageRoute',
            component: loadViewToMap('views/permission/page-route.vue'),//() => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
            name: 'PageRouteMgr',
            meta: {
              title: 'pageRouteMgr',
            }
          },
          {
            path: 'page',
            component: loadViewToMap('views/permission/page.vue'),//() => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
            name: 'PagePermission',
            meta: {
              title: 'pagePermission',
            }
          },
          {
            path: 'directive',
            component: loadViewToMap('views/permission/directive.vue'),//() => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
            name: 'DirectivePermission',
            meta: {
              title: 'directivePermission'
              // if do not set roles, means: this page does not require permission
            }
          },
          {
            path: 'role',
            component: loadViewToMap('views/permission/role.vue'),//() => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
            name: 'RolePermission',
            meta: {
              title: 'rolePermission',
            }
          },
          {
            path: 'userRoleMgr',
            component: loadViewToMap('views/permission/user-role-mgr.vue'),//() => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
            name: 'UserRoleMgr',
            meta: {
              title: 'userRoleMgr',
            }
          }
        ]
    },
    {
      path: '/appMgr',
      component: Layout,
      redirect: '/appMgr/index',
      meta: {
        title: 'appMgr',
        icon: 'lock',
        alwaysShow: true // will always show the root menu
      },
      children:[
        {
        path: 'index',
        component: loadViewToMap('views/app-mgr/app-mgr.vue'),//() => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
        name: 'AppMgrHome',
        meta: {
          title: 'appMgrHome',
        }
      }]
    }
];

export default bizAsncRoute;