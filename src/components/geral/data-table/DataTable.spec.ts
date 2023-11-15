import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'
import type { PageableSend } from '@/types/PaginationType'
import { describe, expect, it, vi, type Mock } from 'vitest'
import type { HeaderDataTableType } from '@/types/DataTableType'
import type { GlobalMountOptions } from 'node_modules/@vue/test-utils/dist/types'

type MountProps = {
  totalItems?: number
  headers?: HeaderDataTableType[]
  items?: Record<string, unknown>[]
}

type MountParams = {
  props?: MountProps
  global?: GlobalMountOptions
}
const pageableParams: PageableSend = {
  _limit: 15,
  _page: 1
}

const mountFactory = ({ props }: MountParams = {}) => {
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

  const propsDefault = {
    params: pageableParams,
    headers
  }

  const wrapper = mount(DataTable, {
    props: {
      ...propsDefault,
      ...props
    }
  })

  return { wrapper, headers, params: pageableParams }
}

describe('DataTable', () => {
  describe('DataTable Header', () => {
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

    it('should validate if the key property is repeated ', () => {
      const originalConsoleWarn = console.warn
      console.warn = vi.fn()

      const duplicateHeader = [
        {
          key: 'name',
          title: 'Nome'
        },
        {
          key: 'name',
          title: 'Nome Completo'
        }
      ]

      mountFactory({
        props: {
          headers: duplicateHeader
        }
      })

      const warnMessage = (console.warn as Mock).mock.calls[0]?.at(0) ?? ''
      expect(warnMessage).toContain(
        '[Vue warn]: Invalid prop: custom validator check failed for prop "headers"'
      )

      console.warn = originalConsoleWarn
    })
  })

  describe('DataTable Body', () => {
    it('should render the content correctly in the table body', () => {
      const headers: HeaderDataTableType[] = [
        {
          key: 'name',
          title: 'Nome'
        },
        {
          key: 'age',
          title: 'Idade'
        }
      ]

      const items = [
        {
          name: 'Mateus',
          age: 23
        },
        {
          name: 'Pedro',
          age: 20
        }
      ]

      const wrapper = mount(DataTable, {
        props: {
          items,
          headers,
          params: pageableParams
        }
      })

      const body = wrapper.find('tbody')
      const rows = body.findAll('tr')

      const firstRow = rows.at(0)

      expect(firstRow?.text()).toContain('Mateus')
      expect(firstRow?.text()).toContain('23')
      expect(rows).toHaveLength(items.length)
    })

    it('should correctly render slot', () => {
      const headers: HeaderDataTableType[] = [
        {
          key: 'name',
          title: 'Nome'
        },
        {
          key: 'age',
          title: 'Idade'
        }
      ]

      const items = [
        {
          name: 'Mateus',
          age: 23
        },
        {
          name: 'Pedro',
          age: 20
        }
      ]

      const wrapper = mount(DataTable, {
        slots: {
          name: `<template #name="{ item }">
            <div class="slot-customizing-name">
              customizing name {{ item.value }}
            </div>
          </template>`
        },
        props: {
          items,
          headers,
          params: pageableParams
        }
      })

      const customName = wrapper.find('.slot-customizing-name')

      expect(customName.exists()).toBe(true)
      expect(customName.text()).toContain('customizing name')
    })
  })

  describe('DataTable Footer', () => {
    it('should display table footer', () => {
      const { wrapper } = mountFactory()
      const footer = wrapper.find('footer')

      expect(footer.exists()).toBe(true)
    })

    it('should display total items in the footer', () => {
      const items = [
        {
          name: 'Mateus',
          age: 20
        },
        {
          name: 'Pedro',
          age: 26
        }
      ]

      const totalItems = items.length

      const { wrapper } = mountFactory({
        props: {
          items,
          totalItems
        }
      })

      const footer = wrapper.find('footer')
      const footerText = footer.find('p').text()

      expect(footerText).toContain(`de ${totalItems}`)
    })

    it('should display pagination icons', () => {
      const { wrapper } = mountFactory()
      const footer = wrapper.find('footer')
      const icons = footer.findAll('img')

      expect(icons).toHaveLength(2)
    })
  })
})
