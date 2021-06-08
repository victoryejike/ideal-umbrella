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
  {
    path: '/nft',
    name: 'NFT',
    component: () => import('@view/Nft/Index.vue'),
  },
  {
    path: '/nft/single',
    name: 'CollectibleSingle',
    component: () => import('@view/Nft/CollectibleSingle.vue'),
  },
  {
    path: '/nft/multiple',
    name: 'CollectibleMultiple',
    component: () => import('@view/Nft/CollectibleMultiple.vue'),
  },
  {
    path: '/connect-wallet',
    name: 'ConnectWallet',
    component: () => import('@view/Wallet/Connect.vue'),
  },
  {
    path: '/token-details',
    name: 'TokenDetails',
    component: () => import('@view/Nft/TokenDetails.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const smoothlyScroll = (pos, time) => {
  const currentPos = window.pageYOffset;
  let start = null;
  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    const progress = currentTime - start;
    if (currentPos < pos) {
      window.scrollTo(0, (((pos - currentPos) * progress) / time) + currentPos);
    } else {
      window.scrollTo(0, currentPos - (((currentPos - pos) * progress) / time));
    }
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, pos);
    }
  });
};

router.beforeEach((to, from, next) => {
  /**
   *  Here not using window.scrollTo({ top: 0, behavior: 'smooth' })
   *  because Safari and mobile broswer not support this feature.
   */
  smoothlyScroll(0, 250);
  next();
});

export default router;
