<template>
  <div>
    <header-title title="Categoria" :route-add="{ name: 'category.form' }" />
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
                $toast.question('Deseja remover esta categoria?', () =>
                  dataTableManager.actions.remove(row.id)
                )
              }
            }
          ]"
        />
      </template>
      <template #created_at="{ item }">
        {{ creationDateFormatter(item.value) }}
      </template>
    </data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CategoryService } from '@/services/category.service'
import DataTable from '@/components/geral/data-table/DataTable.vue'
import { creationDateFormatter } from '@/helpers/date/date.helper'
import type { HeaderDataTableType } from '@/types/geral/DataTableType'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import DropdownComponent from '@/components/geral/dropdown/DropdownComponent.vue'
import { useDataTableManager } from '@/composables/data-table-manager.composable'

export default defineComponent({
  name: 'CategoryIndex',
  components: {
    DataTable,
    HeaderTitle,
    DropdownComponent
  },
  setup() {
    const routeNameForm = 'category.form'
    const dataTableManager = useDataTableManager({
      routeNameForm,
      service: CategoryService.init()
    })

    const headers: HeaderDataTableType[] = [
      {
        title: 'Ações',
        key: 'actions',
        width: '80px',
        align: 'center'
      },
      {
        title: 'Nome',
        key: 'name',
        minWidth: '180px'
      },
      {
        title: 'Data de criação',
        key: 'created_at',
        align: 'center',
        width: '200px'
      }
    ]

    return {
      headers,
      routeNameForm,
      dataTableManager
    }
  },
  mounted() {
    this.dataTableManager.fetchData()
  },
  methods: {
    creationDateFormatter
  }
})
</script>
