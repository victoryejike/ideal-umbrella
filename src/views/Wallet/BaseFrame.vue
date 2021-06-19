<template>
  <div class="container">
    <span
      v-if=" $route.name == 'ConnectWallet'"
      class="title"
    >{{ title }}</span>
    <p
      v-if=" $route.name == 'ConnectWallet'"
      class="description"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UserBaseSettingFrame',
  props: {
    title: { type: String, required: false, default: null },
    description: { type: String, required: false, default: '' },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 100rem;
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
  white-space: break-spaces;
}

@media (max-width: 30em) {
  .title {
    font-size: 1.4rem;
  }
}

</style>
