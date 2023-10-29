<template>
  <div class="progress-bar" :style="{ opacity: show ? 1 : 0 }">
    <div class="progress-bar-value"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProgressBar',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.progress-bar {
  height: 3px;
  width: 100%;
  top: 0;
  position: fixed;
  overflow: hidden;
  background-color: var(--cp1);
}

.progress-bar-value {
  width: 100%;
  height: 100%;
  background-color: var(--cp2);
  animation: indeterminateAnimation 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminateAnimation {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
