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
  {
    path: '/register',
    name: 'Register',
    component: () => import('@view/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@view/ForgotPassword.vue'),
  },
  {
    path: '/account-setting',
    name: 'AccountSetting',
    component: () => import('@view/User/Index.vue'),
  },
  {
    path: '/account-setting/reset-password',
    name: 'ResetPassword',
    component: () => import('@view/User/ResetPassword.vue'),
  },
  {
    path: '/account-setting/id-verification',
    name: 'IdentityVerification',
    component: () => import('@view/User/Kyc.vue'),
  },
  {
    path: '/account-setting/rebind-phone',
    name: 'RebindPhone',
    component: () => import('@view/User/RebindPhone.vue'),
  },
  {
    path: '/account-setting/rebind-email',
    name: 'RebindEmail',
    component: () => import('@view/User/RebindEmail.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // fixing unusual behavior in Chrome
  if (from.fullPath !== to.fullPath) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  next();
});

export default router;
