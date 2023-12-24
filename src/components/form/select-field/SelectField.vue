<template>
  <div class="group-form-item">
    <label>{{ label }}</label>
    <select v-on="handlers" :value="value">
      <option v-for="item in items" :key="`key_${item[itemKey]}`" :value="item[itemKey]">
        <div style="padding: 1rem">
          {{ item[itemValue] }}
        </div>
      </option>
    </select>
    <div class="loading-wrapper">
      <spinner-component :loading="loading" />
    </div>
    <span class="message-error" :style="{ opacity: errorMessage?.length ? 1 : 0 }">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { defineComponent, toRef, type PropType, ref } from 'vue'
import SpinnerComponent from '@/components/geral/spinner/SpinnerComponent.vue'

export default defineComponent({
  name: 'SelectField',
  components: {
    SpinnerComponent
  },
  props: {
    itemKey: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    itemValue: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    items: {
      type: Array as PropType<Array<Record<string, unknown>>>,
      required: true
    }
  },
  setup(props) {
    const { value, errorMessage, handleChange, handleBlur } = useField<string>(
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
  }
})
</script>

<style scoped src="../text-field/text-field.css" />
<style scoped>
.group-form-item {
  position: relative;
}
option {
  font-size: 1rem;
}
.loading-wrapper {
  position: absolute;
  bottom: 1.65rem;
  right: 1.75rem;
}
</style>
