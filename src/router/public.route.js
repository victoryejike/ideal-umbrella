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
];

export default publicRoute;
