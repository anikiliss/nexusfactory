<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/game'
import { RESOURCES } from '@/data/resources'
import TopBar from '@/components/TopBar.vue'
import BottomBar from '@/components/BottomBar.vue'

const route = useRoute()
const isSettings = computed(() => route.name === 'settings')

const game = useGameStore()

let autosaveTimer = null
let craftTimer = null

const maxStorageMap = Object.fromEntries(
  Object.values(RESOURCES).map((r) => [r.id, r.maxStorage])
)

function handleBeforeUnload() {
  game.saveGame()
}

onMounted(() => {
  game.loadGame()
  craftTimer = setInterval(() => game.tickCraft(maxStorageMap), 1000)
  autosaveTimer = setInterval(() => game.saveGame(), 30_000)
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  if (autosaveTimer) clearInterval(autosaveTimer)
  if (craftTimer) clearInterval(craftTimer)
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
