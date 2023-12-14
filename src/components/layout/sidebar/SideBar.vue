<template>
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
        <li v-for="(link, index) in links" :key="index" @click="selectLink(link)">
          <div>
            <img width="20" height="20" :src="link.icon.src" :alt="link.title" />
          </div>
          {{ link.title }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSideBarStore } from '@/stores/sidebar.store'
import productIcon from '@/assets/icons/icon-product.svg'
import categoryIcon from '@/assets/icons/icon-category.svg'
import { SIDEBAR_LINKS } from '@/constants/sidebar.constant'
import type { SideBarLinkType } from '@/types/SideBarLinkType'

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {
      links: SIDEBAR_LINKS
    }
  },
  data() {
    return {
      menu: [
        {
          title: 'Categoria',
          icon: categoryIcon
        },
        {
          title: 'Produto',
          icon: productIcon
        }
      ]
    }
  },
  computed: {
    ...mapState(useSideBarStore, ['visible'])
  },
  methods: {
    ...mapActions(useSideBarStore, ['toggleVisible']),
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
