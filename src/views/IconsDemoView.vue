<script setup>
import { useRouter } from 'vue-router'
import ironOre from '@/assets/icons/iron_ore.png'
import coal from '@/assets/icons/coal.png'

const router = useRouter()

const resources = [
  { id: 'iron_ore', name: 'Iron Ore', icon: ironOre },
  { id: 'coal', name: 'Coal', icon: coal },
]

const sizes = [16, 20, 24, 32, 40, 48, 64, 96, 128]
</script>

<template>
  <section class="view">
    <button class="back" @click="router.back()">← Назад</button>
    <h2>Иконки ресурсов</h2>

    <h3>Сравнение размеров</h3>
    <div v-for="res in resources" :key="res.id" class="row-block">
      <div class="row-title">{{ res.name }}</div>
      <div class="sizes">
        <div v-for="s in sizes" :key="s" class="cell">
          <img :src="res.icon" :width="s" :height="s" :alt="res.name" />
          <span>{{ s }}px</span>
        </div>
      </div>
    </div>

    <h3>Карточка ресурса (256px)</h3>
    <div class="cards">
      <div v-for="res in resources" :key="res.id" class="card">
        <img :src="res.icon" width="200" height="200" :alt="res.name" />
        <div class="card__name">{{ res.name }}</div>
      </div>
    </div>

    <h3>Список рецептов (40px)</h3>
    <div class="list">
      <div class="recipe">
        <img :src="ironOre" width="40" height="40" alt="" />
        <div>
          <div class="recipe__name">Iron Ingot</div>
          <div class="recipe__cost">2 × Iron Ore → 1 Iron Ingot</div>
        </div>
      </div>
      <div class="recipe">
        <img :src="coal" width="40" height="40" alt="" />
        <div>
          <div class="recipe__name">Coal Brick</div>
          <div class="recipe__cost">3 × Coal → 1 Coal Brick</div>
        </div>
      </div>
    </div>

    <h3>Индикаторы в строке (24px)</h3>
    <div class="inline">
      <span class="chip">
        <img :src="ironOre" width="24" height="24" alt="" />
        Iron Ore: 0 / 100
      </span>
      <span class="chip">
        <img :src="coal" width="24" height="24" alt="" />
        Coal: 0 / 100
      </span>
    </div>
  </section>
</template>

<style scoped>
.back {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
}
h3 {
  margin-top: 28px;
  margin-bottom: 12px;
}
.row-block {
  margin-bottom: 20px;
}
.row-title {
  font-size: 13px;
  color: var(--text-dim);
  margin-bottom: 8px;
}
.sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: flex-end;
}
.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.cell span {
  font-size: 11px;
  color: var(--text-dim);
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.card img {
  width: 100%;
  height: auto;
  max-width: 200px;
}
.card__name {
  margin-top: 8px;
  font-weight: 600;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.recipe {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.recipe__name {
  font-weight: 600;
  margin-bottom: 2px;
}
.recipe__cost {
  font-size: 13px;
  color: var(--text-dim);
}
.inline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
}
</style>
