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
            :list="tabTitle"
            :width="10.6"
            @click="getActiveTabNav"
          />
          <Field
            v-model="pricing_type"
            class="input-field show"
            name="pricing_type"
          />
        </div>
        <template v-if="selectedSwitch && pricingType === 'FIXED PRICE'">
          <BaseUnderlinedInput
            class="input-field"
            name="price"
            :placeholder="$t('collectible.amount_placeholder')"
            rules="required"
            :text="$t('collectible.amount_label')"
            type="number"
            @change="getServiceFee"
          >
            <template #element>
              <!-- <BaseUnderlinedInput
                v-model="coinType"
                :css="selectBoxCSS"
                disabled
                key-name="name"
                name="amountCoinType"
                :options="coinList"
              /> -->
              <input
                class="input-disabled"
                disabled
                value="ETH"
              >
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            class="input-field"
            name="receivedAmount"
            :placeholder="$t('collectible.received_amount_placeholder')"
            :text="$t('collectible.received_amount_label')"
          >
            <template #element>
              <!-- <BaseScrollableSelectBox
                :css="selectBoxCSS"
                key-name="name"
                name="receivedAmountCoinType"
                :options="coinList"
              /> -->
              <input
                class="input-disabled"
                disabled
                value="ETH"
              >
            </template>
          </BaseUnderlinedInput>
        </template>
        <template v-if="selectedSwitch && pricingType !== 'FIXED PRICE'">
          <BaseUnderlinedInput
            class="input-field"
            name="minimum_bid"
            :placeholder="$t('collectible.auction_placeholder')"
            rules="required"
            :text="$t('collectible.auction_label')"
            type="number"
          >
            <template #element>
              <!-- <BaseUnderlinedInput
                :css="selectBoxCSS"
                key-name="name"
                name="receivedBidCoinType"
                :options="coinList"
              /> -->
              <input
                class="input-disabled"
                disabled
                value="ETH"
              >
            </template>
          </BaseUnderlinedInput>
          <BaseUnderlinedInput
            class="input-field"
            name="starting_date"
            :placeholder="$t('collectible.auction_start_placeholder')"
            rules="required"
            :text="$t('collectible.auction_start_label')"
            type="date"
          />
          <BaseUnderlinedInput
            v-if="pricingType == 'TIMED AUCTION'"
            class="input-field"
            name="expiration_date"
            :placeholder="$t('collectible.auction_expiration_placeholder')"
            rules="required"
            :text="$t('collectible.auction_expiration_label')"
            type="date"
          />
        </template>
        <BaseScrollableSelectBox
          class="input-div label"
          :default-selected="false"
          key-name="_id"
          name="name"
          :options="collectible_class"
          :text="$t('collectible.choose_collection_label')"
        />
        <BaseScrollableSelectBox
          class="input-div label"
          :default-selected="false"
          key-name="_id"
          name="category"
          :options="categories"
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
          class="input-field show"
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
            :text="$t('collectible.royalties_label')"
          />
        </div>
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
          rules="required"
          :text="$t('collectible.number_of_copies_label')"
        />
        <BaseUnderlinedInput
          v-if="standard === 'erc1155'"
          v-model="ipfsUrl"
          class="input-field show"

          name="ipfsUrl"
          :placeholder="$t('collectible.number_of_copies_placeholder')"
          :text="$t('collectible.number_of_copies_label')"
        />
        <BaseUnderlinedInput
          v-model="uri"
          class="input-field show"
          name="uri"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <BaseUnderlinedInput
          v-model="value"
          class="input-field show"
          name="owner_address"
          :placeholder="$t('collectible.discription_placeholder')"
          :text="$t('collectible.discription_label')"
        />
        <!-- <BaseUnderlinedInput
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
        /> -->
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
          <BaseRoundButton
            class="btn-primary btn-md btn-bold submit-btn"
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
import Base from '@/components/Nft/BaseFrame.vue';
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Field } from 'vee-validate';
// import Base from './BaseFrame.vue';
// import { domain, Mint721, part } from '../../../signTypedData';

const Web3 = require('web3');

const ipfs = require('nano-ipfs-store').at('https://ipfs.infura.io:5001');

const APP_NAME = 'Naffiti';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://ropsten.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
const CHAIN_ID = 3;
// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

export default {
  name: 'CreateNFT',
  components: { UploadCard, Base, Field },
  data() {
    return {
      isLoading: false,
      categories: [],
      isModalVisible: false,
      selectedSwitch: true,
      pricingType: 'FIXED PRICE',
      coinType: 'ETH',
      coinList: [
        { name: 'ETH', image: require('@svg/ethereum.svg') },
        // { name: 'HT', image: require('@svg/huobi-token.svg') },
        // { name: 'BTC', image: require('@svg/bitcoin.svg') },
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
        // this.$t('collectible.tab.timed_auction'),
        this.$t('collectible.tab.unlimited_auction'),
      ],
      royaltiesList: [
        { name: '10 %', value: '1000' },
        { name: '20 %', value: '2000' },
        { name: '30 %', value: '3000' },
      ],
      selectBoxCSS: { width: 10 },
      uri: '',
      value: localStorage.getItem('account'),
      collectible_class: [],
      tokenId: '',
      receivedAmount: '',
      pricing_type: 'fixed',
      ipfsUrl: '',
      r: localStorage.getItem('r'),
      s: localStorage.getItem('s'),
      v: localStorage.getItem('v'),
      erc721ContractAddress: '0xF3538d2696FF98396Aa0386d91bd7f9C02570511',
      erc1155ContractAddress: '0x24d5CaBE5A68653c1a6d10f65679839a5CD4a42A',
      erc721abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'erc20TokenAddress',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'approved',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'seller',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'enum ERC721NafitiBasic.AuctionType',
              name: 'auctionType',
              type: 'uint8',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'AuctionCreated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'highestBidder',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'highestBid',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'seller',
              type: 'address',
            },
          ],
          name: 'BidClosed',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'bidder',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'BidPlaced',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
          ],
          name: 'CloseBid',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
            {
              internalType: 'enum ERC721NafitiBasic.AuctionType',
              name: '_auctionType',
              type: 'uint8',
            },
            {
              internalType: 'uint256',
              name: '_duration',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_startingPrice',
              type: 'uint256',
            },
          ],
          name: 'CreateAuction',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_amount',
              type: 'uint256',
            },
          ],
          name: 'PlaceBid',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'baseURI',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
          ],
          name: 'buy',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
          ],
          name: 'cancelBid',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_price',
              type: 'uint256',
            },
          ],
          name: 'createSellOrder',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'getApproved',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'isApprovedForAll',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: 'tokenURI',
              type: 'string',
            },
          ],
          name: 'mint',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'ownerOf',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '_data',
              type: 'bytes',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenByIndex',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenOfOwnerByIndex',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'tokenURI',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      erc1155abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'tokenType',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'minter',
              type: 'address',
            },
          ],
          name: 'TokenMinted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256[]',
              name: 'ids',
              type: 'uint256[]',
            },
            {
              indexed: false,
              internalType: 'uint256[]',
              name: 'values',
              type: 'uint256[]',
            },
          ],
          name: 'TransferBatch',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'TransferSingle',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'value',
              type: 'string',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'URI',
          type: 'event',
        },
        {
          inputs: [],
          name: 'NAFI_MULT',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address[]',
              name: 'accounts',
              type: 'address[]',
            },
            {
              internalType: 'uint256[]',
              name: 'ids',
              type: 'uint256[]',
            },
          ],
          name: 'balanceOfBatch',
          outputs: [
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'isApprovedForAll',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256',
            },
          ],
          name: 'mint',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256[]',
              name: 'ids',
              type: 'uint256[]',
            },
            {
              internalType: 'uint256[]',
              name: 'amounts',
              type: 'uint256[]',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'safeBatchTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalTokens',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'uri',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
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
  mounted() {
    this.fetchDetails();
    const web3 = new Web3(window.ethereum);

    if ((window.ethereum)) {
      console.log('true');
      web3.eth.getAccounts((err, accounts) => {
        if (err !== null) console.error(`An error occurred: ${err}`);
        else if (accounts.length === 0 || localStorage.getItem('account') == null) {
          console.log('User is not logged in to MetaMask');
          this.$router.push({ name: 'ConnectWallet' });
        } else {
          console.log('User is logged in to MetaMask');
        }
      });
    }
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
        console.log(this.collectible_class);
      } catch (error) {
        response = error?.response?.data;
      }
      try {
        const { data } = await this.$api.GETCATEGORIES();
        this.categories = data.data;
      } catch (error) {
        response = error?.response?.data;
      }
    },
    toggleSwitch() {
      this.selectedSwitch = !this.selectedSwitch;
    },
    getServiceFee() {
      const amount = document.querySelector('.price').value;
      const discountAmount = ((amount * 0.025).toFixed(4));
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
          if (this.pricingType === 'Fixed') {
            this.pricing_type = 'fixed';
          } else if (this.pricingType === 'TIMED AUCTION') {
            this.pricing_type = 'timed_auction';
          } else if (this.pricingType === 'UNLIMITED AUCTION') {
            this.pricing_type = 'unlimited_auction';
            console.log(this.pricingType);
          }
          // sessionStorage.setItem('pricing', this.pricingType);
        }
      });
    },
    // onSign() {
    // // const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
    //   const metamask = window.ethereum;
    //   // const isMetamask = window.Web3.currentProvider;
    //   // console.log(isMetamask);
    //   const web3 = new Web3(metamask);
    //   console.log(web3);
    //   const dataToSign = JSON.stringify({
    //     types: {
    //       EIP712Domain: [
    //         {
    //           name: 'name',
    //           type: 'string',
    //         },
    //         {
    //           name: 'version',
    //           type: 'string',
    //         },
    //         {
    //           name: 'chainId',
    //           type: 'uint256',
    //         },
    //         {
    //           name: 'verifyingContract',
    //           type: 'address',
    //         },
    //       ],
    //       Mint721: [
    //         {
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //         {
    //           name: 'tokenURI',
    //           type: 'string',
    //         },
    //         {
    //           name: 'creators',
    //           type: 'Part[]',
    //         },
    //         {
    //           name: 'royalties',
    //           type: 'Part[]',
    //         },
    //       ],
    //       Part: [
    //         {
    //           name: 'account',
    //           type: 'address',
    //         },
    //         {
    //           name: 'value',
    //           type: 'uint96',
    //         },
    //       ],
    //     },
    //     domain: {
    //       name: 'Naffiti',
    //       version: '1',
    //       chainId: '3',
    //       verifyingContract: '0x219bd6D55d75CDf54De19eA4c5dF766B8881df1a',
    //     },
    //     primaryType: 'Mint721',
    //     message: {
    //       '@type': 'ERC721',
    //       contract: '0x219bd6D55d75CDf54De19eA4c5dF766B8881df1a',
    //       tokenId: 'tokenId',
    //       tokenURI: `/ipfs/${sessionStorage.getItem('ipfsHash')}`,
    //       uri: `/ipfs/${sessionStorage.getItem('ipfsHash')}`,
    //       creators: [
    //         {
    //           account: localStorage.getItem('account'),
    //           value: '10000',
    //         },
    //       ],
    //       royalties: [
    //         {
    //           account: localStorage.getItem('account'),
    //           value: '2000',
    //         },
    //       ],
    //     },
    //   });
    //   web3.currentProvider.sendAsync(
    //     {
    //       method: 'eth_signTypedData_v4',
    //       params: [localStorage.getItem('account'), dataToSign],
    //       from: localStorage.getItem('account'),
    //     },
    //     (err, result) => {
    //       if (err) {
    //         return console.error(err);
    //       }
    //       const signature = result.result.substring(2);
    //       const r = `0x${signature}.substring(0, 64)`;
    //       const s = `0x${signature}.substring(64, 128)`;
    //       const v = parseInt(signature.substring(128, 130), 16);
    //       // The signature is now comprised of r, s, and v.
    //       console.log({ r, s, v });
    //       localStorage.setItem('r', r);
    //       localStorage.setItem('s', s);
    //       localStorage.setItem('v', v);
    //       return (r, s, v);
    //     },
    //   );
    // },
    closeModal() {
      this.isModalVisible = false;
    },
    async metaData() {
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
        console.log('IPFS cid:', `https://${cid}.ipfs.dweb.link`);
        console.log(await ipfs.cat(cid));
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
        console.log('IPFS cid:', `https://${cid}.ipfs.dweb.link`);
        console.log(await ipfs.cat(cid));
        this.minting(null, cid);
      }
    },
    async minting(qty, cid) {
      let provider;
      const obj = JSON.parse(localStorage.getItem('walletconnect'));
      // console.log(obj.accounts[0]);
      if (obj === (localStorage.getItem('account'))) {
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
        console.log('works for only erc1155');
        const contract = new web3.eth.Contract(this.erc1155abi, this.erc1155ContractAddress);
        const result = await contract.methods
          .mint(qty)
          .send({ from: localStorage.getItem('account'), gas: 2000000, gasPrice: '20000000000' });
        this.ipfsUrl = cid;
        this.tokenId = result.events.TokenMinted.returnValues.tokenType;
        contract.methods.setApprovalForAll('0xF3538d2696FF98396Aa0386d91bd7f9C02570511', true).send({ from: localStorage.getItem('account'), gas: 2000000, gasPrice: '20000000000' });
        document.getElementsByClassName('submit-btn')[0].click();
      } else {
        const contract = new web3.eth.Contract(this.erc721abi, this.erc721ContractAddress);
        if (this.pricing_type === 'fixed') {
          const result = await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: localStorage.getItem('account'), gas: 2900000, gasPrice: '29000000000' });
          this.ipfsUrl = cid;
          console.log(result);
          this.tokenId = result.events.Transfer.returnValues.tokenId;
          console.log(this.tokenId);
          const price = document.querySelector('.price').value;
          contract.methods.setApprovalForAll('0xF3538d2696FF98396Aa0386d91bd7f9C02570511', true).send({ from: localStorage.getItem('account'), gas: 3000000, gasPrice: '30000000000' });
          contract.methods.createSellOrder(this.tokenId, web3.utils.toWei(price, 'ether')).send({ from: localStorage.getItem('account'), gas: 3500000, gasPrice: '35000000000' });
        }
        if (this.pricing_type === 'timed_auction') {
          const startPrice = document.querySelector('.minimum_bid').value;
          const auctionStartdate = document.querySelector('.starting_date').value;
          const auctionExpirationdate = document.querySelector('.expiration_date').value;
          const startDate = new Date(auctionStartdate);
          const endDate = new Date(auctionExpirationdate);
          const timeDuration = (endDate.getTime() - startDate.getTime()) / 1000;
          console.log('works for only timed_auction');
          const result = await contract.methods
            .mint(`https://${cid}.ipfs.dweb.link`)
            .send({ from: localStorage.getItem('account'), gas: 2900000, gasPrice: '29000000000' });
          this.ipfsUrl = cid;
          console.log(result);
          this.tokenId = result.events.Transfer.returnValues.tokenId;
          console.log(this.tokenId);
          contract.methods.setApprovalForAll('0xF3538d2696FF98396Aa0386d91bd7f9C02570511', true).send({ from: localStorage.getItem('account'), gas: 3000000, gasPrice: '30000000000' });
          contract.methods.CreateAuction(this.tokenId, (1), timeDuration, web3.utils.toWei(startPrice, 'ether')).send({ from: localStorage.getItem('account'), gas: 3500000, gasPrice: '35000000000' });
        }
        document.getElementsByClassName('submit-btn')[0].click();
      }
    },
    async onSubmit(CollectibleNftData) {
      let response = null;
      try {
        const { data } = this.$api.CREATENFT(CollectibleNftData);
        response = data;
        console.log(response);
        this.$router.push({ name: 'Profile' });
      } catch (error) {
        response = error.response.data;
        console.log(error);
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

.show,
.submit-btn {
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
