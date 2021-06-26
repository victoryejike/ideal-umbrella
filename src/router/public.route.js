import store from '@/store';

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
      if (store.getters['auth/loggedIn']) {
        return next({ name: 'Profile' });
      }
      return next();
    },
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
  },
  {
    path: '/token-details/:id',
    name: 'TokenDetails',
    component: () => import('@view/Nft/TokenDetails.vue'),
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('@view/Discover.vue'),
  },
  {
    path: '/404',
    name: 'Error',
    component: () => import('@view/404.vue'),
  },
];

export default publicRoute;
