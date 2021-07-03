<template>
  <div class="create-nft-main">
    <router-link
      to="/nft"
    >
      <img
        class="back-btn"
        src="@svg/arrow-back.svg"
      >
    </router-link>
    <Base
      :title="title"
    >
      <div id="error" />
      <BaseForm
        ref="collectible-nft"
        v-slot="{ isLoading}"
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
            :list="tabTitle"
            :width="10.6"
            @click="getActiveTabNav"
          />
          <BaseUnderlinedInput
            v-model="pricing_type"
            class="input-field show"
            name="pricing_type"
            :placeholder="$t('collectible.discription_placeholder')"
            :text="$t('collectible.discription_label')"
          />
        </div>
        <template v-if="selectedSwitch && pricingType === 'FIXED PRICE'">
          <BaseUnderlinedInput
            class="input-field"
            name="price"
            :placeholder="$t('collectible.amount_placeholder')"
            :text="$t('collectible.amount_label')"
            @change="getServiceFee"
          >
            <template #element>
              <BaseScrollableSelectBox
                :css="selectBoxCSS"
                name="amountCoinType"
                :options="coinList"
              />
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            class="input-field"
            name="receivedAmount"
            :placeholder="$t('collectible.received_amount_placeholder')"
            :text="$t('collectible.received_amount_label')"
          >
            <template #element>
              <BaseScrollableSelectBox
                :css="selectBoxCSS"
                name="receivedAmountCoinType"
                :options="coinList"
              />
            </template>
          </BaseUnderlinedInput>
        </template>
        <template v-if="selectedSwitch && pricingType !== 'FIXED PRICE'">
          <BaseUnderlinedInput
            class="input-field"
            name="minimum_bid"
            :placeholder="$t('collectible.auction_placeholder')"
            :text="$t('collectible.auction_label')"
          >
            <template #element>
              <BaseScrollableSelectBox
                :css="selectBoxCSS"
                name="receivedBidCoinType"
                :options="coinList"
              />
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            class="input-field"
            name="starting_date"
            :placeholder="$t('collectible.auction_start_placeholder')"
            :text="$t('collectible.auction_start_label')"
          />
          <BaseUnderlinedInput
            class="input-field"
            name="expiration_date"
            :placeholder="$t('collectible.discription_placeholder')"
            :text="$t('collectible.discription_label')"
          />
        </template>
        <BaseScrollableSelectBox
          v-model="collectible_class"
          class="input-div label"
          :default-selected="false"
          key-name="code"
          name="collectible_class"
          :options="collectibleList"
          :text="$t('collectible.choose_collection_label')"
        />
        <BaseUnderlinedInput
          class="input-field"
          name="title"
          :placeholder="$t('collectible.title_placeholder')"
          :text="$t('collectible.title_label')"
        />
        <BaseUnderlinedInput
          class="input-field"
          name="description"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="tokenId"
          class="input-field show"
          name="tokenId"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <div class="inline">
          <BaseScrollableSelectBox
            class="input-div label"
            name="royalties[0].value"
            :options="royaltiesList"
            :text="$t('collectible.royalties_label')"
            @click="onSign"
          />
          <BaseUnderlinedInput
            v-model="value"
            class="input-field show"
            name="royalties[0].recipient"
            :placeholder="$t('collectible.discription_placeholder')"
            :text="$t('collectible.discription_label')"
          />
          <BaseUnderlinedInput
            v-if="standard === 'erc1155'"
            class="input-field copies-input"
            name="copies"
            :placeholder="$t('collectible.number_of_copies_placeholder')"
            :text="$t('collectible.number_of_copies_label')"
          />
        </div>
        <BaseUnderlinedInput
          v-model="uri"
          class="input-field show"
          name="uri"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="r"
          class="input-field show"
          name="signatures.r"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="s"
          class="input-field show"
          name="signatures.s"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="v"
          class="input-field show"
          name="signatures.v"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
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
    </Base>
  </div>
</template>
<script>

import UploadCard from '@/components/Nft/UploadCard.vue';
// import WalletLink from 'walletlink';
import Base from './BaseFrame.vue';
// import { domain, Mint721, part } from '../../../signTypedData';

const Web3 = require('web3');

// const APP_NAME = 'Naffiti';
// const APP_LOGO_URL = 'https://example.com/logo.png';
// const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/<YOUR_INFURA_API_KEY>';
// const CHAIN_ID = 1;
// // Initialize WalletLink
// export const walletLink = new WalletLink({
//   appName: APP_NAME,
//   appLogoUrl: APP_LOGO_URL,
//   darkMode: false,
// });

export default {
  name: 'CreateNFT',
  components: {
    Base,
    UploadCard,
  },
  data() {
    return {
      selectedSwitch: true,
      pricingType: 'FIXED PRICE',
      coinList: [
        { name: 'ETH', image: require('@svg/ethereum.svg') },
        { name: 'HT', image: require('@svg/huobi-token.svg') },
        { name: 'BTC', image: require('@svg/bitcoin.svg') },
      ],
      collectibleList: [
        { name: 'ERC-721', id: 'erc' },
      ],
      singleTabTitle: [
        this.$t('collectible.tab.fixed_price'),
        this.$t('collectible.tab.timed_auction'),
        this.$t('collectible.tab.unlimited_auction'),
      ],
      multipleTabTitle: [
        this.$t('collectible.tab.fixed_price'),
        this.$t('collectible.tab.unlimited_auction'),
      ],
      royaltiesList: [
        { name: '10 %' },
        { name: '20 %' },
        { name: '30 %' },
      ],
      selectBoxCSS: { width: 10 },
      uri: sessionStorage.getItem('ipfsHash'),
      value: localStorage.getItem('account'),
      collectible_class: 'ERC-721',
      tokenId: '',
      receivedAmount: '',
      pricing_type: 'fixed',
      r: localStorage.getItem('r'),
      s: localStorage.getItem('s'),
      v: localStorage.getItem('v'),
      contractAddress: '0x219bd6D55d75CDf54De19eA4c5dF766B8881df1a',
      abi: {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'uri',
                type: 'string',
              },
              {
                components: [
                  {
                    internalType: 'address payable',
                    name: 'account',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct LibPart.Part[]',
                name: 'creators',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'address payable',
                    name: 'account',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct LibPart.Part[]',
                name: 'royalties',
                type: 'tuple[]',
              },
              {
                internalType: 'bytes[]',
                name: 'signatures',
                type: 'bytes[]',
              },
            ],
            internalType: 'struct LibERC721LazyMint.Mint721Data',
            name: 'data',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
        ],
        name: 'mintAndTransfer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    };
  },
  computed: {
    standard() { return this.$route.params?.standard; },
    title() {
      if (this.standard === 'erc721') {
        return this.$t('collectible.title_single');
      } if (this.standard === 'erc1155') {
        return this.$t('collectible.title_multiple');
      }
      return null;
    },
    tabTitle() {
      if (this.standard === 'erc721') {
        return this.singleTabTitle;
      } if (this.standard === 'erc1155') {
        return this.multipleTabTitle;
      }
      return null;
    },
  },
  methods: {
    toggleSwitch() {
      this.selectedSwitch = !this.selectedSwitch;
    },
    getServiceFee() {
      const amount = document.querySelector('.price').value;
      const discountAmount = ((amount * 0.025).toFixed(4));
      console.log(discountAmount);
      const newAmount = (amount - discountAmount).toFixed(4);
      document.querySelector('.receivedAmount').value = newAmount;
    },
    getActiveTabNav() {
      const navTab = document.querySelectorAll('.navs');
      navTab.forEach((nav) => {
        if (nav.classList.contains('active')) {
          console.log(nav);
          const activeTabNavValue = nav.innerText;
          this.pricingType = activeTabNavValue;
          console.log(this.pricingType);
          sessionStorage.setItem('pricing', this.pricingType);
        }
      });
    },
    onSign() {
    // const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
      const metamask = window.ethereum;
      // const isMetamask = window.Web3.currentProvider;
      // console.log(isMetamask);
      const web3 = new Web3(metamask);
      console.log(web3);
      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'version',
              type: 'string',
            },
            {
              name: 'chainId',
              type: 'uint256',
            },
            {
              name: 'verifyingContract',
              type: 'address',
            },
          ],
          Mint721: [
            {
              name: 'tokenId',
              type: 'uint256',
            },
            {
              name: 'tokenURI',
              type: 'string',
            },
            {
              name: 'creators',
              type: 'Part[]',
            },
            {
              name: 'royalties',
              type: 'Part[]',
            },
          ],
          Part: [
            {
              name: 'account',
              type: 'address',
            },
            {
              name: 'value',
              type: 'uint96',
            },
          ],
        },
        domain: {
          name: 'Naffiti',
          version: '1',
          chainId: '3',
          verifyingContract: '0x219bd6D55d75CDf54De19eA4c5dF766B8881df1a',
        },
        primaryType: 'Mint721',
        message: {
          '@type': 'ERC721',
          contract: '0x219bd6D55d75CDf54De19eA4c5dF766B8881df1a',
          tokenId: 'tokenId',
          tokenURI: `/ipfs/${sessionStorage.getItem('ipfsHash')}`,
          uri: `/ipfs/${sessionStorage.getItem('ipfsHash')}`,
          creators: [
            {
              account: localStorage.getItem('account'),
              value: '10000',
            },
          ],
          royalties: [
            {
              account: localStorage.getItem('account'),
              value: '2000',
            },
          ],
        },
      });
      web3.currentProvider.sendAsync(
        {
          method: 'eth_signTypedData_v4',
          params: [localStorage.getItem('account'), dataToSign],
          from: localStorage.getItem('account'),
        },
        (err, result) => {
          if (err) {
            return console.error(err);
          }
          const signature = result.result.substring(2);
          const r = `0x${signature}.substring(0, 64)`;
          const s = `0x${signature}.substring(64, 128)`;
          const v = parseInt(signature.substring(128, 130), 16);
          // The signature is now comprised of r, s, and v.
          console.log({ r, s, v });
          localStorage.setItem('r', r);
          localStorage.setItem('s', s);
          localStorage.setItem('v', v);
          return (r, s, v);
        },
      );
    },
    async onSubmit(CollectibleNftData) {
      this.isLoading = true;
      // let response = null;
      try {
        // const { data } = await this.$api.CREATENFT(CollectibleNftData);
        // response = data;
        console.log(CollectibleNftData);
      } catch (error) {
        // response = error.response.data;
        // console.log(response);
        this.isLoading = false;
      }

      // if (response?.success) {
      //   // this.$store.dispatch('reset', response.data);
      //   console.log('success', response.data);
      // } else {
      //   // const { form } = this.$refs['collectible-nft'];
      //   console.log(response.error);
      //   document.getElementById('error').innerHTML = '*All fields are required';
      //   document.getElementById('error').style.color = 'red';
      //   // form.setFieldError('new_phone_code', response.error);
      //   this.isLoading = false;
      // }
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

.show {
  display: none;
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
