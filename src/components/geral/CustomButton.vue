<template>
  <button v-bind="$attrs" class="custom-button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CustomButton'
})
</script>

<style scoped>
.custom-button {
  text-transform: uppercase;
  outline: 1px solid transparent;
  border: 2px solid transparent;
  transition: 0.2s;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
  color: var(--cp1);
  padding: 10px 24px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  background-color: var(--cp6);
}

.custom-button:hover,
.custom-button:focus-visible {
  outline-color: var(--c1);
  border-color: var(--cp1);
}
</style>
