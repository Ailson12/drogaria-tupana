import { mount } from '@vue/test-utils'
import TextField from './TextField.vue'
import { describe, expect, it } from 'vitest'

type Props = {
  name: string
} & Record<string, unknown>

type Params = {
  props?: Props
}

const mountFactory = (params?: Params) => {
  const defaultValue = {
    props: {
      name: 'name'
    }
  }

  const wrapper = mount(TextField, {
    props: params?.props || defaultValue.props
  })

  return { wrapper }
}

describe('TextField Component', () => {
  it('should mount the component', () => {
    const { wrapper } = mountFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should hide input when type is textarea', () => {
    const { wrapper } = mountFactory({
      props: {
        name: 'name',
        type: 'textarea'
      }
    })
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('should hide textarea if different from textarea', () => {
    const { wrapper } = mountFactory({
      props: {
        name: 'name',
        type: 'number'
      }
    })

    expect(wrapper.vm.isTextArea).toBe(false)
    expect(wrapper.find('textarea').exists()).toBe(false)
  })

  it('should contain an error message class', () => {
    const { wrapper } = mountFactory()
    expect(wrapper.find('span').classes().includes('message-error')).toBe(true)
  })
})
