import { BaseService } from './base.service'

export class CategoryService extends BaseService {
  constructor() {
    super('/categories')
  }

  static init() {
    return new CategoryService()
  }
}
