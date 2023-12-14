import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
  state() {
    return {
      visible: false
    }
  },
  actions: {
    toggleVisible(): void {
      this.visible = !this.visible
    }
  }
})
