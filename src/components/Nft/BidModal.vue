<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        :src="`https://ipfs.io/ipfs/${image}`"
      >
    </div>
    <div class="bid-text">
      <div> {{ $t('nft_details.bid.bid-content') }} {{ title }} NFT</div>
      <div class="token-description">
        {{ description }}
      </div>
    </div>
  </div>
  <BaseForm
    ref="bid-form"
    class="bid-form"
    @submit="onSubmit"
  >
    <BaseUnderlinedInput
      v-model="initialBidValue"
      class="input-field"
      name="amount"
      :placeholder="$t('nft_details.bid.user_bid_placeholder')"
      rules="required"
      :text="$t('nft_details.bid.user_bid_label')"
      type="number"
      @change="getFinalBidAmount"
    >
      <template #element>
        <span class="coin">ETH</span>
      </template>
    </BaseUnderlinedInput>
    <Field
      name="nft_id"
      type="hidden"
      :value="NftId"
    />
    <Field
      name="user_address"
      type="hidden"
      :value="Address"
    />
    <BaseUnderlinedInput
      v-if="nfttype"
      class="input-field"
      name="quantity"
      :text="$t('nft_details.bid.quantity_label')"
      type="number"
    />
    <div class="details-section">
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.user_bidding_balance') }}
        </div>
        <div class="value">
          {{ initialBidValue }} ETH
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.user_balance') }}
        </div>
        <div class="value">
          {{ accountbalance }} ETH
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.service_fee') }}
        </div>
        <div class="value">
          2.5%
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.bid.total_bid_amount') }}
        </div>
        <div class="value">
          {{ finalBidValue }}
        </div>
      </div>
    </div>
    <BaseRoundButton
      class="buy-button btn-primary btn-md btn-bold"
      :icon="isLoading ? 'loading' : 'arrow-right'"
      :submit="true"
      :text="$t('nft_details.place_bid')"
    />
  </BaseForm>
</template>
<script>
import { Field } from 'vee-validate';
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';

const Web3 = require('web3');

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
  name: 'BidModal',
  components: { Field },
  props: {
    nfttype: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    title: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    tokenid: { type: Number, required: false, default: null },
    accountbalance: { type: Number, required: false, default: null },
  },
  data() {
    return {
      NftId: this.$route.params.id,
      Address: localStorage.getItem('account'),
      isLoading: false,
      biddingBalance: '',
      initialBidValue: '',
      finalBidValue: '',
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
      erc721ContractAddress: '0x28145D733344E471d05b6f17c9C74982b013a7ca',
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
              name: 'tokenId',
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
              name: 'tokenId',
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
              name: 'tokenId',
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
              name: 'tokenId',
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
    };
  },
  methods: {
    async getFinalBidAmount() {
      const discountAmount = ((this.initialBidValue * 0.025).toFixed(4));
      this.finalBidValue = (parseFloat(this.initialBidValue)
      + parseFloat(discountAmount)).toFixed(4);
    },
    async onSubmit(formData) {
      this.isLoading = true;
      console.log(formData);
      // this.bidContract();
      let response = null;
      try {
        const { data } = await this.$api.CREATEBIDS(formData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        // location.reload();
        this.$router.go();
      } else {
        const { form } = this.$refs['bid-form'];
        form.setFieldError('amount', response.error);
        this.isLoading = false;
      }
    },
    bidContract() {
      let provider;
      const address = localStorage.getItem('account');
      const obj = JSON.parse(localStorage.getItem('walletconnect'));
      if (obj === (address)) {
        provider = new WalletConnectProvider({
          infuraId: '58bf1103531f4b858b31eb3c5c4ddd2f',
        });
      } else if ((localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses')) === (address)) {
        provider = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
      } else {
        provider = window.ethereum;
      }
      const web3 = new Web3(provider);
      // const { BN } = web3.utils;
      const contract = new web3.eth.Contract(this.erc721abi, this.erc721ContractAddress);
      console.log(this.finalBidValue);
      contract.methods.PlaceBid(this.tokenid, web3.utils.toWei(this.finalBidValue, 'ether')).send({ from: address, gas: 2000000, gasPrice: '20000000000' });
    },
  },
};
</script>
<style scoped>
.nft-box {
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  border: 0.0625rem solid rgba(44, 67, 173, 0.25);
  border-radius: 0.625rem;
  box-sizing: border-box;
  display: flex;
  height: 6.25rem;
  padding: 0.9375rem;
}

.token-image {
  border-radius: 0.625rem;
  height: 4.375rem;
  width: 4.375rem;
}

.bidding-details {
  display: flex;
  justify-content: space-between;
}

.details-section {
  margin-bottom: 2.5rem;
  margin-top: 2rem;
}

.bid-text {
  align-items: center;
  color: #808080;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.625rem;
  margin-left: 1.25rem;
}

.token-description {
  color: #000;
  font-weight: bold;
}

.input-field {
  margin-top: 2rem;
}

.label {
  color: #808080;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.coin {
  margin-right: 0.5rem;
}

.value {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9375rem;
  font-weight: bold;
  line-height: 1.75rem;
}
</style>
