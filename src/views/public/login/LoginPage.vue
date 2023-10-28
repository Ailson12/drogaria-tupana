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
      <div class="back-mobile">
        <router-link to="/" class="btn-back">Voltar</router-link>
      </div>
      <form-wrapper class="login-form" :validation-schema="validationSchema" @submit="handleSubmit">
        <img width="280" height="38" src="@/assets/icons/logo-drogaria.svg" alt="logo tupana" />

        <text-field label="E-mail" name="email" mb="0.37rem" autocomplete="username" />
        <text-field
          label="Senha"
          autocomplete="current-password"
          type="password"
          name="password"
          mb="0.62rem"
        />
        <custom-button type="submit">Entrar</custom-button>
      </form-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form as FormWrapper } from 'vee-validate'
import { validationSchema } from './utils/validation'
import TextField from '@/components/form/TextField.vue'
import CustomButton from '@/components/geral/CustomButton.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    TextField,
    FormWrapper,
    CustomButton
  },
  setup() {
    return {
      validationSchema
    }
  },
  methods: {
    handleSubmit(values: Record<string, unknown>) {
      console.log('values: ', values)
    }
  }
})
</script>

<style src="./utils/login-page.css" scoped />
