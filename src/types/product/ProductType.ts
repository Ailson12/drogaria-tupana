import type { ModelType } from '../geral/ModelType'

export interface ProductType extends ModelType {
  name: string
  price: string
  categoryId: number
  description: string
  url_product_image: string | null
}
