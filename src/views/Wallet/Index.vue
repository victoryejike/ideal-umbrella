<template>
  <div class="container">
    <BaseFrame
      url="/wallet/connect"
    />
    <div
      class="mt-2"
    >
      <img
        src="@svg/huobi.svg"
        width="15"
      >
      <span>
        0xa4fcd1ae1...4eac
      </span>
      <div
        class="flex"
      >
        <BaseRoundButton
          class="btn-outline-primary btn-sm copy"
          :text="$t('wallet.copy')"
        />
        <router-link
          to="/wallet/connect"
        >
          <BaseRoundButton
            class="btn-outline-primary btn-sm other-wallet"
            :text="$t('wallet.other_waalet')"
          />
        </router-link>
      </div>
    </div>
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
<style scoped>
.mt-2 {
  display: flex;
  margin-top: 2rem;
}

.mt-2 span {
  font-size: 1.5rem;
  margin: 0.7rem;
}

.copy {
  height: 2rem;
  margin-top: 1rem;
  width: 6rem;
}

.other-wallet {
  height: 2rem;
  margin-left: 0.5rem;
  margin-top: 1rem;
}

.flex {
  display: flex;
}

@media (max-width: 35em) {
  .mt-2 {
    display: block;
  }
}
</style>
