import { BaseService } from './base.service'
import type { CategoryType } from '@/types/category/CategoryType'

export class CategoryService extends BaseService<CategoryType> {
  static init() {
    return new CategoryService('/categories')
  }
}
