<template>
  <div class="token-details">
    <div class="display-token-image">
      <div class="token-text-div">
        <span class="token-text">   {{ $t('nft_details.token_text') }}</span>
        <div class="button-div">
          <BaseRoundButton
            class="btn-outline-secondary button"
            text="Art"
          >
            <template #icon>
              <img
                src="@img/art.png"
              >
            </template>
          </BaseRoundButton>
        </div>
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
              src="@img/default-avatar.png"
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
        class="tab"
        :list="tabTitleList"
        :width="10"
      />

      <div
        v-for="(item, index) in bidsList"
        v-show="showBids"
        :key="index"
        class="bids-main-div"
      >
        <div class="bids-inner-div">
          <div>
            <div class="author">
              {{ item.author }}
              <img
                v-if="creater.verified"
                class="tick-icon"
                height="16"
                src="@svg/tick.svg"
                width="16"
              >
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
        />
      </div>
      <DetailsTab
        v-if="showDetails"
        :text="$t('nft_details.contact_details')"
        :value="nftDetails.contactDetails"
      />
      <DetailsTab
        v-if="showDetails"
        :id="nftDetails.tokenId"
        :text="$t('nft_details.token_id')"
      />
      <DetailsTab
        v-if="showDetails"
        :id="nftDetails.blockchain"
        :text="$t('nft_details.blockchain')"
      />

      <HistoryTab v-if="showHistory" />
      <div class="actions">
        <BaseRoundButton
          class="buy-button btn-primary btn-md btn-bold"
          icon="arrow-right"
          :text="$t('nft_details.buy_now')"
        />
        <div class="bid-button-div">
          <BaseRoundButton
            class="bid-button btn-outline-primary btn-xl"
            :text="$t('nft_details.place_bid')"
            @click="showModal"
          />
          <BaseModal
            v-show="isModalVisible"
            @close="closeModal"
          >
            <template #header>
              Place a bid
            </template>

            <template #body>
              <BidModal />
            </template>
            <template #footer>
              <BaseRoundButton
                class="buy-button btn-primary btn-md btn-bold"
                icon="arrow-right"
                :text="$t('nft_details.place_bid')"
              />
            </template>
          </BaseModal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DetailsTab from './DetailsTab.vue';
import HistoryTab from './HistoryTab.vue';
import BidModal from './BidModal.vue';

export default {
  components: { DetailsTab, HistoryTab, BidModal },
  data() {
    return {
      showBids: true,
      showDetails: false,
      showHistory: false,
      isModalVisible: false,

      tabTitleList: [
        {
          name: this.$t('nft_details.tabs.bids'),
          handler: () => {
            this.showBids = true;
            this.showDetails = false;
            this.showHistory = false;
          },
        },
        {
          name: this.$t('nft_details.tabs.details'),
          handler: () => {
            this.showBids = false;
            this.showDetails = true;
            this.showHistory = false;
          },
        },
        {
          name: this.$t('nft_details.tabs.history'),
          handler: () => {
            this.showBids = false;
            this.showDetails = false;
            this.showHistory = true;
          },
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
      nftDetails: {
        contactDetails: '0x3bdb...6d4a',
        tokenId: 28473,
        blockchain: 'Ethereum',
      },
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      console.log('in modal fn');
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style scoped>
.token-details {
  display: flex;
}

.display-token-image {
  width: 50%;
}

.token-text-div {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.token-text {
  font-size: 1.625em;
  font-weight: bold;
  line-height: 150%;
  white-space: normal;
}

.button-div {
  margin: auto;
}

.token-image {
  margin-top: 1.25rem;
  width: 90%;
}

.button {
  font-size: 0.9375em;
  font-weight: bold;
  line-height: 150%;
  padding: 0.3rem 1.75rem;
}

.creater-image {
  border-radius: 50%;
}

.display-token-details {
  font-size: 0.875rem;
  width: 50%;
}

.user-details {
  display: flex;
  height: 5.3125rem;
  justify-content: space-between;
  width: 90%;
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

.tab {
  margin-bottom: 2.9375rem;
  margin-top: 2.4375rem;
}

.token-description {
  color: #808080;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
  margin-bottom: 0.625rem;
  white-space: normal;
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
  height: 2.5rem;
}

.coin {
  color: #6374c3;
  font-size: 1.1rem;
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
  margin-left: 0.625rem;
}

.read-more {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.author {
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

.buy-button {
  width: 46%;
}

.bid-button-div {
  width: 46%;
}

.bid-button {
  margin-left: 1.25em;
  width: 100%;
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

@media (max-width: 34em) {
  .tab {
    width: 100% !important;
  }

  .buy-button,
  .bid-button {
    width: 100%;
  }

  .bid-button-div {
    width: 100%;
  }

  .actions {
    display: block;
  }

  .bid-button {
    margin-left: 0;
    margin-top: 1.25rem;
  }

  .button {
    margin-top: 0.9375rem;
  }
}

@media (max-width: 62em) {
  .token-details {
    display: block;
  }

  .token-text-div {
    display: block;
  }

  .display-token-image {
    width: 100%;
  }

  .token-text {
    white-space: normal;
  }

  .token-image {
    width: 100%;
  }

  .display-token-details {
    margin-left: 0;
    margin-top: 2.0625rem;
    width: 100%;
  }

  .user-details {
    width: 100%;
  }

  .token-content {
    width: 100%;
  }
}
</style>
