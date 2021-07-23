<template>
  <div
    v-if="type != 'fixed'"
    class="history-main-div"
  >
    <div
      v-for="(history, index) in historyDetailsList"
      :key="index"
    >
      <div
        v-if="history.amount"
        class="history-inner-div"
      >
        <div
          class="history-action"
        >
          Bid
        </div>
        <div class="price">
          <img

            class="coins-icon"
            height="16"
            src="@svg/ethereum.svg"
            width="16"
          >
          {{ history.amount }}
          <span>by</span>
        </div>
        <div class="author">
          {{ history.user_id.display_name }}
          <img
            v-if="history.user_id.is_kyc_verified"
            class="tick-icon"
            height="16"
            src="@svg/tick.svg"
            width="16"
          >
        </div>
      </div>

      <div class="date-time">
        at {{ new Date(history.created_at).toLocaleString() }}
      </div>

      <div
        class="input-line"
      />
    </div>
    <div

      class="history-inner-div"
    >
      <div

        class="history-action"
      >
        Minted for
      </div>
      <div class="price">
        <img

          class="coins-icon"
          height="16"
          src="@svg/ethereum.svg"
          width="16"
        >
        {{ price }}
        <span>by</span>
      </div>
      <div class="author">
        {{ creater }}
        <img
          v-if="verified"
          class="tick-icon"
          height="16"
          src="@svg/tick.svg"
          width="16"
        >
      </div>
    </div>
    <div class="date-time">
      at {{ getDate }}
    </div>
    <div
      class="input-line"
    />
  </div>
  <div
    v-else
  >
    <div
      class="history-main-div"
    >
      <div class="history-inner-div">
        <div class="history-action">
          Minted
          <span>by</span>
        </div>
        <div class="author">
          {{ creater }} for
        </div>
        <div class="price">
          <img
            class="coins-icon"
            height="16"
            src="@svg/ethereum.svg"
            width="16"
          >
          {{ price }}
          <span>ETH</span>
        </div>
      </div>
      <div class="date-time">
        at {{ getDate }}
      </div>
      <div
        class="input-line"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HistoryTab',
  props: {
    type: { type: String, required: false, default: null },
    creater: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    date: { type: String, required: false, default: null },
    historyDetailsList: { type: Array, required: false, default: null },
    verified: { type: Boolean, required: false, default: false },
  },
  data() {
    return {

    };
  },
  computed: {
    getDate() {
      const d = new Date(this.date);
      const timestamp = d.toLocaleString();
      return timestamp;
    },
  },
};
</script>
<style scoped>
.history-main-div {
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

.history-action {
  color: #808080;
}

.price {
  color: #6374c3;
  margin-left: 0.375rem;
}

.date-time {
  color: #808080;
  font-size: 0.75rem;
  margin-bottom: 1.4063rem;
}

.author {
  margin-left: 0.375rem;
}

.input-line {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.25);
  margin-bottom: 1.5313rem;
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}
</style>
