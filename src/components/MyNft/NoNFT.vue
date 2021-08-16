<template>
  <div class="no-item">
    <h3 class="no-item-title">
      {{ $t('created.no_item.found') }}
    </h3>
    <p class="no-item-content">
      {{ $t('created.no_item.text') }}
    </p>
    <router-link
      to="/nft"
    >
      <BaseRoundButton
        class="btn-primary btn-lg btn-bold m-auto"
        :text="$t('created.no_item.btn')"
        type="secondary"
      />
    </router-link>
  </div>
</template>
<script>

export default {
  name: 'NoNFT',
};

</script>

<style scoped>
.no-item {
  margin: 5rem auto;
  text-align: center;
}

.m-auto {
  margin: auto;
}

.no-item-title {
  font-size: 2rem;
}

.no-item-content {
  color: #808080;
  font-size: 1rem;
}
</style>
