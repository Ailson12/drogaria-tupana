import { type ToastType } from './types/ToastType'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ToastType
  }
}
