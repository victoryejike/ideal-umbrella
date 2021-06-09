<template>
  <div class="token-details">
    <div class="display-token-image">
      <div class="token-text">
        <span>   {{ $t('nft_details.token_text') }}</span>

        <BaseRoundButton
          class="btn-outline-primary btn-sm"
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
        <div>
          <label>Creater</label>
          <div>
            <img
              class="button-icon"
              src="@img/creater_image.png"
            >
          </div>
        </div>
        <div><label> Highest Bid</label></div>
      </div>
      <div class="token-content">
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
        :width="10.6"
      />

      <div
        v-for="(item, index) in bidsList"
        :key="index"
        class="bids-main-div"
      >
        <div class="bids-inner-div">
          <div>
            <div>{{ item.author }}</div>
            <div>{{ item.timestamp }}</div>
          </div>
          <div>{{ item.bidPrice }}</div>
        </div>
        <div
          class="input-line"
          :class="{focus:isFocus}"
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

.token-text {
  display: flex;
  justify-content: space-between;
}

.token-image {
  margin-top: 1.25rem;
}

.button-icon {
  padding-right: 0.375rem;
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

.token-content {
  margin-top: 1.875rem;
}

.tabs {
  margin-bottom: 2.9375rem;
  margin-top: 2.4375rem;
}

.token-description {
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
</style>
