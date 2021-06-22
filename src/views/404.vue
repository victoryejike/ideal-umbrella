<template>
  <div class="container-bg">
    <img src="@/assets/image/nft-hero.png">
    <p>{{ $t('error_page.message') }}</p>
    <div class="mt-3">
      <BaseRoundButton
        class="send-btn btn-primary btn-md"
        :text="$t('error_page.btn')"
      />
    </div>
  </div>
</template>

<style scoped>
.container-bg {
  background-image: url('../assets/image/bg-404.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -4rem;
  position: absolute;
  right: 0.4rem;
  text-align: center;
  width: 100%;
}

.container-bg img {
  width: 22rem;
}

.container-bg p {
  color: #fff;
  font-size: 1.7rem;
  left: 0;
  margin-top: -12rem;
  position: absolute;
  right: 0;
}

.mt-3 {
  margin: 3rem;
  text-align: center;
}

.mt-3 button {
  display: initial;
}
</style>
