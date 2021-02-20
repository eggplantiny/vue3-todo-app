import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Todo from '@/views/Todo/index.vue'
import Playground from '@/views/Playground.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Todo',
    name: Todo.name,
    component: Todo
  },
  {
    path: '/Playground',
    name: Playground.name,
    component: Playground
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
