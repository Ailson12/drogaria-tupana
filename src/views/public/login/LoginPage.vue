<template>
  <div class="container-page">
    <div class="login-container-information">
      <router-link to="/" class="btn-back">Voltar</router-link>
      <div class="login-information">
        <p class="text-information">
          Portal de acesso exclusivo para nossos colaboradores. Sua dedicação é o que faz nossa
          drogaria ser única.
        </p>

        <div class="container-img">
          <img src="@/assets/icons/img-login.svg" width="403" height="254" alt="" />
        </div>
      </div>
    </div>
    <div class="container-login-form">
      <form class="login-form">
        <img width="280" height="38" src="@/assets/icons/logo-drogaria.svg" alt="" />

        <text-field label="E-mail" name="email" mb="1.8rem" />
        <text-field label="Senha" name="password" mb="2rem" />
        <custom-button>Entrar</custom-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextField from '@/components/form/TextField.vue'
import CustomButton from '@/components/geral/CustomButton.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    TextField,
    CustomButton
  }
})
</script>

<style src="@/assets/css/login-page.css" scoped />
