/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐超
 * @Date: 2020-06-02 08:46:10
 * @LastEditors: 唐超
 * @LastEditTime: 2020-06-12 15:07:05
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '主页',
          icon: 'dashboard',
          affix: true,
        }
      }
    ]
  }
]

export const asyncRoutes = [

  {
    path: '/products_processes',
    component: Layout,
    name: '产品及工艺',
    meta: {
      title: '产品及工艺',
      icon: 'clipboard',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'cis',
        component: () => import('../views/products_processes/cis.vue'),
        name: 'CIS工艺指令',
        meta: {
          title: 'CIS工艺指令',
          icon: 'component'
        }
      },
      {
        path: 'processes',
        component: () => import('../views/products_processes/processes.vue'),
        name: '工序模块',
        meta: {
          title: '工序模块',
          icon: 'documentation'
        }
      },
      {
        path: 'use_instruction',
        component: () => import('../views/products_processes/use_instruction.vue'),
        name: '使用指令模板',
        meta: {
          title: '使用指令模板',
          icon: 'education'
        }
      },
      {
        path: 'process',
        component: () => import('../views/products_processes/process.vue'),
        name: '工序上下料时间',
        meta: {
          title: '工序上下料时间',
          icon: 'eye-open'
        }
      }
    ]
  },

  {
    path: '/resources_calendars',
    component: Layout,
    name: '资源及日历',
    meta: {
      title: '资源及日历',
      icon: 'international'
    },
    children: [
      {
        path: 'maintenance',
        component: () => import('../views/resources_calendars/maintenance.vue'),
        name: '机台维护',
        meta: {
          title: '机台维护',
          icon: 'shopping'
        }
      },
      {
        path: 'process_route',
        component: () => import('../views/resources_calendars/process_route.vue'),
        name: '工序路线',
        meta: {
          title: '工序路线',
          icon: 'theme'
        }
      },
      {
        path: 'capacity',
        component: () => import('../views/resources_calendars/capacity.vue'),
        name: '产能矩阵',
        meta: {
          title: '产能矩阵',
          icon: 'wechat'
        }
      },
      {
        path: 'menology',
        component: () => import('../views/resources_calendars/menology.vue'),
        name: '生成日历',
        meta: {
          title: '生成日历',
          icon: 'skill'
        }
      },
      {
        path: 'pattern',
        component: () => import('../views/resources_calendars/pattern.vue'),
        name: '出勤模式',
        meta: {
          title: '出勤模式',
          icon: 'peoples'
        }
      },
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
