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
            @click="handleClick(index)"
          >
            <span class="menu-title">{{ item.name }}</span>
            <i
              v-if="item.child"
              class="arrow"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import MobileMenuButton from './MobileMenuButton.vue';

export default {
  name: 'AppMobileMenu',
  components: { MobileMenuButton },
  data() {
    return {
      menuItemList: [
        { name: 'Discovery', url: '' },
        { name: 'My NFT', url: null, child: [] },
        { name: 'How it works', url: '' },
        { name: 'Fanschain', url: null, child: [] },
        { name: 'Login', url: '' },
        { name: 'Register', url: '' },
      ],
    };
  },
  methods: {
    handleClick(index) {
      if (this.menuItemList[index].child) {
        const { classList } = this.$refs[`menu-${index}`];
        if (classList.contains('open')) {
          classList.remove('open');
        } else {
          classList.add('open');
        }
      } else {
        this.$router.push(this.menuItemList[index].url);
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
  overflow-y: auto;
  padding: 3rem 0 2rem 0;
  position: fixed;
  width: 24rem;
  z-index: 999;
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

.menu-btn {
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  justify-content: space-between;
  padding: 1.5rem 1.875rem 1.5rem 1.875rem;
  position: relative;
}

.arrow {
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

.open .arrow::before {
  left: -0.25rem;
  transform: rotate(45deg);
}

.open .arrow::after {
  left: 0.25rem;
  transform: rotate(-45deg);
}
</style>
