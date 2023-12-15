<template>
  <div>
    <header-title :show-add="false" title="Formulário de categoria" />
    <card-component :loading="loading">
      <form-wrapper :ref="refForm" @submit="onFinish" :validation-schema="validationSchema">
        <text-field label="Nome" name="name" />
        <text-field label="Descrição" name="description" type="textarea" />

        <custom-button :disabled="loading" class="ml-auto d-flex">Salvar</custom-button>
      </form-wrapper>
    </card-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { validationSchema } from './validation'
import { Form as FormWrapper } from 'vee-validate'
import { generateUUID } from '@/helpers/uuid/uuid.helper'
import { CategoryService } from '@/services/category.service'
import { type CategoryType } from '@/types/category/CategoryType'
import TextField from '@/components/form/text-field/TextField.vue'
import type { FormWrapperType } from '@/types/geral/FormWrapperType'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'
import CardComponent from '@/components/geral/card-component/CardComponent.vue'

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

    return {
      service,
      validationSchema,
      refForm: generateUUID()
    }
  },
  data() {
    return {
      loading: false,
      category: null as null | CategoryType
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
      this.fetchCategoryById(this.id)
    }
  },
  watch: {
    category() {
      if (this.category) {
        this.form.setValues({
          name: this.category.name,
          description: this.category.description
        })
      }
    }
  },
  methods: {
    fetchCategoryById(id: string) {
      this.loading = true
      this.service
        .findById(id)
        .then((data) => (this.category = data))
        .catch(() => this.$toast.info('Categoria não encontrada'))
        .finally(() => (this.loading = false))
    },
    getRequestBody() {
      const values = this.form.getValues()

      return {
        ...values,
        created_at: this.category?.created_at ?? new Date()
      }
    },
    onFinish() {
      this.loading = true
      this.service
        .updateOrCreate(this.getRequestBody(), this.id)
        .then(() => {
          this.$toast.success('Categoria salva com sucesso')
          this.$router.push({
            name: 'category.index'
          })
        })
        .catch(() => this.$toast.error('Erro ao salvar categoria'))
        .finally(() => (this.loading = false))
    }
  }
})
</script>
