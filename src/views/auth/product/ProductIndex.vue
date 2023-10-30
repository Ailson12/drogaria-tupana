<template>
  <data-table
    :params="params"
    :total-items="pagingData.totalItems"
    :headers="headers"
    :items="pagingData.items"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ProductService } from '@/services/ProductService'
import { PageableService } from '@/services/PageableService'
import type { HeaderDataTableType } from '@/types/DataTableType'
import DataTable from '@/components/geral/data-table/DataTable.vue'

export default defineComponent({
  name: 'ProductIndex',
  components: {
    DataTable
  },
  setup() {
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

    const service = ProductService.init()

    return { headers, service }
  },
  mounted() {
    this.fetchProducts()
  },
  data() {
    return {
      pagingData: PageableService.receive(),
      params: PageableService.params()
    }
  },
  methods: {
    fetchProducts() {
      this.service
        .paginate(this.params)
        .then((data) => (this.pagingData = data))
        .catch(() => window.alert('Erro ao listar produtos'))
    }
  }
})
</script>
