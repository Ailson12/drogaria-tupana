import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import NavBar from './NavBar.vue'

describe('NavBar Component', () => {
  it('should mount the component', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.vm).toBeTruthy()
  })

  it('should display Pop-up if logout icon is clicked', async () => {
    const $toast = {
      show: vi.fn()
    }

    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $toast
        }
      }
    })

    const logoutIcon = wrapper.find<HTMLImageElement>('#icon-logout')
    await logoutIcon.trigger('click')

    expect($toast.show).toHaveBeenCalledTimes(1)
  })
})
