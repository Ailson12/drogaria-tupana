import type { RouteRecordRaw } from 'vue-router'

const baseUrl = 'product'

export const productRoutes: RouteRecordRaw[] = [
  {
    path: `/${baseUrl}`,
    name: `${baseUrl}.index`,
    component: () => import('@/views/auth/product/ProductIndex.vue')
  },
  {
    path: `/${baseUrl}/form/:id?`,
    name: `${baseUrl}.form`,
    component: () => import('@/views/auth/product/ProductForm.vue')
  }
]
