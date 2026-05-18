<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { RESOURCES } from '@/data/resources'
import { RECIPES } from '@/data/recipes'

const game = useGameStore()

const items = [
  { recipe: RECIPES.iron_ore, resource: RESOURCES.iron_ore },
  { recipe: RECIPES.iron_ingot, resource: RESOURCES.iron_ingot },
]

function isActive(recipeId) {
  return game.activeCraft === recipeId
}

function isFull(resourceId) {
  return (game.resources[resourceId] ?? 0) >= (RESOURCES[resourceId]?.maxStorage ?? Infinity)
}

function hasInputs(recipe) {
  for (const [id, amount] of Object.entries(recipe.inputs)) {
    if ((game.resources[id] ?? 0) < amount) return false
  }
  return true
}

function statusText(recipe, resource) {
  const active = isActive(recipe.id)
  if (!active) return '0/сек'
  if (isFull(resource.id)) return 'хранилище полное'
  if (!hasInputs(recipe)) return 'не хватает ресурсов'
  return `${recipe.outputAmount}/сек`
}

function statusClass(recipe, resource) {
  if (!isActive(recipe.id)) return ''
  if (isFull(resource.id) || !hasInputs(recipe)) return 'resource-card__rate--warn'
  return ''
}

function toggle(recipeId) {
  game.toggleCraft(recipeId)
}
</script>

<template>
  <section class="view">
    <h2>Верстак</h2>
    <p class="hint">Жми ⚒️ чтобы начать. Только один процесс одновременно.</p>

    <div
      v-for="{ recipe, resource } in items"
      :key="recipe.id"
      class="resource-card"
      :class="{ 'resource-card--active': isActive(recipe.id) }"
    >
      <img :src="resource.icon" :alt="resource.label" class="resource-card__icon" />
      <div class="resource-card__info">
        <div class="resource-card__name">{{ resource.label }}</div>
        <div class="resource-card__amount">
          {{ game.resources[resource.id] }} / {{ resource.maxStorage }}
        </div>
        <div
          v-if="Object.keys(recipe.inputs).length > 0"
          class="resource-card__recipe"
        >
          <template
            v-for="(amount, inputId, idx) in recipe.inputs"
            :key="inputId"
          >
            <span v-if="idx > 0"> + </span>
            <span>{{ amount }} × {{ RESOURCES[inputId].label }}</span>
          </template>
          <span> → {{ recipe.outputAmount }} × {{ resource.label }}</span>
        </div>
        <div class="resource-card__rate" :class="statusClass(recipe, resource)">
          {{ statusText(recipe, resource) }}
        </div>
      </div>
      <button
        class="mine-btn"
        :class="{ 'mine-btn--active': isActive(recipe.id) }"
        @click="toggle(recipe.id)"
        :aria-label="isActive(recipe.id) ? 'Остановить' : 'Запустить'"
      >
        ⚒️
      </button>
    </div>
  </section>
</template>

<style scoped>
.hint {
  color: var(--text-dim);
  font-size: 14px;
  margin-bottom: 20px;
}
.resource-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.2s;
  margin-bottom: 12px;
}
.resource-card--active {
  border-color: var(--accent);
}
.resource-card__icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}
.resource-card__info {
  flex: 1;
  min-width: 0;
}
.resource-card__name {
  font-weight: 600;
  margin-bottom: 4px;
}
.resource-card__amount {
  font-size: 18px;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}
.resource-card__recipe {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 4px;
}
.resource-card__rate {
  font-size: 13px;
  color: var(--text-dim);
  margin-top: 4px;
}
.resource-card__rate--warn {
  color: var(--accent-warm);
}
.mine-btn {
  flex-shrink: 0;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.05s;
}
.mine-btn:active {
  transform: scale(0.95);
}
.mine-btn--active {
  background: var(--accent);
  border-color: var(--accent);
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--accent); }
  50% { box-shadow: 0 0 0 8px transparent; }
}
</style>
