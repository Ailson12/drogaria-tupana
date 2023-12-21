<template>
  <div>
    <header-title :show-add="false" title="Formulário de produto" />
    <card-component :loading="basicFormManager.loading.value">
      <form-wrapper
        :ref="basicFormManager.form"
        @submit="basicFormManager.onFinish"
        :initial-values="{
          price: '0'
        }"
        :validation-schema="validationSchema"
      >
        <div class="row-1">
          <text-field label="Nome" name="name" />
          <text-field label="Preço" name="price" type="money" />
        </div>
        <text-field label="Descrição" name="description" type="textarea" />

        <custom-button :disabled="basicFormManager.loading.value" class="ml-auto d-flex">
          Salvar
        </custom-button>
      </form-wrapper>
    </card-component>
  </div>
</template>

<script lang="ts">
import { unformat } from 'v-money3'
import { defineComponent } from 'vue'
import { validationSchema } from './validation'
import { Form as FormWrapper } from 'vee-validate'
import { ProductService } from '@/services/product.service'
import { formatMoney } from '@/helpers/money/money.helper'
import { type ProductType } from '@/types/product/ProductType'
import TextField from '@/components/form/text-field/TextField.vue'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'
import CardComponent from '@/components/geral/card-component/CardComponent.vue'
import { useBasicFormManager } from '@/composables/basic-form-manager.composable'

export default defineComponent({
  name: 'ProductForm',
  components: {
    TextField,
    HeaderTitle,
    FormWrapper,
    CustomButton,
    CardComponent
  },
  setup() {
    const service = ProductService.init()

    const basicFormManager = useBasicFormManager<ProductType>({
      service,
      successfulSaveRoute: 'product.index',
      messages: {
        errorFindById: 'Produto não encontrado'
      },
      getRequestBody(data, entity) {
        return {
          ...data,
          price: unformat(data.price as string),
          created_at: entity?.created_at ?? new Date()
        }
      },
      fillEdition(entity) {
        return {
          name: entity.name,
          price: formatMoney(entity.price),
          description: entity.description
        }
      }
    })

    return {
      basicFormManager,
      validationSchema
    }
  }
})
</script>

<style scoped>
.row-1 {
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 1fr;
}

@media (max-width: 800px) {
  .row-1 {
    gap: 0 1rem;
    grid-template-columns: 1fr;
  }
}
</style>
