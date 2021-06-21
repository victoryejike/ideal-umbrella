<template>
  <div class="container-bg">
    <img src="@/assets/image/nft-hero.png">
    <p>Looks like you’re lost!</p>
  </div>
</template>

<style scoped>
.container-bg {
  background-image: url('../assets/image/bg-404.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
</style>
