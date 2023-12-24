<template>
  <span v-show="loading" class="loader"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SpinnerComponent',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 24
    },
    borderSize: {
      type: Number,
      default: 3
    }
  },
  computed: {
    sizeFormatted() {
      return `${this.size / 16}rem`
    },
    borderSizeFormatted() {
      return `${this.borderSize / 16}rem`
    }
  }
})
</script>

<style scoped>
.loader {
  width: v-bind(sizeFormatted);
  height: v-bind(sizeFormatted);
  border: v-bind(borderSizeFormatted) solid #fff;
  border-bottom-color: var(--cp4);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
