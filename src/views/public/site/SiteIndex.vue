<template>
  <div>
    <site-header />
    <product-section />
    <section-about />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteHeader from './components/site-header/SiteHeader.vue'
import SectionAbout from './components/section-about/SectionAbout.vue'
import ProductSection from './components/product-section/ProductSection.vue'

export default defineComponent({
  name: 'SiteIndex',
  components: {
    SiteHeader,
    SectionAbout,
    ProductSection
  }
})
</script>
