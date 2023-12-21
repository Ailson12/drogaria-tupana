<template>
  <div>
    <header-title :show-add="false" title="Formulário de categoria" />
    <card-component :loading="basicFormManager.loading.value">
      <form-wrapper
        :ref="basicFormManager.form"
        @submit="basicFormManager.onFinish"
        :validation-schema="validationSchema"
      >
        <text-field label="Nome" name="name" />
        <text-field label="Descrição" name="description" type="textarea" />

        <custom-button :disabled="basicFormManager.loading.value" class="ml-auto d-flex">
          Salvar
        </custom-button>
      </form-wrapper>
    </card-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { validationSchema } from './validation'
import { Form as FormWrapper } from 'vee-validate'
import { CategoryService } from '@/services/category.service'
import { type CategoryType } from '@/types/category/CategoryType'
import TextField from '@/components/form/text-field/TextField.vue'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'
import CardComponent from '@/components/geral/card-component/CardComponent.vue'
import { useBasicFormManager } from '@/composables/basic-form-manager.composable'

export default defineComponent({
  name: 'CategoryForm',
  components: {
    TextField,
    FormWrapper,
    HeaderTitle,
    CustomButton,
    CardComponent
  },
  setup() {
    const service = CategoryService.init()
    const basicFormManager = useBasicFormManager<CategoryType>({
      service,
      successfulSaveRoute: 'category.index',
      messages: {
        errorFindById: 'Categoria não encontrada'
      },
      fillEdition: (entity) => ({
        name: entity.name,
        description: entity.description
      }),
      getRequestBody: (data, entity) => ({
        ...data,
        created_at: entity?.created_at ?? new Date()
      })
    })

    return {
      validationSchema,
      basicFormManager
    }
  }
})
</script>
