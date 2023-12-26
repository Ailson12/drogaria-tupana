<template>
  <div class="product-section-bg">
    <section class="product-section-wrapper">
      <h1 class="c1">Produtos</h1>
      <div class="product-listing">
        <product-card
          v-for="product in products"
          :key="product.id"
          :price="product.price"
          :title="product.name"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../product-card/ProductCard.vue'
import { generateUUID } from '@/helpers/uuid/uuid.helper'

export default defineComponent({
  name: 'ProductSection',
  components: {
    ProductCard
  },
  setup() {
    const products = [
      {
        id: generateUUID(),
        name: 'Creme de assaduras Huggies Supreme Care - 80g',
        price: 23.99
      },
      {
        id: generateUUID(),
        name: 'Xarope Vick 44e 120ml',
        price: 21.45
      },
      {
        id: generateUUID(),
        name: 'Cloridrato De Venlafaxina 150mg Com 30 Cápsula',
        price: 32.27
      },
      {
        id: generateUUID(),
        name: 'Dipirona Monoidratada',
        price: 7.91
      }
    ]

    return { products }
  }
})
</script>

<style src="./product-section.css" scoped />
