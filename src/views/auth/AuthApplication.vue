<template>
  <div class="app-wrapper">
    <nav-bar />
    <div class="content-page">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'

export default defineComponent({
  name: 'AuthApplication',
  components: {
    NavBar
  }
})
</script>

<style scoped>
.app-wrapper {
  background-color: var(--c12);
  min-height: 100vh;
}

.app-wrapper .content-page {
  padding: 40px;
}
</style>
