<template>
  <button v-bind="$attrs" class="custom-button" :class="[size]">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    size: {
      type: String as PropType<'medium' | 'large' | 'small'>,
      default: 'medium'
    },
    radius: {
      type: String,
      default: '6px'
    }
  }
})
</script>

<style scoped src="./custom-button.css" />
<style scoped>
.custom-button {
  border-radius: v-bind(radius);
}
</style>
