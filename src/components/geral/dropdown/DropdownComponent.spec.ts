import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DropdownComponent from './DropdownComponent.vue'
import type { DropdownItemType } from './utils/DropdownItemType'

const mountFactory = () => {
  const items: DropdownItemType[] = [
    {
      title: 'Editar',
      callback() {
        // action
      }
    },
    {
      title: 'Remover',
      callback() {
        // action
      }
    }
  ]

  const wrapper = mount(DropdownComponent, {
    props: {
      items,
      title: 'Ações'
    }
  })

  return { wrapper }
}

describe('DropdownComponent - unit', () => {
  it('should mount the component', () => {
    const { wrapper } = mountFactory()

    expect(wrapper.vm).toBeTruthy()
  })

  it('should must display title provided', () => {
    const { wrapper } = mountFactory()
    const anchorButton = wrapper.find('.dropdown-wrapper-button')

    expect(anchorButton.exists()).toBe(true)
    expect(anchorButton.text()).toContain('Ações')
  })

  it('should start hidden items list', () => {
    const { wrapper } = mountFactory()

    const list = wrapper.find('ul')
    const opacity = +list.element.style.opacity

    expect(opacity).toBe(0)
  })
})
