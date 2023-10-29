<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth.store'
import AuthApplication from '@/views/auth/AuthApplication.vue'
import PublicApplication from '@/views/public/PublicApplication.vue'

export default defineComponent({
  name: 'App',
  components: { AuthApplication, PublicApplication },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    componentActive() {
      return this.isAuthenticated ? 'AuthApplication' : 'PublicApplication'
    }
  }
})
</script>

<template>
  <component :is="componentActive" />
</template>
