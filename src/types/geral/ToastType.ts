export enum TypeToastEnum {
  SUCCESS = 'green',
  ERROR = 'red',
  INFO = 'blue',
  QUESTION = 'yellow'
}

interface ParamsToastType {
  type: TypeToastEnum
  title?: string
  maxWidth?: number
  message?: string
  timeout?: boolean | number
  callbackQuestion?: () => void
}

type ToastType = {
  getIcon(color: string): string
  getTitleDefault(color: string): string
  info(message: string): void
  success(message: string): void
  error(message: string): void
  show(params: ParamsToastType): void
  question(message: string, callbackQuestion: () => void): void
}

export type { ToastType, ParamsToastType }
