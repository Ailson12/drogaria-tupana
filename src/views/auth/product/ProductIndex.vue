<template>
  <div>
    <header-title title="Produtos" :route-add="{ name: 'product.form' }" />
    <data-table
      :headers="headers"
      :loading="loading"
      :pagingData="pagingData"
      :params="params"
      @reload-data="fetchProducts"
      @update-params="params = $event"
    >
      <template #actions="{ row }">
        <dropdown-component
          title="Ações"
          :items="[
            {
              title: 'Editar',
              callback: () => edit(row.id)
            },
            {
              title: 'Excluir',
              callback: () => {
                $toast.question('Deseja remover este produto?', () => remove(row.id))
              }
            }
          ]"
        />
      </template>
      <template #price="{ item }">
        {{ formatMoney(item.value) }}
      </template>
      <template #created_at="{ item }">
        {{ creationDateFormatter(item.value) }}
      </template>
    </data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatMoney } from '@/helpers/money/money.helper'
import { ProductService } from '@/services/product.service'
import { PageableService } from '@/services/pageable.service'
import { creationDateFormatter } from '@/helpers/date/date.helper'
import DataTable from '@/components/geral/data-table/DataTable.vue'
import type { HeaderDataTableType } from '@/types/geral/DataTableType'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import DropdownComponent from '@/components/geral/dropdown/DropdownComponent.vue'

export default defineComponent({
  name: 'ProductIndex',
  components: {
    DataTable,
    HeaderTitle,
    DropdownComponent
  },
  setup() {
    const service = ProductService.init()
    const headers: HeaderDataTableType[] = [
      {
        title: 'Ações',
        key: 'actions',
        width: '50px',
        align: 'center'
      },
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

    return { headers, service }
  },
  mounted() {
    this.fetchProducts()
  },
  data() {
    return {
      loading: false,
      params: PageableService.params(),
      pagingData: PageableService.receive()
    }
  },
  methods: {
    formatMoney,
    creationDateFormatter,
    edit(id: number) {
      this.$router.push({
        name: 'product.form',
        params: {
          id
        }
      })
    },
    remove(id: number) {
      this.loading = true
      this.service
        .remove(id)
        .then(() => {
          this.$toast.success('Produto removido com sucesso')
          this.fetchProducts()
        })
        .catch(() => this.$toast.error('Erro ao remover produto.'))
        .finally(() => (this.loading = false))
    },
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
@/services/pageable.service @/services/product.service
