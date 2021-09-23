<template>
  <BaseFrame
    :description="$t('connect_wallet.description')"
    :title="$t('connect_wallet.title')"
  >
    <div class="flex">
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
        btntext="Recommended"
        :img="huobi"
        text="Connect via app on your phone"
        type="HUOBI WALLET"
        @click="connectHuobi"
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

import WalletConnectProvider from '@walletconnect/web3-provider';
import Huobi from '@svg/huobi.svg';
import MetaMask from '@img/metamask.png';
import coinBase from '@svg/coinbase.svg';
import WalletLink from 'walletlink';
import ConnectCard from '@/components/Wallet/ConnectCard.vue';
import BaseFrame from '@/components/Nft/BaseFrame.vue';
import store from '@/store';

//  const Contract = require('web3-eth-contract')
const Web3 = require('web3');

const APP_NAME = 'Naffiti';
const APP_LOGO_URL = 'https://naffiti.com/naffiti.png';
const ETH_JSONRPC_URL = 'https://rinkeby.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
const CHAIN_ID = 3;

// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

export default {
  name: 'ConnectWallet',
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
    async Register() {
      const params = {
        address: localStorage.getItem('account'),
      };
      let response = null;
      try {
        const { data } = await this.$api.REGISTER(params);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        console.log(response);
        this.$store.dispatch('auth/login', response?.data);
        localStorage.setItem('userUID', response?.data.uid);
        // eslint-disable-next-line no-restricted-globals
        location.assign(`https://naffiti.com/#/account/profile/${localStorage.getItem('account')}`);
        // this.$router.push(`/account/profile/${localStorage.getItem('account')}`);
        this.$toast.success(response?.message);
      } else {
        this.$toast.error(response?.error);
      }
    },
    async connectHuobi() {
      try {
        const provider = new WalletConnectProvider({
          infuraId: '58bf1103531f4b858b31eb3c5c4ddd2f',
        });

        //  Enable session (triggers QR Code modal)
        await provider.enable();
        const web3 = new Web3(provider);
        const account = await web3.eth.getAccounts();
        this.accountAddress = localStorage.setItem('account', account);
        store.commit('data/isWalletConnected', true);
        this.Register();
        // this.$router.back();
      } catch (error) {
        //
      }
    },
    async connectMetamask() {
      try {
        if (!(await this.$global.isWalletConnected()) || !(await this.$global.isAddressExist())) {
          return;
        }
        this.$global.detectingChain();

        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });

        const web3 = new Web3(window.ethereum);
        const [accounts] = await web3.eth.getAccounts();
        this.accountAddress = localStorage.setItem('account', accounts);
        store.commit('data/isWalletConnected', true);
        this.Register();
        // this.$router.back();
      } catch (error) {
        console.error(error);
      }
    },
    async connectCoinbase() {
      try {
        const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
        const web3 = new Web3(ethereum);
        ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
          const userAddress = accounts[0];
          web3.eth.defaultAccount = userAddress;
          this.accountAddress = localStorage.setItem('account', userAddress);
          store.commit('data/isWalletConnected', true);
          // this.$router.back();
          this.Register();
        });
      } catch (error) {
        //
      }
    },
    closeModal() {
      this.networkChange = false;
    },
  },
};

</script>

<style scoped>
.flex {
  display: flex;
}

.network-text {
  text-align: center;
}

.center {
  text-align: center;
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
