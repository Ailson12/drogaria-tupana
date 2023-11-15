<template>
  <card-component :loading="loading">
    <div class="data-table-wrapper">
      <div>
        <table>
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                :style="{
                  width: header.width,
                  minWidth: header.minWidth,
                  textAlign: header.align ?? 'left'
                }"
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
                :style="{ textAlign: header.align, width: header.width, minWidth: header.minWidth }"
              >
                <slot
                  v-if="slotNames.includes(header.key)"
                  :name="header.key"
                  :item="{ value: item[header.key] }"
                />
                <div v-else>
                  {{ item[header.key] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer>
        <p class="c3">{{ firstDisplayed }}-{{ lastViewed }} de {{ pagingData.totalItems }}</p>
        <div>
          <img
            width="10"
            height="18"
            @click="previous"
            data-control="previous"
            src="@/assets/icons/icon-paginator.svg"
            alt="icone paginacao"
          />
          <img
            width="10"
            height="18"
            @click="next"
            data-control="next"
            src="@/assets/icons/icon-paginator.svg"
            alt="icone paginacao"
          />
        </div>
      </footer>
    </div>
  </card-component>
</template>

<script lang="ts">
import { uniqBy } from 'lodash'
import { type PropType, defineComponent } from 'vue'
import CardComponent from '../card-component/CardComponent.vue'
import type { HeaderDataTableType } from '@/types/DataTableType'
import type { PageableReceiveType, PageableSend } from '@/types/PaginationType'

export default defineComponent({
  name: 'DataTable',
  emits: ['change-page'],
  components: {
    CardComponent
  },
  props: {
    pagingData: {
      required: true,
      type: Object as PropType<PageableReceiveType>
    },
    limit: {
      type: Number,
      default: 15
    },
    headers: {
      type: Array as PropType<HeaderDataTableType[]>,
      required: true,
      validator(value: HeaderDataTableType[]) {
        const valuesUnique = uniqBy(value, 'key')
        return valuesUnique.length === value.length
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    slotNames() {
      return Object.keys(this.$slots)
    },
    firstDisplayed() {
      return this.lastViewed > 0 ? this.lastViewed - this.items.length + 1 : 0
    },
    lastViewed() {
      return (this.page - 1) * this.limit + this.items.length
    },
    items() {
      return this.pagingData.items
    }
  },
  methods: {
    getNewPage(): PageableSend {
      return {
        _page: this.page,
        _limit: this.limit
      }
    },
    reloadChangePage(): void {
      this.$emit('change-page', this.getNewPage())
    },
    next(): void {
      if (this.page < this.pagingData.totalPages) {
        this.page += 1
        this.reloadChangePage()
      }
    },
    previous(): void {
      if (this.page > 1) {
        this.page -= 1
        this.reloadChangePage()
      }
    }
  }
})
</script>

<style src="./data-table.css" scoped />
