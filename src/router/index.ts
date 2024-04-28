import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mode',
      name: 'mode',
      component: () => import('@/views/ModeView.vue')
    },
    {
      path: '/game/find-member',
      name: 'find-member-game',
      component: () => import('@/views/game/FindMemberGameView.vue')
    }
  ]
})

export default router
