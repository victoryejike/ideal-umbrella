<template>
  <div>
    <div
      v-for="(nft, index) in getNftDetails"
      :key="index"
      class="token-details"
    >
      <div class="display-token-image">
        <div class="token-text-div">
          <span class="token-text">   {{ nft.title }}</span>
          <div class="button-div">
            <BaseRoundButton
              class="btn-outline-secondary button btn-unclickable"
              :img="nft.category.image"
              :text="nft.category.category"
            />
          </div>
        </div>
        <img
          class="token-image"
          :src="`https://ipfs.io/ipfs/${nft.uri.replace('ipfs://', '')}`"
        >
      </div>
      <div class="display-token-details">
        <div class="user-details">
          <div class="details-section">
            <label> {{ $t('nft_details.creator') }}</label>
            <div class="creater-details">
              <img
                class="creater-image"
                :src="nft.creator.image"
                width="40"
              >
              <span class="creater-name">{{ nft.creator.display_name }}</span>
              <img
                v-if="nft.creator.is_kyc_verified"
                class="tick-icon"
                height="16"
                src="@svg/tick.svg"
                width="16"
              >
            </div>
          </div>
          <div class="details-section">
            <label v-if="nft.pricing_type=='fixed'">{{ $t('nft_details.price') }}</label>
            <label v-else>{{ $t('nft_details.minimum_bid') }}</label>
            <div class="highest-bid-details">
              <img
                class="coins-icon"
                height="20"
                src="@svg/ethereum.svg"
                width="20"
              >
              <span
                v-if="nft.pricing_type=='fixed'"
                class="coin"
              >{{ nft.price }} ETH</span>
              <span
                v-else
                class="coin"
              >{{ nft.minimum_bid }} ETH</span>
            </div>
          </div>
        </div>

        <div class="token-content details-section">
          <label> {{ $t('nft_details.description') }}</label>
          <div class="token-description">
            {{ nft.description }}
          </div>
        <!-- <a
          class="read-more"
          href=""
        >{{ $t('nft_details.read_more') }}</a> -->
        </div>
        <BaseNavigationTab
          v-if="nft.pricing_type=='fixed'"
          class="tab"
          :list="tabFixedNft"
          :width="10"
        /> <BaseNavigationTab
          v-else
          class="tab"
          :list="tabTitleList"
          :width="10"
        />

        <div
          v-if="nft.pricing_type!='fixed'"
        >
          <div
            v-for="(item, i) in bidsList"
            v-show="showBids"
            :key="i"
            class="bids-main-div"
          >
            <div class="bids-inner-div">
              <div>
                <div class="author">
                  {{ item.user_id.display_name }}
                  <img
                    v-if="item.user_id.is_kyc_verified"
                    class="tick-icon"
                    height="16"
                    src="@svg/tick.svg"
                    width="16"
                  >
                </div>
                <div class="date-time">
                  {{ new Date(item.created_at).toLocaleString() }}
                </div>
              </div>
              <div class="price">
                {{ item.amount }} ETH
              </div>
            </div>
            <div
              class="input-line"
            />
          </div>
          <NoBid
            v-show="nobid"
          />
        </div>
        <DetailsTab
          v-if="showDetails"
          :text="$t('nft_details.contact_details')"
          :value="nft.owner_address.slice(0, 15)+'...'"
        />
        <div
          v-if="nft.price"
        >
          <DetailsTab
            v-if="showDetails"
            :id="nft.price"
            :text="$t('nft_details.price')"
          />
        </div>
        <div
          v-if="nft.minimum_bid"
        >
          <DetailsTab
            v-if="showDetails"
            :id="nft.minimum_bid"
            :text="$t('nft_details.price')"
          />
        </div>
        <DetailsTab
          v-if="showDetails"
          :text="$t('nft_details.blockchain')"
          :value="$t('nft_details.blockchain_value')"
        />
        <div
          v-if="showHistory"
        >
          <HistoryTab
            v-if="nft.pricing_type=='timed_auction'"
            :creater="nft.creator.display_name"
            :date="nft.createdAt"
            :history-details-list="bidsList"
            :price="nft.minimum_bid"
            type="timed_auction"
            :verified="nft.creator.is_kyc_verified"
          />
          <HistoryTab
            v-if="nft.pricing_type=='fixed'"
            :creater="nft.creator.display_name"
            :date="nft.createdAt"
            :price="nft.price"
            type="fixed"
            :verified="nft.creator.is_kyc_verified"
          />
        </div>
        <BaseModal
          v-show="networkChange"
          @close="closeModal"
        >
          <template #body>
            <h2 class="network-text">
              Wrong Network
            </h2>
            <p class="network-text">
              Please change your network to ropsten and try again
            </p>
          </template>
        </BaseModal>
        <BaseModal
          v-show="success"
          @close="closeModal"
        >
          <template #body>
            <div class="center">
              <img
                src="@svg/verified.svg"
              >
              <a>Bid Placed!</a>
            </div>
          </template>
        </BaseModal>
        <div class="actions">
          <div
            v-if="nft.pricing_type == 'fixed'"
            class="actions"
          >
            <BaseRoundButton
              v-if="username == null
                || nft.creator.display_name !== username.display_name"
              class="buy-button btn-primary btn-md btn-bold"
              icon="arrow-right"
              :text="$t('nft_details.buy_now')"
              @click="showModal"
            />
            <BaseModal
              v-show="isModalVisiblefixed"
              @close="closeModal"
            >
              <template #header>
                Buy NFT
              </template>

              <template #body>
                <BuyModal
                  :accountbalance="accountBalance"
                  :creatoraddress="nft.creator_address"
                  :description="nft.description"
                  :image="nft.uri"
                  :nfttype="nft.supply"
                  :price="nft.price"
                  :title="nft.title"
                  :tokenid="nft.tokenId"
                />
              </template>
            </BaseModal>
          </div>
          <div
            v-else
            class="bid-button-div"
          >
            <BaseRoundButton
              v-if="username == null
                || nft.creator.display_name !== username.display_name"
              class="bid-button btn-outline-primary btn-bold btn-xl"
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
                <BidModal
                  :accountbalance="accountBalance"
                  :description="nft.description"
                  :image="nft.uri"
                  :nfttype="nft.supply"
                  :title="nft.title"
                  :tokenid="nft.tokenId"
                />
              </template>
              <template #footer>
              <!-- <BaseRoundButton
                class="buy-button btn-primary btn-md btn-bold"
                icon="arrow-right"
                :text="$t('nft_details.place_bid')"
              /> -->
              </template>
            </BaseModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DetailsTab from '@/components/Nft/DetailsTab.vue';
import HistoryTab from '@/components/Nft/HistoryTab.vue';
import BidModal from '@/components/Nft/BidModal.vue';
import BuyModal from '@/components/Nft/BuyModal.vue';
import NoBid from './NoBid.vue';

const Web3 = require('web3');

export default {
  name: 'TokenDetails',
  components: {
    DetailsTab, HistoryTab, BidModal, NoBid, BuyModal,
  },
  data() {
    return {
      isModalVisiblefixed: false,
      showBids: true,
      showDetails: false,
      nobid: true,
      showHistory: false,
      isModalVisible: false,
      username: JSON.parse(localStorage.getItem('userData')),
      accountBalance: '',
      getNftDetails: [],
      networkChange: false,
      tabFixedNft: [
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
      tabTitleList: [
        {
          name: this.$t('nft_details.tabs.bids'),
          handler: () => {
            if (this.bidsList.length === 0) {
              this.nobid = true;
            } else {
              this.nobid = false;
            }
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
            this.nobid = false;
          },
        },
        {
          name: this.$t('nft_details.tabs.history'),
          handler: () => {
            this.showBids = false;
            this.showDetails = false;
            this.showHistory = true;
            this.nobid = false;
          },
        },
      ],
      bidsList: [],
      nftDetails: {
        contactDetails: '0x3bdb...6d4a',
        tokenId: 28473,
        blockchain: 'Ethereum',
      },
    };
  },
  async mounted() {
    if (this.$route.params.id == null || this.$route.params.id === undefined || this.$route.params.id === '') {
      this.$router.push('/');
    } else if (await this.GetNFTDetails()) {
      this.GetBids();
    } else {
      this.$router.push({ name: 'PathNotFound' });
    }
  },
  methods: {
    showModal() {
      if (!this.$store.getters['auth/isLoggedIn']) {
        this.$router.push({ name: 'Login', params: { redirectFrom: this.$route.path } });
      } else if (this.$store.getters['auth/isExpired']) {
        this.$store.dispatch('auth/logout');
        this.$router.push({
          name: 'Login',
          params: {
            redirectFrom: this.$route.path,
            errorMsg: this.$t('router.expired'),
          },
        });
      } else if (this.$store.getters['auth/username'] == null) {
        this.$router.push({ name: 'EditProfile', params: { errorMsg: this.$t('router.fill_in_username') } });
      } else {
        this.isWalletConnected();
      }
    },
    closeModal() {
      this.isModalVisiblefixed = false;
      this.isModalVisible = false;
      this.networkChange = false;
    },
    async isWalletConnected() {
      // walletLink.disconnect();
      // const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
      const metamask = window.ethereum;
      // if (ethereum) {
      //   console.log('Walletlink');
      //   const web3 = new Web3(ethereum);
      //   ethereum.enable().then((accounts) => {
      //     console.log(`User's address is ${accounts[0]}`);
      //     localStorage.setItem('account', accounts[0]);
      //   });
      //   const balance = await web3.eth.getBalance(localStorage.getItem('account'));
      //   console.log(balance);
      //   const ethBalance = (balance / 1000000000000000000).toFixed(2);
      //   this.accountBalance = ethBalance;
      // } else if (metamask) {
      const web3 = new Web3(metamask);
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      const [accounts] = await web3.eth.getAccounts();
      localStorage.setItem('account', accounts);
      const chainid = await web3.eth.getChainId();
      console.log(chainid);
      if (chainid !== 3) {
        this.networkChange = true;
        this.isModalVisible = false;
        this.isModalVisiblefixed = false;
      } else if (chainid === 3) {
        this.networkChange = false;
        this.isModalVisible = true;
        this.isModalVisiblefixed = true;
      }
      const balance = await web3.eth.getBalance(localStorage.getItem('account'));
      const ethBalance = (balance / 1000000000000000000).toFixed(2);
      this.accountBalance = ethBalance;
    },
    async GetNFTDetails() {
      let response = null;
      try {
        const { data } = await this.$api.GETNFTDETAILS(this.$route.params.id);
        response = data;
        this.getNftDetails = [response.data];
        if (this.getNftDetails[0].pricing_type === 'fixed') {
          this.showBids = false;
          this.showDetails = true;
          this.showHistory = false;
        }
      } catch (error) {
        response = error?.response?.data;
      }
      return response?.success === true;
    },
    async GetBids() {
      let getBidData = null;
      try {
        const { data } = await this.$api.GETBIDS(this.$route.params.id);
        getBidData = data;
        if (getBidData.data.length === 0) {
          this.nobid = true;
        } else {
          this.bidsList = getBidData.data;
        }
      } catch (error) {
        getBidData = error?.response?.data;
        this.nobid = true;
      }
    },
  },
};
</script>
<style scoped>
.token-details {
  display: flex;
}

.display-token-image {
  width: 60%;
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
  width: 40%;
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
  line-height: 1.125rem;
  margin-bottom: 0.625rem;
}

.bids-main-div {
  margin-bottom: 1.4688rem;
  margin-top: 3rem;
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

.center {
  text-align: center;
}

.center a {
  color: #111;
  font-size: 1rem;
  margin-left: 0.6rem;
}

.center img {
  width: 1rem;
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
  width: 100%;
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

.network-text {
  text-align: center;
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

@media (min-width: 62em) and (max-width: 87.5em) {
  .tab {
    width: 100% !important;
  }
}
</style>
