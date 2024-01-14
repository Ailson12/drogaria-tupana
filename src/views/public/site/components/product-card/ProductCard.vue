<template>
  <div class="product-card-wrapper">
    <div class="product-image">
      <img :src="productUrl" :alt="title" width="228" height="149" />
    </div>
    <p class="price c1">{{ formatMoney(price) }}</p>
    <p class="description c2">{{ title }}</p>
    <custom-button style="width: 100%">Comprar</custom-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { formatMoney } from '@/helpers/money/money.helper'
import ImageDefault from '@/assets/images/product-image.png'
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
    },
    imageUrl: {
      default: null,
      type: String as PropType<string | null>
    }
  },
  setup() {
    return {
      formatMoney
    }
  },
  computed: {
    productUrl() {
      return this.imageUrl ?? ImageDefault
    }
  }
})
</script>

<style src="./product-card.css" scoped />
