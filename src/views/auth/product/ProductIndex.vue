<template>
  <div>
    <header-title title="Produtos" :route-add="{ name: 'product.form' }" />
    <data-table
      :headers="headers"
      :loading="loading"
      :pagingData="pagingData"
      @change-page="fetchProducts"
    >
      <template #price="{ item }">
        {{ formatMoney(item.value) }}
      </template>
      <template #created_at="{ item }">
        {{ new Date(item.value).toLocaleString() }}
      </template>
    </data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatMoney } from '@/helpers/money/money.helper'
import { ProductService } from '@/services/ProductService'
import type { PageableSend } from '@/types/PaginationType'
import { PageableService } from '@/services/PageableService'
import type { HeaderDataTableType } from '@/types/DataTableType'
import DataTable from '@/components/geral/data-table/DataTable.vue'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'

export default defineComponent({
  name: 'ProductIndex',
  components: {
    DataTable,
    HeaderTitle
  },
  setup() {
    const service = ProductService.init()
    const headers: HeaderDataTableType[] = [
      {
        title: 'Nome',
        key: 'name',
        minWidth: '180px'
      },
      {
        title: 'Descrição',
        key: 'description',
        minWidth: '180px'
      },
      {
        title: 'Preço',
        key: 'price',
        width: '150px'
      },
      {
        title: 'Data de criação',
        key: 'created_at',
        width: '200px'
      }
    ]

    return { headers, service, formatMoney }
  },
  mounted() {
    this.fetchProducts()
  },
  data() {
    return {
      loading: false,
      pagingData: PageableService.receive()
    }
  },
  methods: {
    fetchProducts(params?: PageableSend) {
      this.loading = true
      this.service
        .paginate(params)
        .then((data) => (this.pagingData = data))
        .catch(() => this.$toast.error('Erro ao listar produtos'))
        .finally(() => (this.loading = false))
    }
  }
})
</script>
