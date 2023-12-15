<template>
  <div>
    <header-title title="Produtos" :route-add="{ name: routeNameForm }" />
    <data-table
      :headers="headers"
      :params="dataTableManager.params.value"
      @reload-data="dataTableManager.fetchData"
      :loading="dataTableManager.loading.value"
      :pagingData="dataTableManager.pagingData.value"
      @update-params="(value) => dataTableManager.setParams(value)"
    >
      <template #actions="{ row }">
        <dropdown-component
          title="Ações"
          :items="[
            {
              title: 'Editar',
              callback: () => dataTableManager.actions.edit(row.id)
            },
            {
              title: 'Excluir',
              callback: () => {
                $toast.question('Deseja remover este produto?', () =>
                  dataTableManager.actions.remove(row.id)
                )
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
import { creationDateFormatter } from '@/helpers/date/date.helper'
import DataTable from '@/components/geral/data-table/DataTable.vue'
import type { HeaderDataTableType } from '@/types/geral/DataTableType'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import DropdownComponent from '@/components/geral/dropdown/DropdownComponent.vue'
import { useDataTableManager } from '@/composables/data-table-manager.composable'

export default defineComponent({
  name: 'ProductIndex',
  components: {
    DataTable,
    HeaderTitle,
    DropdownComponent
  },
  setup() {
    const routeNameForm = 'product.form'
    const dataTableManager = useDataTableManager({
      routeNameForm,
      service: ProductService.init()
    })

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

    return { headers, routeNameForm, dataTableManager }
  },
  mounted() {
    this.dataTableManager.fetchData()
  },
  methods: {
    formatMoney,
    creationDateFormatter
  }
})
</script>
