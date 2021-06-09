<template>
  <div class="token-details">
    <div class="display-token-image">
      <div class="token-text-div">
        <span class="token-text">   {{ $t('nft_details.token_text') }}</span>

        <BaseRoundButton
          class="btn-outline-secondary button"
          text="Art"
        >
          <template #icon>
            <img
              class="button-icon"
              src="@svg/art.svg"
            >
          </template>
        </BaseRoundButton>
      </div>
      <img
        class="token-image"
        src="@img/token-image.png"
      >
    </div>
    <div class="display-token-details">
      <div class="user-details">
        <div class="details-section">
          <label> {{ $t('nft_details.creator') }}</label>
          <div class="creater-details">
            <img
              class="creater-image"
              src="@img/creater_image.png"
            >
            <span class="creater-name">{{ creater.name }}</span>
            <img
              v-if="creater.verified"
              class="tick-icon"
              height="16"
              src="@svg/tick.svg"
              width="16"
            >
          </div>
        </div>
        <div class="details-section">
          <label>{{ $t('nft_details.highest_bid') }}</label>
          <div class="highest-bid-details">
            <img
              class="coins-icon"
              height="20"
              src="@svg/ht.svg"
              width="20"
            >
            <span class="coin">0.15 ETH</span>
            <span class="coin-value">($479.45)</span>
          </div>
        </div>
      </div>

      <div class="token-content details-section">
        <label> {{ $t('nft_details.description') }}</label>
        <div class="token-description">
          {{ $t('nft_details.content') }}
        </div>
        <a
          class="read-more"
          href=""
        >{{ $t('nft_details.read_more') }}</a>
      </div>
      <BaseNavigationTab
        class="tabs"
        :list="tabTitleList"
        :width="10"
      />

      <div
        v-for="(item, index) in bidsList"
        :key="index"
        class="bids-main-div"
      >
        <div class="bids-inner-div">
          <div>
            <div class="author">
              {{ item.author }}
            </div>
            <div class="date-time">
              {{ item.timestamp }}
            </div>
          </div>
          <div class="price">
            {{ item.bidPrice }}
          </div>
        </div>
        <div
          class="input-line"
          :class="{focus:isFocus}"
        />
      </div>
      <div class="actions">
        <BaseRoundButton
          class="buy-button btn-primary btn-md btn-bold"
          icon="arrow-right"
          :submit="true"
          :text="$t('nft_details.buy_now')"
        />
        <BaseRoundButton
          class="bid-button btn-outline-primary btn-xl"
          :submit="true"
          :text="$t('nft_details.place_bid')"
        />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Register',
  data() {
    return {
      tabTitleList: [
        {
          name: this.$t('nft_details.tabs.bids'),
          // handler: () => { this.isEmail = true; },
        },
        {
          name: this.$t('nft_details.tabs.details'),
          // handler: () => { this.isEmail = false; },
        },
        {
          name: this.$t('nft_details.tabs.history'),
          // handler: () => { this.isEmail = false; },
        },
      ],
      creater: {
        name: 'Beeple',
        verified: true,
      },
      // Todo: fetch api
      bidsList: [
        {
          author: 'CryptoPunks',
          bidPrice: '0.15 ETH',
          verified: true,
          timestamp: '6/3/2021, 7:09 PM',

        },
        {
          author: 'Metaverse',
          bidPrice: '0.14 ETH',
          verified: true,
          timestamp: '6/3/2021, 5:28 PM',

        },
        {
          author: 'CryptoPunks',
          bidPrice: '0.13 ETH',
          verified: true,
          timestamp: '2/3/2021, 2:09 AM',

        },
        {
          author: 'Metaverse',
          bidPrice: '0.14 ETH',
          verified: true,
          timestamp: '6/3/2021, 5:28 PM',

        },
      ],
    };
  },

};
</script>
<style scoped>
.token-details {
  display: flex;
}

.token-text-div {
  display: flex;
  justify-content: space-between;
}

.token-text {
  font-size: 1.625em;
  font-weight: bold;
  line-height: 150%;
}

.token-image {
  margin-top: 1.25rem;
}

.button {
  font-size: 0.9375em;
  font-weight: bold;
  line-height: 150%;
  padding: 0.3rem 1.75rem;
}

.button-icon {
  margin-right: 0.375em;
  margin-top: 0.1875em;
}

.creater-image {
  border-radius: 50%;
}

.display-token-details {
  font-size: 0.875rem;
  margin-left: 6.25rem;
}

.user-details {
  display: flex;
  height: 5.3125rem;
  justify-content: space-between;
}

.details-section {
  display: flex;
  flex-direction: column;
}

label {
  color: rgba(0, 0, 0, 0.75);
  margin-bottom: 1.25rem;
}

.token-content {
  margin-top: 1.875rem;
}

.tabs {
  margin-bottom: 2.9375rem;
  margin-top: 2.4375rem;
}

.token-description {
  color: #808080;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin-bottom: 0.625rem;
}

.bids-main-div {
  margin-bottom: 1.4688rem;
}

.bids-inner-div {
  display: flex;
  justify-content: space-between;
}

.input-line {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.25);
  transition: border-bottom 0.3s ease-in-out;
  width: 100%;
}

.highest-bid-details {
  align-items: center;
  display: flex;
}

.coin {
  color: #6374c3;
  font-size: 18px;
  font-weight: bold;
  line-height: 100%;
  margin-left: 0.375rem;
}

.coin-value {
  color: rgba(0, 0, 0, 0.25);
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.01em;
  line-height: 1.75rem;
  margin-left: 10px;
}

.read-more {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.author {
  color: #000;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 100%;
}

.date-time {
  color: #808080;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 100%;
  margin-bottom: 1.4063em;
  margin-top: 0.5em;
}

.price {
  color: #6374c3;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 100%;
}

.actions {
  display: flex;
}

.bid-button {
  margin-left: 1.25em;
}

.creater-details {
  align-items: center;
  display: flex;
}

.creater-name {
  font-size: 1.125em;
  font-weight: bold;
  line-height: 100%;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>
