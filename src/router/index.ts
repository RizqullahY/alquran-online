import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurahDetailView from '../views/SurahDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView,},
    { path: '/surah',name: 'surah', component: () => import('../views/SurahView.vue')},
    { path: '/surah/:nomor',name: 'surah-detail', component: SurahDetailView, props: true},
  ],
})

export default router
