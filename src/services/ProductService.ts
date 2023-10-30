import { api } from '@/utils/api'
import { errorCallback } from '@/helpers/service.helper'
import type { PageableSend } from '@/types/PaginationType'
import type { PageableReceiveType } from '../types/PaginationType'

export class ProductService {
  private baseUrl = 'products'

  static init() {
    return new ProductService()
  }

  paginate(params: PageableSend) {
    return api
      .get(this.baseUrl, {
        params
      })
      .then((response) => {
        const totalItems = Number(response.headers['x-total-count'])
        const totalPages = Math.ceil(totalItems / params._limit)

        return {
          totalPages,
          totalItems,
          items: response.data
        } as PageableReceiveType
      })
      .catch(errorCallback)
  }
}
