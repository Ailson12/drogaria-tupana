import type { PageableReceiveType, PageableSend } from './PaginationType'

export type DataFormType = Record<string | number, unknown>

export interface CrudServiceType<E = unknown> {
  create(data: DataFormType): Promise<E>
  remove(id: number | string): Promise<E>
  findById(id: number | string): Promise<E>
  update(data: DataFormType, id: string | number): Promise<E>
  paginate(params: PageableSend): Promise<PageableReceiveType<E>>
  updateOrCreate(data: DataFormType, id?: number | string): Promise<E>
}
