<template>
  <div class="no-item mt5-auto">
    <h3>{{ $t('created.no_item.bid') }}</h3>
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
