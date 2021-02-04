export const userroute:any = [
    {
      "children": [
        {
          "children": null,
          "id": 10048,
          "name": "ErrorLog",
          "parentId": 10047,
          "hierarchyPath": "10047.10048",
          "path": "log",
          "redirect": null,
          "component": "views/error-log/index.vue",
          "meta": {
            "icon": "bug",
            "title": "errorLog",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10047,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10047",
      "path": "/error-log",
      "redirect": "noredirect",
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10046,
          "name": "Page404",
          "parentId": 10044,
          "hierarchyPath": "10044.10046",
          "path": "404",
          "redirect": null,
          "component": "views/error-page/404.vue",
          "meta": {
            "icon": "",
            "title": "page404",
            "activeMenu": "",
            "hidden": false,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10045,
          "name": "Page401",
          "parentId": 10044,
          "hierarchyPath": "10044.10045",
          "path": "401",
          "redirect": null,
          "component": "views/error-page/401.vue",
          "meta": {
            "icon": "",
            "title": "page401",
            "activeMenu": "",
            "hidden": false,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10044,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10044",
      "path": "/error",
      "redirect": "noredirect",
      "component": "Layout",
      "meta": {
        "icon": "404",
        "title": "errorPages",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10043,
          "name": "Tab",
          "parentId": 10042,
          "hierarchyPath": "10042.10043",
          "path": "index",
          "redirect": null,
          "component": "views/tab/index.vue",
          "meta": {
            "icon": "tab",
            "title": "tab",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10042,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10042",
      "path": "/tab",
      "redirect": null,
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10040,
          "name": "EditArticle",
          "parentId": 10038,
          "hierarchyPath": "10038.10040",
          "path": "edit/:id(\\d+)",
          "redirect": null,
          "component": "views/example/edit.vue",
          "meta": {
            "icon": "",
            "title": "editArticle",
            "activeMenu": "/example/list",
            "hidden": true,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10039,
          "name": "CreateArticle",
          "parentId": 10038,
          "hierarchyPath": "10038.10039",
          "path": "create",
          "redirect": null,
          "component": "views/example/create.vue",
          "meta": {
            "icon": "edit",
            "title": "createArticle",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10041,
          "name": "ArticleList",
          "parentId": 10038,
          "hierarchyPath": "10038.10041",
          "path": "list",
          "redirect": null,
          "component": "views/example/list.vue",
          "meta": {
            "icon": "list",
            "title": "articleList",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10038,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10038",
      "path": "/example",
      "redirect": "/example/list",
      "component": "Layout",
      "meta": {
        "icon": "example",
        "title": "example",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10052,
          "name": "MergeHeader",
          "parentId": 10049,
          "hierarchyPath": "10049.10052",
          "path": "export-merge-header",
          "redirect": null,
          "component": "views/excel/merge-header.vue",
          "meta": {
            "icon": "",
            "title": "mergeHeader",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10051,
          "name": "SelectExcel",
          "parentId": 10049,
          "hierarchyPath": "10049.10051",
          "path": "export-selected-excel",
          "redirect": null,
          "component": "views/excel/select-excel.vue",
          "meta": {
            "icon": "",
            "title": "selectExcel",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10053,
          "name": "UploadExcel",
          "parentId": 10049,
          "hierarchyPath": "10049.10053",
          "path": "upload-excel",
          "redirect": null,
          "component": "views/excel/upload-excel.vue",
          "meta": {
            "icon": "",
            "title": "uploadExcel",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10050,
          "name": "ExportExcel",
          "parentId": 10049,
          "hierarchyPath": "10049.10050",
          "path": "export-excel",
          "redirect": null,
          "component": "views/excel/export-excel.vue",
          "meta": {
            "icon": "",
            "title": "exportExcel",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10049,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10049",
      "path": "/excel",
      "redirect": "/excel/export-excel",
      "component": "Layout",
      "meta": {
        "icon": "excel",
        "title": "excel",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10055,
          "name": "ExportZip",
          "parentId": 10054,
          "hierarchyPath": "10054.10055",
          "path": "download",
          "redirect": null,
          "component": "views/zip/index.vue",
          "meta": {
            "icon": "",
            "title": "exportZip",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10054,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10054",
      "path": "/zip",
      "redirect": "/zip/download",
      "component": "Layout",
      "meta": {
        "icon": "zip",
        "title": "zip",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": true
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10057,
          "name": "PDF",
          "parentId": 10056,
          "hierarchyPath": "10056.10057",
          "path": "index",
          "redirect": null,
          "component": "views/pdf/index.vue",
          "meta": {
            "icon": "pdf",
            "title": "pdf",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10056,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10056",
      "path": "/pdf",
      "redirect": "/pdf/index",
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": null,
      "id": 10058,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10058",
      "path": "/pdf-download-example",
      "redirect": null,
      "component": "views/pdf/download.vue",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": true,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10060,
          "name": "Theme",
          "parentId": 10059,
          "hierarchyPath": "10059.10060",
          "path": "index",
          "redirect": null,
          "component": "views/theme/index.vue",
          "meta": {
            "icon": "theme",
            "title": "theme",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10059,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10059",
      "path": "/theme",
      "redirect": "noredirect",
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10062,
          "name": "Clipboard",
          "parentId": 10061,
          "hierarchyPath": "10061.10062",
          "path": "index",
          "redirect": null,
          "component": "views/clipboard/index.vue",
          "meta": {
            "icon": "clipboard",
            "title": "clipboard",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10061,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10061",
      "path": "/clipboard",
      "redirect": "noredirect",
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10064,
          "name": "I18n",
          "parentId": 10063,
          "hierarchyPath": "10063.10064",
          "path": "index",
          "redirect": null,
          "component": "views/i18n-demo/index.vue",
          "meta": {
            "icon": "international",
            "title": "i18n",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10063,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10063",
      "path": "/i18n",
      "redirect": null,
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10037,
          "name": "ComplexTable",
          "parentId": 10033,
          "hierarchyPath": "10033.10037",
          "path": "complex-table",
          "redirect": null,
          "component": "views/table/complex-table.vue",
          "meta": {
            "icon": "",
            "title": "complexTable",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10036,
          "name": "InlineEditTable",
          "parentId": 10033,
          "hierarchyPath": "10033.10036",
          "path": "inline-edit-table",
          "redirect": null,
          "component": "views/table/inline-edit-table.vue",
          "meta": {
            "icon": "",
            "title": "inlineEditTable",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10035,
          "name": "DraggableTable",
          "parentId": 10033,
          "hierarchyPath": "10033.10035",
          "path": "draggable-table",
          "redirect": null,
          "component": "views/table/draggable-table.vue",
          "meta": {
            "icon": "",
            "title": "draggableTable",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10034,
          "name": "DynamicTable",
          "parentId": 10033,
          "hierarchyPath": "10033.10034",
          "path": "dynamic-table",
          "redirect": null,
          "component": "views/table/dynamic-table/index.vue",
          "meta": {
            "icon": "",
            "title": "dynamicTable",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10033,
      "name": "Table",
      "parentId": null,
      "hierarchyPath": "10033",
      "path": "/table",
      "redirect": "/table/complex-table",
      "component": "Layout",
      "meta": {
        "icon": "table",
        "title": "table",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10001,
          "name": "PagePermission",
          "parentId": 10000,
          "hierarchyPath": "10000.10001",
          "path": "page",
          "redirect": null,
          "component": "views/permission/page.vue",
          "meta": {
            "icon": "",
            "title": "pagePermission",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10002,
          "name": "DirectivePermission",
          "parentId": 10000,
          "hierarchyPath": "10000.10002",
          "path": "directive",
          "redirect": null,
          "component": "views/permission/directive.vue",
          "meta": {
            "icon": "",
            "title": "directivePermission",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10003,
          "name": "RolePermission",
          "parentId": 10000,
          "hierarchyPath": "10000.10003",
          "path": "role",
          "redirect": null,
          "component": "views/permission/role.vue",
          "meta": {
            "icon": "",
            "title": "rolePermission",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10000,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10000",
      "path": "/perm1ission",
      "redirect": "/permission/directive",
      "component": "Layout",
      "meta": {
        "icon": "lock",
        "title": "permission",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": true
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10005,
          "name": "Icons",
          "parentId": 10004,
          "hierarchyPath": "10004.10005",
          "path": "index",
          "redirect": null,
          "component": "views/icons/index.vue",
          "meta": {
            "icon": "icon",
            "title": "icons",
            "activeMenu": "",
            "hidden": false,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10004,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10004",
      "path": "/icon",
      "redirect": null,
      "component": "Layout",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10007,
          "name": "TinymceDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10007",
          "path": "tinymce",
          "redirect": null,
          "component": "views/components-demo/tinymce.vue",
          "meta": {
            "icon": "",
            "title": "tinymce",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10008,
          "name": "MarkdownDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10008",
          "path": "markdown",
          "redirect": null,
          "component": "views/components-demo/markdown.vue",
          "meta": {
            "icon": "",
            "title": "markdown",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10009,
          "name": "JsonEditorDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10009",
          "path": "json-editor",
          "redirect": null,
          "component": "",
          "meta": {
            "icon": "",
            "title": "jsonEditor",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10010,
          "name": "SplitPaneDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10010",
          "path": "split-pane",
          "redirect": null,
          "component": "views/components-demo/split-pane.vue",
          "meta": {
            "icon": "",
            "title": "splitPane",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10011,
          "name": "AvatarUploadDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10011",
          "path": "avatar-upload",
          "redirect": null,
          "component": "views/components-demo/avatar-upload.vue",
          "meta": {
            "icon": "",
            "title": "avatarUpload",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10012,
          "name": "DropzoneDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10012",
          "path": "dropzone",
          "redirect": null,
          "component": "views/components-demo/dropzone.vue",
          "meta": {
            "icon": "",
            "title": "dropzone",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10013,
          "name": "StickyDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10013",
          "path": "sticky",
          "redirect": null,
          "component": "views/components-demo/sticky.vue",
          "meta": {
            "icon": "",
            "title": "sticky",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10014,
          "name": "CountToDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10014",
          "path": "count-to",
          "redirect": null,
          "component": "views/components-demo/count-to.vue",
          "meta": {
            "icon": "",
            "title": "countTo",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10015,
          "name": "ComponentMixinDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10015",
          "path": "mixin",
          "redirect": null,
          "component": "views/components-demo/mixin.vue",
          "meta": {
            "icon": "",
            "title": "componentMixin",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10016,
          "name": "BackToTopDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10016",
          "path": "back-to-top",
          "redirect": null,
          "component": "views/components-demo/back-to-top.vue",
          "meta": {
            "icon": "",
            "title": "backToTop",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10020,
          "name": "DraggableSelectDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10020",
          "path": "draggable-select",
          "redirect": null,
          "component": "views/components-demo/draggable-select.vue",
          "meta": {
            "icon": "",
            "title": "draggableSelect",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10019,
          "name": "DraggableListDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10019",
          "path": "draggable-list",
          "redirect": null,
          "component": "views/components-demo/draggable-list.vue",
          "meta": {
            "icon": "",
            "title": "draggableList",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10018,
          "name": "DraggableKanbanDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10018",
          "path": "draggable-kanban",
          "redirect": null,
          "component": "views/components-demo/draggable-kanban.vue",
          "meta": {
            "icon": "",
            "title": "draggableKanban",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10017,
          "name": "DraggableDialogDemo",
          "parentId": 10006,
          "hierarchyPath": "10006.10017",
          "path": "draggable-dialog",
          "redirect": null,
          "component": "views/components-demo/draggable-dialog.vue",
          "meta": {
            "icon": "",
            "title": "draggableDialog",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10006,
      "name": "ComponentDemo",
      "parentId": null,
      "hierarchyPath": "10006",
      "path": "/components",
      "redirect": "noRedirect",
      "component": "Layout",
      "meta": {
        "icon": "component",
        "title": "components",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": null,
      "id": 10065,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10065",
      "path": "https://github.com/Armour/vue-typescript-admin-template",
      "redirect": null,
      "component": "",
      "meta": {
        "icon": "link",
        "title": "externalLink",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": [
            {
              "children": null,
              "id": 10031,
              "name": "Menu1-3",
              "parentId": 10026,
              "hierarchyPath": "10025.10026.10031",
              "path": "menu1-3",
              "redirect": null,
              "component": "views/nested/menu1/menu1-3/index.vue",
              "meta": {
                "icon": "",
                "title": "menu1-3",
                "activeMenu": "",
                "hidden": false,
                "noCache": false,
                "affix": false,
                "alwaysShow": false
              }
            },
            {
              "children": [
                {
                  "children": null,
                  "id": 10029,
                  "name": "Menu1-2-1",
                  "parentId": 10028,
                  "hierarchyPath": "10025.10026.10028.10029",
                  "path": "menu1-2-1",
                  "redirect": null,
                  "component": "views/nested/menu1/menu1-2/menu1-2-1/index.vue",
                  "meta": {
                    "icon": "",
                    "title": "menu1-2-1",
                    "activeMenu": "",
                    "hidden": false,
                    "noCache": false,
                    "affix": false,
                    "alwaysShow": false
                  }
                },
                {
                  "children": null,
                  "id": 10030,
                  "name": "Menu1-2-2",
                  "parentId": 10028,
                  "hierarchyPath": "10025.10026.10028.10030",
                  "path": "menu1-2-2",
                  "redirect": null,
                  "component": "views/nested/menu1/menu1-2/menu1-2-2/index.vue",
                  "meta": {
                    "icon": "",
                    "title": "menu1-2-2",
                    "activeMenu": "",
                    "hidden": false,
                    "noCache": false,
                    "affix": false,
                    "alwaysShow": false
                  }
                }
              ],
              "id": 10028,
              "name": "Menu1-2",
              "parentId": 10026,
              "hierarchyPath": "10025.10026.10028",
              "path": "menu1-2",
              "redirect": "/nested/menu1/menu1-2/menu1-2-1",
              "component": "views/nested/menu1/menu1-2/index.vue",
              "meta": {
                "icon": "",
                "title": "menu1-2",
                "activeMenu": "",
                "hidden": false,
                "noCache": false,
                "affix": false,
                "alwaysShow": false
              }
            },
            {
              "children": null,
              "id": 10027,
              "name": "Menu1-1",
              "parentId": 10026,
              "hierarchyPath": "10025.10026.10027",
              "path": "menu1-1",
              "redirect": null,
              "component": "views/nested/menu1/menu1-1/index.vue",
              "meta": {
                "icon": "",
                "title": "menu1-1",
                "activeMenu": "",
                "hidden": false,
                "noCache": false,
                "affix": false,
                "alwaysShow": false
              }
            }
          ],
          "id": 10026,
          "name": "Menu1",
          "parentId": 10025,
          "hierarchyPath": "10025.10026",
          "path": "menu1",
          "redirect": "/nested/menu1/menu1-1",
          "component": "views/nested/menu1/index.vue",
          "meta": {
            "icon": "",
            "title": "menu1",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10032,
          "name": "Menu2",
          "parentId": 10025,
          "hierarchyPath": "10025.10032",
          "path": "menu2",
          "redirect": null,
          "component": "views/nested/menu2/index.vue",
          "meta": {
            "icon": "",
            "title": "menu2",
            "activeMenu": "",
            "hidden": false,
            "noCache": false,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10025,
      "name": "Nested",
      "parentId": null,
      "hierarchyPath": "10025",
      "path": "/nested",
      "redirect": "/nested/menu1",
      "component": "Layout",
      "meta": {
        "icon": "nested",
        "title": "nested",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": [
        {
          "children": null,
          "id": 10024,
          "name": "MixedChartDemo",
          "parentId": 10021,
          "hierarchyPath": "10021.10024",
          "path": "mixed-chart",
          "redirect": null,
          "component": "views/charts/mixed-chart.vue",
          "meta": {
            "icon": "",
            "title": "mixedChart",
            "activeMenu": "",
            "hidden": false,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10022,
          "name": "BarChartDemo",
          "parentId": 10021,
          "hierarchyPath": "10021.10022",
          "path": "bar-chart",
          "redirect": null,
          "component": "views/charts/bar-chart.vue",
          "meta": {
            "icon": "",
            "title": "barChart",
            "activeMenu": "",
            "hidden": false,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        },
        {
          "children": null,
          "id": 10023,
          "name": "LineChartDemo",
          "parentId": 10021,
          "hierarchyPath": "10021.10023",
          "path": "line-chart",
          "redirect": null,
          "component": "views/charts/line-chart.vue",
          "meta": {
            "icon": "",
            "title": "lineChart",
            "activeMenu": "",
            "hidden": false,
            "noCache": true,
            "affix": false,
            "alwaysShow": false
          }
        }
      ],
      "id": 10021,
      "name": "Charts",
      "parentId": null,
      "hierarchyPath": "10021",
      "path": "/charts",
      "redirect": "noredirect",
      "component": "Layout",
      "meta": {
        "icon": "chart",
        "title": "charts",
        "activeMenu": "",
        "hidden": false,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    },
    {
      "children": null,
      "id": 10066,
      "name": null,
      "parentId": null,
      "hierarchyPath": "10066",
      "path": "*",
      "redirect": "/404",
      "component": "",
      "meta": {
        "icon": "",
        "title": "",
        "activeMenu": "",
        "hidden": true,
        "noCache": false,
        "affix": false,
        "alwaysShow": false
      }
    }
  ]