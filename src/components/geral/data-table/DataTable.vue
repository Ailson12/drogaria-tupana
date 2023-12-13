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
            <tr v-show="!items.length">
              <td :colspan="headers.length">
                <empty-data />
              </td>
            </tr>
            <tr v-for="(item, index) in items" :key="index">
              <td
                v-for="(header, indexHeader) in headers"
                :key="`${item[header.key]}_${indexHeader}`"
                :style="{
                  textAlign: header.align,
                  width: header.width,
                  minWidth: header.minWidth
                }"
              >
                <slot
                  v-if="slotNames.includes(header.key)"
                  :name="header.key"
                  :row="item"
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
import { PageableService } from '@/services/PageableService'
import CardComponent from '../card-component/CardComponent.vue'
import type { HeaderDataTableType } from '@/types/DataTableType'
import EmptyData from '@/components/geral/empty-data/EmptyData.vue'
import type { PageableReceiveType, PageableSend } from '@/types/PaginationType'

export default defineComponent({
  name: 'DataTable',
  emits: ['update-params', 'reload-data'],
  components: {
    EmptyData,
    CardComponent
  },
  props: {
    params: {
      type: Object as PropType<PageableSend>,
      default: () => PageableService.params()
    },
    pagingData: {
      required: true,
      type: Object as PropType<PageableReceiveType>
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
  computed: {
    slotNames() {
      return Object.keys(this.$slots)
    },
    firstDisplayed() {
      return this.lastViewed > 0 ? this.lastViewed - this.items.length + 1 : 0
    },
    lastViewed() {
      return (this.page - 1) * this.params._limit + this.items.length
    },
    items() {
      return this.pagingData.items
    },
    page() {
      return this.params._page
    }
  },
  watch: {
    pagingData() {
      if (this.page > this.pagingData.totalPages) {
        this.previous()
      }
    }
  },
  methods: {
    getNewPage(): PageableSend {
      return {
        _page: this.page,
        _limit: this.params._limit
      }
    },
    updateParams(page: number): void {
      this.$emit('update-params', {
        ...this.params,
        _page: page
      })
    },
    reloadData() {
      this.$emit('reload-data')
    },
    next(): void {
      if (this.page < this.pagingData.totalPages) {
        this.updateParams(this.page + 1)
        this.reloadData()
      }
    },
    previous(): void {
      if (this.page > 1) {
        this.updateParams(this.page - 1)
        this.reloadData()
      }
    }
  }
})
</script>

<style src="./data-table.css" scoped />
