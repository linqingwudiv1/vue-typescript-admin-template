import { loadViewToMap } from "@/utils/route";
import { RouteConfig } from "vue-router";

import Layout from '@/layout/index.vue';
import Default from '@/layout/default.vue';
import componentsRouter from "./components";
import chartsRouter from "./charts";
import nestedRouter from './nested';
import tableRouter from './table';
/**
 * 
 */
const developRouter: RouteConfig[] = [
    {
      path: '/developer',
      component: Layout,
      meta: {
        title: 'developer',
        icon: 'example',
        alwaysShow: true
      },
      children: [
        {
          path: 'icon',
          component: loadViewToMap('views/developer/icons/index.vue'),
          meta: {
            title: 'icons',
            icon: 'icon',
            noCache: true
          }
        },
        componentsRouter,
        chartsRouter,
        nestedRouter,
        tableRouter,
        {
          path: 'excel',
          component: Default,
          redirect: '/excel/export-excel',
          meta: {
            title: 'excel',
            icon: 'excel'
          },
          children: [
            {
              path: 'export-excel',
              component: loadViewToMap('views/developer/excel/export-excel.vue'),// () => import(/* webpackChunkName: "export-excel" */ '@/views/excel/export-excel.vue'),
              name: 'ExportExcel',
              meta: { title: 'exportExcel' }
            },
            {
              path: 'export-selected-excel',
              component: loadViewToMap('views/developer/excel/select-excel.vue'),// () => import(/* webpackChunkName: "select-excel" */ '@/views/excel/select-excel.vue'),
              name: 'SelectExcel',
              meta: { title: 'selectExcel' }
            },
            {
              path: 'export-merge-header',
              component: loadViewToMap('views/developer/excel/merge-header.vue'),// () => import(/* webpackChunkName: "merge-header" */ '@/views/excel/merge-header.vue'),
              name: 'MergeHeader',
              meta: { title: 'mergeHeader' }
            },
            {
              path: 'upload-excel',
              component: loadViewToMap('views/developer/excel/upload-excel.vue'),// () => import(/* webpackChunkName: "upload-excel" */ '@/views/excel/upload-excel.vue'),
              name: 'UploadExcel',
              meta: { title: 'uploadExcel' }
            }
          ]
        },
        {
          path: 'zip',
          component: Default,
          redirect: '/zip/download',
          meta: {
            title: 'zip',
            icon: 'zip',
            alwaysShow: true // will always show the root menu
          },
          children: [
            {
              path: 'download',
              component: loadViewToMap('views/developer/zip/index.vue'), // () => import(/* webpackChunkName: "zip" */ '@/views/zip/index.vue'),
              name: 'ExportZip',
              meta: { title: 'exportZip' }
            }
          ]
        },
        {
          path: 'example',
          component: Default,
          redirect: '/example/list',
          meta: {
            title: 'example',
            icon: 'example'
          },
          children: [
            {
              path: 'create',
              component: loadViewToMap('views/developer/example/create.vue'),//() => import(/* webpackChunkName: "example-create" */ '@/views/example/create.vue'),
              name: 'CreateArticle',
              meta: {
                title: 'createArticle',
                icon: 'edit'
              }
            },
            {
              path: 'edit/:id(\\d+)',
              component: loadViewToMap('views/developer/example/edit.vue'), // () => import(/* webpackChunkName: "example-edit" */ '@/views/example/edit.vue'),
              name: 'EditArticle',
              meta: {
                title: 'editArticle',
                noCache: true,
                activeMenu: '/example/list',
                hidden: true
              }
            },
            {
              path: 'list',
              component: loadViewToMap('views/developer/example/list.vue'),// () => import(/* webpackChunkName: "example-list" */ '@/views/example/list.vue'),
              name: 'ArticleList',
              meta: {
                title: 'articleList',
                icon: 'list'
              }
            }
          ]
        },
        {
          path: 'tab',
          component: Default,
          children: [
            {
              path: 'index',
              component: loadViewToMap('views/developer/tab/index.vue'), //() => import(/* webpackChunkName: "tab" */ '@/views/tab/index.vue'),
              name: 'Tab',
              meta: {
                title: 'tab',
                icon: 'tab'
              }
            }
          ]
        },
        {
          path: 'pdf',
          component: Default,
          redirect: '/pdf/index',
          children: [
            {
              path: 'index',
              component: loadViewToMap('views/developer/pdf/index.vue'),//() => import(/* webpackChunkName: "pdf" */ '@/views/pdf/index.vue'),
              name: 'PDF',
              meta: {
                title: 'pdf',
                icon: 'pdf'
              }
            }
          ]
        },
        {
          path: 'pdf-download-example',
          component: loadViewToMap('views/developer/pdf/download.vue'),// () => import(/* webpackChunkName: "pdf-download-example" */ '@/views/pdf/download.vue'),
          meta: { hidden: true }
        },
        {
          path: 'clipboard',
          component: Default,
          redirect: 'noredirect',
          children: [
            {
              path: 'index',
              component: loadViewToMap('views/developer/clipboard/index.vue'),//() => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/index.vue'),
              name: 'Clipboard',
              meta: {
                title: 'clipboard',
                icon: 'clipboard'
              }
            }
          ]
        },
        {
          path: 'i18n',
          component: Default,
          children: [
            {
              path: 'index',
              component: loadViewToMap('views/developer/i18n-demo/index.vue'),//() => import(/* webpackChunkName: "i18n-demo" */ '@/views/i18n-demo/index.vue'),
              name: 'I18n',
              meta: {
                title: 'i18n',
                icon: 'international'
              }
            }
          ]
        },
        {
          path: 'error',
          component: Default,
          redirect: 'noredirect',
          meta: {
            title: 'errorPages',
            icon: '404'
          },
          children: [
            {
              path: '401',
              component: loadViewToMap('views/error-page/401.vue'),//() => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
              name: 'Page401',
              meta: {
                title: 'page401',
                noCache: true
              }
            },
            {
              path: '404',
              component: loadViewToMap('views/error-page/404.vue'), // () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
              name: 'Page404',
              meta: {
                title: 'page404',
                noCache: true
              }
            }
          ]
        },
        {
          path: 'https://github.com/Armour/vue-typescript-admin-template',
          meta: {
            title: 'externalLink',
            icon: 'link'
          }
        },
        {
          path: '/error-log',
          component: Default,
          redirect: 'noredirect',
          children: [
            {
              path: 'log',
              component: loadViewToMap('views/developer/error-log/index.vue'), // () => import(/* webpackChunkName: "error-log" */ '@/views/error-log/index.vue'),
              name: 'ErrorLog',
              meta: {
                title: 'errorLog',
                icon: 'bug'
              }
            }
          ]
        }
      ]
    }
  ];


  export default developRouter;
