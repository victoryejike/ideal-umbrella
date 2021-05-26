import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@view/Index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@view/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
