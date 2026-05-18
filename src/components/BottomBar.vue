<script setup>
import { RouterLink } from 'vue-router'

const tabs = [
  { to: '/workbench', label: 'Workbench' },
  { to: '/drills', label: 'Drills' },
  { to: '/factories', label: 'Factories' },
  { to: '/energy', label: 'Energy' },
]
</script>

<template>
  <nav class="bottom-bar">
    <div class="search-row">
      <input
        type="text"
        placeholder="Поиск..."
        class="search"
        disabled
      />
    </div>
    <div class="tabs-row">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="tab"
        active-class="tab--active"
      >
        {{ tab.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.bottom-bar {
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  color: #e5e5e5;
  border-top: 1px solid #333;
}
.search-row {
  padding: 8px 12px;
  border-bottom: 1px solid #333;
}
.search {
  width: 100%;
  background: #0d0d0d;
  border: 1px solid #444;
  color: #e5e5e5;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.tabs-row {
  display: flex;
}
.tab {
  flex: 1;
  padding: 12px 4px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  font-size: 14px;
}
.tab--active {
  font-weight: bold;
  border-top: 2px solid currentColor;
}
</style>
