<template>
  <div id="wrapper">
    <AppHeader id="header" />
    <div id="content">
      <Transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </Transition>
    </div>
  </div>
  <AppFooter id="footer" />
</template>

<script>
import AppHeader from '@/components/Layout/AppHeader.vue';
import AppFooter from '@/components/Layout/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.routeEffect = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@500;600;700;800&display=swap');

body {
  background: url('./assets/image/background.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  box-sizing: border-box;
  color: #000;
  font-family: 'Mulish', sans-serif;
  margin: 0;
}

a {
  color: #2c43ad;
  text-decoration: none;
  white-space: nowrap;
}

#wrapper {
  padding: 2.5rem 8rem 0 8rem;
}

#header {
  margin: auto auto;
  max-width: 90rem;
  min-height: 10vh;
}

#content {
  margin: auto auto;
  max-width: 90rem;
  min-height: 80vh;
  padding-bottom: 3.5rem;
  padding-top: 3.5rem;
}

#footer {
  min-height: 10vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
