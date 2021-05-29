<template>
  <header>
    <router-link to="/">
      <img
        class="logo"
        src="@svg/logo.svg"
      >
    </router-link>
    <div class="menu">
      <router-link
        v-for="(item, index) in links"
        :key="index"
        class="link"
        :to="item.url"
      >
        {{ item.name }}
      </router-link>
      <hr class="vl">
      <BaseRoundButton
        :bold="true"
        type="secondary"
        :text="$t('header.register')"
        url="/register"
      />
    </div>
    <img
      class="mobile-menu"
      src="@svg/mobile-menu.svg"
    >
  </header>
</template>

<script>

export default {
  name: 'AppHeader',
  data() {
    return {
      links: [
        {
          name: this.$t('header.discover'),
          url: '/',
        },
        {
          name: this.$t('header.my_nft'),
          url: '/',
        },
        {
          name: this.$t('header.how_it_works'),
          url: '/',
        },
        {
          name: this.$t('header.fanschain'),
          url: '/',
        },
        {
          name: this.$t('header.login'),
          url: '/login',
        },
      ],
    };
  },
};
</script>

<style scoped>
header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.menu {
  align-items: center;
  display: flex;
  left: -9999px;
  opacity: 0;
  position: absolute;
  top: -9999px;
  transition: opacity 1s;
}

.mobile-menu {
  opacity: 100;
  position: inherit;
  transition: opacity 1s;
}

.link {
  color: #000;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 2.5rem;
}

.vl {
  background: #aaade1;
  border: 0.1rem solid #aaade1;
  height: 1.5rem;
  margin: 1.2rem 1.2rem;
  opacity: 0.3;
}

@media (min-device-width: 60rem) {
  .menu {
    opacity: 100;
    position: inherit;
    transition: opacity 1s;
  }

  .mobile-menu {
    left: -9999px;
    opacity: 0;
    position: absolute;
    top: -9999px;
    transition: opacity 1s;
  }
}
</style>
