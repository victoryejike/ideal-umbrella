<template>
  <div
    v-for="(history, index) in historyDetailsList"
    :key="index"
    class="history-main-div"
  >
    <div class="history-inner-div">
      <div class="">
        {{ history.action }}
        <span v-if="history.action=='Listed'">for</span>
      </div>
      <div class="price">
        <img
          v-if="history.price"
          class="coins-icon"
          height="16"
          src="@svg/ht.svg"
          width="16"
        >
        {{ history.price }}
      </div>
      <div class="author">
        by {{ history.author }}
        <img
          v-if="history.verified"
          class="tick-icon"
          height="16"
          src="@svg/tick.svg"
          width="16"
        >
      </div>
    </div>
    <div class="date-time">
      at {{ history.timestamp }}
    </div>

    <div
      class="input-line"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {

      historyDetailsList: [{
        author: 'Metaverse',
        action: 'Bid',
        price: '0.14 ETH',
        timestamp: '6/3/2021, 7:09 PM',
        verified: true,
      },
      {
        author: 'CryptoPunks',
        action: 'Bid',
        price: '0.15 ETH',
        timestamp: '6/3/2021, 7:09 PM',
        verified: true,
      },

      {
        author: 'Crypto Art',
        action: 'Listed',
        price: '0.15 ETH',
        timestamp: '6/3/2021, 7:09 PM',
        verified: true,

      },

      {
        author: 'Crypto Art',
        verified: true,
        action: 'Minted',
        timestamp: '6/3/2021, 7:09 PM',

      }],
    };
  },
};
</script>
<style scoped>
.history-main-div {
  margin-bottom: 1.4688rem;
}

.history-inner-div {
  align-items: center;
  display: flex;
}
</style>
