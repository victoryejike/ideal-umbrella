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
    <template v-if="$store.getters['auth/loggedIn']">
      <div class="menu">
        <router-link
          v-for="(item, index) in privateLinks"
          :key="index"
          class="link"
          :to="item.url"
        >
          {{ item.name }}
        </router-link>
        <BaseRoundButton
          class="create-btn btn-secondary btn-lg btn-bold"
          :text="$t('header.create')"
          url="/nft"
        />
        <router-link
          class="link"
          to="/wallet"
        >
          {{ $t('header.wallet') }}
        </router-link>
        <img
          class="avatar"
          height="40"
          :onerror="$global.handleAvatarError"
          :src="getAvatarURL()"
          width="40"
          @click="$refs.avatarMenu.toogle"
        >
        <BaseMenu
          ref="avatarMenu"
          :list="menuList"
        />
      </div>
    </template>

    <template v-else>
      <div class="menu">
        <router-link
          v-for="(item, index) in publicLinks"
          :key="index"
          class="link"
          :to="item.url"
        >
          {{ item.name }}
        </router-link>
        <hr class="vl">
        <BaseRoundButton
          class="btn-secondary btn-lg btn-bold"
          :text="$t('header.register')"
          url="/register"
        />
      </div>
    </template>
    <MobileMenuButton
      class="mobile-menu-btn"
    />
  </header>
</template>

<script>
import DefaultAvatar from '@img/default-avatar.png';
import MobileMenuButton from './MobileMenuButton.vue';

export default {
  name: 'AppHeader',
  components: { MobileMenuButton },
  data() {
    return {
      publicLinks: [
        {
          name: this.$t('header.discover'),
          url: '/discover',
        },
        {
          name: this.$t('header.my_nft'),
          url: '/profile',
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
      menuList: [
        { name: this.$t('header.profile'), action: '/profile' },
        { name: this.$t('header.setting'), action: '/account-setting' },
        { name: this.$t('header.logout'), action: () => { this.$store.dispatch('auth/logout'); } },
      ],
    };
  },
  computed: {
    privateLinks() {
      const privateLinks = this.publicLinks.slice(0);
      privateLinks.pop();
      return privateLinks;
    },
  },
  methods: {
    getAvatarURL() {
      return this.$store.getters['auth/avatar'] || DefaultAvatar;
    },
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
  opacity: 1;
  position: inherit;
}

.mobile-menu-btn {
  left: -9999rem;
  opacity: 0;
  position: absolute;
  top: -9999rem;
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

.create-btn {
  margin-left: 2.5rem;
}

.avatar {
  border-radius: 50%;
  cursor: pointer;
  margin-left: 2.5rem;
}

@media (max-width: 58em) {
  .menu {
    left: -9999rem;
    opacity: 0;
    position: absolute;
    top: -9999rem;
  }

  .mobile-menu-btn {
    opacity: 1;
    position: inherit;
  }
}
</style>
