<template>
  <div>
    <header-title title="Produtos" :route-add="{ name: 'product.form' }" />
    <data-table
      :params="params"
      :total-items="pagingData.totalItems"
      :headers="headers"
      :loading="loading"
      :items="pagingData.items"
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
import { formatMoney } from '@/helpers/money.helper'
import { ProductService } from '@/services/ProductService'
import { PageableService } from '@/services/PageableService'
import HeaderTitle from '@/components/geral/HeaderTitle.vue'
import type { HeaderDataTableType } from '@/types/DataTableType'
import DataTable from '@/components/geral/data-table/DataTable.vue'

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
        key: 'name'
      },
      {
        title: 'Descrição',
        key: 'description'
      },
      {
        title: 'Preço',
        key: 'price'
      },
      {
        title: 'Data de criação',
        key: 'created_at'
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
      pagingData: PageableService.receive(),
      params: PageableService.params()
    }
  },
  methods: {
    fetchProducts() {
      this.loading = true
      this.service
        .paginate(this.params)
        .then((data) => (this.pagingData = data))
        .catch(() => this.$toast.error('Erro ao listar produtos'))
        .finally(() => (this.loading = false))
    }
  }
})
</script>
