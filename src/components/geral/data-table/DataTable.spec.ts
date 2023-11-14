import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'
import { describe, expect, it } from 'vitest'
import type { PageableSend } from '@/types/PaginationType'
import type { HeaderDataTableType } from '@/types/DataTableType'

const mountFactory = () => {
  const params: PageableSend = {
    _limit: 15,
    _page: 1
  }

  const headers: HeaderDataTableType[] = [
    {
      key: 'name',
      title: 'Nome'
    },
    {
      key: 'age',
      title: 'Idade'
    },
    {
      key: 'actions',
      title: 'Ações',
      align: 'right'
    }
  ]

  const wrapper = mount(DataTable, {
    props: {
      params,
      headers
    }
  })

  return { wrapper, headers, params }
}

describe('DataTable Component', () => {
  it.todo('should validate if the key property is repeated')

  it('should mount the component', () => {
    const { wrapper } = mountFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should correctly render the header', () => {
    const { wrapper, headers } = mountFactory()
    const headerItems = wrapper.findAll('thead th')

    const titles = headerItems.map((item) => item.text())

    expect(headerItems).toHaveLength(headers.length)
    expect(headers.every(({ title }) => titles.includes(title))).toBe(true)
  })

  it('actions header should align to the right, according to the align property', () => {
    const { wrapper } = mountFactory()

    const headerItems = wrapper.findAll<HTMLDivElement>('thead th')
    const actionsHeader = headerItems.find((item) => item.text().includes('Ações'))

    expect(actionsHeader?.exists()).toBe(true)
    expect(actionsHeader?.element.style.textAlign).toEqual('right')
  })
})
