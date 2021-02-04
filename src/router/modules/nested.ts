import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import { loadViewToMap } from '@/utils/route'
import Default from '@/layout/default.vue'
const nestedRoutes: RouteConfig = {
  path: '/nested',
  component: Default,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: loadViewToMap('views/developer/nested/menu1/index.vue'),// => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
      //redirect: '/nested/menu1/menu1-1',
      name: 'Menu1',
      meta: { title: 'menu1' },
      children: [
        {
          path: 'menu1-1',
          component: loadViewToMap('views/developer/nested/menu1/menu1-1/index.vue'),//() => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: { title: 'menu1-1' }
        },
        {
          path: 'menu1-2',
          component: loadViewToMap('views/developer/nested/menu1/menu1-2/index.vue'),//() => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          name: 'Menu1-2',
          meta: { title: 'menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: loadViewToMap('views/developer/nested/menu1/menu1-2/menu1-2-1/index.vue'),//() => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: loadViewToMap('views/developer/nested/menu1/menu1-2/menu1-2-2/index.vue'),//() => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: { title: 'menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: loadViewToMap('views/developer/nested/menu1/menu1-3/index.vue'),//() => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
          name: 'Menu1-3',
          meta: { title: 'menu1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      component: loadViewToMap('views/developer/nested/menu2/index.vue'),//() => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
      name: 'Menu2',
      meta: { title: 'menu2' }
    }
  ]
}

export default nestedRoutes
