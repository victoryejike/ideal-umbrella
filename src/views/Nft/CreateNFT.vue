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
            v-if="selectedSwitch !== false"
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
              <!-- <span style="font-weight: bold;">ETH</span> -->
              <BaseScrollableSelectBox
                id="coinList"
                class="label"
                :default-selected="true"
                dropClass="listWidth"
                key-name="_id"
                name="coin"
                :options="coinList"
                rules="required"
                @click="getServiceFeeCoin"
              />
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            ref="receivedAmount"
            class="input-field"
            disabled
            name="receivedAmount"
            :placeholder="$t('collectible.received_amount_placeholder')"
            rules="required"
            :text="$t('collectible.received_amount_label')"
            type="number"
          >
            <template #element>
              <!-- <span style="font-weight: bold;">ETH</span> -->
              {{ coin }}
              <!-- <BaseScrollableSelectBox
                id="coinList"
                class="label"
                :default-selected="true"
                dropClass="listWidth"
                key-name="_id"
                name="name"
                :options="coinList"
                rules="required"
              /> -->
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
              <!-- <span style="font-weight: bold;">ETH</span> -->
              <BaseScrollableSelectBox
                id="coinList"
                class="label"
                :default-selected="true"
                dropClass="listWidth"
                key-name="_id"
                name="name"
                :options="coinList"
                rules="required"
              />
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
          name="collection"
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
        <BaseUnderlinedInput
          v-model="blockNumber"
          class="input-field unshow"
          name="blockNumber"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="transactionHash"
          class="input-field unshow"
          name="transactionHash"
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
          v-model="market_visibility"
          class="input-field unshow"
          name="market_visibility"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-if="standard === 'erc1155'"
          class="input-field copies-input"
          name="supply"
          :placeholder="$t('collectible.number_of_copies_placeholder')"
          rules="required"
          :text="$t('collectible.number_of_copies_label')"
        />
        <BaseUnderlinedInput
          v-model="collectible_type"
          class="input-field copies-input unshow"
          name="collectible_type"
          :placeholder="$t('collectible.number_of_copies_placeholder')"
          rules="required"
          :text="$t('collectible.number_of_copies_label')"
        />
        <BaseUnderlinedInput
          v-if="standard === 'erc1155'"
          v-model="collectible_type"
          class="input-field copies-input unshow"
          name="collectible_type"
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
          v-model="assetType"
          class="input-field copies-input unshow"
          name="asset_type"
          :placeholder="$t('collectible.number_of_copies_placeholder')"
          rules="required"
          :text="$t('collectible.number_of_copies_label')"
        />
        <div>
          <BaseRoundButton
            class="btn-primary btn-md btn-bold"
            :icon="isLoading ? 'loading' : 'arrow-right'"
            :submit="true"
            :text="$t('collectible.create_button_text')"
          />
        </div>
      </BaseForm>
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
    </Base>
  </div>
</template>
<script>

import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Field } from 'vee-validate';
import UploadCard from '@/components/Nft/UploadCard.vue';
import Base from '@/components/Nft/BaseFrame.vue';
import { PriceType } from '@/utils/enums';

const Web3 = require('web3');

const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001');

const APP_NAME = 'Naffiti';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://rinkeby.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
const CHAIN_ID = 4;

// Initialize WalletLink
const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

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
      closedBid: false,
      coinType: 'ETH',
      coin: 'ETH',
      collectible_type: '',
      collectibleList: [
        { name: 'ERC-721', id: 'erc' },
      ],
      coinList: [
        { name: 'ETH', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/ethereum_rynhsn.svg', id: 'ETH' },
        { name: 'USDT', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/tether_bnrumz.svg', id: 'USDT' },
        { name: 'NAFF', image: 'https://res.cloudinary.com/ddqrqm0ow/image/upload/v1629997919/naff_mybxeu.svg', id: 'NAFF' },
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
      tokentype: '',
      blockNumber: '',
      transactionHash: '',
      market_visibility: '',
      receivedAmount: '',
      pricingType: PriceType.FIXED,
      ipfsUrl: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      erc721ContractAddress: '0x9aE66F8aDF65816BE94C957D6D37b316791Bc5CD',
      erc1155ContractAddress: '0x5eb7Ce96075387E343D4c50b42ADb4AFE79852E5',
      erc20ContractAddress: '0x8C5B4AB57Eef1e2C78c9a16843701195B51a812C',
      delegateContractAddress: '0xc893549e36EEE4AD7EB263195fdaF05AF8a4c196',
    };
  },
  computed: {
    standard() { return this.$route.params.standard; },
    title() {
      return this.standard === 'erc721' ? this.$t('collectible.title_single') : this.$t('collectible.title_multiple');
    },
    assetType() {
      return this.$store.getters['data/getAssetType'];
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
    if (this.standard === 'erc1155') this.collectible_type = 'multiple';
    else this.collectible_type = 'single';
    console.log(this.collectible_type, this.selectedSwitch);
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
    getServiceFeeCoin() {
      this.coin = document.querySelector('.options-text').innerText;
    },
    getTimestamp(time) {
      const myDate = time.split('-');
      const newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
      const timeStamp = newDate.getTime();
      console.log(timeStamp / 1000);
      return (timeStamp / 1000);
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async metaData(newMeta) {
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
      if (this.selectedSwitch === false) {
        this.market_visibility = false;
      } else {
        this.market_visibility = true;
      }
      const meta = { ...newMeta, market_visibility: this.market_visibility };
      let cid;
      if (this.standard === 'erc1155') {
        this.isLoading = true;
        const qty = document.querySelector('.supply').value;
        const doc = JSON.stringify({
          description: desc,
          name: title,
          image: ipfsHash,
          quantity: qty,
          meta,
        });
        console.log(doc);
        cid = await ipfs.add(doc);
        this.ipfsUrl = `https://${cid}.ipfs.dweb.link`;
        await ipfs.cat(cid);
        this.minting(qty, cid);
      } else {
        this.isLoading = true;
        const doc = JSON.stringify({
          description: desc,
          name: title,
          image: ipfsHash,
          meta,
        });
        console.log(doc);
        cid = await ipfs.add(doc);
        await ipfs.cat(cid);
        this.minting(null, cid);
      }
    },
    async minting(qty, cid) {
      sessionStorage.clear();
      let provider;
      const obj = JSON.parse(localStorage.getItem('walletconnect'));
      if (obj && (obj.accounts[0]) === (this.value)) {
        provider = new WalletConnectProvider({
          infuraId: '58bf1103531f4b858b31eb3c5c4ddd2f',
        });
      } else if ((localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses')) === (this.value)) {
        provider = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
      } else {
        provider = window.ethereum;
      }
      const web3 = new Web3(provider);
      const delegateContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
      if (this.standard === 'erc1155') {
        this.tokentype = 2;
        const contract = new web3.eth.Contract(require('@/assets/abi/erc1155').default, this.erc1155ContractAddress);
        if (this.selectedSwitch === false) {
          console.log('multi');
          this.market_visibility = false;
          this.pricingType = '';
          await contract.methods
            .mint(qty, `https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value, gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.TokenMinted.returnValues.tokenType;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        } else if (this.pricingType === PriceType.FIXED) {
          this.market_visibility = true;
          await contract.methods
            .setApprovalForAll(this.delegateContractAddress, true)
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          await contract.methods
            .mint(qty, `https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.TokenMinted.returnValues.tokenType;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
            });
          const price = document.querySelector('.price').value;
          await delegateContract.methods
            .OfferForSale(this.erc20ContractAddress, this.erc1155ContractAddress,
              this.tokenId, qty,
              this.tokentype, web3.utils.toWei(price, 'ether'), this.userData.uid, (1),
              (0), (0))
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              this.isLoading = false;
              // console.log(receipt);
              // this.ipfsUrl = cid;
              // this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              // this.blockNumber = receipt.blockNumber;
              // this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        } else if (this.pricingType === PriceType.UNLIMITED_AUCTION) {
          const startingBid = document.querySelector('.minimum_bid').value;
          const startDate = document.querySelector('.starting_date').value;
          const startTime = this.getTimestamp(startDate);
          this.market_visibility = true;
          await contract.methods
            .setApprovalForAll(this.delegateContractAddress, true)
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          await contract.methods
            .mint(qty, `https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value, gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.TokenMinted.returnValues.tokenType;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
            });
          await delegateContract.methods
            .OfferForSale(this.erc20ContractAddress, this.erc1155ContractAddress,
              this.tokenId, qty,
              this.tokentype, web3.utils.toWei(startingBid, 'ether'), this.userData.uid, (3), (startTime), (0))
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // this.isLoading = false;
              // this.closedBid = true;
              // console.log(receipt);
              // this.ipfsUrl = cid;
              // this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              // this.blockNumber = receipt.blockNumber;
              // this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        }
        // this.$refs['collectible-nft'].submit();
      } else {
        const contract = new web3.eth.Contract(require('@/assets/abi/erc721').default, this.erc721ContractAddress);
        this.tokentype = 1;
        if (this.selectedSwitch === false) {
          this.market_visibility = false;
          this.pricingType = '';
          console.log('works');
          await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value, gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        } else if (this.pricingType === PriceType.FIXED) {
          console.log('yes');
          this.market_visibility = true;
          await contract.methods
            .setApprovalForAll(this.delegateContractAddress, true)
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value, gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
            });
          const price = document.querySelector('.price').value;
          console.log(this.tokenId);
          await delegateContract.methods
            .OfferForSale(this.erc20ContractAddress, this.erc721ContractAddress,
              this.tokenId, (1),
              (1), web3.utils.toWei(price, 'ether'), this.userData.uid, (1),
              (0), (0))
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // this.isLoading = false;
              // this.closedBid = true;
              // console.log(receipt);
              // this.ipfsUrl = cid;
              // this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              // this.blockNumber = receipt.blockNumber;
              // this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        } else if (this.pricingType === PriceType.TIMED_AUCTION) {
          const startingBid = document.querySelector('.minimum_bid').value;
          const startDate = document.querySelector('.starting_date').value;
          const endDate = document.querySelector('.expiration_date').value;
          const startTime = this.getTimestamp(startDate);
          const endTime = this.getTimestamp(endDate);
          this.market_visibility = true;
          await contract.methods
            .setApprovalForAll(this.delegateContractAddress, true)
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value, gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
            });
          await delegateContract.methods
            .OfferForSale(this.erc20ContractAddress, this.erc721ContractAddress,
              this.tokenId, (1),
              (1), web3.utils.toWei(startingBid, 'ether'), this.userData.uid, (2),
              (startTime), (endTime))
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              // this.isLoading = false;
              // this.closedBid = true;
              // console.log(receipt);
              // this.ipfsUrl = cid;
              // this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              // this.blockNumber = receipt.blockNumber;
              // this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        } else if (this.pricingType === PriceType.UNLIMITED_AUCTION) {
          const startingBid = document.querySelector('.minimum_bid').value;
          const startDate = document.querySelector('.starting_date').value;
          const startTime = this.getTimestamp(startDate);
          this.market_visibility = true;
          await contract.methods
            .setApprovalForAll(this.delegateContractAddress, true)
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            });
          await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: this.value, gas: 2900000, gasPrice: '29000000000' }).on('error', (error) => {
              console.log(error);
              this.isLoading = false;
            }).on('confirmation', async (confirmation, receipt) => {
              console.log(receipt);
              this.ipfsUrl = cid;
              this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              this.blockNumber = receipt.blockNumber;
              this.transactionHash = receipt.transactionHash;
            });
          await delegateContract.methods
            .OfferForSale(this.erc20ContractAddress, this.erc721ContractAddress,
              this.tokenId, (1),
              (1), web3.utils.toWei(startingBid, 'ether'), this.userData.uid, (3), (startTime), (0))
            .send({ from: this.value })
            .on('error', (error) => {
              console.log(error);
              this.isLoading = false;
              // this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            }).on('confirmation', async (confirmation, receipt) => {
              // this.isLoading = false;
              // this.closedBid = true;
              // console.log(receipt);
              // this.ipfsUrl = cid;
              // this.tokenId = receipt.events.Transfer.returnValues.tokenId;
              // this.blockNumber = receipt.blockNumber;
              // this.transactionHash = receipt.transactionHash;
              this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
            });
        }
      }
    },
    async onSubmit(CollectibleNftData) {
      // let response = null;
      this.isLoading = true;
      try {
        this.isLoading = true;
        // const { data } = this.$api.CREATENFT(CollectibleNftData);
        // response = data;
        console.log(CollectibleNftData);
        // this.$api.CREATENFT(CollectibleNftData);
        this.metaData(CollectibleNftData);
        // this.$router.push({ name: 'Profile', params: { walletAddress: this.value } });
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
