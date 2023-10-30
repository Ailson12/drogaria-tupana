import type { PageableReceiveType, PageableSend } from '@/types/PaginationType'

export class PageableService {
  static receive() {
    return {
      items: [],
      totalItems: 0,
      totalPages: 0
    } as PageableReceiveType
  }

  static params(): PageableSend {
    return {
      _page: 1,
      _limit: 2
    }
  }
}
