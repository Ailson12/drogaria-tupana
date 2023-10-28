import { object, string } from 'yup'

export const validationSchema = object({
  password: string().required().min(5).max(10),
  email: string().email().required()
})
