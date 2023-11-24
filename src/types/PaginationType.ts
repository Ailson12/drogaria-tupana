export interface PageableSend extends Record<string, unknown> {
  _page: number
  _limit: number
}

export interface PageableReceiveType<E = Record<string, unknown>> {
  items: Array<E>
  totalItems: number
  totalPages: number
}
