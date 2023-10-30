<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            :style="{ textAlign: header.align ?? 'left' }"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            v-for="(header, indexHeader) in headers"
            :key="`${item[header.key]}_${indexHeader}`"
            :style="{ textAlign: header.align }"
          >
            {{ item[header.key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <footer>
      <p class="c3">{{ firstDisplayed }}-{{ lastViewed }} de {{ totalItems }}</p>
      <div>
        <img width="10" height="18" src="@/assets/icons/icon-paginator.svg" alt="icone paginacao" />
        <img width="10" height="18" src="@/assets/icons/icon-paginator.svg" alt="icone paginacao" />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import type { HeaderDataTableType } from '@/types/DataTableType'
import type { PageableSend } from '@/types/PaginationType'

export default defineComponent({
  name: 'DataTable',
  props: {
    params: {
      type: Object as PropType<PageableSend>,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    totalItems: {
      type: Number,
      default: 0
    },
    headers: {
      type: Array as PropType<HeaderDataTableType[]>,
      required: true
    },
    items: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => []
    }
  },
  computed: {
    firstDisplayed() {
      return this.lastViewed > 0 ? this.lastViewed - this.items.length + 1 : 0
    },
    lastViewed() {
      return (this.params._page - 1) * this.itemsPerPage + this.items.length
    }
  }
})
</script>

<style src="./data-table.css" scoped />
