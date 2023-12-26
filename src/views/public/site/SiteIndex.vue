<template>
  <div>
    <site-header />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from './components/site-header/SiteHeader.vue'

export default defineComponent({
  name: 'SiteIndex',
  components: {
    SiteHeader
  }
})
</script>
