<template>
  <div>
    <header-title title="Categoria" :route-add="{ name: 'category.form' }" />
    <data-table
      :headers="headers"
      :loading="loading"
      :pagingData="pagingData"
      :params="params"
      @reload-data="fetchCategories"
      @update-params="params = $event"
    >
      <template #actions="{ row }">
        <dropdown-component
          title="Ações"
          :items="[
            {
              title: 'Editar',
              callback: () => console.log(row.id)
            },
            {
              title: 'Excluir',
              callback: () => {
                $toast.question('Deseja remover esta categoria?', () => console.log(row.id))
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
import { PageableService } from '@/services/PageableService'
import { CategoryService } from '@/services/category.service'
import DataTable from '@/components/geral/data-table/DataTable.vue'
import { creationDateFormatter } from '@/helpers/date/date.helper'
import type { HeaderDataTableType } from '@/types/geral/DataTableType'
import HeaderTitle from '@/components/geral/header-title/HeaderTitle.vue'
import DropdownComponent from '@/components/geral/dropdown/DropdownComponent.vue'

export default defineComponent({
  name: 'CategoryIndex',
  components: {
    DataTable,
    HeaderTitle,
    DropdownComponent
  },
  setup() {
    const service = CategoryService.init()
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
      service,
      headers
    }
  },
  data() {
    return {
      loading: false,
      params: PageableService.params(),
      pagingData: PageableService.receive()
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    creationDateFormatter,
    fetchCategories() {
      this.loading = true
      this.service
        .paginate(this.params)
        .then((data) => (this.pagingData = data))
        .catch(() => this.$toast.error('Erro ao listar categorias'))
        .finally(() => (this.loading = false))
    }
  }
})
</script>
