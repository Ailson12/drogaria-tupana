import type { ModelType } from './ModelType'

export interface PageableSend extends Record<string, unknown> {
  _page: number
  _limit: number
}

export interface PageableReceiveType<E extends ModelType = ModelType> {
  items: Array<E>
  totalItems: number
  totalPages: number
}
