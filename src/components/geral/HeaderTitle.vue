<template>
  <div class="header-title-wrapper">
    <h1 class="c2">{{ title }}</h1>
    <custom-button>Adicionar</custom-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomButton from './CustomButton.vue'

export default defineComponent({
  name: 'HeaderTitle',
  components: {
    CustomButton
  },
  props: {
    title: {
      type: String,
      required: true
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
