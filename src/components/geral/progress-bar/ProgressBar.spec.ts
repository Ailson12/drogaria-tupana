import { mount } from '@vue/test-utils'
import ProgressBar from './ProgressBar.vue'
import { describe, expect, it } from 'vitest'

type Params = {
  props?: Record<string, unknown>
}

const wrapperFactory = (params: Params = {}) => {
  return mount(ProgressBar, {
    props: params.props
  })
}

describe('ProgressBar Component', () => {
  it('should mount the component', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.vm).toBeTruthy()
  })

  it('opacity should equal 1 if show equals true', () => {
    const wrapper = wrapperFactory({
      props: {
        show: true
      }
    })

    const container = wrapper.find<HTMLDivElement>('.progress-bar')
    const opacity = +container.element.style.opacity

    expect(opacity).toBe(1)
  })

  it('should contain the progress value anchor', () => {
    const wrapper = wrapperFactory()

    const valueAnchor = wrapper.find('.progress-bar-value')
    expect(valueAnchor.exists()).toBe(true)
    expect(valueAnchor.classes().includes('progress-bar-value')).toBe(true)
  })
})
