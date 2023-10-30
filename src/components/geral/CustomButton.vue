<template>
  <button v-bind="$attrs" class="custom-button" :class="{ [size]: size }">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    size: {
      type: String as PropType<'medium' | 'large'>,
      default: 'medium'
    }
  }
})
</script>

<style scoped>
.custom-button {
  text-transform: uppercase;
  outline: 1px solid transparent;
  border: 2px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  font-weight: 700;
  color: var(--cp1);
  border-radius: 6px;
  letter-spacing: 0.5px;
  background-color: var(--cp6);
}

.custom-button.large {
  font-size: 1rem;
  padding: 10px 24px;
}

.custom-button.medium {
  font-size: 14px;
  padding: 8px 20px;
}

.custom-button:hover,
.custom-button:focus-visible {
  outline-color: var(--c1);
  border-color: var(--cp1);
}
</style>
