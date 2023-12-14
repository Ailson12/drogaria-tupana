import type { FormContext } from 'vee-validate'

export interface FormWrapperType {
  setFieldError: FormContext['setFieldError']
  setErrors: FormContext['setErrors']
  setFieldValue: FormContext['setFieldValue']
  setValues: FormContext['setValues']
  setFieldTouched: FormContext['setFieldTouched']
  setTouched: FormContext['setTouched']
  resetForm: FormContext['resetForm']
  resetField: FormContext['resetField']
  validate: FormContext['validate']
  validateField: FormContext['validateField']
  getValues(): Record<string, any>
  getMeta(): Record<string, any>
  getErrors(): Record<string, any>
}
