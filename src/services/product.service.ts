import { BaseService } from './base.service'

export class ProductService extends BaseService {
  static init() {
    return new ProductService('/products')
  }
}
