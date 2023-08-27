<template>
  <div class="group-form-item">
    <label :for="name">{{ label }}</label>
    <input type="text" :id="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TextField',
  props: {
    label: {
      type: String
    },
    name: {
      type: String,
      default: ''
    },
    mb: {
      type: String
    }
  }
})
</script>

<style scoped>
.group-form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: v-bind(mb);
}

.group-form-item label {
  color: var(--c1);
  font-size: 1rem;
  margin-bottom: 4px;
}

.group-form-item input {
  outline: 0;
  font-size: 0.875rem;
  transition: 0.2s;
  border: 2px solid transparent;
  background-color: var(--c9);
  border-radius: 6px;
  color: var(--c1);
  padding: 0.75rem;
}

.group-form-item input:hover,
.group-form-item input:focus-visible {
  border-color: var(--cp2);
}
</style>
