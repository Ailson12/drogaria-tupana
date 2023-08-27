<script lang="ts">
import { defineComponent } from 'vue'
import PublicApplication from '@/views/public/PublicApplication.vue';

export default defineComponent({
  name: 'App',
  components: { PublicApplication }
})
</script>

<template>
  <PublicApplication />
</template>
