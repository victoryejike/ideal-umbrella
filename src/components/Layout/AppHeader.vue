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
    <template v-if="showWallet === true">
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
          :src="$global.handleAvatarURL(avatar)"
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
        <!-- <BaseRoundButton
          class="btn-secondary btn-lg btn-bold"
          :text="$t('header.connect')"
          url="/wallet/connect"
        /> -->
        <img
          class="avatar"
          height="40"
          :onerror="$global.handleAvatarError"
          :src="$global.handleAvatarURL(avatar)"
          width="40"
          @click="$refs.avatarMenu.toogle"
        >
        <BaseMenu
          ref="avatarMenu"
          :list="publicMenuList"
        />
      </div>
    </template>
    <MobileMenuButton
      class="mobile-menu-btn"
    />
  </header>
</template>

<script>
// import store from '@/store';
import Web3 from 'web3';
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
          url: '/account/profile',
        },
        {
          name: this.$t('header.how_it_works'),
          url: '/FAQ',
        },
      ],
      publicMenuList: [
        { name: this.$t('header.profile'), action: '/account/profile' },
        { name: this.$t('header.setting'), action: '/account/setting' },
      ],
      menuList: [
        { name: this.$t('header.profile'), action: '/account/profile' },
        { name: this.$t('header.setting'), action: '/account/setting' },
        { name: this.$t('header.logout'), action: () => { this.$store.dispatch('data/disconnect'); } },
      ],
    };
  },
  computed: {
    privateLinks() {
      const privateLinks = this.publicLinks.slice(0);
      // privateLinks.pop();
      return privateLinks;
    },
    showWallet() {
      const Address = localStorage.getItem('account');
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts((err, accounts) => {
        if ((accounts.length !== 0) && (Address !== null)) this.$store.commit('data/isWalletConnected', true);
      });
      return this.$store.getters['data/isWalletConnected'];
    },
    avatar() { return this.$store.getters['auth/avatar']; },
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
  object-fit: cover;
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
