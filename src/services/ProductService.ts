import { api } from '@/config/api'
import type { AxiosInstance } from 'axios'
import type { PageableSend } from '@/types/PaginationType'
import { errorCallback } from '@/helpers/service/service.helper'
import type { PageableReceiveType } from '../types/PaginationType'

export class ProductService {
  private baseUrl = 'products'
  private http: AxiosInstance = api

  static init() {
    return new ProductService()
  }

  create(data: Record<string | number, unknown>) {
    return this.http
      .post(this.baseUrl, { ...data, created_at: new Date() })
      .then((response) => response.data)
      .catch(errorCallback)
  }

  paginate({ _page = 1, _limit = 15 }: PageableSend = {}) {
    const params = { _page, _limit }

    return this.http
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
