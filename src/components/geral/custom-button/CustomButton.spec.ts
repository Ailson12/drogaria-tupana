import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CustomButton from './CustomButton.vue'

describe('Custom Button Component', () => {
  it('should mount the component', () => {
    const wrapper = mount(CustomButton)
    expect(wrapper.vm).toBeTruthy()
  })

  it('should add classes correctly according to the size', () => {
    const size = 'large'
    const wrapper = mount(CustomButton, {
      props: {
        size
      }
    })

    expect(wrapper.classes().includes(size)).toBe(true)
  })

  it('should correctly attach extra attributes to the button', () => {
    const props = {
      id: 'send',
      type: 'submit',
      'aria-hidden': false
    }

    const wrapper = mount(CustomButton, {
      props
    })

    const propsKey = Object.keys(props)
    const attributesKey = Object.keys(wrapper.attributes())
    const attributesWereAttached = propsKey.every((key) => attributesKey.includes(key))

    expect(attributesWereAttached).toBe(true)
  })

  it('should display slot correctly', () => {
    const slotParameters = {
      props: {
        id: 'children-button'
      },
      text: 'Send'
    }

    const wrapper = mount(CustomButton, {
      slots: {
        default: h('div', slotParameters.props, slotParameters.text)
      }
    })

    const slot = wrapper.find(`#${slotParameters.props.id}`)

    expect(slot.exists()).toBe(true)
    expect(slot.text()).toEqual(slotParameters.text)
  })
})
