<template>
  <div class="container">
    <router-link to="/account-setting">
      <img
        class="back-btn"
        src="@svg/arrow-back.svg"
      >
    </router-link>
    <span class="title">{{ title }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UserBaseSettingFrame',
  props: { title: { type: String, required: true } },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 24rem;
}

.title {
  color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: bold;
  margin-top: 2.5rem;
}
</style>
