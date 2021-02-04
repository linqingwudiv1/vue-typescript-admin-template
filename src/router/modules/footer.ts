import { RouteConfig } from "vue-router";

import { loadViewToMap } from '@/utils/route'

import Default from '@/layout/default.vue'
import Layout from '@/layout/index.vue'

const footerRouter:RouteConfig[] = 
[
    {
        path: '/theme',
        component: Layout,
        redirect: 'noredirect',
        children: [
          {
            path: 'index',
            component: loadViewToMap('views/theme/index.vue'),//() => import(/* webpackChunkName: "theme" */ '@/views/theme/index.vue'),
            name: 'Theme',
            meta: {
              title: 'theme',
              icon: 'theme'
            }
          }
        ]
      },
      {
        path: '*',
        redirect: '/404',
        meta: { hidden: true }
      }
];


export default footerRouter;