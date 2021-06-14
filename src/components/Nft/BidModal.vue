<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        src="@img/token-image.png"
      >
    </div>
    <div> your</div>
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
  <div class="bidding-details">
    <div>{{ $t('nft_details.bid.user_bidding_balance') }}</div>
    <div>0.16 ETH</div>
  </div>
  <div class="bidding-details">
    <div>{{ $t('nft_details.bid.user_balance') }}</div>
    <div>0.16 ETH</div>
  </div>
  <div class="bidding-details">
    <div>{{ $t('nft_details.bid.service_fee') }}</div>
    <div>0.16 ETH</div>
  </div>
  <div class="bidding-details">
    <div>{{ $t('nft_details.bid.total_bid_amount') }}</div>
    <div>0.16 ETH</div>
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
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(44, 67, 173, 0.25);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  height: 100px;
  margin: 15px;
}

.token-image {
  height: 60px;
  width: 60px;
}

.bidding-details {
  display: flex;
  justify-content: space-between;
}
</style>
