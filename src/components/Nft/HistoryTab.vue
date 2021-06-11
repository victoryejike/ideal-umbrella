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
        <span>by</span>
      </div>
      <div class="author">
        {{ history.author }}
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
  color: #808080;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 1.5313rem;
}

.history-inner-div {
  align-items: center;
  display: flex;
  margin-bottom: 0.25rem;
}

.price {
  color: #6374c3;
  margin-left: 0.375rem;
}

.date-time {
  font-size: 0.75rem;
  margin-bottom: 1.4063rem;
}

.author {
  color: #000;
  margin-left: 0.375rem;
}

.input-line {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.25);
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}
</style>
