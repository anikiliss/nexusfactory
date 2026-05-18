<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/game'
import TopBar from '@/components/TopBar.vue'
import BottomBar from '@/components/BottomBar.vue'

const route = useRoute()
const isSettings = computed(() => route.name === 'settings')

const game = useGameStore()

let autosaveTimer = null

function handleBeforeUnload() {
  game.saveGame()
}

onMounted(() => {
  game.loadGame()
  autosaveTimer = setInterval(() => game.saveGame(), 30_000)
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  if (autosaveTimer) clearInterval(autosaveTimer)
  window.removeEventListener('beforeunload', handleBeforeUnload)
  game.saveGame()
})
</script>

<template>
  <div class="app">
    <TopBar v-if="!isSettings" class="app__top" />
    <main class="app__main" :class="{ 'app__main--full': isSettings }">
      <RouterView />
    </main>
    <BottomBar v-if="!isSettings" class="app__bottom" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}
.app__top {
  position: sticky;
  top: 0;
  z-index: 10;
}
.app__main {
  padding: 16px 16px calc(120px + env(safe-area-inset-bottom));
}
.app__main--full {
  padding: 16px 16px env(safe-area-inset-bottom);
}
.app__bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
