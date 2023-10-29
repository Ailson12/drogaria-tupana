import router from '@/router'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { DataLoginType } from '@/types/AuthType'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      dataLogin: useStorage<DataLoginType | null>('data-login', {} as DataLoginType)
    }
  },
  getters: {
    acessToken(state): string | undefined {
      return state.dataLogin?.accessToken
    },
    isAuthenticated(state) {
      return Object.keys(state.dataLogin ?? {}).length > 0
    }
  },
  actions: {
    logout() {
      this.dataLogin = {} as DataLoginType
      router.push({
        name: 'login'
      })
    },
    setLogin(data: DataLoginType) {
      this.dataLogin = data
    }
  }
})
