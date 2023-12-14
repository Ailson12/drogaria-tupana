<template>
  <div>
    <header-title :show-add="false" title="Formulário de produto" />
    <card-component :loading="loading">
      <form-wrapper
        :ref="refForm"
        @submit="onFinish"
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

        <custom-button :disabled="loading" class="ml-auto d-flex">Salvar</custom-button>
      </form-wrapper>
    </card-component>
  </div>
</template>

<script lang="ts">
import { unformat } from 'v-money3'
import { defineComponent } from 'vue'
import { validationSchema } from './validation'
import { Form as FormWrapper } from 'vee-validate'
import { generateUUID } from '@/helpers/uuid/uuid.helper'
import { ProductService } from '@/services/ProductService'
import { formatMoney } from '@/helpers/money/money.helper'
import { type ProductType } from '@/types/product/ProductType'
import type { FormWrapperType } from '@/types/geral/FormWrapperType'
import TextField from '@/components/form/text-field/TextField.vue'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'
import CardComponent from '@/components/geral/card-component/CardComponent.vue'

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

    return {
      service,
      validationSchema,
      refForm: generateUUID()
    }
  },
  data() {
    return {
      loading: false,
      product: null as null | ProductType
    }
  },
  computed: {
    form() {
      return this.$refs[this.refForm] as FormWrapperType
    },
    id() {
      return this.$route.params.id as string | undefined
    }
  },
  mounted() {
    if (this.id) {
      this.fetchProductById(this.id)
    }
  },
  watch: {
    product() {
      if (this.product) {
        this.form.setValues({
          name: this.product.name,
          price: formatMoney(this.product.price),
          description: this.product.description
        })
      }
    }
  },
  methods: {
    fetchProductById(id: string) {
      this.loading = true
      this.service
        .findById(id)
        .then((data) => (this.product = data))
        .catch(() => this.$toast.info('Produto não encontrado'))
        .finally(() => (this.loading = false))
    },
    getRequestBody() {
      const values = this.form.getValues()

      return {
        ...values,
        price: unformat(values.price as string),
        created_at: this.product?.created_at ?? new Date()
      }
    },
    onFinish() {
      this.loading = true
      this.service
        .updateOrCreate(this.getRequestBody(), this.id)
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
@/types/geral/FormWrapperType
