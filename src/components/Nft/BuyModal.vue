<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        :src="image"
      >
    </div>
    <div class="bid-text">
      <div> {{ $t('nft_details.buy.buy-content') }}</div>
      <div class="token-description">
        {{ title }}
      </div>
    </div>
  </div>
  <BaseForm
    ref="bid-form"
    class="bid-form"
    @submit="onSubmit"
  >
    <BaseUnderlinedInput
      v-model="amount"
      class="input-field"
      disabled="true"
      name="amount"
      :text="$t('nft_details.buy.user_buy_label')"
    >
      <template #element>
        <!-- <span class="coin">ETH</span> -->
        <BaseScrollableSelectBox
          :css="selectBoxCSS"
          key-name="name"
          name="receivedBidCoinType"
          :options="coinList"
        />
      </template>
    </BaseUnderlinedInput>
    <Field
      name="nft_id"
      type="hidden"
      :value="NftId"
    />
    <Field
      name="owner_address"
      type="hidden"
      :value="Address"
    />
    <Field
      name="prio_owner_address"
      type="hidden"
      :value="creatoraddress"
    />
    <BaseUnderlinedInput
      v-if="nfttype"
      class="input-field"
      name="quantity"
      :text="$t('nft_details.bid.quantity_label')"
      type="number"
    />
    <span v-if="nfttype">Available quantity: {{ nfttype }}</span>
    <div class="details-section">
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.user_balance') }}
        </div>
        <div class="value">
          {{ accountbalance }} ETH
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.service_fee') }}
        </div>
        <div class="value">
          2.5 %
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.buy.total_buy_amount') }}
        </div>
        <div class="value">
          {{ finalValue }} ETH
        </div>
      </div>
    </div>
    <BaseRoundButton
      class="buy-button btn-primary btn-md btn-bold mb"
      :icon="isLoading ? 'loading' : 'arrow-right'"
      :submit="true"
      :text="$t('nft_details.buy_now')"
    />
    <div class="notify">
      <img
        alt="notification"
        src="@img/notifications_active.png"
      >
      <p>{{ $t('buy_modal.notification') }}</p>
    </div>
  </BaseForm>
</template>
<script>
import { Field } from 'vee-validate';
// import WalletLink from 'walletlink';
// import WalletConnectProvider from '@walletconnect/web3-provider';

const Web3 = require('web3');

// const APP_NAME = 'Naffiti';
// const APP_LOGO_URL = 'https://example.com/logo.png';
// const ETH_JSONRPC_URL = 'https://rinkeby.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
// const CHAIN_ID = 4;
// // Initialize WalletLink
// export const walletLink = new WalletLink({
//   appName: APP_NAME,
//   appLogoUrl: APP_LOGO_URL,
//   darkMode: false,
// });

export default {
  name: 'BidModal',
  components: { Field },
  props: {
    nfttype: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    title: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    tokenid: { type: Number, required: false, default: null },
    tokentype: { type: String, required: false, default: null },
    accountbalance: { type: Number, required: false, default: null },
    creatoraddress: { type: String, required: false, default: null },
  },
  emits: ['bidPlaced'],
  data() {
    return {
      NftId: this.$route.params.id,
      Address: localStorage.getItem('account'),
      isLoading: false,
      buyingBalance: '',
      finalValue: '',
      amount: this.price,
      token: '',
      nftTokenAddress: '',
      coinList: [
        { name: 'ETH', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/ethereum_rynhsn.svg', id: 'ETH' },
        { name: 'USDT', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/tether_bnrumz.svg', id: 'USDT' },
        { name: 'NAFF', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/naff_mybxeu.svg', id: 'NAFF' },
      ],
      erc20ContractAddress: '0x8C5B4AB57Eef1e2C78c9a16843701195B51a812C',
      erc721ContractAddress: '0x9aE66F8aDF65816BE94C957D6D37b316791Bc5CD',
      erc1155ContractAddress: '0x5eb7Ce96075387E343D4c50b42ADb4AFE79852E5',
      delegateContractAddress: '0xc893549e36EEE4AD7EB263195fdaF05AF8a4c196',
    };
  },
  async mounted() {
    const finalBuyValue = (this.price * 0.025).toFixed(4);
    this.finalValue = (parseFloat(this.price) + parseFloat(finalBuyValue)).toFixed(4);
    console.log(this.creatoraddress);
    console.log(this.tokentype);
    if (this.tokentype === 'single') {
      this.token = 1;
      this.nftTokenAddress = this.erc721ContractAddress;
    } else {
      this.token = 2;
      this.nftTokenAddress = this.erc1155ContractAddress;
    }
    console.log(this.nftTokenAddress, this.token, this.tokenid);
  },
  methods: {
    async getBalance() {
      const web3 = new Web3(window.ethereum);
      const ercContract = new web3.eth.Contract(require('@/assets/abi/erc20').default, this.erc20ContractAddress);
      const result = await ercContract.methods.balanceOf(this.Address).call();
      const naff = web3.utils.fromWei(result);
      console.log(naff);
      return naff;
    },
    async onSubmit(formData) {
      const amount = await this.getBalance();
      const qty = document.querySelector('.quantity').value;
      if ((qty > this.nfttype)) {
        this.$toast.error('Sorry, you entered more quantity than available');
      } else if (amount >= this.finalValue) {
        this.isLoading = true;
        const web3 = new Web3(window.ethereum);
        // this.getBalance();
        console.log(this.tokenid);
        const delegateContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
        const erc20Contract = new web3.eth.Contract(require('@/assets/abi/erc20').default, this.erc20ContractAddress);
        await erc20Contract.methods
          .approve(this.delegateContractAddress,
            web3.utils.toWei('1000000000000000000000000'))
          .send({ from: this.Address })
          .on('error', (error) => {
            console.log(error);
            this.isLoading = false;
            this.$toast.error('An error occurred');
          })
          .once('receipt', async (receipt) => {
            if (receipt) {
              // console.log(confirmationNumber);
              this.isLoading = true;
              try {
                await delegateContract.methods
                  .instantBuy(this.nftTokenAddress, this.token, this.tokenid, '0x0', qty)
                  .send({ from: this.Address })
                  .on('error', (error) => {
                    console.log(error);
                    this.isLoading = false;
                    this.$toast.error('An error occuured');
                  }).once('receipt', async () => {
                    this.$emit('bidPlaced', true);
                  });
              } catch (error) {
                console.log(error);
              }
            }
            this.isLoading = false;
          });
      } else {
        this.$toast.error('Sorry, you do not have enough Naff tokens to buy this NFT');
      }
      // this.isLoading = false;
    },
  },
};
</script>
<style scoped>
.nft-box {
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  border: 0.0625rem solid rgba(44, 67, 173, 0.25);
  border-radius: 0.625rem;
  box-sizing: border-box;
  display: flex;
  height: inherit;
  padding: 0.9375rem;
}

.token-image {
  border-radius: 0.625rem;
  height: 4.375rem;
  width: 4.375rem;
}

.bidding-details {
  display: flex;
  justify-content: space-between;
}

.details-section {
  margin-top: 2rem;
}

.bid-text {
  align-items: center;
  color: #808080;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.625rem;
  margin-left: 1.25rem;
}

.token-description {
  color: #000;
  font-weight: bold;
}

.input-field {
  margin-top: 2rem;
}

.mb {
  margin-bottom: 2.18rem;
}

.label {
  color: #808080;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.value {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9375rem;
  font-weight: bold;
  line-height: 1.75rem;
}

.coin {
  margin-right: 0.5rem;
}

.notify {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.notify > p {
  margin: -0.2rem 0.5rem;
}
</style>
