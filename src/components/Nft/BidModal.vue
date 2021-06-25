<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        src="@img/token-image.png"
      >
    </div>
    <div class="bid-text">
      <div> {{ $t('nft_details.bid.bid-content') }} </div>
      <div class="token-description">
        token description
      </div>
    </div>
  </div>
  <BaseUnderlinedInput
    class="input-field"
    name="amount"
    :placeholder="$t('nft_details.bid.user_bid_placeholder')"
    :text="$t('nft_details.bid.user_bid_label')"
  >
    <template #element>
      <BaseScrollableSelectBox
        name="coin"
        :options="coinList"
      />
    </template>
  </BaseUnderlinedInput>
  <BaseUnderlinedInput
    class="input-field"

    :text="$t('nft_details.bid.quantity_label')"
  />
  <div class="details-section">
    <div class="bidding-details">
      <div class="label">
        {{ $t('nft_details.bid.user_bidding_balance') }}
      </div>
      <div class="value">
        0.16 ETH
      </div>
    </div>
    <div class="bidding-details">
      <div class="label">
        {{ $t('nft_details.bid.user_balance') }}
      </div>
      <div class="value">
        0.16 ETH
      </div>
    </div>
    <div class="bidding-details">
      <div class="label">
        {{ $t('nft_details.bid.service_fee') }}
      </div>
      <div class="value">
        0.16 ETH
      </div>
    </div>
    <div class="bidding-details">
      <div class="label">
        {{ $t('nft_details.bid.total_bid_amount') }}
      </div>
      <div class="value">
        0.16 ETH
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
    };
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
  margin-top: 2.5rem;
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

.bid-text div {
  white-space: normal;
}
</style>
