import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/createuser',
    component: Layout,
    alwaysShow: true,
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/createuser'),
        name: '用户列表',
        meta: { title: '用户列表', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/createuser/create'),
        name: '创建用户',
        meta: { title: '创建用户', icon: 'edit', roles: ['2'] }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/student',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: '学生操作',
    meta: {
      title: '学生操作',
      icon: 'lock'
    },
    children: [
      {
        path: 'all',
        component: () => import('@/views/student/all'),
        name: '所有学生',
        meta: {
          title: '所有学生'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/student/add'),
        name: '添加学生',
        meta: {
          title: '添加学生',
          roles: ['2']
        }
      },
      {
        path: 'upload',
        component: () => import('@/views/student/upload-excel'),
        name: '上传表格',
        meta: {
          title: '上传表格'
        }
      },
      {
        path: 'exam',
        component: () => import('@/views/student/exam'),
        name: '考试',
        meta: {
          title: '考试'
        }
      }
    ]
  },

  {
    path: '/class',
    component: Layout,
    alwaysShow: true,
    name: '班级',
    meta: {
      title: '班级',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/class/list'),
        name: '班级列表',
        meta: { title: '班级列表', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/class/create'),
        name: '创建班级',
        meta: { title: '创建班级', icon: 'edit', roles: ['2'] }
      }
    ]
  },

  {
    path: '/headmaster',
    component: Layout,
    alwaysShow: true,
    name: '班主任',
    meta: { title: '班主任', icon: 'zip' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/headmaster/list'),
        name: '班主任列表',
        meta: { title: '班主任列表', icon: 'list' }
      },
      {
        path: 'add',
        component: () => import('@/views/headmaster/add'),
        name: '添加班主任',
        meta: { title: '添加班主任', icon: 'edit', roles: ['2'] }
      }
    ]
  },

  {
    path: '/market',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/market/index'),
        name: '市场部',
        meta: { title: '市场部', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ],
    hidden: true
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
