import { RouteConfig } from 'vue-router'
import { loadViewToMap } from '@/utils/route'
import Default from '@/layout/default.vue'
const tableRoutes: RouteConfig = {
  path: '/table',
  component: Default,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: loadViewToMap('views/developer/table/dynamic-table/index.vue'),//() => import(/* webpackChunkName: "dynamic-table" */ '@/views/table/dynamic-table/index.vue'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    },
    {
      path: 'draggable-table',
      component: loadViewToMap('views/developer/table/draggable-table.vue'),//() => import(/* webpackChunkName: "draggable-table" */ '@/views/table/draggable-table.vue'),
      name: 'DraggableTable',
      meta: { title: 'draggableTable' }
    },
    {
      path: 'inline-edit-table',
      component: loadViewToMap('views/developer/table/inline-edit-table.vue'),//() => import(/* webpackChunkName: "inline-edit-table" */ '@/views/table/inline-edit-table.vue'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },
    {
      path: 'complex-table',
      component: loadViewToMap('views/developer/table/complex-table.vue'),//() => import(/* webpackChunkName: "complex-table" */ '@/views/table/complex-table.vue'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' }
    }
  ]
}

export default tableRoutes
