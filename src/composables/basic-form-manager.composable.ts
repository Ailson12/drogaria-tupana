import router from '@/router'
import { onMounted, ref, watch } from 'vue'
import { toast } from '@/plugins/toast/toast'
import { useParamsRoute } from './params-route.composable'
import type { FormWrapperType } from '@/types/geral/FormWrapperType'
import type { CrudServiceType, DataFormType } from '@/types/geral/CrudServiceType'

type Params<E> = {
  service: CrudServiceType
  messages: {
    errorFindById: string
  }
  successfulSaveRoute: string
  fillEdition(entity: E): DataFormType
  getRequestBody(data: DataFormType, entity?: E): DataFormType
}

export const useBasicFormManager = <E>(params: Params<E>) => {
  const { currentId } = useParamsRoute()

  const loading = ref(false)
  const entity = ref<E>()
  const form = ref<FormWrapperType>()

  const fetchEntityById = (id: string) => {
    loading.value = true
    params.service
      .findById(id)
      .then((data) => (entity.value = data as E))
      .catch(() => toast.info(params.messages.errorFindById))
      .finally(() => (loading.value = false))
  }

  const onFinish = () => {
    if (!form.value) {
      console.warn('form not defined')
      return
    }

    const dataForm = params.getRequestBody(form.value.getValues())

    loading.value = true
    params.service
      .updateOrCreate(dataForm, currentId.value)
      .then(() => {
        toast.success('Informações salvas com sucesso')
        router.push({
          name: params.successfulSaveRoute
        })
      })
      .catch(() => toast.error('Erro ao salvar informações'))
      .finally(() => (loading.value = false))
  }

  watch(entity, () => {
    if (entity.value) {
      const data = params.fillEdition(entity.value)
      form.value?.setValues(data)
    }
  })

  onMounted(() => {
    if (currentId.value) {
      fetchEntityById(currentId.value)
    }
  })

  return {
    form,
    loading,
    onFinish
  }
}
