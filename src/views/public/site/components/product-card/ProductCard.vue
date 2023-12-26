<template>
  <div class="product-card-wrapper">
    <div class="product-image">
      <img src="@/assets/images/product-image.png" :alt="title" width="228" height="149" />
    </div>
    <p class="price c1">{{ formatMoney(price) }}</p>
    <p class="description c2">{{ title }}</p>
    <custom-button style="width: 100%">Comprar</custom-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatMoney } from '@/helpers/money/money.helper'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'

export default defineComponent({
  name: 'ProductCard',
  components: {
    CustomButton
  },
  props: {
    price: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      formatMoney
    }
  }
})
</script>

<style scoped>
.product-card-wrapper {
  width: 15.625rem;
  display: flex;
  padding: 1rem;
  border-radius: 6px;
  flex-direction: column;
  background-color: var(--c10);
}

.product-card-wrapper .product-image {
  margin-bottom: 1.25rem;
}

.product-card-wrapper .price {
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.product-card-wrapper .description {
  font-size: 0.875rem;
  font-weight: 600;
  flex: 1;
  margin-bottom: 0.75rem;
}
</style>
