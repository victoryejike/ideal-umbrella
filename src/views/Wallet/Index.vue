<template>
  <div class="container">
    <BaseFrame
      url="/connect-wallet"
    />
    <Table />
  </div>
</template>
<script>
import Table from '@/components/Wallet/Table.vue';
// import BaseFrame from './BaseFrame.vue';

export default {
  name: 'NFT',
  components: { Table },
};

</script>
