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
          roles: [1, 2], // you can set roles in root nav
          alwaysShow: true // will always show the root menu
        },
        children: [
          {
            path: 'page',
            component: loadViewToMap('views/permission/page.vue'),//() => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
            name: 'PagePermission',
            meta: {
              title: 'pagePermission',
              roles: [1] // or you can only set roles in sub nav
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
              roles: [1]
            }
          }
        ]
      }
];

export default bizAsncRoute;