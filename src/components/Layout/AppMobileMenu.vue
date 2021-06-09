<template>
  <div class="sidebar">
    <div
      v-if="$store.state.isMenuOpen"
      class="sidebar-backdrop"
      @click="$store.commit('toggleMenu')"
    />
    <Transition name="slide">
      <div
        v-if="$store.state.isMenuOpen"
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
            class="menu-btn"
          >
            <div
              class="menu-title-container"
              @click="handleClick(index)"
            >
              <div class="menu-title">
                {{ item.name }}
              </div>
              <div
                v-if="item.child"
                class="arrow"
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
                <span class="child-menu-title">{{ childItem.name }}</span>
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
      menuItemList: [
        { name: 'Discovery', url: '/login' },
        {
          name: 'My NFT',
          url: null,
          child: [
            { name: 'Create NFT', url: '/nft' },
            { name: 'Wallet', url: '/wallet' },
          ],
        },
        { name: 'How it works', url: '/' },
        {
          name: 'Fanschain',
          url: null,
          child: [
            { name: 'Exchange', url: '/' },
            { name: 'Fan Token Offering', url: '/' },
            { name: 'Community', url: '/' },
          ],
        },
        { name: 'Login', url: '/login' },
        { name: 'Register', url: '/register' },
      ],
    };
  },
  methods: {
    handleClick(index) {
      // Which mean child button
      if (index >= 1000) {
        const parentIndex = (index / 1000).toFixed(0);
        const childIndex = index % 1000;
        this.$router.push(this.menuItemList[parentIndex].child[childIndex].url);
        this.$store.commit('toggleMenu');
        return;
      }

      if (this.menuItemList[index].child) {
        const rootClass = this.$refs[`menu-${index}`].classList;
        if (rootClass.contains('open')) {
          rootClass.remove('open');
        } else {
          rootClass.add('open');
        }
      } else {
        this.$router.push(this.menuItemList[index].url);
        this.$store.commit('toggleMenu');
      }
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
  cursor: pointer;
  height: 100vh;
  position: fixed;
  width: 100vw;
}

.sidebar-panel {
  background-color: #2c43ad;
  height: 100vh;
  overflow-y: scroll;
  padding: 3rem 0 2rem 0;
  position: absolute;
  width: 24rem;
  z-index: 999;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  padding: 0 1.875rem;
}

.menu-title-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.menu-content {
  color: #fff;
  margin-top: 3.3rem;
}

.menu-btn {
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: space-between;
  max-height: 1.375rem;
  overflow: hidden;
  padding: 1.5rem 1.875rem;
  position: relative;
}

.menu-title {
  cursor: pointer;
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

.menu-footer {
  color: #c4c4c4;
  margin-left: 1.875rem;
  margin-top: 2rem;
}

/* Arrow CSS */

.arrow {
  cursor: pointer;
  height: 1rem;
  margin-bottom: auto;
  margin-top: auto;
  position: relative;
  width: 1rem;
}

.arrow::before,
.arrow::after {
  background-color: #fff;
  border-radius: 1.4rem;
  content: "";
  height: 100%;
  position: absolute;
  transition: all 0.5s;
  width: 0.25rem;
}

.arrow::before {
  left: -0.25rem;
  transform: rotate(-45deg);
}

.arrow::after {
  left: 0.25rem;
  transform: rotate(45deg);
}

.open {
  max-height: 15rem;
}

.open .arrow::before {
  left: -0.25rem;
  transform: rotate(45deg);
}

.open .arrow::after {
  left: 0.25rem;
  transform: rotate(-45deg);
}
</style>
