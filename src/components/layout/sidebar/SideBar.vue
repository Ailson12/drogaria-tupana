<template>
  <div
    class="sidebar-bg"
    :style="{ width: visible ? '100%' : '0' }"
    @click.stop="handleClickBackground"
  >
    <aside class="sidebar-wrapper" :class="{ open: visible }">
      <div class="sidebar-header">
        <img
          src="@/assets/icons/menu.svg"
          width="28"
          height="28"
          alt="icon menu"
          @click="toggleVisible"
        />
      </div>
      <div class="sidebar-content">
        <ul>
          <li
            :class="{ active: link.route.name.includes(baseNameUrl) }"
            v-for="(link, index) in links"
            :key="index"
            @click="selectLink(link)"
          >
            <div>
              <img width="20" height="20" :src="link.icon.src" :alt="link.title" />
            </div>
            {{ link.title }}
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useSideBarStore } from '@/stores/sidebar.store'
import { SIDEBAR_LINKS } from '@/constants/sidebar.constant'
import type { SideBarLinkType } from '@/types/geral/SideBarLinkType'

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {
      links: SIDEBAR_LINKS
    }
  },
  computed: {
    ...mapState(useSideBarStore, ['visible']),
    baseNameUrl() {
      const { currentRoute } = useRouter()
      return currentRoute.value.name?.toString().split('.').at(0) ?? ''
    }
  },
  methods: {
    ...mapActions(useSideBarStore, ['toggleVisible']),
    handleClickBackground(event: MouseEvent) {
      const target = event.target as HTMLDivElement
      if (target.classList.contains('sidebar-bg')) {
        this.toggleVisible()
      }
    },
    selectLink(link: SideBarLinkType) {
      this.$router.push({
        name: link.route.name
      })
      this.toggleVisible()
    }
  }
})
</script>

<style scoped src="./sidebar.css" />
