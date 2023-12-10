import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'
import { describe, expect, it, vi, type Mock } from 'vitest'
import type { HeaderDataTableType } from '@/types/DataTableType'
import type { PageableReceiveType } from '@/types/PaginationType'
import type { GlobalMountOptions } from 'node_modules/@vue/test-utils/dist/types'

type MountProps = {
  totalPages?: number
  items?: Record<string, unknown>[]
  headers?: HeaderDataTableType[]
}

type MountParams = {
  props?: MountProps
  slots?: Record<string, string>
  global?: GlobalMountOptions
}

const mountFactory = ({ props, slots }: MountParams = {}) => {
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

  const items = [
    {
      name: 'Mateus',
      age: 20
    },
    {
      name: 'Pedro',
      age: 24
    },
    {
      name: 'Lucas',
      age: 33
    }
  ]

  const totalItems = (props?.items || items).length

  const pagingData: PageableReceiveType = {
    totalItems,
    items: props?.items || items,
    totalPages: props?.totalPages || 1
  }

  const propsDefault = {
    headers,
    pagingData
  }

  const wrapper = mount(DataTable, {
    slots,
    props: {
      ...propsDefault,
      ...props
    }
  })

  return { wrapper, totalItems, items, headers }
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
      const { wrapper, items } = mountFactory()

      const body = wrapper.find('tbody')
      const rows = body.findAll('tr')

      const firstRow = rows.at(0)

      expect(firstRow?.text()).toContain('Mateus')
      expect(firstRow?.text()).toContain('20')
      expect(rows).toHaveLength(items.length)
    })

    it('should correctly render slot', () => {
      const { wrapper } = mountFactory({
        slots: {
          name: `<template #name="{ item }">
            <div class="slot-customizing-name">
              customizing name {{ item.value }}
            </div>
          </template>`
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
      const { wrapper, totalItems } = mountFactory()

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

    it('should display the text in the zeroed footer when the "items" property is empty', () => {
      const { wrapper } = mountFactory({
        props: {
          items: []
        }
      })
      const footerText = wrapper.find('footer p')

      expect(footerText.text()).toEqual('0-0 de 0')
      expect(wrapper.vm.firstDisplayed).toBe(0)
    })

    it('should emit the "update-params" and "reload-data" event when clicking on a pagination button', async () => {
      const { wrapper } = mountFactory({
        props: {
          totalPages: 2
        }
      })

      const footer = wrapper.find('footer')
      const next = footer.find('img[data-control="next"]')
      const previous = footer.find('img[data-control="previous"]')

      await next.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('update-params')
      expect(wrapper.emitted('update-params')?.at(0)).toEqual([{ _page: 2, _limit: 15 }])

      await previous.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('update-params')
      expect(wrapper.emitted()).toHaveProperty('reload-data')
    })
  })
})
