<template>
  <BaseFrame
    :description="$t('connect_wallet.description')"
    :title="$t('connect_wallet.title')"
  >
    <div class="flex">
      <ConnectCard
        btn="true"
        btntext="Recommended"
        img="../../assets/svg/huobi.svg"
        text="Connect via app on your phone"
        type="HUOBI WALLET"
      />
      <ConnectCard
        btn="true"
        btntext="Most popular"
        img="../../assets/svg/metamask_Fox 1.svg"
        text="One of the most secure wallets with great flexibility"
        type="METAMASK"
      />
      <ConnectCard
        btn="false"
        img="../../assets/svg/coinbase.svg"
        text="Connect via app on your phone"
        type="COINBASE"
      />
    </div>
  </BaseFrame>
</template>
<script>
import BaseFrame from './BaseFrame.vue';
import ConnectCard from '../../components/Wallet/ConnectCard.vue';

export default {
  name: 'NFT',
  components: { BaseFrame, ConnectCard },
};

</script>

<style scoped>
.flex {
  display: flex;
}

@media (max-width: 42.875em) {
  .flex {
    display: block;
  }

  .nft-card {
    height: 18.75rem;
    margin: 1.875rem auto;
    width: 13.75rem;
  }
}
</style>
