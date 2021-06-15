<template>
  <div class="container">
    <router-link
      :to="url"
    >
      <img
        class="back-btn"
        src="@svg/arrow-back.svg"
      >
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BaseFrame',
  props: {
    url: { type: String, required: false, default: null },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 100rem;
}
</style>
