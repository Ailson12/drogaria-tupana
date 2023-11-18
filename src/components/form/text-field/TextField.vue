<template>
  <div class="group-form-item">
    <label :for="name">{{ label }}</label>
    <input v-if="isMoney" :value="value" :id="name" v-money3="moneyConfig" v-on="handlers" />
    <textarea v-else-if="isTextArea" v-on="handlers" :id="name" rows="5" v-bind="$attrs"></textarea>
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
    const { value, errorMessage, setErrors, handleChange, handleBlur } = useField(
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

    const moneyConfig = {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      precision: 2,
      masked: false
    }

    return { value, moneyConfig, handlers, errorMessage }
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

<style scoped src="./text-field.css" />
