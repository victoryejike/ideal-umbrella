<template>
  <BaseFrame>
    <Table />
  </BaseFrame>
</template>
<script>
import Table from '@/components/Wallet/Table.vue';
import BaseFrame from './BaseFrame.vue';

export default {
  name: 'NFT',
  components: { BaseFrame, Table },
};

</script>

<style scoped>
</style>
