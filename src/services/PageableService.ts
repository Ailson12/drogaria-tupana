import type { PageableReceiveType, PageableSend } from '@/types/geral/PaginationType'

export class PageableService {
  static receive() {
    return {
      items: [],
      totalItems: 0,
      totalPages: 0
    } as PageableReceiveType
  }

  static params(initialValues?: PageableSend): PageableSend {
    return {
      _page: 1,
      _limit: 15,
      ...initialValues
    }
  }
}
