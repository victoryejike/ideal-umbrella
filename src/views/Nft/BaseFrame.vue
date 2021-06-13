<template>
  <div class="container">
    <router-link
      :class="{'hide': $route.name == 'NFT'}"
      to="/nft"
    >
      <img
        class="back-btn"
        src="@svg/arrow-back.svg"
      >
    </router-link>
    <span class="title">{{ title }}</span>
    <p class="description">
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UserBaseSettingFrame',
  props: { title: { type: String, required: true }, description: { type: String, required: false, default: '' } },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 50rem;
}

.hide {
  display: none;
}

.title {
  font-size: 2rem;
  font-style: normal;
  font-weight: bold;
  margin-top: 2.5rem;
}

.description {
  color: #808080;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1.99rem;
  white-space: normal;
}

@media (max-width: 30em) {
  .title {
    font-size: 1.4rem;
  }
}

</style>
