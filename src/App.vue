<template>
  <AppMobileMenu
    id="menu"
    :key="key"
  />
  <div
    id="root"
    :class="{'scroll-lock': $store.getters['style/isMenuOpen']}"
  >
    <div
      id="wrapper"
    >
      <AppHeader
        id="header"
        :key="key"
      />
      <div id="content">
        <router-view v-slot="{ Component }">
          <Transition
            mode="out-in"
            name="fade"
          >
            <KeepAlive :include="cacheList">
              <Component
                :is="Component"
                :key="key"
              />
            </KeepAlive>
          </Transition>
        </router-view>
      </div>
    </div>
    <AppFooter
      id="footer"
      :key="key"
    />

    <BaseModal
      v-show="$store.getters['data/isWrongChain']"
      :has-closed-btn="false"
    >
      <template #body>
        <h2 style="text-align: center;">
          {{ $t('global.wrong_network') }}
        </h2>
        <p style="text-align: center;">
          {{ $t('global.wrong_network_des', [chainName]) }}
        </p>
      </template>
    </BaseModal>
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
  data() {
    return {
      key: 0,
      cacheList: ['Discover'],
    };
  },
  computed: {
    chainName() { return process.env.VUE_APP_ETH_CHAIN_NAME; },
  },
  created() {
    this.$api.GET_COUNTRIES();
    this.$global.detectingChain();
  },
  methods: {
    reRenderUI() {
      /*
        forceUpdate default will not rerender child components,
        bind a key to child components and update the key is the offical
        recommended implementation to rerender all components.
      */
      this.key += 1;
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main";
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@500;600;700;800&display=swap');

* {
  scrollbar-color: #c2d3ff transparent;
  text-overflow: ellipsis;
  transition: all 0.5s;
}

body {
  background: url('~@img/background.png') no-repeat center center fixed;
  background-size: cover;
  box-sizing: border-box;
  color: $base-text-color;
  font-family: 'Mulish', sans-serif;
  margin: 0;
}

a {
  color: #2c43ad;
  text-decoration: none;
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
  overflow: hidden;
}

/* Custom scrollbar for Chrome */
::-webkit-scrollbar {
  width: 0.8vw;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #c2d3ff;
  border-radius: 2rem;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #5e6ec2;
}

/* The reason using 70em is to fit the footer UI */

@media (max-width: 70em) {
  #wrapper {
    padding: 1rem 2rem 0 2rem;
  }

  #content {
    padding-top: 2.5rem;
  }

  #footer {
    padding: 2.5rem 2rem;
  }
}
</style>
