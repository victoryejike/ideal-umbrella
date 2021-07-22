<template>
  <div class="nft-box">
    <div>
      <img
        class="token-image"
        :src="`https://ipfs.io/ipfs/${image}`"
      >
    </div>
    <div class="bid-text">
      <div> {{ $t('nft_details.buy.buy-content') }}</div>
      <div class="token-description">
        {{ title }}
      </div>
    </div>
  </div>
  <BaseForm
    ref="bid-form"
    class="bid-form"
    @submit="onSubmit"
  >
    <BaseUnderlinedInput
      v-model="amount"
      class="input-field"
      disabled="true"
      name="amount"
      :text="$t('nft_details.buy.user_buy_label')"
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
      name="owner_address"
      type="hidden"
      :value="Address"
    />
    <Field
      name="prio_owner_address"
      type="hidden"
      :value="creatoraddress"
    />
    <div class="details-section">
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
          2.5 %
        </div>
      </div>
      <div class="bidding-details">
        <div class="label">
          {{ $t('nft_details.buy.total_buy_amount') }}
        </div>
        <div class="value">
          {{ finalValue }} ETH
        </div>
      </div>
    </div>
    <BaseRoundButton
      class="buy-button btn-primary btn-md btn-bold mb"
      :icon="isLoading ? 'loading' : 'arrow-right'"
      :submit="true"
      :text="$t('nft_details.buy_now')"
    />
  </BaseForm>
</template>
<script>
import { Field } from 'vee-validate';
// import WalletLink from 'walletlink';
// import WalletConnectProvider from '@walletconnect/web3-provider';

// const Web3 = require('web3');

// const APP_NAME = 'Naffiti';
// const APP_LOGO_URL = 'https://example.com/logo.png';
// const ETH_JSONRPC_URL = 'https://ropsten.infura.io/v3/58bf1103531f4b858b31eb3c5c4ddd2f';
// const CHAIN_ID = 3;
// // Initialize WalletLink
// export const walletLink = new WalletLink({
//   appName: APP_NAME,
//   appLogoUrl: APP_LOGO_URL,
//   darkMode: false,
// });

export default {
  name: 'BidModal',
  components: { Field },
  props: {
    nfttype: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    title: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    tokenid: { type: Number, required: false, default: null },
    accountbalance: { type: Number, required: false, default: null },
    creatoraddress: { type: String, required: false, default: null },
  },
  data() {
    return {
      NftId: this.$route.params.id,
      Address: localStorage.getItem('account'),
      isLoading: false,
      buyingBalance: '',
      finalValue: '',
      amount: '',
      coinList: [
        { name: 'ETH' },
        { name: 'HT' },
        { name: 'FC' },
      ],
      // erc20ContractAddress: '0xc4fc8e5a74dee56143afd0c726b6ecef74e007f0',
      // erc20abi: [
      //   {
      //     inputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'constructor',
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: true,
      //         internalType: 'address',
      //         name: 'owner',
      //         type: 'address',
      //       },
      //       {
      //         indexed: true,
      //         internalType: 'address',
      //         name: 'spender',
      //         type: 'address',
      //       },
      //       {
      //         indexed: false,
      //         internalType: 'uint256',
      //         name: 'value',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'Approval',
      //     type: 'event',
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: true,
      //         internalType: 'address',
      //         name: 'previousOwner',
      //         type: 'address',
      //       },
      //       {
      //         indexed: true,
      //         internalType: 'address',
      //         name: 'newOwner',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'OwnershipTransferred',
      //     type: 'event',
      //   },
      //   {
      //     anonymous: false,
      //     inputs: [
      //       {
      //         indexed: true,
      //         internalType: 'address',
      //         name: 'from',
      //         type: 'address',
      //       },
      //       {
      //         indexed: true,
      //         internalType: 'address',
      //         name: 'to',
      //         type: 'address',
      //       },
      //       {
      //         indexed: false,
      //         internalType: 'uint256',
      //         name: 'value',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'Transfer',
      //     type: 'event',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address payable',
      //         name: '_beneficiary',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: '_totalAllocation',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'addBeneficiary',
      //     outputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'owner',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'address',
      //         name: 'spender',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'allowance',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'spender',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: 'amount',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'approve',
      //     outputs: [
      //       {
      //         internalType: 'bool',
      //         name: '',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'account',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'balanceOf',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'beneficiaryAccountStatus',
      //     outputs: [
      //       {
      //         internalType: 'enum FunToken.AccountStatus',
      //         name: '',
      //         type: 'uint8',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'beneficiaryBalance',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'beneficiaryLastClaimTime',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'beneficiaryMaxWithdrawPerPeriod',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'beneficiaryTotalWithdrawn',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'claimSeedReward',
      //     outputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'decimals',
      //     outputs: [
      //       {
      //         internalType: 'uint8',
      //         name: '',
      //         type: 'uint8',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'spender',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: 'subtractedValue',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'decreaseAllowance',
      //     outputs: [
      //       {
      //         internalType: 'bool',
      //         name: '',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'spender',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: 'addedValue',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'increaseAllowance',
      //     outputs: [
      //       {
      //         internalType: 'bool',
      //         name: '',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'isBeneficiary',
      //     outputs: [
      //       {
      //         internalType: 'bool',
      //         name: '',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address payable',
      //         name: '_beneficiary',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'lockBeneficiaryWithdrawal',
      //     outputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'name',
      //     outputs: [
      //       {
      //         internalType: 'string',
      //         name: '',
      //         type: 'string',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'owner',
      //     outputs: [
      //       {
      //         internalType: 'address',
      //         name: '',
      //         type: 'address',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'renounceOwnership',
      //     outputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'seedAllocated',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'symbol',
      //     outputs: [
      //       {
      //         internalType: 'string',
      //         name: '',
      //         type: 'string',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [],
      //     name: 'totalSupply',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: '',
      //         type: 'uint256',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'recipient',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: 'amount',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'transfer',
      //     outputs: [
      //       {
      //         internalType: 'bool',
      //         name: '',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'sender',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'address',
      //         name: 'recipient',
      //         type: 'address',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: 'amount',
      //         type: 'uint256',
      //       },
      //     ],
      //     name: 'transferFrom',
      //     outputs: [
      //       {
      //         internalType: 'bool',
      //         name: '',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address',
      //         name: 'newOwner',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'transferOwnership',
      //     outputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address payable',
      //         name: '_beneficiary',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'unlockBeneficiaryWithdrawal',
      //     outputs: [],
      //     stateMutability: 'nonpayable',
      //     type: 'function',
      //   },
      //   {
      //     inputs: [
      //       {
      //         internalType: 'address payable',
      //         name: '_beneficiary',
      //         type: 'address',
      //       },
      //     ],
      //     name: 'viewBeneficiary',
      //     outputs: [
      //       {
      //         internalType: 'uint256',
      //         name: 'totalAmountLeft',
      //         type: 'uint256',
      //       },
      //       {
      //         internalType: 'uint256',
      //         name: 'totalAmountWithdrawn',
      //         type: 'uint256',
      //       },
      //       {
      //         internalType: 'enum FunToken.AccountStatus',
      //         name: 'accountStatus',
      //         type: 'uint8',
      //       },
      //       {
      //         internalType: 'bool',
      //         name: 'isABeneficiary',
      //         type: 'bool',
      //       },
      //     ],
      //     stateMutability: 'view',
      //     type: 'function',
      //   },
      // ],
    };
  },
  async mounted() {
    this.amount = this.price;
    document.querySelector('.amount').value = this.price;
    const finalBuyValue = (this.price * 0.025).toFixed(4);
    this.finalValue = (parseFloat(this.price) + parseFloat(finalBuyValue)).toFixed(4);
    console.log(this.creatoraddress);
  },
  methods: {
    async onSubmit(formData) {
      this.isLoading = true;
      // let response = null;
      // this.buyContract();
      try {
        const { data } = await this.$api.BUYNFT(formData);
        console.log(data);
        // response = data;
      } catch (error) {
        // response = error?.response?.data;
      }

      this.isLoading = false;

      // if (response?.success) {
      //   // this.$router.go();
      //   this.$router.push({ name: 'Profile' });
      // } else {
      //   // const { form } = this.$refs['bid-form'];
      //   // form.setFieldError('amount', response.error);
      //   this.isLoading = false;
      // }
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

.mb {
  margin-bottom: 2.18rem;
}

.label {
  color: #808080;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.125rem;
}

.value {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9375rem;
  font-weight: bold;
  line-height: 1.75rem;
}

.coin {
  margin-right: 0.5rem;
}
</style>
