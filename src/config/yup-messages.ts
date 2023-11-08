import { type LocaleObject } from 'yup'

export const messages: LocaleObject = {
  mixed: {
    required: 'Campo obrigatório'
  },
  string: {
    min: 'Campo deve ter no mínimo ${min} caracteres',
    max: 'Campo deve ter no máximo ${max} caracteres',
    email: 'E-mail inválido'
  }
}
