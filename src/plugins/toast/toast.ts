import izitoast, { type IziToast } from 'izitoast'
import { type ParamsToastType, type ToastType, TypeToastEnum } from '@/types/ToastType'

export const toast: ToastType = {
  getIcon(color: string) {
    const icons: Record<string, string> = {
      green: 'ico-success',
      red: 'ico-error',
      blue: 'ico-info',
      yellow: 'ico-question'
    }

    return icons[color] ?? icons.green
  },
  getTitleDefault(color: string) {
    const titles: Record<string, unknown> = {
      green: 'Sucesso',
      red: 'Erro',
      blue: 'Importante',
      yellow: 'Atenção'
    }

    return (titles[color] ?? titles.green) as string
  },
  info(message: string) {
    this.show({
      message,
      type: TypeToastEnum.INFO
    })
  },
  success(message: string) {
    this.show({
      message,
      type: TypeToastEnum.SUCCESS
    })
  },
  error(message: string) {
    this.show({
      message,
      type: TypeToastEnum.ERROR
    })
  },
  question(message: string, callbackQuestion: () => void) {
    this.show({
      message,
      callbackQuestion,
      type: TypeToastEnum.QUESTION
    })
  },
  show(params: ParamsToastType) {
    izitoast.show({
      color: params.type,
      message: params.message ?? '',
      timeout: params.timeout ?? 3000,
      maxWidth: params.maxWidth,
      title: params.title ?? this.getTitleDefault(params.type),
      icon: this.getIcon(params.type),
      position: params.type.includes(TypeToastEnum.QUESTION) ? 'center' : 'topRight',
      buttons: params.callbackQuestion
        ? [
            [
              "<button type='button'><b>SIM</b></button>",
              (instance: IziToast, toast: HTMLDivElement) => {
                if (params.callbackQuestion) {
                  params.callbackQuestion()
                }
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              },
              false
            ],
            [
              "<button type='button'><b>NÃO</b></button>",
              (instance: IziToast, toast: HTMLDivElement) => {
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              },
              false
            ]
          ]
        : []
    })
  }
}
