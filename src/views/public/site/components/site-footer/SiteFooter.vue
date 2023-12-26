<template>
  <footer class="footer-wrapper">
    <p class="c4">Alguns direitos reservados</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SiteFooter'
})
</script>

<style scoped>
.footer-wrapper {
  padding: 30px;
  border-top: 1px solid var(--c10);
  text-align: center;
  background-color: var(--c12);
}
</style>
