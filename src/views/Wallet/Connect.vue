<template>
  <BaseFrame
    :description="$t('connect_wallet.description')"
    :title="$t('connect_wallet.title')"
  >
    <div class="flex">
      <ConnectCard
        btn="true"
        btntext="Recommended"
        :img="huobi"
        text="Connect via app on your phone"
        type="HUOBI WALLET"
      />
      <ConnectCard
        btn="true"
        btntext="Most popular"
        :img="metaMask"
        text="One of the most secure wallets with great flexibility"
        type="METAMASK"
      />
      <ConnectCard
        btn="false"
        :img="coinbase"
        text="Connect via app on your phone"
        type="COINBASE"
      />
    </div>
  </BaseFrame>
</template>
<script>

import Huobi from '@svg/huobi.svg';
import MetaMask from '@img/metamask.png';
import coinBase from '@svg/coinbase.svg';
import ConnectCard from '@/components/Wallet/ConnectCard.vue';
import BaseFrame from './BaseFrame.vue';

export default {
  name: 'NFT',
  components: { BaseFrame, ConnectCard },
  data() {
    return {
      huobi: Huobi,
      metaMask: MetaMask,
      coinbase: coinBase,
    };
  },
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
