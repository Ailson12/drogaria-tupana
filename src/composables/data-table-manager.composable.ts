import { ref } from 'vue'
import router from '@/router'
import { toast } from '@/plugins/toast/toast'
import type { BaseService } from '@/services/base.service'
import { PageableService } from '@/services/pageable.service'
import type { PageableSend } from '@/types/geral/PaginationType'

type Params = {
  service: BaseService
  routeNameForm: string
}

export const useDataTableManager = (params: Params) => {
  const loading = ref<boolean>(false)
  const pagingParams = ref(PageableService.params())
  const pagingData = ref(PageableService.receive())

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
