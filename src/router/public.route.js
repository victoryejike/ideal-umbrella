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
    name: 'Erro',
    component: () => import('@view/404.vue'),
  },
];

export default publicRoute;
