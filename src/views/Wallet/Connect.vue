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

import BaseFrame from './BaseFrame.vue';
import ConnectCard from '../../components/Wallet/ConnectCard.vue';
import Huobi from '../../assets/svg/huobi.svg';
import MetaMask from '../../assets/svg/metamask_Fox 1.svg';
import coinBase from '../../assets/svg/coinbase.svg';

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
