<template>
  <div>
    <div
      v-if="loading === true"
      class="tokenLoading"
    >
      <img
        src="@svg/loading.svg"
        style="text-align: center"
      >
    </div>
    <div
      v-else
      class="token-details"
    >
      <div class="display-token-image">
        <div
          class="token-text-div"
        >
          <span class="token-text">{{ nftDetails?.title }}</span>
          <div class="button-div">
            <BaseRoundButton
              class="btn-outline-secondary button btn-unclickable"
              :img="nftDetails.category?.image"
              :text="nftDetails.category?.category"
            />
          </div>
        </div>
        <img
          v-if="nftDetails.asset_type === 'image'"
          class="token-image"
          :src="nftDetails.uri"
        >
        <video
          v-else-if="nftDetails.asset_type === 'video'"
          class="token-image mt2"
          controls
          width="400"
          @click="handleClick"
        >
          <source
            :src="nftDetails.uri"
            type="video/mp4"
          >
          <source
            :src="nftDetails.uri"
            type="video/ogg"
          >
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="display-token-details">
        <div class="user-details">
          <div class="details-section">
            <label> {{ $t('nft_details.owner') }}</label>
            <div class="creater-details">
              <img
                class="creater-image"
                height="40"
                :onerror="$global.handleAvatarError"
                :src="$global.handleAvatarURL(nftDetails.owner?.image)"
                width="40"
              >
              <span
                v-if="nftDetails.owner?.display_name"
                class="creater-name"
              >
                {{ nftDetails.owner?.display_name }}
              </span>
              <span
                v-else
                class="creater-name"
              >{{
                ((nftDetails.owner?.address).
                  replace((nftDetails.owner?.address).substring(5, 36), '*******'))
              }}</span>
              <img
                v-if="nftDetails.owner?.is_kyc_verified"
                class="tick-icon"
                height="16"
                src="@svg/tick.svg"
                width="16"
              >
            </div>
          </div>
          <div class="details-section">
            <label>
              {{ isAuction ? $t('nft_details.minimum_bid') : $t('nft_details.price') }}
            </label>
            <div class="highest-bid-details">
              <img
                class="coins-icon"
                height="20"
                src="@svg/ethereum.svg"
                width="20"
              >
              <span
                class="coin"
              >
                {{ nftDetails.minimum_bid || nftDetails.price }} ETH
              </span>
            </div>
          </div>
        </div>

        <div class="token-content details-section">
          <label> {{ $t('nft_details.description') }}</label>
          <div class="token-description">
            {{ nftDetails.description }}
          </div>
        </div>
        <BaseNavigationTab
          :key="tabList.length"
          class="tab"
          :list="tabList"
        />
        <div class="tab-screen">
          <div v-if="screenStatus.bids">
            <div v-if="bidsList?.length > 0">
              <div
                v-for="(item, i) in bidsList"
                :key="i"
                class="bids-main-div"
              >
                <div class="bids-inner-div">
                  <div>
                    <div
                      v-if="item.user_id.display_name"
                      class="author"
                    >
                      {{
                        item.user_id.display_name
                      }}
                      <img
                        v-if="item.user_address"
                        class="tick-icon"
                        height="16"
                        src="@svg/tick.svg"
                        width="16"
                      >
                    </div>
                    <div
                      v-else
                      class="author"
                    >
                      {{
                        ((item?.user_address).
                          replace((item?.user_address).substring(5, 36), '*******'))
                      }}
                      <img
                        v-if="item.user_address"
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
            </div>
            <NoBid v-else />
          </div>

          <div v-if="screenStatus.details">
            <DetailsTab
              v-for="(item, index) in detailsTabList"
              :key="index"
              :text="item.text"
              :value="item.value"
            />
          </div>

          <div v-if="screenStatus.history">
            <HistoryTab
              :creater="nftDetails.creator?.display_name"
              :date="nftDetails.createdAt"
              :price="nftDetails.price"
              :type="nftDetails.pricing_type"
              :verified="nftDetails.creator?.is_kyc_verified"
            />
          </div>
        </div>
        <div
          class="actions"
        >
          <BaseRoundButton
            v-if="(nftDetails.owner.address !== Address)"
            class="buy-button btn-primary btn-md btn-bold"
            icon="arrow-right"
            :text="isAuction ? $t('nft_details.place_bid') : $t('nft_details.buy_now')"
            @click="showModal"
          />
          <BaseRoundButton
            v-else-if="(nftDetails.owner.address === Address)
              &&(nftDetails.market_visibility === true)
              && (isTimeAuction) && (bidsList?.length == 0)"
            class="buy-button btn-primary btn-md btn-bold auction_actions"
            :icon="isLoading ? 'loading' : 'arrow-right'"
            :text="$t('nft_details.takeoff')"
            @click="takeOffMarket"
          />
          <BaseRoundButton
            v-else-if="(nftDetails.owner.address === Address)
              &&(nftDetails.market_visibility === false)
              && (isTimeAuction) && (bidsList?.length == 0)"
            class="buy-button btn-primary btn-md btn-bold auction_actions"
            :icon="isLoading ? 'loading' : 'arrow-right'"
            :text="$t('nft_details.puton')"
            @click="resale"
          />
          <div
            v-else-if="(nftDetails.owner.address === Address) && (isUnlimitedAuction)"
            class="actions"
          >
            <BaseRoundButton
              v-if="bidsList?.length == 0"
              class="buy-button btn-primary btn-md btn-bold"
              :icon="isLoading ? 'loading' : 'arrow-right'"
              :text="$t('nft_details.takeoff')"
              @click="takeOffMarket"
            />
            <BaseRoundButton
              v-else
              class="buy-button btn-primary btn-md btn-bold"
              :icon="isLoading ? 'loading' : 'arrow-right'"
              :text="$t('nft_details.close_bid')"
              @click="closeBid"
            />
          </div>
          <BaseModal
            v-show="isModalVisible"
            @close="closeModal"
          >
            <template #header>
              {{ isAuction ? $t('nft_details.place_a_bid') : $t('nft_details.buy_nft') }}
            </template>

            <template #body>
              <BidModal
                v-if="isAuction"
                :accountbalance="accountBalance"
                :bid="bidsList"
                :description="nftDetails.description"
                :image="nftDetails.uri"
                :minimumbid="nftDetails.minimum_bid"
                :nfttype="nftDetails.supply"
                :title="nftDetails.title"
                :tokenid="nftDetails.tokenId"
                :tokentype="nftDetails.collectible_type"
                @bidPlaced="showBuySuccess($event)"
              />
              <BuyModal
                v-else
                :accountbalance="accountBalance"
                :creatoraddress="nftDetails.owner_address"
                :description="nftDetails.description"
                :image="nftDetails.uri"
                :nfttype="nftDetails.supply"
                :price="nftDetails.price"
                :title="nftDetails.title"
                :tokenid="nftDetails.tokenId"
                :tokentype="nftDetails.collectible_type"
                @bidPlaced="showBidSuccess($event)"
              />
            </template>
          </BaseModal>
        </div>
        <BaseModal
          v-show="placeBuy"
          :hasClosedBtn="false"
          @close="closeModal"
        >
          <template #body>
            <h2 style="text-align: center;">
              {{ $t('buy_modal.success') }}
            </h2>
            <p style="text-align: center;">
              {{ $t('buy_modal.buy_message') }}
            </p>
            <router-link
              to="/"
            >
              <BaseRoundButton
                class="buy-button btn-primary btn-md btn-bold mb mt2"
                :text="$t('buy_modal.btn')"
              />
            </router-link>
          </template>
        </BaseModal>
        <BaseModal
          v-show="placeBid"
          :hasClosedBtn="false"
          @close="closeModal"
        >
          <template #body>
            <h2 style="text-align: center;">
              {{ $t('buy_modal.success') }}
            </h2>
            <p style="text-align: center;">
              {{ $t('buy_modal.bid_message') }}
            </p>
            <router-link
              to="/"
            >
              <BaseRoundButton
                class="buy-button btn-primary btn-md btn-bold mb mt2"
                :text="$t('buy_modal.btn')"
              />
            </router-link>
          </template>
        </BaseModal>
        <BaseModal
          v-show="closedBid"
          @close="closeModal"
        >
          <template #body>
            <h2 style="text-align: center;">
              {{ $t('buy_modal.success') }}
            </h2>
            <p style="text-align: center;">
              {{ $t('buy_modal.closeBid_message') }}
            </p>
            <router-link
              to="/"
            >
              <BaseRoundButton
                class="buy-button btn-primary btn-md btn-bold mb mt2"
                :text="$t('buy_modal.btn')"
              />
            </router-link>
          </template>
        </BaseModal>
      </div>
    </div>
  </div>
</template>
<script>
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import DetailsTab from '@/components/Nft/DetailsTab.vue';
import HistoryTab from '@/components/Nft/HistoryTab.vue';
import BidModal from '@/components/Nft/BidModal.vue';
import BuyModal from '@/components/Nft/BuyModal.vue';
import { PriceType } from '@/utils/enums';
import NoBid from './NoBid.vue';

// const Web3 = require('web3');

const APP_NAME = 'Naffiti';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://rinkeby.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
const CHAIN_ID = 3;
// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

export default {
  name: 'TokenDetails',
  components: {
    DetailsTab, HistoryTab, BidModal, NoBid, BuyModal,
  },
  data() {
    return {
      isModalVisible: false,
      isLoading: false,
      screenStatus: { details: false, history: false },
      accountBalance: 0,
      NftId: this.$route.params.id,
      closed: false,
      loading: true,
      tabList: [
        {
          name: this.$t('nft_details.tabs.details'),
          handler: () => { this.toggleScreen('details'); },
        },
        {
          name: this.$t('nft_details.tabs.history'),
          handler: () => { this.toggleScreen('history'); },
        },
      ],
      detailsTabList: [],
      placeBuy: false,
      placeBid: false,
      closedBid: false,
      bidsList: [],
      nftAddress: '',
      token: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      Address: localStorage.getItem('account'),
      erc721ContractAddress: '0x9aE66F8aDF65816BE94C957D6D37b316791Bc5CD',
      erc1155ContractAddress: '0x5eb7Ce96075387E343D4c50b42ADb4AFE79852E5',
      delegateContractAddress: '0x5B39243bc3bC37DC8d1E4088b85B103a7719cD1d',
    };
  },
  computed: {
    username() { return this.$store.getters['auth/username']; },
    nftDetails() { return this.$route.params.nft; },
    isTimeAuction() { return this.nftDetails.pricing_type === PriceType.TIMED_AUCTION; },
    isUnlimitedAuction() { return this.nftDetails.pricing_type === PriceType.UNLIMITED_AUCTION; },
    isAuction() { return this.isTimeAuction || this.isUnlimitedAuction; },
  },
  async mounted() {
    if (this.isAuction) {
      this.tabList.unshift({
        name: this.$t('nft_details.tabs.bids'),
        handler: () => { this.toggleScreen('bids'); },
      });
    }

    this.screenStatus[this.isAuction ? 'bids' : 'details'] = true;
    this.bidsList = await this.$api.GET_BIDS(this.$route.params.id);
    console.log(this.bidsList);
    this.detailsTabList = [
      // {
      //   text: this.$t('nft_details.contact_details'),
      //   value: `${this.nftDetails.owner_address?.slice(0, 15)}...`,
      // },
      {
        text: this.$t('nft_details.price'),
        value: `${this.nftDetails.minimum_bid || this.nftDetails.price} ETH`,
      },
      {
        text: this.$t('nft_details.blockchain'),
        value: this.$t('nft_details.blockchain_value'),
      },
    ];
    if (this.nftDetails.collectible_type === 'single') {
      this.nftAddress = this.erc721ContractAddress;
      this.token = 1;
    } else {
      this.nftAddress = this.erc1155ContractAddress;
      this.token = 2;
    }
    // console.log(this.nftDetails.market_visibility);
    if (this.nftDetails) {
      this.loading = false;
    }
  },
  methods: {
    showBidSuccess(s) {
      console.log(s);
      if (s === true) {
        this.isModalVisible = false;
        this.placeBuy = true;
      }
    },
    showBuySuccess(s) {
      console.log(s);
      if (s === true) {
        this.isModalVisible = false;
        this.placeBid = true;
      }
    },
    showModal() {
      if (!this.$store.getters['auth/isLoggedIn']) {
        return this.$router.push({ name: 'ConnectWallet', params: { redirectFrom: this.$route.path } });
      }

      if (this.$store.getters['auth/isExpired']) {
        this.$store.dispatch('auth/logout');
        return this.$router.push({
          name: 'ConnectWallet',
          params: {
            redirectFrom: this.$route.path,
            errorMsg: this.$t('router.expired'),
          },
        });
      }

      // if (this.username == null) {
      //   return this.$router.push({ name: 'EditProfile',
      // params: { errorMsg: this.$t('router.fill_in_username') } });
      // }

      this.isWalletConnected();
      return true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.placeBid = false;
      this.placeBuy = false;
      this.closedBid = false;
    },
    async closeBid() {
      // this.isLoading = true;
      const web3 = new Web3(window.ethereum);
      this.isLoading = true;
      const delegateContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
      await delegateContract.methods
        .closeBid(this.erc721ContractAddress, this.nftDetails.tokenId, (1), '0x00')
        .send({ from: this.Address })
        .on('error', (error) => {
          console.log(error);
          this.isLoading = false;
        }).once('receipt', async () => {
          this.closedBid = true;
        });
      this.isLoading = false;
    },
    closedBidModal() {
      this.closedBid = false;
    },
    toggleScreen(name) {
      Object.keys(this.screenStatus).forEach((key) => {
        this.screenStatus[key] = (key === name);
      });
    },
    takeOffMarket() {
      this.isLoading = true;
      const web3 = new Web3(window.ethereum);
      console.log(this.nftAddress, this.nftDetails.tokenId,
        this.nftDetails.collectible_type, this.token);
      const delegateContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
      delegateContract.methods
        .closeOrder(this.nftAddress, this.nftDetails.tokenId, this.token, this.userData.uid)
        .send({ from: this.Address })
        .on('error', (error) => {
          console.log(error);
          this.isLoading = false;
          this.$toast.error('An error occurred');
        })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.isLoading = false;
          this.placeBuy = true;
          // this.$toast.error('Successfully taken NFT off Marketplace');
        });
    },
    resale() {
      this.$router.push({ name: 'ResaleNFT', params: { id: this.NftId } });
    },
    async isWalletConnected() {
      if (!(await this.$global.isWalletConnected()) || !(await this.$global.isAddressExist())) {
        return;
      }
      this.$global.detectingChain();

      let provider;
      const obj = JSON.parse(localStorage.getItem('walletconnect'));
      if (obj === (localStorage.getItem('account'))) {
        provider = new WalletConnectProvider({
          infuraId: '58bf1103531f4b858b31eb3c5c4ddd2f',
        });
      } else if ((localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses')) === (localStorage.getItem('account'))) {
        provider = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
        const web3 = new Web3(provider);
        const account = await provider.enable();
        this.isModalVisible = true;
        const connectedAccount = account[0];
        console.log(account);
        this.accountAddress = localStorage.setItem('account', connectedAccount);
        web3.eth.getBalance(localStorage.getItem('account'), (err, result) => {
          if (err) {
            console.log(err);
          } else {
            this.accountBalance = ((web3.utils.fromWei(result, 'ether')) / 1000000000000000000);
          }
        });
      } else {
        provider = window.ethereum;
        const web3 = new Web3(provider);
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        this.isModalVisible = true;
        const [accounts] = await web3.eth.getAccounts();
        this.accountAddress = localStorage.setItem('account', accounts);
        web3.eth.getBalance(localStorage.getItem('account'), (err, result) => {
          if (err) {
            console.log(err);
          } else {
            this.accountBalance = (web3.utils.fromWei(result, 'ether'));
          }
        });
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
  border-radius: 1rem;
  margin-top: 1.25rem;
  object-fit: cover;
  width: 90%;
}

.button {
  font-size: 0.9375em;
  font-weight: bold;
  line-height: 150%;
  padding: 0.3rem 1.75rem;
}

.mt2 {
  margin-top: 2rem;
}

.creater-image {
  border-radius: 50%;
  object-fit: cover;
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

.show {
  display: none;
}

.coin-value {
  color: rgba(0, 0, 0, 0.25);
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

/* .actions {
  display: flex;
} */

.actions {
  display: block;
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

.tab-screen {
  margin-bottom: 3rem;
  margin-top: 3rem;
  min-height: 10rem;
}

.tokenLoading {
  text-align: center;
  width: 100%;
}

@media (max-width: 34em) {
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
</style>
