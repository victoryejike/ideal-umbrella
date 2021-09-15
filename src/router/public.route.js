import store from '@/store';
import i18n from '@/utils/i18n';

const $t = i18n.global.t;

const publicRoute = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@view/Index.vue'),
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@view/Login.vue'),
  //   beforeEnter: (to, from, next) => {
  //     if (store.getters['auth/isLoggedIn']) {
  //       if (!store.getters['auth/isExpired']) {
  //         return next({ name: 'Profile' });
  //       }
  //       store.dispatch('auth/logout');
  //       const { params } = to;
  //       params.errorMsg = $t('router.expired');
  //     }
  //     return next();
  //   },
  // },
  {
    path: '/2fa',
    name: '2FA',
    component: () => import('@view/2FA.vue'),
    beforeEnter: (to, from, next) => (to.params?.formData ? next() : next({ name: 'Login', params: { errorMsg: $t('router.invalid_access') } })),
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('@view/Register.vue'),
  // },
  // {
  //   path: '/forgot-password',
  //   name: 'ForgotPassword',
  //   component: () => import('@view/ForgotPassword.vue'),
  // },
  // {
  //   path: '/update-password',
  //   name: 'UpdatePassword',
  //   component: () => import('@view/UpdatePassword.vue'),
  //   beforeEnter: (to, from, next) => (to.params?.token ? next() : next({
  // name: 'ForgotPassword', params: { errorMsg: $t('router.invalid_access') } })),
  // },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('@view/Discover.vue'),
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: () => import('@view/FAQ.vue'),
  },
  {
    path: '/nft/:id',
    name: 'TokenDetails',
    component: () => import('@view/Nft/TokenDetails.vue'),
    beforeEnter: async (to, from, next) => {
      const data = await store.$api.GET_NFT_DETAILS(to.params?.id);
      if (data) {
        next();
      } else {
        this.$router.push({ name: 'PathNotFound' });
      }
    },
  },
  {
    path: '/account/profile/:walletAddress',
    name: 'Profile',
    component: () => import('@view/Account/Profile.vue'),
    beforeEnter: async (to, from, next) => {
      if (to.params?.walletAddress !== null || to.params?.walletAddress !== undefined) {
        const data = await store.$api.GET_OWNED_NFT(to.params?.walletAddress);
        console.log(data);
        if (data) {
          const { params } = to;
          params.nft = data;
          next();
        } else {
          return next({ name: 'ConnectWallet' });
        }
      } else {
        return next({ name: 'ConnectWallet' });
      }
      return next();
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PathNotFound',
    component: () => import('@view/404.vue'),
  },
];

export default publicRoute;
