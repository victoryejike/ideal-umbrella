<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        :src="`https://ipfs.io/ipfs/${image}`"
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
        <span class="coin">ETH</span>
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
    <div class="details-section">
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.user_balance') }}
        </div>
        <div class="value">
          {{ buyingBalance }} ETH
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
      class="buy-button btn-primary btn-md btn-bold"
      :icon="isLoading ? 'loading' : 'arrow-right'"
      :submit="true"
      :text="$t('nft_details.buy_now')"
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
    price: { type: Number, required: false, default: null },
  },
  data() {
    return {
      NftId: this.$route.params.id,
      Address: localStorage.getItem('account'),
      isLoading: false,
      buyingBalance: '',
      finalValue: '',
      amount: '',
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
    };
  },
  async mounted() {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const balance = await web3.eth.getBalance(localStorage.getItem('account'));
    const ethBalance = (balance / 1000000000000000000).toFixed(4);
    this.buyingBalance = ethBalance;
    this.amount = this.price;
    document.querySelector('.amount').value = this.price;
    const finalBuyValue = (this.price * 0.025).toFixed(4);
    this.finalValue = (parseFloat(this.price) + parseFloat(finalBuyValue)).toFixed(4);
  },
  methods: {
    async onSubmit(formData) {
      this.isLoading = true;
      let response = null;
      try {
        const { data } = await this.$api.BUYNFT(formData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        // this.$router.go();
      } else {
        // const { form } = this.$refs['bid-form'];
        // form.setFieldError('amount', response.error);
        this.isLoading = false;
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
  height: 6.25rem;
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
</style>
