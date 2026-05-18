import { defineStore } from 'pinia'

const SAVE_KEY = 'nexusfactory:save'
const SAVE_VERSION = 1

function emptyState() {
  return {
    version: SAVE_VERSION,
    lastSaveTime: Date.now(),
    resources: {
      ironOre: 0,
      coal: 0,
    },
    power: {
      generation: 0,
      consumption: 0,
    },
    buildings: [],
    research: {
      unlocked: [],
    },
  }
}

export const useGameStore = defineStore('game', {
  state: () => emptyState(),

  actions: {
    saveGame() {
      this.lastSaveTime = Date.now()
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(this.$state))
      } catch (e) {
        console.error('[save] failed:', e)
      }
    },

    loadGame() {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) {
        console.log('[load] no save found, starting fresh')
        return
      }
      try {
        const data = JSON.parse(raw)
        if (data.version !== SAVE_VERSION) {
          console.warn(`[load] version mismatch (save=${data.version}, expected=${SAVE_VERSION}), starting fresh`)
          return
        }
        const now = Date.now()
        const delta = now - (data.lastSaveTime ?? now)
        console.log(`[load] offline for ${Math.round(delta / 1000)} s (not applied yet)`)
        this.$patch(data)
      } catch (e) {
        console.error('[load] failed to parse save:', e)
      }
    },

    resetGame() {
      localStorage.removeItem(SAVE_KEY)
      this.$patch(emptyState())
      console.log('[reset] game state cleared')
    },
  },
})
