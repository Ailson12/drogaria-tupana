import { generateCrudBasicRoutes } from '@/helpers/route/route.helper'

export const categoryRoutes = generateCrudBasicRoutes({
  baseUrl: 'category',
  components: {
    form: import('@/views/auth/category/CategoryForm.vue'),
    index: import('@/views/auth/category/CategoryIndex.vue')
  }
})
