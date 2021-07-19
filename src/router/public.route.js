import store from '@/store';
import i18n from '@/utils/i18n';

const $t = i18n.global.t;

const publicRoute = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@view/Index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@view/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/isLoggedIn']) {
        next();
      } else if (store.getters['auth/isExpired']) {
        store.dispatch('auth/logout');
        next({ params: { errorMsg: $t('router.expired') } });
      } else {
        next({ name: 'Profile' });
      }
    },
  },
  {
    path: '/2fa',
    name: '2FA',
    component: () => import('@view/2FA.vue'),
    beforeEnter: (to, from, next) => (to.params?.formData ? next() : next({ name: 'Login', params: { errorMsg: $t('router.invalid_access') } })),
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
    path: '/update-password',
    name: 'UpdatePassword',
    component: () => import('@view/UpdatePassword.vue'),
    beforeEnter: (to, from, next) => (to.params?.token ? next() : next({ name: 'ForgotPassword', params: { errorMsg: $t('router.invalid_access') } })),
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('@view/Discover.vue'),
  },
  {
    path: '/nft/:id',
    name: 'TokenDetails',
    component: () => import('@view/Nft/TokenDetails.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PathNotFound',
    component: () => import('@view/404.vue'),
  },
];

export default publicRoute;
