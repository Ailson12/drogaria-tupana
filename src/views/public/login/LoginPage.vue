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
        <custom-button type="submit" size="large">Entrar</custom-button>
      </form-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { validationSchema } from './utils/validation'
import { LoginService } from '@/services/LoginService'
import TextField from '@/components/form/text-field/TextField.vue'
import { Form as FormWrapper, type GenericObject } from 'vee-validate'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    TextField,
    FormWrapper,
    CustomButton
  },
  setup() {
    return {
      validationSchema,
      service: LoginService.init()
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['setLogin']),
    handleSubmit(values: GenericObject) {
      this.service
        .login({
          email: values.email,
          password: values.password
        })
        .then((data) => {
          this.setLogin(data)
          this.$router.push({
            name: 'product.index'
          })
        })
        .catch(() => this.$toast.error('Credenciais não encontrada.'))
    }
  }
})
</script>

<style src="./utils/login-page.css" scoped />
