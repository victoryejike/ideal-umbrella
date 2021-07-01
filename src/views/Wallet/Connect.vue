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
        @click="connectMetamask"
      />
      <ConnectCard
        btn="true"
        btntext="Connect with coinbase"
        :img="coinbase"
        text="Connect via app on your phone"
        type="COINBASE"
        @click="connectCoinbase"
      />
    </div>
  </BaseFrame>
</template>
<script>

import Huobi from '@svg/huobi.svg';
import MetaMask from '@img/metamask.png';
import coinBase from '@svg/coinbase.svg';
import ConnectCard from '@/components/Wallet/ConnectCard.vue';
import WalletLink from 'walletlink';
import BaseFrame from './BaseFrame.vue';

//  const Contract = require('web3-eth-contract')
const Web3 = require('web3');

const APP_NAME = 'My Awesome App';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/<YOUR_INFURA_API_KEY>';
const CHAIN_ID = 1;

// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

export default {
  name: 'NFT',
  components: { BaseFrame, ConnectCard },
  data() {
    return {
      huobi: Huobi,
      metaMask: MetaMask,
      coinbase: coinBase,
      accountAddress: '',
    };
  },
  methods: {
    async connectMetamask() {
      try {
        const web3 = new Web3(window.ethereum);
        console.log(web3);
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        const [accounts] = await web3.eth.getAccounts();
        console.log('Got accounts', accounts);
        this.accountAddress = accounts;
        this.$router.push('/discover');
      } catch (error) {
        console.error(error);
      }
    },
    async connectCoinbase() {
      try {
        const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
        const web3 = new Web3(ethereum);
        ethereum.send('eth_requestAccounts').then((accounts) => {
          const userAddress = accounts[0];
          console.log(`User's address is ${accounts[0]}`);
          web3.eth.defaultAccount = userAddress;
          this.accountAddress = userAddress;
          this.$router.push('/discover');
        });
      } catch (error) {
        console.log(error);
      }
    },
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
