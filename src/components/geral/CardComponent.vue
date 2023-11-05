<template>
  <div class="card-component">
    <progress-bar :show="loading" position="absolute" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProgressBar from './ProgressBar.vue'

export default defineComponent({
  name: 'CardComponent',
  components: {
    ProgressBar
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.card-component {
  position: relative;
  background-color: var(--c11);
  padding: 1rem;
  border-radius: 6px;
}
</style>
