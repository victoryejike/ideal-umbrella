import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import i18n from '@/utils/i18n';
import publicRoute from './public.route';
import privateRoute from './private.route';

const $t = i18n.global.t;

const routes = [
  ...publicRoute,
  ...privateRoute,
];

Object.keys(routes).forEach((key) => {
  if (routes[key]?.meta?.nickname !== null) {
    if (routes[key].meta == null) { routes[key].meta = {}; }
    routes[key].meta.nickname = routes[key].name;
  }
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.smoothlyScroll = (pos = 0, time = 250) => {
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
  next();
  router.smoothlyScroll();
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  if (requiresAuth) {
    if (!store.getters['auth/isLoggedIn']) {
      return router.push({ name: 'Login', params: { redirectFrom: to.path } });
    }

    if (store.getters['auth/isExpired']) {
      store.dispatch('auth/logout');
      return router.push({ name: 'Login', params: { redirectFrom: to.path, errorMsg: $t('router.expired') } });
    }
  }
  return next();
});

export default router;
