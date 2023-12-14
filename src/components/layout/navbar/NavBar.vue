<template>
  <div class="navbar-wrapper">
    <img
      src="@/assets/icons/menu.svg"
      width="28"
      height="28"
      alt="icon menu"
      @click="toggleVisible"
    />
    <img
      src="@/assets/icons/icon-logout.svg"
      @click="confirmLogout"
      width="28"
      height="28"
      id="icon-logout"
      alt="icon logout"
    />
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { defineComponent } from 'vue'
import { TypeToastEnum } from '@/types/geral/ToastType'
import { useAuthStore } from '@/stores/auth.store'
import { useSideBarStore } from '@/stores/sidebar.store'

export default defineComponent({
  name: 'NavBar',
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    ...mapActions(useSideBarStore, ['toggleVisible']),
    confirmLogout() {
      this.$toast.show({
        timeout: 0,
        message: 'Deseja sair?',
        type: TypeToastEnum.QUESTION,
        callbackQuestion: this.logout
      })
    }
  }
})
</script>

<style scoped>
.navbar-wrapper {
  padding: 18px 40px;
  display: flex;
  background: var(--c11);
  justify-content: space-between;
}

.navbar-wrapper img {
  cursor: pointer;
}
</style>
@/types/geral/ToastType
