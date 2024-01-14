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
        <text-field label="Nome" name="name" />
        <div class="row-1">
          <text-field label="Preço" name="price" type="money" />
          <select-field
            item-key="id"
            name="category"
            item-value="name"
            label="Categoria"
            :items="category.items"
            :loading="category.loading"
          />
        </div>
        <text-field label="Descrição" name="description" type="textarea" />

        <div class="row-1">
          <file-field ref="fileFieldRef" />
        </div>

        <custom-button
          class="ml-auto d-flex"
          style="margin-top: 1rem"
          :disabled="basicFormManager.loading.value"
        >
          Salvar
        </custom-button>
      </form-wrapper>
    </card-component>
  </div>
</template>

<script lang="ts">
import { unformat } from 'v-money3'
import { ref, defineComponent } from 'vue'
import { validationSchema } from './validation'
import { Form as FormWrapper } from 'vee-validate'
import { formatMoney } from '@/helpers/money/money.helper'
import { ProductService } from '@/services/product.service'
import { CategoryService } from '@/services/category.service'
import { type ProductType } from '@/types/product/ProductType'
import type { DataFormType } from '@/types/geral/CrudServiceType'
import type { CategoryType } from '@/types/category/CategoryType'
import TextField from '@/components/form/text-field/TextField.vue'
import SelectField from '@/components/form/select-field/SelectField.vue'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'
import CardComponent from '@/components/geral/card-component/CardComponent.vue'
import { useBasicFormManager } from '@/composables/basic-form-manager.composable'
import FileField, { type AttachmentType } from '@/components/form/file-field/FileField.vue'

export default defineComponent({
  name: 'ProductForm',
  components: {
    TextField,
    FileField,
    HeaderTitle,
    SelectField,
    FormWrapper,
    CustomButton,
    CardComponent
  },
  setup() {
    const fileFieldRef = ref<{ attachment: AttachmentType }>()
    const service = ProductService.init()
    const categoryService = CategoryService.init()

    const fillProductImage = (url: string) => {
      const extension = url.split(';')?.at(0)?.split('/')?.at(1)
      fetch(url)
        .then((response) => response.blob())
        .then((data) => {
          if (fileFieldRef.value) {
            fileFieldRef.value.attachment = {
              base64: url,
              name: `imagem.${extension}`,
              linkPreview: URL.createObjectURL(data)
            }
          }
        })
    }

    const basicFormManager = useBasicFormManager<ProductType>({
      service,
      successfulSaveRoute: 'product.index',
      messages: {
        errorFindById: 'Produto não encontrado'
      },
      getRequestBody(data, entity) {
        return {
          ...data,
          categoryId: data.category,
          price: unformat(data.price as string),
          created_at: entity?.created_at ?? new Date(),
          url_product_image: fileFieldRef.value?.attachment?.base64 ?? null
        }
      },
      fillEdition(entity) {
        if (entity.url_product_image) {
          fillProductImage(entity.url_product_image)
        }

        return {
          name: entity.name,
          category: entity.categoryId,
          price: formatMoney(entity.price),
          description: entity.description
        }
      }
    })

    return {
      fileFieldRef,
      categoryService,
      basicFormManager,
      validationSchema
    }
  },
  data() {
    return {
      category: {
        loading: false,
        items: [] as CategoryType[]
      }
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      this.category.loading = true
      this.categoryService
        .findAll()
        .then((data) => (this.category.items = data))
        .catch(() => this.$toast.error('Erro ao listar categorias'))
        .finally(() => (this.category.loading = false))
    }
  }
})
</script>

<style scoped>
.row-1 {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 800px) {
  .row-1 {
    gap: 0 1rem;
    grid-template-columns: 1fr;
  }
}
</style>
