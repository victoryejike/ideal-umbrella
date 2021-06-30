const privateRoute = [
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
    path: '/nft/create/:standard',
    name: 'CreateNFT',
    component: () => import('@view/Nft/CreateNFT.vue'),
  },
  {
    path: '/connect-wallet',
    name: 'ConnectWallet',
    component: () => import('@view/Wallet/Connect.vue'),
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('@view/Wallet/Index.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@view/MyNft/Profile.vue'),
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: () => import('@view/MyNft/EditProfile.vue'),
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
