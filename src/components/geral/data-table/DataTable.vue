<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key" :style="{ textAlign: header.align }">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            v-for="(header, indexHeader) in headers"
            :key="item[header.key] + indexHeader"
            :style="{ textAlign: header.align }"
          >
            {{ item[header.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'DataTable',
  props: {
    headers: {
      type: Array as PropType<HeaderDataTableType[]>,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style src="./data-table.css" scoped />
