import { messages } from '@/config/yup-messages'
import { clearMoneyFormatting } from '@/helpers/money/money.helper'
import { string, object } from 'yup'

export const validationSchema = object({
  price: string()
    .required()
    .max(10)
    .test({
      name: 'test-price-valid',
      message: messages.mixed?.required,
      test: (value) => clearMoneyFormatting(value) > 0
    }),
  name: string()
    .required()
    .matches(/^[0-9-a-zA-ZÁ-Åá-åÂ-ÅâÀ-ÿ\s]+$/, 'Deve conter apenas letras, espaços e acentos')
    .min(5)
    .max(45),
  description: string().required().max(500)
})
