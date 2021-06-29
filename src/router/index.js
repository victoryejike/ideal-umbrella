import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import publicRoute from './public.route';
import privateRoute from './private.route';

const routes = [
  ...publicRoute,
  ...privateRoute,
];

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
  router.smoothlyScroll();
  next();
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  // Auth isn't required for the route, just continue.
  if (!requiresAuth) return next();

  if (store.getters['auth/loggedIn']) return next();

  // Auth is required and the user is NOT currently logged in
  return next({ name: 'Login', query: { redirectFrom: to.fullPath } });
});

export default router;
