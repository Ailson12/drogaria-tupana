<template>
  <div class="header-bg">
    <header class="header-wrapper">
      <nav>
        <div>
          <img
            width="250"
            height="40"
            src="@/assets/icons/logo-drogaria.svg"
            alt="logo drogaria tupana"
          />
        </div>
        <ul>
          <li>
            <a href="#produto">Produtos</a>
          </li>
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#login">Login</a>
          </li>
        </ul>
      </nav>
      <div class="introduction-wrapper">
        <div class="introduction">
          <p>Garanta os melhores produtos da Drogaria Tupana sem sair de casa</p>
          <custom-button>Ver Produtos</custom-button>
        </div>
        <div class="benefits">
          <benefit-card
            v-for="benefit in benefits"
            :key="benefit.id"
            :title="benefit.title"
            :icon="benefit.icon"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconMoney from '@/assets/icons/icon-money.svg'
import IconScooter from '@/assets/icons/icon-scooter.svg'
import BenefitCard from '../benefit-card/BenefitCard.vue'
import { generateUUID } from '@/helpers/uuid/uuid.helper'
import IconSecurity from '@/assets/icons/icon-security.svg'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'

export default defineComponent({
  name: 'SiteHeader',
  components: {
    BenefitCard,
    CustomButton
  },
  setup() {
    const benefits = [
      { id: generateUUID(), title: 'Frete grátis', icon: IconScooter },
      { id: generateUUID(), title: 'Preço baixo', icon: IconMoney },
      { id: generateUUID(), title: 'Compra segura', icon: IconSecurity }
    ]

    return {
      benefits
    }
  }
})
</script>

<style src="./site-header.css" scoped />
