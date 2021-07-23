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

export default {
  name: 'BidModal',
  components: { Field },
  props: {
    nfttype: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    title: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    tokenid: { type: Number, required: false, default: null },
    accountbalance: { type: Number, required: false, default: null },
  },
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
    };
  },
  methods: {
    async getFinalBidAmount() {
      const discountAmount = ((this.initialBidValue * 0.025).toFixed(4));
      this.finalBidValue = (parseFloat(this.initialBidValue)
      + parseFloat(discountAmount)).toFixed(4);
    },
    async onSubmit(formData) {
      this.isLoading = true;
      let response = null;
      try {
        const { data } = await this.$api.CREATEBIDS(formData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        // location.reload();
        this.$router.go();
      } else {
        const { form } = this.$refs['bid-form'];
        form.setFieldError('amount', response.error);
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
