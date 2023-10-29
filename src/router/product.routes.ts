import type { RouteRecordRaw } from 'vue-router'

export const productRoutes: RouteRecordRaw[] = [
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/auth/product/ProductIndex.vue')
  }
]
