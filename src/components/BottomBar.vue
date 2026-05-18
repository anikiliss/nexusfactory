<script setup>
import { RouterLink } from 'vue-router'

const tabs = [
  { to: '/workbench', label: 'Верстак' },
  { to: '/drills', label: 'Добыча' },
  { to: '/factories', label: 'Производство' },
  { to: '/energy', label: 'Питание' },
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
  background: var(--surface);
  color: var(--text);
  border-top: 1px solid var(--border);
}
.search-row {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
}
.search {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
}
.search::placeholder {
  color: var(--text-dim);
}
.tabs-row {
  display: flex;
}
.tab {
  flex: 1;
  padding: 14px 4px;
  text-align: center;
  text-decoration: none;
  color: var(--text-dim);
  font-size: 14px;
  border-top: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.tab--active {
  color: var(--accent);
  border-top-color: var(--accent);
  font-weight: 600;
}
</style>
