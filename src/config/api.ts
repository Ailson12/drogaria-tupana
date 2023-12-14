import { toast } from '@/plugins/toast/toast'
import { TypeToastEnum } from '@/types/geral/ToastType'
import { useAuthStore } from '@/stores/auth.store'
import axios, {
  AxiosError,
  HttpStatusCode,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

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
  error: ({ response }: AxiosError) => {
    if (response?.status === HttpStatusCode.Unauthorized) {
      const { logout } = useAuthStore()
      setTimeout(() => {
        const messages = document.querySelectorAll('.iziToast-wrapper > div')
        messages.forEach((item) => item.remove())

        toast.show({
          message: 'Login expirado',
          timeout: 5000,
          type: TypeToastEnum.INFO
        })
      }, 100)

      setTimeout(logout, 5000)
    }

    return Promise.reject(response)
  }
}

api.interceptors.request.use(requestCallback.success)
api.interceptors.response.use(responseCallback.success, responseCallback.error)
