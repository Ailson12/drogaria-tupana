import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'
import type { PageableSend } from '@/types/PaginationType'
import { describe, expect, it, vi, type Mock } from 'vitest'
import type { HeaderDataTableType } from '@/types/DataTableType'
import type { GlobalMountOptions } from 'node_modules/@vue/test-utils/dist/types'

type MountProps = {
  headers?: HeaderDataTableType[]
}

type MountParams = {
  props?: MountProps
  global?: GlobalMountOptions
}

const mountFactory = ({ props }: MountParams = {}) => {
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

  const propsDefault = {
    params,
    headers
  }

  const wrapper = mount(DataTable, {
    props: {
      ...propsDefault,
      ...props
    }
  })

  return { wrapper, headers, params }
}

describe('DataTable Component', () => {
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
