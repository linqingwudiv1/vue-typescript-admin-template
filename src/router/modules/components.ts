import { RouteConfig } from 'vue-router'
import { loadViewToMap } from '@/utils/route'
import Default from '@/layout/default.vue'

const componentsRouter: RouteConfig = {
  path: 'components',
  component: Default, //loadViewToMap('views/developer/components-demo/tinymce.vue'),
  //redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: loadViewToMap('views/developer/components-demo/tinymce.vue'), //() => import(/* webpackChunkName: "tinymce" */ '@/views/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      component:loadViewToMap('views/developer/components-demo/markdown.vue'), //() => import(/* webpackChunkName: "markdown" */ '@/views/components-demo/markdown.vue'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: 'json-editor',
      component: () => loadViewToMap('views/components-demo/json-editor.vue'), //import(/* webpackChunkName: "json-editor" */ '@/views/components-demo/json-editor.vue'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    },
    {
      path: 'split-pane',
      component: loadViewToMap('views/developer/components-demo/split-pane.vue'), // () => import(/* webpackChunkName: "split-pane" */ '@/views/components-demo/split-pane.vue'),
      name: 'SplitPaneDemo',
      meta: { title: 'splitPane' }
    },
    {
      path: 'avatar-upload',
      component: loadViewToMap('views/developer/components-demo/avatar-upload.vue'), // () => import(/* webpackChunkName: "avatar-upload" */ '@/views/components-demo/avatar-upload.vue'),
      name: 'AvatarUploadDemo',
      meta: { title: 'avatarUpload' }
    },
    {
      path: 'dropzone',
      component: loadViewToMap('views/developer/components-demo/dropzone.vue'), //() => import(/* webpackChunkName: "dropzone" */ '@/views/components-demo/dropzone.vue'),
      name: 'DropzoneDemo',
      meta: { title: 'dropzone' }
    },
    {
      path: 'sticky',
      component: loadViewToMap('views/developer/components-demo/sticky.vue'), //() => import(/* webpackChunkName: "sticky" */ '@/views/components-demo/sticky.vue'),
      name: 'StickyDemo',
      meta: { title: 'sticky' }
    },
    {
      path: 'count-to',
      component: loadViewToMap('views/developer/components-demo/count-to.vue'), //() => import(/* webpackChunkName: "count-to" */ '@/views/components-demo/count-to.vue'),
      name: 'CountToDemo',
      meta: { title: 'countTo' }
    },
    {
      path: 'mixin',
      component: loadViewToMap('views/developer/components-demo/mixin.vue'),//() => import(/* webpackChunkName: "component-mixin" */ '@/views/components-demo/mixin.vue'),
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' }
    },
    {
      path: 'back-to-top',
      component: loadViewToMap('views/developer/components-demo/back-to-top.vue'),// () => import(/* webpackChunkName: "back-to-top" */ '@/views/components-demo/back-to-top.vue'),
      name: 'BackToTopDemo',
      meta: { title: 'backToTop' }
    },
    {
      path: 'draggable-dialog',
      component: loadViewToMap('views/developer/components-demo/draggable-dialog.vue'), //() => import(/* webpackChunkName: "draggable-dialog" */ '@/views/components-demo/draggable-dialog.vue'),
      name: 'DraggableDialogDemo',
      meta: { title: 'draggableDialog' }
    },
    {
      path: 'draggable-kanban',
      component: loadViewToMap('views/developer/components-demo/draggable-kanban.vue'),// () => import(/* webpackChunkName: "draggable-kanban" */ '@/views/components-demo/draggable-kanban.vue'),
      name: 'DraggableKanbanDemo',
      meta: { title: 'draggableKanban' }
    },
    {
      path: 'draggable-list',
      component: loadViewToMap('views/developer/components-demo/draggable-list.vue'),//() => import(/* webpackChunkName: "draggable-list" */ '@/views/components-demo/draggable-list.vue'),
      name: 'DraggableListDemo',
      meta: { title: 'draggableList' }
    },
    {
      path: 'draggable-select',
      component: loadViewToMap('views/developer/components-demo/draggable-select.vue'),//() => import(/* webpackChunkName: "draggable-select" */ '@/views/components-demo/draggable-select.vue'),
      name: 'DraggableSelectDemo',
      meta: { title: 'draggableSelect' }
    }
  ]
}

export default componentsRouter
