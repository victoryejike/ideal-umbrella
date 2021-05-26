<template>
  <div class="container">
    <h1>{{ $t('default') }}</h1>
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {
    // Component: () => import('@/components/Component.vue'),
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
