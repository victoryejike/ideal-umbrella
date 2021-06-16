<template>
  <BaseFrame
    url="/connect-wallet"
  />
  <Table />
</template>
<script>
import Table from '@/components/Wallet/Table.vue';
// import BaseFrame from './BaseFrame.vue';

export default {
  name: 'NFT',
  components: { Table },
};

</script>

<style scoped>
</style>
