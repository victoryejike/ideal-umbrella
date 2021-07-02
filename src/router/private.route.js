const privateRoute = [
  {
    path: '/nft',
    name: 'NFT',
    component: () => import('@view/Nft/Index.vue'),
  },
  {
    path: '/nft/create/:standard',
    name: 'CreateNFT',
    component: () => import('@view/Nft/CreateNFT.vue'),
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('@view/Wallet/Index.vue'),
  },
  {
    path: '/wallet/connect',
    name: 'ConnectWallet',
    component: () => import('@view/Wallet/Connect.vue'),
  },
  {
    path: '/account',
    name: 'AccountTabFrame',
    component: () => import('@view/Account/AccountTabFrame.vue'),
    children: [
      {
        path: '/account',
        beforeEnter: (to, from, next) => (next({ name: 'AccountSetting' })),
      },
      {
        path: 'profile/edit',
        name: 'EditProfile',
        components: {
          header: () => import('@view/Account/EditProfile/EditProfileHeader.vue'),
          content: () => import('@view/Account/EditProfile/EditProfileContent.vue'),
        },
      },
      {
        path: 'setting',
        name: 'AccountSetting',
        components: {
          header: () => import('@view/Account/Index/IndexHeader.vue'),
          content: () => import('@view/Account/Index/IndexContent.vue'),
        },
      },
    ],
  },
  {
    path: '/account/profile',
    name: 'Profile',
    component: () => import('@view/Account/Profile.vue'),
  },
  {
    path: '/account/setting/reset-password',
    name: 'ResetPassword',
    component: () => import('@view/Account/Setting/ResetPassword.vue'),
  },
  {
    path: '/account/setting/id-verification',
    name: 'IdentityVerification',
    component: () => import('@view/Account/Setting/Kyc.vue'),
  },
  {
    path: '/account/setting/rebind-phone',
    name: 'RebindPhone',
    component: () => import('@view/Account/Setting/RebindPhone.vue'),
  },
  {
    path: '/account/setting/rebind-email',
    name: 'RebindEmail',
    component: () => import('@view/Account/Setting/RebindEmail.vue'),
  },
];

Object.keys(privateRoute).forEach((key) => {
  privateRoute[key] = {
    ...privateRoute[key],
    meta: {
      requiresAuth: true,
    },
  };
});

export default privateRoute;
