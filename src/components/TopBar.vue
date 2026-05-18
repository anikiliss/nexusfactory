<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function openSettings() {
  router.push('/settings')
}
</script>

<template>
  <header class="top-bar">
    <span class="stat">
      <span class="stat__value">0</span>
      <span class="stat__unit">MW</span>
    </span>
    <button class="gear" @click="openSettings" aria-label="Настройки">
      ⚙
    </button>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.stat__value {
  font-size: 18px;
  font-weight: 600;
  color: var(--accent);
}
.stat__unit {
  font-size: 13px;
  color: var(--text-dim);
  letter-spacing: 0.5px;
}
.gear {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 22px;
  padding: 4px 8px;
  line-height: 1;
}
.gear:active {
  color: var(--accent);
}
</style>
