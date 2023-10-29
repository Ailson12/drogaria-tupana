<template>
  <data-table :headers="headers" :items="items" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from '@/components/geral/data-table/DataTable.vue'
import type { HeaderDataTableType } from '@/types/DataTableType'

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

    return { headers }
  },
  data() {
    return {
      items: [
        {
          price: 'R$ 5,00',
          created_at: '04/12/2022',
          name: 'Dipirona Monoidratada',
          description: 'Este medicamento é indicado como analgésico'
        },
        {
          price: 'R$ 15,00',
          created_at: '04/12/2022',
          name: 'Amoxilina',
          description: 'auxilia no tratamento de uma gama de infecções'
        }
      ]
    }
  }
})
</script>
