import type { RouteComponent, RouteRecordRaw } from 'vue-router'

type Params = {
  baseUrl: string
  components: {
    index: Promise<RouteComponent>
    form: Promise<RouteComponent>
  }
}

export const generateCrudBasicRoutes = (params: Params) => {
  return [
    {
      path: `/${params.baseUrl}`,
      name: `${params.baseUrl}.index`,
      component: () => params.components.index
    },
    {
      path: `/${params.baseUrl}/form/:id?`,
      name: `${params.baseUrl}.form`,
      component: () => params.components.form
    }
  ] satisfies RouteRecordRaw[]
}
