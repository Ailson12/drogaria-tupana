import { api } from '@/config/api'
import type { AxiosInstance } from 'axios'
import type { PageableSend } from '@/types/geral/PaginationType'
import { errorCallback } from '@/helpers/service/service.helper'
import type { PageableReceiveType } from '../types/geral/PaginationType'

type DataFormType = Record<string | number, unknown>

export class ProductService {
  private baseUrl = 'products'
  private http: AxiosInstance = api

  static init() {
    return new ProductService()
  }

  paginate(params: PageableSend) {
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

  findById(id: number | string) {
    return this.http
      .get(`${this.baseUrl}/${id}`)
      .then((response) => response.data)
      .catch(errorCallback)
  }

  create(data: DataFormType) {
    return this.http
      .post(this.baseUrl, data)
      .then((response) => response.data)
      .catch(errorCallback)
  }

  update(data: DataFormType, id: string | number) {
    return this.http
      .put(`${this.baseUrl}/${id}`, data)
      .then((response) => response.data)
      .catch(errorCallback)
  }

  remove(id: number | string) {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .then((response) => response.data)
      .catch(errorCallback)
  }

  updateOrCreate(data: DataFormType, id: number | string = 0) {
    return id ? this.update(data, id) : this.create(data)
  }
}
