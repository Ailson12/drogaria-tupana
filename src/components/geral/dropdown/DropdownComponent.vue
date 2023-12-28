<template>
  <div class="dropdown-wrapper">
    <custom-button
      type="button"
      class="dropdown-wrapper-button"
      @click="toggleVisible"
      size="small"
    >
      {{ title }}
    </custom-button>
    <ul :ref="refList" :class="{ 'contains-only-1': items?.length === 1 }" v-show="show">
      <li
        v-for="(item, index) in items"
        :key="`dropdown_key_${index}`"
        @click="
          () => {
            toggleVisible()
            item.callback()
          }
        "
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { debounce } from 'lodash'
import { generateUUID } from '@/helpers/uuid/uuid.helper'
import { type DropdownItemType } from './utils/DropdownItemType'
import CustomButton from '../custom-button/CustomButton.vue'
import { type PropType, defineComponent, type HTMLAttributes } from 'vue'

export default defineComponent({
  name: 'DropdownComponent',
  components: {
    CustomButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    maxWidth: {
      type: String,
      default: '120px'
    },
    items: {
      type: Array as PropType<DropdownItemType[]>,
      default: () => []
    }
  },
  setup() {
    const refList = generateUUID()
    return { refList }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    lisItems() {
      return this.$refs[this.refList] as null | HTMLAttributes
    }
  },
  mounted() {
    window.document.addEventListener('click', this.handleClickDocument())
  },
  unmounted() {
    window.document.removeEventListener('click', this.handleClickDocument())
  },
  methods: {
    handleClickDocument() {
      return debounce((event) => {
        if (!event.target.classList.contains('dropdown-wrapper-button')) {
          this.show = false
        }
      }, 100)
    },
    toggleVisible() {
      this.show = !this.show
    }
  }
})
</script>

<style scoped>
.dropdown-wrapper {
  max-width: v-bind(maxWidth);
}

.dropdown-wrapper > ul {
  position: absolute;
  z-index: 10;
  margin-top: 6px;
  max-width: v-bind(maxWidth);
  width: 100%;
  border-radius: 6px;
  box-shadow: 4px 4px 0.5rem var(--cp1);
}
</style>

<style src="./utils/dropdown-component.css" scoped />
