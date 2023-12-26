<template>
  <div class="about-bg">
    <section class="about-wrapper">
      <h1>Sobre</h1>
      <p>
        A Tupana se destaca das demais farmácias de Manaus por sua mistura única de remédios
        tradicionais da Amazônia e expertise farmacêutica moderna. Nos esforçamos para oferecer uma
        experiência de saúde verdadeiramente autêntica e holística, garantindo o bem-estar de nossa
        comunidade em harmonia com a rica cultura Manauara e a biodiversidade da floresta amazônica.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SectionAbout'
})
</script>

<style scoped>
.about-bg {
  background-color: var(--c12);
}

.about-wrapper {
  max-width: 75rem;
  margin: 0 auto;
  padding: 3.75rem;
}

.about-wrapper h1 {
  font-size: 32px;
  color: var(--c1);
  text-align: center;
  margin-bottom: 2.5rem;
  font-family: 'Merriweather';
}

.about-wrapper p {
  color: var(--c2);
  text-align: center;
  max-width: 60ch;
  margin: 0 auto;
  font-size: 20px;
}
</style>
