import { createRouter, createWebHistory } from 'vue-router'
import app from '~/app.vue';

const routes = [
  {
    path: '/post/:id',
    name: 'ProductDetaile',
    component: app,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;