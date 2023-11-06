<template>
  <div>
    <header-title :show-add="false" title="Formulário de produto" />
    <card-component :loading="loading">
      <form-wrapper :ref="refForm" @submit="onFinish" :validation-schema="validationSchema">
        <div class="row-1">
          <text-field label="Nome" name="name" />
          <text-field label="Preço" name="price" type="number" />
        </div>
        <text-field label="Descrição" name="description" type="textarea" />

        <custom-button class="ml-auto d-flex">Salvar</custom-button>
      </form-wrapper>
    </card-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { validationSchema } from './validation'
import { Form as FormWrapper } from 'vee-validate'
import { generateUUID } from '@/helpers/uuid.helper'
import TextField from '@/components/form/TextField.vue'
import HeaderTitle from '@/components/geral/HeaderTitle.vue'
import CustomButton from '@/components/geral/CustomButton.vue'
import CardComponent from '@/components/geral/CardComponent.vue'
import { ProductService } from '@/services/ProductService'

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
    return {
      validationSchema,
      refForm: generateUUID()
    }
  },
  data() {
    return {
      loading: false,
      service: ProductService.init()
    }
  },
  methods: {
    onFinish(values: Record<string, unknown>) {
      this.loading = true
      this.service
        .create(values)
        .then(() => {
          this.$toast.success('Produto salvo com sucesso')
          this.$router.push({
            name: 'product.index'
          })
        })
        .catch(() => this.$toast.error('Erro ao salvar produto'))
        .finally(() => (this.loading = false))
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
@/helpers/uuid/uuid.helper
