import type { RouteRecordRaw } from 'vue-router'

const baseUrl = 'category'

export const categoryRoutes: RouteRecordRaw[] = [
  {
    path: `/${baseUrl}`,
    name: `${baseUrl}.index`,
    component: () => import('@/views/auth/category/CategoryIndex.vue')
  },
  {
    path: `/${baseUrl}/form`,
    name: `${baseUrl}.form`,
    component: () => import('@/views/auth/category/CategoryForm.vue')
  }
]
