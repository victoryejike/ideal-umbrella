import { createRouter, createWebHashHistory } from 'vue-router';
import publicRoute from './public.route';
import privateRoute from './private.route';

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

  // Async check the token is expired or not, if yes Axios interceptors will handle redirection
  if (requiresAuth) { router.$api.CHECK_TOKEN(); }
  next();
});

export default router;
