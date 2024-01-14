import { useAuthStore } from '@/stores/auth.store'
import type { RouteRecordRaw } from 'vue-router'

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      isPublic: true
    },
    beforeEnter(...props) {
      const next = props[2]
      const { isAuthenticated } = useAuthStore()
      if (isAuthenticated) {
        next({
          name: 'product.index'
        })
      } else {
        next()
      }
    },
    component: () => import('@/views/public/site/SiteIndex.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isPublic: true
    },
    component: () => import('@/views/public/login/LoginPage.vue')
  }
]
