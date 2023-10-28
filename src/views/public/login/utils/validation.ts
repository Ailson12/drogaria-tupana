import { object, string } from 'yup'

export const validationSchema = object({
  password: string().required(),
  email: string().email().required()
})
