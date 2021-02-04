import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import Default from '@/layout/default.vue'
import { loadViewToMap } from '@/utils/route'
const chartsRouter: RouteConfig = {
  path: '/charts',
  component: Default,
  redirect: 'noredirect',
  name: 'Charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'bar-chart',
      component: loadViewToMap('views/developer/charts/bar-chart.vue'),//() => import(/* webpackChunkName: "bar-chart" */ '@/views/charts/bar-chart.vue'),
      name: 'BarChartDemo',
      meta: {
        title: 'barChart',
        noCache: true
      }
    },
    {
      path: 'line-chart',
      component: loadViewToMap('views/developer/charts/line-chart.vue'),//() => import(/* webpackChunkName: "line-chart" */ '@/views/charts/line-chart.vue'),
      name: 'LineChartDemo',
      meta: {
        title: 'lineChart',
        noCache: true
      }
    },
    {
      path: 'mixed-chart',
      component: loadViewToMap('views/developer/charts/mixed-chart.vue'),//() => import(/* webpackChunkName: "mixed-chart" */ '@/views/charts/mixed-chart.vue'),
      name: 'MixedChartDemo',
      meta: {
        title: 'mixedChart',
        noCache: true
      }
    }
  ]
}

export default chartsRouter
