import { BaseService } from './base.service'

export class CategoryService extends BaseService {
  static init() {
    return new CategoryService('/categories')
  }
}
