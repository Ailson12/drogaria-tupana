import { loginRoutes } from './login.routes'
import { productRoutes } from './product.routes'
import { useAuthStore } from '@/stores/auth.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...productRoutes, ...loginRoutes]
})

router.beforeEach((to, _, next) => {
  const { isAuthenticated } = useAuthStore()
  const isLoginPage = to.fullPath.includes('login')

  const shouldRedirect = !isAuthenticated && !to.meta.isPublic
  const routeName = shouldRedirect
    ? 'login'
    : isAuthenticated && isLoginPage
    ? 'product.index'
    : null

  if (routeName) {
    next({ name: routeName })
  } else {
    next()
  }
})

export default router
