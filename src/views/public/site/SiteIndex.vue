<template>
  <div>
    <site-header />
    <product-section />
    <section-about />
    <site-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SiteFooter from './components/site-footer/SiteFooter.vue'
import SiteHeader from './components/site-header/SiteHeader.vue'
import SectionAbout from './components/section-about/SectionAbout.vue'
import ProductSection from './components/product-section/ProductSection.vue'

export default defineComponent({
  name: 'SiteIndex',
  components: {
    SiteFooter,
    SiteHeader,
    SectionAbout,
    ProductSection
  }
})
</script>
