import { mount } from '@vue/test-utils'
import HeaderTitle from './HeaderTitle.vue'
import { describe, expect, it, vi } from 'vitest'
import type { RouteLocationRaw } from 'vue-router'
import type { GlobalMountOptions } from 'node_modules/@vue/test-utils/dist/types'

type MountProps = {
  showAdd?: boolean
  title?: string
  routeAdd?: RouteLocationRaw
}

type MountParams = {
  props?: MountProps
  global?: GlobalMountOptions
}

const mountFactory = (params: MountParams = {}) => {
  const propsDefault = {
    title: 'main listing'
  }

  const wrapper = mount(HeaderTitle, {
    props: { ...propsDefault, ...params.props },
    global: params.global
  })

  return { wrapper, propsDefault }
}

describe('Header Title Component', () => {
  it('should mount the component', () => {
    const { wrapper } = mountFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should display the given title correctly.', () => {
    const { wrapper, propsDefault } = mountFactory()

    const titleElement = wrapper.find('h1')

    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toEqual(propsDefault.title)
    expect(titleElement.classes().includes('c2')).toBe(true)
  })

  it('should hide the add button when the showAdd attribute is equal to false', () => {
    const { wrapper } = mountFactory({
      props: {
        showAdd: false
      }
    })

    const addButton = wrapper.find('button')
    expect(addButton.exists()).toBe(false)
  })

  it('should emit "add" event when the routeAdd parameter was not provided', async () => {
    const { wrapper } = mountFactory({
      props: {
        showAdd: true
      }
    })

    const addButton = wrapper.find('button')
    await addButton.trigger('click')

    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.emitted().add).toHaveLength(1)
  })

  it('should redirect if the "routeAdd" parameter is given', async () => {
    const mockRouter = {
      push: vi.fn()
    }

    const routeMock: RouteLocationRaw = {
      path: '/product/form'
    }

    const { wrapper } = mountFactory({
      global: {
        mocks: {
          $router: mockRouter
        }
      },
      props: {
        routeAdd: routeMock
      }
    })

    const addButton = wrapper.find('button')
    await addButton.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith(routeMock)
  })
})
