import { string, object } from 'yup'

export const validationSchema = object({
  price: string().required().max(10),
  name: string()
    .required()
    .matches(/^[a-zA-ZÁ-Åá-åÂ-ÅâÀ-ÿ\s]+$/, 'Deve conter apenas letras, espaços e acentos')
    .min(5)
    .max(45),
  description: string().required().max(500)
})
