<template>
  <div class="create-nft-main">
    <Base
      :title="title"
    >
      <div id="error" />
      <BaseForm
        ref="collectible-nft"
        class="nft-form"
        @submit="onSubmit"
      >
        <UploadCard
          :text="$t('collectible.upload_file_label')"
        />
        <div class="input-div">
          <div class="toggle-div label">
            <span>{{ $t('collectible.put_on_marketplace') }}</span>

            <label class="switch">
              <input
                checked
                type="checkbox"
                @click="toggleSwitch"
              >
              <span class="slider round" />
            </label>
          </div>
          <BaseNavigationTab
            v-if="selectedSwitch"
            class="tabs"
            :list="tabList"
            :width="10.6"
          />
          <Field
            v-model="pricingType"
            class="input-field unshow"
            name="pricing_type"
          />
        </div>
        <template v-if="selectedSwitch && pricingType === PriceType.FIXED">
          <BaseUnderlinedInput
            ref="price"
            class="input-field"
            name="price"
            :placeholder="$t('collectible.amount_placeholder')"
            rules="required"
            :text="$t('collectible.amount_label')"
            type="number"
            @input="getServiceFee"
          >
            <template #element>
              <span style="font-weight: bold;">ETH</span>
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            ref="receivedAmount"
            class="input-field"
            name="receivedAmount"
            :placeholder="$t('collectible.received_amount_placeholder')"
            rules="required"
            :text="$t('collectible.received_amount_label')"
            type="number"
          >
            <template #element>
              <span style="font-weight: bold;">ETH</span>
            </template>
          </BaseUnderlinedInput>
        </template>
        <template v-if="selectedSwitch && pricingType !== PriceType.FIXED">
          <BaseUnderlinedInput
            class="input-field"
            name="minimum_bid"
            :placeholder="$t('collectible.auction_placeholder')"
            rules="required"
            :text="$t('collectible.auction_label')"
            type="number"
          >
            <template #element>
              <span style="font-weight: bold;">ETH</span>
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            class="input-field"
            name="starting_date"
            :placeholder="$t('collectible.auction_start_placeholder')"
            rules="required"
            :text="$t('collectible.auction_start_label')"
            type="date"
            @click="getStartDate"
          />
          <BaseUnderlinedInput
            v-if="pricingType == PriceType.TIMED_AUCTION"
            class="input-field"
            name="expiration_date"
            :placeholder="$t('collectible.auction_expiration_placeholder')"
            rules="required"
            :text="$t('collectible.auction_expiration_label')"
            type="date"
            @click="getMinEndDate"
          />
        </template>
        <BaseScrollableSelectBox
          class="input-div label"
          :default-selected="false"
          key-name="_id"
          name="name"
          :options="collectible_class"
          rules="required"
          :text="$t('collectible.choose_collection_label')"
        />
        <BaseScrollableSelectBox
          class="input-div label"
          :default-selected="false"
          key-name="_id"
          name="category"
          :options="categories"
          rules="required"
          :text="$t('collectible.category')"
          value-name="category"
        />
        <BaseUnderlinedInput
          class="input-field"
          name="title"
          :placeholder="$t('collectible.title_placeholder')"
          rules="required"
          :text="$t('collectible.title_label')"
        />
        <BaseUnderlinedInput
          class="input-field"
          name="description"
          :placeholder="$t('collectible.discription_placeholder')"
          rules="required"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="tokenId"
          class="input-field unshow"
          name="tokenId"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <div class="inline">
          <BaseScrollableSelectBox
            class="input-div label"
            key-name="value"
            name="royalties[0].value"
            :options="royaltiesList"
            rules="required"
            :text="$t('collectible.royalties_label')"
          />
        </div>
        <BaseUnderlinedInput
          v-model="value"
          class="input-field unshow"
          name="royalties[0].recipient"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-if="standard === 'erc1155'"
          class="input-field copies-input"
          name="copies"
          :placeholder="$t('collectible.number_of_copies_placeholder')"
          rules="required"
          :text="$t('collectible.number_of_copies_label')"
        />
        <BaseUnderlinedInput
          v-if="standard === 'erc1155'"
          v-model="ipfsUrl"
          class="input-field unshow"

          name="ipfsUrl"
          :placeholder="$t('collectible.number_of_copies_placeholder')"
          :text="$t('collectible.number_of_copies_label')"
        />
        <BaseUnderlinedInput
          v-model="uri"
          class="input-field unshow"
          name="uri"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="value"
          class="input-field unshow"
          name="owner_address"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseModal
          v-show="isModalVisible"
          @close="closeModal"
        >
          <template #body>
            <h4 class="modal-text">
              Mint Successful!
            </h4>
          </template>
        </BaseModal>
        <div>
          <BaseRoundButton
            class="btn-primary btn-md btn-bold"
            :icon="isLoading ? 'loading' : 'arrow-right'"
            :text="$t('collectible.create_button_text')"
            @click="metaData"
          />
        </div>
      </BaseForm>
    </Base>
  </div>
</template>
<script>

import UploadCard from '@/components/Nft/UploadCard.vue';
import Base from '@/components/Nft/BaseFrame.vue';
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Field } from 'vee-validate';

const Web3 = require('web3');

const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001');

const APP_NAME = 'Naffiti';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://ropsten.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
const CHAIN_ID = 3;

// Initialize WalletLink
const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

const PriceType = {
  FIXED: 'fixed',
  TIMED_AUCTION: 'timed_auction',
  UNLIMITED_AUCTION: 'unlimited_auction',
};

export default {
  name: 'CreateNFT',
  components: { UploadCard, Base, Field },
  data() {
    return {
      PriceType,
      isLoading: false,
      categories: [],
      isModalVisible: false,
      selectedSwitch: true,
      coinType: 'ETH',
      collectibleList: [
        { name: 'ERC-721', id: 'erc' },
      ],
      baseTabList: [
        {
          name: this.$t('collectible.tab.fixed_price'),
          handler: () => { this.pricingType = PriceType.FIXED; },
        },
        {
          name: this.$t('collectible.tab.unlimited_auction'),
          handler: () => { this.pricingType = PriceType.UNLIMITED_AUCTION; },
        },
      ],
      royaltiesList: [
        { name: '10 %', value: '1000' },
        { name: '20 %', value: '2000' },
        { name: '30 %', value: '3000' },
      ],
      uri: '',
      value: localStorage.getItem('account'),
      collectible_class: [],
      tokenId: '',
      receivedAmount: '',
      pricingType: PriceType.FIXED,
      ipfsUrl: '',
      r: localStorage.getItem('r'),
      s: localStorage.getItem('s'),
      v: localStorage.getItem('v'),
      erc721ContractAddress: '0xF3538d2696FF98396Aa0386d91bd7f9C02570511',
      erc1155ContractAddress: '0x24d5CaBE5A68653c1a6d10f65679839a5CD4a42A',
      erc20ContractAddress: '0xEF55376cdD71225501E1d9763D907E3A14C10Bb1',
    };
  },
  computed: {
    standard() { return this.$route.params.standard; },
    title() {
      return this.standard === 'erc721' ? this.$t('collectible.title_single') : this.$t('collectible.title_multiple');
    },
    tabList() {
      const result = this.baseTabList;
      if (this.standard === 'erc721') {
        result.splice(1, 0, {
          name: this.$t('collectible.tab.timed_auction'),
          handler: () => { this.pricingType = PriceType.TIMED_AUCTION; },
        });
      }
      return result;
    },
  },
  async mounted() {
    this.$global.isWalletConnected();
    this.$global.isAddressExist();
    this.fetchDetails();
  },
  methods: {
    async fetchDetails() {
      let response = null;
      try {
        let type = null;
        if (this.standard === 'erc1155') {
          type = false;
          const { data } = await this.$api.GETCOLLECTIBLE(localStorage.getItem('account'), type);
          response = data;
        } else {
          type = true;
          const { data } = await this.$api.GETCOLLECTIBLE(localStorage.getItem('account'), type);
          response = data;
        }
        this.collectible_class = response.data;
      } catch (error) {
        response = error?.response?.data;
      }
      this.categories = await this.$api.GET_FILTER_CATEGORIES();
    },
    toggleSwitch() {
      this.selectedSwitch = !this.selectedSwitch;
    },
    getStartDate() {
      const name = document.querySelector('.starting_date');
      const min = new Date().toISOString().split('T')[0];
      name.setAttribute('min', min);
      console.log((min));
    },
    getMinEndDate() {
      console.log('working');
      const name = document.querySelector('.expiration_date');
      const nextDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      name.setAttribute('min', nextDate);
      console.log((nextDate));
    },
    getServiceFee() {
      const amount = this.$refs.price.value;
      const discountAmount = ((amount * 0.025).toFixed(4));
      const newAmount = (amount - discountAmount).toFixed(4);
      this.$refs.receivedAmount.value = newAmount;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async metaData() {
      if (!(await this.$global.isWalletConnected()) || !(await this.$global.isAddressExist())) {
        return;
      }
      this.$global.detectingChain();
      const { valid } = await this.$refs['collectible-nft'].form.validate();
      if (!valid) { return; }

      this.isLoading = true;
      const desc = document.querySelectorAll('.description')[1].value;
      const title = document.querySelectorAll('.title')[1].value;
      const ipfsHash = `https://ipfs.io/ipfs/${sessionStorage.getItem('ipfsHash')}`;
      this.uri = sessionStorage.getItem('ipfsHash');
      let cid;
      if (this.standard === 'erc1155') {
        this.isLoading = true;
        const qty = document.querySelector('.copies').value;
        const metadata = {
          description: desc,
          name: title,
          image: ipfsHash,
          quantity: qty,
        };
        const doc = JSON.stringify({ metadata });
        cid = await ipfs.add(doc);
        this.ipfsUrl = `https://${cid}.ipfs.dweb.link`;
        await ipfs.cat(cid);
        this.minting(qty, cid);
      } else {
        this.isLoading = true;
        const metadata = {
          description: desc,
          name: title,
          image: ipfsHash,
        };
        const doc = JSON.stringify({ metadata });
        cid = await ipfs.add(doc);
        await ipfs.cat(cid);
        this.minting(null, cid);
      }
    },
    async minting(qty, cid) {
      let provider;
      const obj = JSON.parse(localStorage.getItem('walletconnect'));
      if (obj && (obj.accounts[0]) === (localStorage.getItem('account'))) {
        provider = new WalletConnectProvider({
          infuraId: '58bf1103531f4b858b31eb3c5c4ddd2f',
        });
      } else if ((localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses')) === (localStorage.getItem('account'))) {
        provider = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
      } else {
        provider = window.ethereum;
      }
      const web3 = new Web3(provider);
      if (this.standard === 'erc1155') {
        // return this.$t('collectible.title_single');
        const contract = new web3.eth.Contract(require('@/assets/abi/erc1155').default, this.erc1155ContractAddress);
        contract.methods
          .setApprovalForAll('0x7f55D3eCd78868c677Af7C8fa45B25750841cd54', true)
          .send({ from: localStorage.getItem('account'), gas: 2000000, gasPrice: '35000000000' })
          .on('error', (error) => {
            console.log(error);
            this.isLoading = false;
          });
        const result = await contract.methods
          .mint(qty)
          .send({ from: localStorage.getItem('account'), gas: 2000000, gasPrice: '20000000000' }).on('error', (error) => {
            console.log(error);
            this.isLoading = false;
          });
        this.ipfsUrl = cid;
        this.tokenId = result.events.TokenMinted.returnValues.tokenType;
        this.$refs['collectible-nft'].$el.dispatchEvent(new Event('submit', { cancelable: true }));
      } else {
        const contract = new web3.eth.Contract(require('@/assets/abi/erc721').default, this.erc721ContractAddress);
        if (this.pricingType === PriceType.FIXED) {
          console.log('yes');
          contract.methods
            .setApprovalForAll('0x7f55D3eCd78868c677Af7C8fa45B25750841cd54', true)
            .send({ from: localStorage.getItem('account'), gas: 200000, gasPrice: '2000000000' })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          const result = await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: localStorage.getItem('account'), gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          this.ipfsUrl = cid;
          this.tokenId = result.events.Transfer.returnValues.tokenId;
          const price = document.querySelector('.price').value;
          contract.methods.createSellOrder(this.tokenId, web3.utils.toWei(price, 'ether')).send({ from: localStorage.getItem('account'), gas: 3500000, gasPrice: '35000000000' });
        }
        if (this.pricingType === PriceType.TIMED_AUCTION) {
          const startPrice = document.querySelector('.minimum_bid').value;
          const auctionStartdate = document.querySelector('.starting_date').value;
          const auctionExpirationdate = document.querySelector('.expiration_date').value;
          const startDate = new Date(auctionStartdate);
          const endDate = new Date(auctionExpirationdate);
          const timeDuration = (endDate.getTime() - startDate.getTime()) / 1000;
          contract.methods
            .setApprovalForAll('0x7f55D3eCd78868c677Af7C8fa45B25750841cd54', true)
            .send({ from: localStorage.getItem('account'), gas: 3000000, gasPrice: '35000000000' })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          const result = await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: localStorage.getItem('account'), gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          this.ipfsUrl = cid;
          this.tokenId = result.events.Transfer.returnValues.tokenId;
          contract.methods.CreateAuction(this.tokenId, (1), timeDuration, web3.utils.toWei(startPrice, 'ether')).send({ from: localStorage.getItem('account'), gas: 3500000, gasPrice: '35000000000' });
        }
        this.$refs['collectible-nft'].$el.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    },
    async onSubmit(CollectibleNftData) {
      // let response = null;
      try {
        // const { data } = this.$api.CREATENFT(CollectibleNftData);
        // response = data;
        this.$api.CREATENFT(CollectibleNftData);
        this.$router.push({ name: 'Profile' });
      } catch (error) {
        // response = error.response.data;
        this.isLoading = false;
        this.isModalVisible = false;
      }
      this.isLoading = false;
    },
  },
};

</script>

<style scoped>
.create-nft-main {
  max-width: 32.5rem;
}

.input-div {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.875rem;
}

.toggle-div {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.switch {
  display: inline-block;
  height: 1.875rem;
  position: relative;
  width: 3.75rem;
}

.switch input {
  height: 0;
  opacity: 0;
  width: 0;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider::before {
  background-color: white;
  bottom: 0.375rem;
  content: "";
  height: 1.625rem;
  left: 0.25rem;
  position: absolute;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  width: 1.625rem;
}

input:checked + .slider {
  background: #5d6ec2;
}

input:focus + .slider {
  box-shadow: 0 0 0.0625rem #2196f3;
}

input:checked + .slider::before {
  -webkit-transform: translateX(1.75rem);
  -ms-transform: translateX(1.75rem);
  transform: translateX(1.75rem);
}

.slider.round {
  border-radius: 2rem;
}

.slider.round::before {
  border-radius: 50%;
  height: 1.25rem;
  width: 1.25rem;
}

.input-field {
  margin-bottom: 2.5rem;
}

.unshow {
  display: none;
}

.modal-text {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}

.collection-text {
  margin-bottom: 1.25rem;
}

.label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.125rem;
}

.inline {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.input-disabled {
  background-color: inherit;
  border: none;
  color: inherit;
  font-weight: 700;
  outline: none;
  text-align: right;
}

.royalties-selectbox {
  margin-right: 2rem;
}

#error {
  padding-bottom: 1rem;
}

.copies-input {
  max-width: 16.5rem;
  min-width: 0;
}
</style>
