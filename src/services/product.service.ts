import { BaseService } from './base.service'
import type { ProductType } from '@/types/product/ProductType'

export class ProductService extends BaseService<ProductType> {
  static init() {
    return new ProductService('/products')
  }
}
