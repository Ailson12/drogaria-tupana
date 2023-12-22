import router from '@/router'
import { ref, type Ref } from 'vue'
import { toast } from '@/plugins/toast/toast'
import type { ModelType } from '@/types/geral/ModelType'
import { PageableService } from '@/services/pageable.service'
import type { CrudServiceType } from '@/types/geral/CrudServiceType'
import type { PageableReceiveType, PageableSend } from '@/types/geral/PaginationType'

type Params<E extends ModelType> = {
  service: CrudServiceType<E>
  routeNameForm: string
}

export const useDataTableManager = <E extends ModelType>(params: Params<E>) => {
  const loading = ref<boolean>(false)
  const pagingParams = ref(PageableService.params())
  const pagingData: Ref<PageableReceiveType<E>> = ref({
    items: [],
    totalPages: 0,
    totalItems: 0
  })

  const fetchData = () => {
    loading.value = true
    params.service
      .paginate(pagingParams.value)
      .then((data) => (pagingData.value = data))
      .catch(() => toast.error('Erro ao listar dados'))
      .finally(() => (loading.value = false))
  }

  const remove = (id: number) => {
    loading.value = true
    params.service
      .remove(id)
      .then(() => {
        toast.success('Removido com sucesso')
        fetchData()
      })
      .catch(() => toast.error('Erro ao remover.'))
      .finally(() => (loading.value = false))
  }

  const edit = (id: number) => {
    router.push({
      name: params.routeNameForm,
      params: {
        id
      }
    })
  }

  const actions = {
    edit,
    remove
  }

  const setParams = (data: PageableSend) => (pagingParams.value = data)

  return {
    actions,
    loading,
    fetchData,
    setParams,
    pagingData,
    params: pagingParams
  }
}
