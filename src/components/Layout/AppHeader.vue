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
        text="Register"
        url="/register"
      />
    </div>
  </header>
</template>

<script>
import BaseRoundButton from '@/components/UI/BaseRoundButton.vue';

export default {
  name: 'AppHeader',
  components: { BaseRoundButton },
  data() {
    return {
      links: [
        {
          name: 'Discover',
          url: '/',
        },
        {
          name: 'My Item',
          url: '/',
        },
        {
          name: 'My Profile',
          url: '/',
        },
        {
          name: 'How it works',
          url: '/',
        },
        {
          name: 'Fanschain',
          url: '/',
        },
        {
          name: 'Login',
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
  flex-direction: column column;
  justify-content: space-between;
}

.menu {
  align-items: center;
  display: flex;
}

.link {
  color: #000;
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
</style>
