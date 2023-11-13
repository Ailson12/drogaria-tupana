import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CardComponent from './CardComponent.vue'
import ProgressBar from '../progress-bar/ProgressBar.vue'

type Params = {
  props?: Record<string, unknown>
}

const mountFactory = (params: Params = {}) => {
  return mount(CardComponent, {
    props: params.props
  })
}

describe('Card Component', () => {
  it('should mount the component', () => {
    const wrapper = mountFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should display progress bar when loading is equal to true', () => {
    const wrapper = mount(CardComponent, {
      props: {
        loading: true
      }
    })

    const progress = wrapper.findComponent(ProgressBar)
    const htmlProgress = wrapper.find('.progress-bar')

    expect(progress.vm.show).toBe(true)
    expect(htmlProgress.exists()).toBe(true)
  })

  it('should correctly attach the provided slot', () => {
    const slotParameters = {
      text: 'Hello Word!',
      attributes: {
        id: 'message',
        class: 'text-message'
      }
    }

    const wrapper = mount(CardComponent, {
      slots: {
        default: h('div', slotParameters.attributes, slotParameters.text)
      }
    })

    const slot = wrapper.find(`#${slotParameters.attributes.id}`)

    expect(slot.exists()).toBe(true)
    expect(slot.text()).toEqual(slotParameters.text)
    expect(slot.classes().includes(slotParameters.attributes.class)).toBe(true)
  })
})
