<template>
  <div class="container">
    <h1 class="error-title">
      {{ $t('error_page.message') }}
    </h1>
    <img
      class="error-image"
      src="@img/bg-404.png"
    >
    <BaseRoundButton
      class="home-btn btn-primary btn-xxl"
      :text="$t('error_page.btn')"
      url="/"
    />
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.container {
  margin-top: -6rem;
}

.error-image {
  margin-left: -8.125rem;
  width: 90rem;
}

.error-title {
  color: #fff;
  font-size: 4rem;
  margin: auto auto;
  margin-top: 20rem;
  position: absolute;
  text-align: center;
  width: 73.75rem;
}

.home-btn {
  margin: auto auto;
  margin-top: -5rem;
}
</style>
