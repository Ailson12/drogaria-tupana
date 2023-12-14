import axios, {
  AxiosError,
  HttpStatusCode,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { toast } from '@/plugins/toast/toast'
import { useAuthStore } from '@/stores/auth.store'
import { sleep } from '@/helpers/sleep/sleep.helper'
import { TypeToastEnum } from '@/types/geral/ToastType'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const requestCallback = {
  success: (config: InternalAxiosRequestConfig) => {
    const { acessToken } = useAuthStore()
    if (acessToken) config.headers.Authorization = `Bearer ${acessToken}`
    return config
  },
  error: (error: AxiosError) => Promise.reject(error)
}

const responseCallback = {
  success: (response: AxiosResponse) => response,
  error: async ({ response }: AxiosError) => {
    if (response?.status === HttpStatusCode.Unauthorized) {
      const messages = document.querySelectorAll('.iziToast-wrapper > div')
      messages.forEach((item) => item.remove())
      toast.show({
        message: 'Login expirado',
        timeout: 4000,
        type: TypeToastEnum.INFO
      })

      await sleep(400)

      const authStore = useAuthStore()
      authStore.logout()
    }

    return Promise.reject(response)
  }
}

api.interceptors.request.use(requestCallback.success)
api.interceptors.response.use(responseCallback.success, responseCallback.error)
