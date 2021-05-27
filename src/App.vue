<template>
  <div id="wrapper">
    <AppHeader id="header" />
    <div id="content">
      <router-view v-slot="{ Component }">
        <Transition
          name="fade"
          mode="out-in"
        >
          <KeepAlive>
            <Component :is="Component" />
          </KeepAlive>
        </Transition>
      </router-view>
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
  padding: 1rem 2rem 0 2rem;
  transition: all 0.5s;
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
  padding-top: 1.5rem;
  transition: all 0.5s;
}

#footer {
  min-height: 10vh;
  padding: 2.5rem 2rem 2.5rem 2rem;
  transition: all 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-device-width: 70rem) {
  #wrapper {
    padding: 2.5rem 8rem 0 8rem !important;
    transition: all 0.5s;
  }

  #content {
    padding-top: 3.5rem !important;
    transition: all 0.5s;
  }

  #footer {
    padding: 5rem 8rem 5rem 8rem !important;
    transition: all 0.5s;
  }
}
</style>
