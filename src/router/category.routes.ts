import type { RouteRecordRaw } from 'vue-router'

const baseUrl = 'category'

export const categoryRoutes: RouteRecordRaw[] = [
  {
    path: `/${baseUrl}`,
    name: `${baseUrl}.index`,
    component: () => import('@/views/auth/category/CategoryIndex.vue')
  }
]
