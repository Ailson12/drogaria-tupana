import { computed } from 'vue'
import { useRouter } from 'vue-router'

export const useParamsRoute = () => {
  const { currentRoute } = useRouter()

  const currentId = computed<string | undefined>(() => currentRoute.value.params?.id as string)

  return {
    currentId
  }
}
