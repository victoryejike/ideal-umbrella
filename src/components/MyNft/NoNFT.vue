<template>
  <div class="no-item mt5-auto">
    <h3>{{ $t('created.no_item.found') }}</h3>
    <p>{{ $t('created.no_item.text') }}</p>
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
  name: 'Created',
};

</script>

<style scoped>
.no-item {
  max-width: 1005rem;
  text-align: center;
}

.mt5-auto {
  margin: 5rem auto;
}

.m-auto {
  margin: auto;
}

.no-item h3 {
  font-size: 2rem;
}

.no-item p {
  color: #808080;
  font-size: 1rem;
}
</style>
