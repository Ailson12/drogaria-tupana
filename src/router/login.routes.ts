import type { RouteRecordRaw } from 'vue-router'

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      isPublic: true
    },
    component: () => import('@/views/public/login/LoginPage.vue')
  }
]
