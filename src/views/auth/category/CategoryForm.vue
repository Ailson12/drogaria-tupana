<template>
  <div>
    <header-title :show-add="false" title="Formulário de categoria" />
    <card-component :loading="loading">
      <form-wrapper
        :ref="refForm"
        @submit="onFinish"
        :initial-values="{
          price: '0'
        }"
        :validation-schema="validationSchema"
      >
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
import TextField from '@/components/form/text-field/TextField.vue'
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
      loading: false
    }
  },
  methods: {
    onFinish() {
      //
    }
  }
})
</script>
