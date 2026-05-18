import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/workbench' },
    {
      path: '/workbench',
      name: 'workbench',
      component: () => import('@/views/WorkbenchView.vue'),
    },
    {
      path: '/drills',
      name: 'drills',
      component: () => import('@/views/DrillsView.vue'),
    },
    {
      path: '/factories',
      name: 'factories',
      component: () => import('@/views/FactoriesView.vue'),
    },
    {
      path: '/energy',
      name: 'energy',
      component: () => import('@/views/EnergyView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
  ],
})

export default router
