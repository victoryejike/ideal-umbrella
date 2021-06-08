<template>
  <BaseFrame>
    <Table />
  </BaseFrame>
</template>
<script>
import BaseFrame from './BaseFrame.vue';
import Table from '../../components/Wallet/Table.vue';

export default {
  name: 'NFT',
  components: { BaseFrame, Table },
};

</script>

<style scoped>
</style>
