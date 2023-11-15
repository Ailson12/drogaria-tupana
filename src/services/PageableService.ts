import type { PageableReceiveType } from '@/types/PaginationType'

export class PageableService {
  static receive() {
    return {
      items: [],
      totalItems: 0,
      totalPages: 0
    } as PageableReceiveType
  }
}
