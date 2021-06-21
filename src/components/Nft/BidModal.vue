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

        active-color="#DDE1FB"
        bg-color="#E5E5E5"
        border-color="none"
        hover-color="#DDE1FB"
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
  border: 1px solid rgba(44, 67, 173, 0.25);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  height: 100px;
  padding: 15px;
}

.token-image {
  border-radius: 10px;
  height: 70px;
  width: 70px;
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
  font-size: 15px;
  font-weight: 600;
  line-height: 26px;
  margin-left: 20px;
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
