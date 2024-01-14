<template>
  <div class="product-section-bg">
    <section class="product-section-wrapper">
      <h1 class="c1">Produtos</h1>
      <div class="product-listing">
        <product-card
          v-for="product in products"
          :key="product.id"
          :price="+product.price"
          :title="product.name"
          :image-url="product.url_product_image"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../product-card/ProductCard.vue'
import { ProductService } from '@/services/product.service'
import type { ProductType } from '@/types/product/ProductType'

export default defineComponent({
  name: 'ProductSection',
  components: {
    ProductCard
  },
  setup() {
    const service = ProductService.init()
    return { service }
  },
  data() {
    return {
      products: [] as ProductType[]
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts(): void {
      this.service
        .findAll()
        .then((data) => (this.products = data))
        .catch(() => this.$toast.info('Erro ao listar produtos'))
    }
  }
})
</script>

<style src="./product-section.css" scoped />
