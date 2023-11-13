<template>
  <div class="app-wrapper">
    <progress-bar :show="showProgressBar" />
    <nav-bar />
    <div class="content-page">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import ProgressBar from '@/components/geral/progress-bar/ProgressBar.vue'

export default defineComponent({
  name: 'AuthApplication',
  components: {
    NavBar,
    ProgressBar
  },
  data() {
    return {
      showProgressBar: false
    }
  },
  mounted() {
    this.finishProgressBar()
  },
  created() {
    this.$router.beforeEach((...props) => {
      this.startProgressBar()
      const next = props[2]
      next()
    })

    this.$router.afterEach(() => {
      setTimeout(() => {
        this.finishProgressBar()
      }, 600)
    })
  },
  methods: {
    startProgressBar() {
      this.showProgressBar = true
    },
    finishProgressBar() {
      this.showProgressBar = false
    }
  }
})
</script>

<style scoped>
.app-wrapper {
  background-color: var(--c12);
  min-height: 100vh;
}

.app-wrapper .content-page {
  padding: 20px 40px;
}

@media (max-width: 800px) {
  .app-wrapper .content-page {
    padding: 15px 20px;
  }
}
</style>
