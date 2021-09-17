<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        :src="image"
      >
    </div>
    <div class="bid-text">
      <div> {{ $t('nft_details.bid.bid-content') }} {{ title }} NFT</div>
      <div class="token-description">
        {{ description }}
      </div>
    </div>
  </div>
  <BaseForm
    ref="bid-form"
    class="bid-form"
    @submit="onSubmit"
  >
    <BaseUnderlinedInput
      v-model="initialBidValue"
      class="input-field"
      name="amount"
      :placeholder="$t('nft_details.bid.user_bid_placeholder')"
      rules="required"
      :text="$t('nft_details.bid.user_bid_label')"
      type="number"
      @input="getFinalBidAmount"
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
      name="user_address"
      type="hidden"
      :value="Address"
    />
    <BaseUnderlinedInput
      v-if="nfttype"
      class="input-field"
      name="quantity"
      :text="$t('nft_details.bid.quantity_label')"
      type="number"
    />
    <div class="details-section">
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.user_bidding_balance') }}
        </div>
        <div class="value">
          {{ initialBidValue }} ETH
        </div>
      </div>
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
          2.5%
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.total_bid_amount') }}
        </div>
        <div class="value">
          {{ finalBidValue }}
        </div>
      </div>
    </div>
    <BaseRoundButton
      class="buy-button btn-primary btn-md btn-bold mb"
      :icon="isLoading ? 'loading' : 'arrow-right'"
      :submit="true"
      :text="$t('nft_details.place_bid')"
    />
  </BaseForm>
  <div class="notify">
    <img
      alt="notification"
      src="@img/notifications_active.png"
    >
    <p>{{ $t('buy_modal.notification') }}</p>
  </div>
</template>
<script>
import { Field } from 'vee-validate';

const Web3 = require('web3');

export default {
  name: 'BidModal',
  components: { Field },
  props: {
    nfttype: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    title: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    minimumbid: { type: Number, required: false, default: null },
    tokenid: { type: Number, required: false, default: null },
    tokentype: { type: String, required: false, default: null },
    accountbalance: { type: Number, required: false, default: null },
    bid: { type: Array, required: false, default: null },
  },
  emits: ['bidPlaced'],
  data() {
    return {
      NftId: this.$route.params.id,
      Address: localStorage.getItem('account'),
      isLoading: false,
      biddingBalance: '',
      initialBidValue: '',
      finalBidValue: '',
      nftTokenAddress: '',
      coinList: [
        { name: 'ETH', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/ethereum_rynhsn.svg', id: 'ETH' },
        { name: 'USDT', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/tether_bnrumz.svg', id: 'USDT' },
        { name: 'NAFF', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/naff_mybxeu.svg', id: 'NAFF' },
      ],
      erc20ContractAddress: '0x82ccaff54be0d4cf6b10de0a225584adb9adf7d3',
      erc721ContractAddress: '0x9684836C7adA86cc99b1B747d87aAae1494F8ad3',
      erc1155ContractAddress: '0xDCB2fA7857b2fbF9e977b9180d4B9cD1A7f942b2',
      delegateContractAddress: '0xD5B6FbB0728A55596eFDE6F5412396AF39366Ed4',
      userData: JSON.parse(localStorage.getItem('userData')),
    };
  },
  methods: {
    async getFinalBidAmount() {
      const discountAmount = ((this.initialBidValue * 0.025).toFixed(4));
      this.finalBidValue = (parseFloat(this.initialBidValue)
      + parseFloat(discountAmount)).toFixed(4);
    },
    getTokenAddress() {
      if (this.tokentype === 'single') this.nftTokenAddress = this.erc721ContractAddress;
      else this.nftTokenAddress = this.erc1155ContractAddress;
    },
    async getBalance() {
      const web3 = new Web3(window.ethereum);
      const ercContract = new web3.eth.Contract(require('@/assets/abi/erc20').default, this.erc20ContractAddress);
      const result = await ercContract.methods.balanceOf(this.Address).call();
      const naff = web3.utils.fromWei(result);
      // console.log(naff);
      return naff;
    },
    async onSubmit(formData) {
      const amount = await this.getBalance();
      if ((this.initialBidValue >= this.minimumbid) && (amount >= this.initialBidValue)) {
        this.getTokenAddress();
        this.isLoading = true;
        const web3 = new Web3(window.ethereum);
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
            this.isLoading = true;
            console.log(this.userData.uid);
            if (receipt) {
              this.isLoading = true;
              try {
                await delegateContract.methods
                  .placeBid(this.erc721ContractAddress,
                    web3.utils.toWei(this.initialBidValue), this.tokenid, this.userData.uid)
                  .send({ from: this.Address })
                  .on('error', (error) => {
                    console.log(error);
                    this.isLoading = false;
                    this.$toast.error('An error occurred');
                  }).once('receipt', async () => {
                    this.$emit('bidPlaced', true);
                  });
              } catch (error) {
                console.log(error);
              }
            }
            // let response = null;
            // try {
            //   const { data } = await this.$api.CREATEBIDS(formData);
            //   response = data;
            // } catch (error) {
            //   response = error?.response?.data;
            // }

            // if (response?.success) {
            //   this.$emit('bidPlaced', response.success);
            // } else {
            //   this.$toast.error(response.error);
            // }
          });
      } else {
        this.$toast.error('Sorry, cannot place bid. Either bid is lower than last bid or not enough Naff token');
      }
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
  margin-bottom: 2.5rem;
  margin-top: 2rem;
}

.mb {
  margin-bottom: 2.18rem;
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

.label {
  color: #808080;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.coin {
  margin-right: 0.5rem;
}

.value {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9375rem;
  font-weight: bold;
  line-height: 1.75rem;
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
