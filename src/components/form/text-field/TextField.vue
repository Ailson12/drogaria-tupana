<template>
  <div class="group-form-item">
    <label :for="name">{{ label }}</label>
    <input
      v-if="isMoney"
      :value="value"
      :id="name"
      v-money3="DEFAULT_MONEY_SETTING"
      v-on="handlers"
    />
    <textarea
      v-else-if="isTextArea"
      v-on="handlers"
      :id="name"
      rows="5"
      v-bind="$attrs"
      :value="value"
    ></textarea>
    <input v-else v-on="handlers" :type="type" :id="name" :value="value" v-bind="$attrs" />
    <span class="message-error" :style="{ opacity: errorMessage?.length ? 1 : 0 }">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Money3Directive } from 'v-money3'
import { defineComponent, ref, toRef } from 'vue'
import { DEFAULT_MONEY_SETTING } from '@/constants/money.constant'

export default defineComponent({
  name: 'TextField',
  directives: {
    money3: Money3Directive
  },
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
      required: true
    },
    initialError: {
      type: String,
      required: false
    },
    mb: {
      type: String
    }
  },
  setup(props) {
    const { value, errorMessage, setErrors, handleChange, handleBlur } = useField<string>(
      toRef(props, 'name'),
      undefined,
      {
        validateOnValueUpdate: false
      }
    )

    if (props.initialError) {
      setErrors(props.initialError)
    }

    const handlers = ref({
      blur: handleBlur,
      input: handleChange
    })

    return { value, DEFAULT_MONEY_SETTING, handlers, errorMessage }
  },
  computed: {
    isMoney() {
      return this.type.includes('money')
    },
    isTextArea() {
      return this.type.includes('textarea')
    }
  }
})
</script>

<style scoped>
.group-form-item {
  margin-bottom: v-bind(mb);
}
</style>
<style scoped src="./text-field.css" />
