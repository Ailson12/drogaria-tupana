import type { ModelType } from '../geral/ModelType'

export interface ProductType extends ModelType {
  name: string
  price: number
  categoryId: number
  description: string
}
