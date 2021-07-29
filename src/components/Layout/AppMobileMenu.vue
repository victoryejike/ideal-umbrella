<template>
  <div class="sidebar">
    <div
      v-if="$store.state.style.isMenuOpen"
      class="sidebar-backdrop"
      @click="$store.dispatch('style/toggleMenu')"
    />
    <Transition name="slide">
      <div
        v-if="$store.state.style.isMenuOpen"
        class="sidebar-panel"
      >
        <div class="menu-header">
          <img
            class="menu-logo"
            src="@svg/logo-white.svg"
          >
          <MobileMenuButton :active="true" />
        </div>
        <div class="menu-content">
          <div
            v-for="(item, index) in menuItemList"
            :key="index"
            :ref="`menu-${index}`"
            class="parent-menu-root"
          >
            <div
              class="parent-menu-btn"
              @click="handleClick(index)"
            >
              <div class="parent-menu-btn-title">
                <img
                  v-if="item.avatar"
                  class="menu-avatar"
                  height="30"
                  :onerror="$global.handleAvatarError"
                  :src="$global.handleAvatarURL(item.avatar)"
                  width="30"
                >
                {{ item.name }}
              </div>
              <div
                v-if="item.child"
                class="menu-btn-arrow"
              />
            </div>
            <div
              v-if="item.child"
              class="child-menu-root"
            >
              <div
                v-for="(childItem, index2) in item.child"
                :key="index * 1000 + index2"
                class="child-menu-btn"
                @click="handleClick(index * 1000 + index2)"
              >
                <span class="child-menu-btn-title">{{ childItem.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <SocialAndCopyRightBlock class="menu-footer" />
      </div>
    </Transition>
  </div>
</template>

<script>
import MobileMenuButton from './MobileMenuButton.vue';
import SocialAndCopyRightBlock from './SocialAndCopyRightBlock.vue';

export default {
  name: 'AppMobileMenu',
  components: { MobileMenuButton, SocialAndCopyRightBlock },
  data() {
    return {
      baseList: [
        { name: this.$t('menu.discovery'), action: '/discover' },
        {
          name: this.$t('menu.nft.title'),
          child: [
            { name: this.$t('menu.nft.create'), action: '/nft' },
            { name: this.$t('menu.nft.wallet'), action: '/wallet' },
          ],
        },
        { name: this.$t('menu.how_it_works'), action: '/FAQ' },
        {
          name: this.$t('menu.fanschain.title'),
          child: [
            { name: this.$t('menu.fanschain.exchange'), action: '/' },
            { name: this.$t('menu.fanschain.fto'), action: '/' },
            { name: this.$t('menu.fanschain.community'), action: '/' },
          ],
        },
      ],
    };
  },
  computed: {
    unLoginList() {
      return [...this.baseList,
        { name: this.$t('menu.login'), action: '/login' },
        { name: this.$t('menu.register'), action: '/register' },
      ];
    },
    loggedInList() {
      return [...this.baseList, {
        name: this.$store.getters['auth/username'],
        avatar: this.$store.getters['auth/avatar'],
        child: [
          { name: this.$t('menu.profile.edit_profile'), action: '/account/profile' },
          { name: this.$t('menu.profile.setting'), action: '/account/setting' },
          { name: this.$t('menu.profile.logout'), action: () => { this.$store.dispatch('auth/logout'); } },
        ],
      }];
    },
    menuItemList() {
      return this.$store.getters['auth/isLoggedIn'] ? this.loggedInList : this.unLoginList;
    },
  },
  methods: {
    handleClick(index) {
      // Which mean child button
      if (index >= 1000) {
        const parentIndex = (index / 1000).toFixed(0);
        const childIndex = index % 1000;
        this.handleAction(this.menuItemList[parentIndex].child[childIndex].action);
      } else if (this.menuItemList[index].child) {
        // Which mean the parent button has dropdown menu

        const rootClass = this.$refs[`menu-${index}`].classList;
        return rootClass.contains('open') ? rootClass.remove('open') : rootClass.add('open');
      } else {
        // Which mean the parent button without dropdown menu

        this.handleAction(this.menuItemList[index].action);
      }
      return true;
    },
    handleAction(action) {
      if (typeof action === 'string') {
        this.$router.push(action);
      } else if (typeof action === 'function') {
        action();
      }
      this.$store.dispatch('style/toggleMenu');
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  position: fixed;
  transition: width 0s;
  width: 100vw;
  z-index: 999;
}

.sidebar-panel {
  background-color: #2c43ad;
  border-right: rgba(255, 255, 255, 0.25) 0.1rem solid;
  height: 100vh;
  max-width: 22.5rem;
  overflow: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  padding: 3rem 0 2rem 0;
  position: absolute;
  scrollbar-width: none;  /* Firefox */
  z-index: 999;
}

.sidebar-panel::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

.menu-header {
  display: flex;
  justify-content: space-between;
  padding: 0 1.875rem;
}

.menu-content {
  color: #fff;
  margin-top: 3.3rem;
}

.menu-avatar {
  border: 0.1rem solid #fff;
  border-radius: 50%;
  margin-right: 0.625rem;
}

.menu-footer {
  color: #c4c4c4;
  font-size: 0.75rem;
  margin-left: 1.875rem;
  margin-top: 2rem;
}

/* Menu Button CSS */
.parent-menu-root {
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.25);
  max-height: 1.375rem;
  overflow: hidden;
  padding: 1.5rem 1.875rem;
}

.parent-menu-btn {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: space-between;
}

.parent-menu-btn-title {
  align-items: center;
  display: flex;
}

.child-menu-root {
  padding: 1rem 0.625rem 0 0.625rem;
}

.child-menu-btn {
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 1rem 0;
}

/* Arrow CSS */

.menu-btn-arrow {
  height: 1rem;
  position: relative;
  width: 1rem;
}

.menu-btn-arrow::before,
.menu-btn-arrow::after {
  background-color: #fff;
  border-radius: 1.4rem;
  content: "";
  height: 100%;
  position: absolute;
  transition: all 0.5s;
  width: 0.25rem;
}

.menu-btn-arrow::before {
  left: -0.25rem;
  transform: rotate(-45deg);
}

.menu-btn-arrow::after {
  left: 0.3rem;
  transform: rotate(45deg);
}

.open {
  max-height: 15rem;
}

.open .menu-btn-arrow::before {
  left: -0.25rem;
  transform: rotate(45deg);
}

.open .menu-btn-arrow::after {
  left: 0.3rem;
  transform: rotate(-45deg);
}
</style>
