import { type ToastType } from './types/geral/ToastType'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ToastType
  }
}
