<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function openSettings() {
  router.push('/settings')
}
</script>

<template>
  <header class="top-bar">
    <span class="stat">0 MW</span>
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
  padding: 8px 12px;
  border-bottom: 1px solid #333;
  background: #1a1a1a;
  color: #e5e5e5;
}
.stat {
  font-size: 14px;
  color: #aaa;
}
.gear {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
