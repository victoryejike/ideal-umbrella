<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        :src="`https://ipfs.io/ipfs/${image}`"
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
        <span class="coin">ETH</span>
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
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
      erc20ContractAddress: '0xEF55376cdD71225501E1d9763D907E3A14C10Bb1',
      erc721ContractAddress: '0xF3538d2696FF98396Aa0386d91bd7f9C02570511',
      erc1155ContractAddress: '0x24d5CaBE5A68653c1a6d10f65679839a5CD4a42A',
      delegateContractAddress: '0x0285e4EaEca99A4e8Ec3f005D1B6Bd7b450d4693',
      prevBidderAddress: '',
      prevBid: '',
      userData: JSON.parse(localStorage.getItem('userData')),
    };
  },
  methods: {
    async getFinalBidAmount() {
      const discountAmount = ((this.initialBidValue * 0.025).toFixed(4));
      this.finalBidValue = (parseFloat(this.initialBidValue)
      + parseFloat(discountAmount)).toFixed(4);
    },
    async onSubmit(formData) {
      if (this.initialBidValue >= this.minimumbid) {
        this.isLoading = true;
        const web3 = new Web3(window.ethereum);
        const index = this.bid.length;
        if (index > 0) {
          this.prevBidderAddress = this.bid[index - 1].highest_bidder;
          this.prevBid = this.bid[index - 1].highest_bid;
        } else {
          this.prevBidderAddress = '0x94A4Bd82F25aBd54195F6cd8b093575f9e37383c';
          this.prevBid = '0';
        }
        const ercContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
        await ercContract.methods
          .updateBid(this.erc20ContractAddress, this.erc721ContractAddress,
            web3.utils.toWei(this.initialBidValue), this.tokenid, this.userData.uid)
          .send({ from: this.Address, gas: 2000000, gasPrice: '30000000000' })
          .on('error', (error) => {
            console.log(error);
            this.isLoading = false;
            this.$toast.error('An error occurred');
          })
          .on('confirmation', async (confirmationNumber, receipt) => {
            console.log(receipt);
            this.$emit('bidPlaced', 'Bid Placement successful');
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
        this.$toast.error('You can not bid lower than the mlnimum required bid price');
      }
      this.isLoading = false;
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
</style>
