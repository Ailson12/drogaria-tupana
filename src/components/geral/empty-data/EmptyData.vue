<template>
  <div class="empty-data-wrapper">
    <img width="100" height="100" src="@/assets/icons/icon-inbox.svg" alt="empty icon" />
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'EmptyData',
  props: {
    text: {
      type: String,
      default: 'Sem dados'
    }
  }
})
</script>

<style scoped>
.empty-data-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
