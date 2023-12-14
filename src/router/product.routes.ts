import { generateCrudBasicRoutes } from '@/helpers/route/route.helper'

export const productRoutes = generateCrudBasicRoutes({
  baseUrl: 'product',
  components: {
    form: import('@/views/auth/product/ProductForm.vue'),
    index: import('@/views/auth/product/ProductIndex.vue')
  }
})
