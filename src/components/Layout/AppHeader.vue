<template>
  <header>
    <router-link to="/">
      <img
        class="logo"
        height="24"
        src="@svg/logo.svg"
        width="102"
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
        class="btn-primary btn-lg btn-bold"
        :text="$t('header.register')"
        type="secondary"
        url="/register"
      />
    </div>
    <img
      class="mobile-menu"
      height="20"
      src="@svg/mobile-menu.svg"
      width="20"
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
          url: '/nft',
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
  left: -9999rem;
  opacity: 0;
  position: absolute;
  top: -9999rem;
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

@media (min-device-width: 54em) {
  .menu {
    opacity: 100;
    position: inherit;
    transition: opacity 1s;
  }

  .mobile-menu {
    left: -9999rem;
    opacity: 0;
    position: absolute;
    top: -9999rem;
    transition: opacity 1s;
  }
}
</style>
