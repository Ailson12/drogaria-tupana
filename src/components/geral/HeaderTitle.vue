<template>
  <div class="header-title-wrapper">
    <h1 class="c2">{{ title }}</h1>
    <custom-button v-show="showAdd" @click="add">Adicionar</custom-button>
  </div>
</template>

<script lang="ts">
import CustomButton from './CustomButton.vue'
import type { RouteLocationRaw } from 'vue-router'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'HeaderTitle',
  emits: ['add'],
  components: {
    CustomButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    routeAdd: {
      default: null,
      type: Object as PropType<RouteLocationRaw | null>
    },
    showAdd: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    add() {
      if (this.routeAdd) {
        this.$router.push(this.routeAdd)
      } else {
        this.$emit('add')
      }
    }
  }
})
</script>

<style scoped>
.header-title-wrapper h1 {
  font-size: 22px;
}

.header-title-wrapper {
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
