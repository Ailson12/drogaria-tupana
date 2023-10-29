import { loginRoutes } from './login.routes'
import { productRoutes } from './product.routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...productRoutes, ...loginRoutes]
})

export default router
