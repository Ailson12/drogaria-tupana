<template>
  <div class="group-form-item">
    <label :for="name">{{ label }}</label>
    <textarea v-if="isTextArea" v-on="handlers" :id="name" rows="5" v-bind="$attrs"></textarea>
    <input v-else v-on="handlers" :type="type" :id="name" :value="value" v-bind="$attrs" />
    <span class="message-error" :style="{ opacity: errorMessage?.length ? 1 : 0 }">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { defineComponent, ref, toRef } from 'vue'

export default defineComponent({
  name: 'TextField',
  props: {
    type: {
      type: String,
      default: 'text'
    },
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
  },
  setup(props) {
    const { value, errorMessage, handleChange, handleBlur } = useField(
      toRef(props, 'name'),
      undefined,
      {
        validateOnValueUpdate: false
      }
    )

    const handlers = ref({
      blur: handleBlur,
      input: handleChange
    })

    return { value, handlers, errorMessage }
  },
  computed: {
    isTextArea() {
      return this.type.includes('textarea')
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
  cursor: pointer;
}

.group-form-item input,
.group-form-item textarea {
  outline: 0;
  font-size: 0.875rem;
  transition: 0.2s;
  border: 2px solid transparent;
  background-color: var(--c9);
  border-radius: 6px;
  color: var(--c1);
  padding: 10px;
}

.group-form-item textarea {
  resize: none;
}

.group-form-item textarea:hover,
.group-form-item input:hover,
.group-form-item input:focus-visible,
.group-form-item textarea :focus-visible {
  border-color: var(--cp2);
}

.message-error {
  opacity: 0;
  transition: 0.1s;
  color: #ff380b;
  margin-top: 2px;
  font-size: 12px;
  min-height: 22px;
}
</style>
