<template>
  <AppMobileMenu id="menu" />
  <div
    id="root"
    :class="{'scroll-lock':$store.state.isMenuOpen}"
  >
    <div
      id="wrapper"
    >
      <AppHeader id="header" />
      <div id="content">
        <router-view v-slot="{ Component }">
          <Transition
            mode="out-in"
            name="fade"
          >
            <Component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
    <AppFooter id="footer" />
  </div>
</template>

<script>
import AppHeader from '@/components/Layout/AppHeader.vue';
import AppFooter from '@/components/Layout/AppFooter.vue';
import AppMobileMenu from '@/components/Layout/AppMobileMenu.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    AppMobileMenu,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@500;600;700;800&display=swap');

* {
  transition: all 0.5s;
}

body {
  background: url('./assets/image/background.png') no-repeat center center fixed;
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
  max-width: 73.75rem;
  min-height: 10vh;
}

#content {
  margin: auto auto;
  max-width: 73.75rem;
  min-height: 80vh;
  padding-bottom: 3.75rem;
  padding-top: 3.75rem;
}

#footer {
  min-height: 10vh;
  padding: 5rem 8rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scroll-lock {
  height: 100vh;
  overflow: hidden hidden;
}

/* The reason using 70em is to fit the footer UI */

@media (max-width: 70em) {
  #wrapper {
    padding: 1rem 2rem 0 2rem;
  }

  #content {
    padding-top: 1.5rem;
  }

  #footer {
    padding: 2.5rem 2rem 2.5rem 2rem;
  }
}
</style>
