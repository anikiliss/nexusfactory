<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const game = useGameStore()

const tick = ref(0)
setInterval(() => tick.value++, 1000)

const storeJson = computed(() => {
  tick.value
  return JSON.stringify(game.$state, null, 2)
})

const savedJson = computed(() => {
  tick.value
  const raw = localStorage.getItem('nexusfactory:save')
  if (!raw) return '(сейва нет)'
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch {
    return '(битый JSON)'
  }
})

const lastSaveAgo = computed(() => {
  tick.value
  const delta = Date.now() - game.lastSaveTime
  return Math.round(delta / 1000) + ' с назад'
})

function resetProgress() {
  if (confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) {
    game.resetGame()
    alert('Прогресс сброшен.')
  }
}

function saveNow() {
  game.saveGame()
}

function addTestResources() {
  game.resources.ironOre += 10
  game.resources.coal += 5
}

function goBack() {
  router.back()
}
</script>

<template>
  <section class="view">
    <header class="header">
      <button class="back" @click="goBack">← Назад</button>
      <h2>Настройки</h2>
    </header>

    <ul class="options">
      <li>Звук: <em>пока недоступно</em></li>
      <li>Вибрация: <em>пока недоступно</em></li>
      <li>Язык: <em>русский</em></li>
      <li>Экспорт сейва: <em>пока недоступно</em></li>
      <li>Импорт сейва: <em>пока недоступно</em></li>
    </ul>

    <button class="danger" @click="resetProgress">
      Сбросить прогресс
    </button>

    <hr class="sep" />

    <h3>Отладка</h3>

    <div class="debug-actions">
      <button @click="addTestResources">+10 железо / +5 уголь</button>
      <button @click="saveNow">Сохранить сейчас</button>
    </div>

    <p class="debug-info">Последний сейв: {{ lastSaveAgo }}</p>

    <h4>state (в памяти)</h4>
    <pre class="debug-block">{{ storeJson }}</pre>

    <h4>localStorage (на диске)</h4>
    <pre class="debug-block">{{ savedJson }}</pre>
  </section>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.back {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
}
.options {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}
.options li {
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.options em {
  color: var(--text-dim);
  font-style: italic;
}
.danger {
  background: var(--danger-bg);
  border: 1px solid var(--danger);
  color: var(--text);
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  width: 100%;
  font-weight: 500;
}
.sep {
  margin: 32px 0 16px;
  border: none;
  border-top: 1px solid var(--border);
}
.debug-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.debug-actions button {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--accent);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
}
.debug-info {
  font-size: 14px;
  color: var(--text-dim);
  margin: 8px 0;
}
.debug-block {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 14px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
}
</style>
