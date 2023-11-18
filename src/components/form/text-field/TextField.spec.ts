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

  it('should display a span when there are validation errors', () => {
    const initialError = 'Campo obrigatório'
    const { wrapper } = mountFactory({
      props: {
        name: 'name',
        initialError
      }
    })

    const span = wrapper.find('span')

    expect(span.exists()).toBe(true)
    expect(span.text().length > 0).toBe(true)
    expect(span.text()).toEqual(initialError)
  })

  it('validation span should have a capacity equal to 1 when there is an error', () => {
    const initialError = 'Campo obrigatório'
    const { wrapper } = mountFactory({
      props: {
        name: 'name',
        initialError
      }
    })

    const span = wrapper.find('span')
    const opacity = +span.element.style.opacity

    expect(opacity).toBe(1)
  })

  it('should contain an error message class', () => {
    const { wrapper } = mountFactory()
    expect(wrapper.find('span').classes().includes('message-error')).toBe(true)
  })

  it('should render input with money mask when the type is equal to "money"', () => {
    const { wrapper } = mountFactory({
      props: {
        name: 'price',
        type: 'money'
      }
    })

    const input = wrapper.find('input')
    input.setValue('250,00')

    const { value } = input.element

    expect(value).toBe('R$ 250,00')
  })
})
