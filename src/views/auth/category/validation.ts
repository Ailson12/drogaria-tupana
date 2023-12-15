import { string, object } from 'yup'

export const validationSchema = object({
  name: string()
    .required()
    .matches(/^[0-9-a-zA-ZÁ-Åá-åÂ-ÅâÀ-ÿ\s]+$/, 'Deve conter apenas letras, espaços e acentos')
    .min(5)
    .max(45),
  description: string().required().max(300)
})
