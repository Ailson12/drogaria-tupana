<template>
  <div class="benefit-card-wrapper">
    <img width="38" height="38" :src="icon" :alt="title" />
    <p class="c1">
      {{ title }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BenefitCard',
  props: {
    icon: {
      required: false,
      type: String
    },
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.benefit-card-wrapper {
  gap: 1rem;
  display: grid;
  padding: 6px 20px;
  border-radius: 6px;
  align-items: center;
  border: 2px dashed var(--cp2);
  grid-template-columns: auto 1fr;
}

.benefit-card-wrapper p {
  font-weight: 700;
  color: var(--c3);
  font-size: 1rem;
}
</style>
