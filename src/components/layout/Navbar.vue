<template>
  <div class="navbar-wrapper">
    <img src="@/assets/icons/menu.svg" width="28" height="28" alt="icon menu" />
    <img src="@/assets/icons/icon-logout.svg" width="28" height="28" alt="icon logout" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NavBar'
})
</script>

<style scoped>
.navbar-wrapper {
  padding: 24px 40px;
  display: flex;
  background: var(--c11);
  justify-content: space-between;
}

.navbar-wrapper img {
  cursor: pointer;
}
</style>
