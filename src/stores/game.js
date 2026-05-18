import { defineStore } from 'pinia'
import { RECIPES } from '@/data/recipes'

const SAVE_KEY = 'nexusfactory:save'
const SAVE_VERSION = 2

function emptyState() {
  return {
    version: SAVE_VERSION,
    lastSaveTime: Date.now(),
    resources: {
      iron_ore: 0,
      coal: 0,
      iron_ingot: 0,
    },
    power: {
      generation: 0,
      consumption: 0,
    },
    buildings: [],
    research: {
      unlocked: [],
    },
    activeCraft: null,
  }
}

export const useGameStore = defineStore('game', {
  state: () => emptyState(),

  actions: {
    toggleCraft(recipeId) {
      if (this.activeCraft === recipeId) {
        this.activeCraft = null
      } else {
        this.activeCraft = recipeId
      }
    },

    tickCraft(maxStoragePerResource) {
      if (!this.activeCraft) return
      const recipe = RECIPES[this.activeCraft]
      if (!recipe) return

      for (const [inputId, inputAmount] of Object.entries(recipe.inputs)) {
        if ((this.resources[inputId] ?? 0) < inputAmount) return
      }

      const outId = recipe.output
      const outMax = maxStoragePerResource[outId] ?? Infinity
      const currentOut = this.resources[outId] ?? 0
      if (currentOut + recipe.outputAmount > outMax) return

      for (const [inputId, inputAmount] of Object.entries(recipe.inputs)) {
        this.resources[inputId] -= inputAmount
      }
      this.resources[outId] = currentOut + recipe.outputAmount
    },

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
          console.warn(`[load] version mismatch, starting fresh`)
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
