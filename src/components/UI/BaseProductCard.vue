<template>
  <div
    class="card-container"
    :style="{background: bgColor, padding: padding}"
  >
    <div
      class="card-inner-div"
      :style="{width: `${size / 16}rem`}"
    >
      <div
        class="author"
      >
        <img
          class="avatar"
          height="30"
          :onerror="$global.handleAvatarError"
          :src="$global.handleAvatarURL(avatar)"
          width="30"
        >
        <span
          class="abstract-text author-name"
        >
          {{ author }}
        </span>
        <img
          v-if="verified"
          class="tick-icon"
          height="16"
          src="@svg/tick.svg"
          width="16"
        >
      </div>
      <div
        class="product-div"
        :style="[{height: `${size}px`}, {width: `${size}px`}]"
      >
        <img
          class="product-image"
          :height="size"
          :onerror="handleImageError"
          :src="image"
          :width="size"
          @click="handleClick"
          @load="onImgLoaded"
        >
        <img
          class="product-placeholder"
          :height="size"
          src="@img/no-image.png"
          :style="{opacity: (isLoading) ? 1 : 0}"
          :width="size"
          @click="handleClick"
        >
        <div
          v-if="period != null"
          class="timed-auction-badge"
        >
          {{ timeLeft }}
        </div>
        <div
          v-else-if="marketplace != null"
        >
          <div
            v-if="marketplace === true"
            class="timed-auction-badge off-marketplace"
            @click="takeOffMarket"
          >
            Keep NFT
          </div>
          <div
            v-else
            class="timed-auction-badge"
            @click="ResaleURL"
          >
            Sale NFT
          </div>
        </div>
      </div>
      <div
        class="description"
      >
        <span
          class="abstract-text product-name"
        >
          {{ name }}
        </span>
        <div
          class="coins-and-price-div"
        >
          <img
            v-if="coinType === 0"
            class="coins-icon"
            height="20"
            src="@svg/ethereum.svg"
            width="20"
          >
          <img
            v-else-if="coinType === 1"
            class="coins-icon"
            height="20"
            src="@svg/huobi-token.svg"
            width="20"
          >
          <img
            v-else-if="coinType === 2"
            class="coins-icon"
            height="20"
            src="@svg/bitcoin.svg"
            width="20"
          >
          <span
            v-if="price"
            class="price"
          >
            <!-- Correct to 2 decimal places -->
            {{ Math.round(price * 1e3) / 1e3 }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <BaseModal
    v-show="placeBuy"
    @close="closeModal"
  >
    <template #body>
      <h2 style="text-align: center;">
        {{ $t('buy_modal.success') }}
      </h2>
      <p style="text-align: center;">
        {{ $t('buy_modal.buy_message') }}
      </p>
    </template>
  </BaseModal>
</template>

<script>
import NoImage from '@img/no-image.png';

const Web3 = require('web3');

export default {
  name: 'BaseProductCard',
  props: {
    css: {
      type: Object,
      required: false,
      default: null,
      validator(value) {
        const whiteList = ['bgColor', 'padding', 'size'];
        const keys = Object.keys(value);
        for (let i = 0; i < keys.length; i += 1) {
          if (!whiteList.includes(keys[i])) { return false; }
        }
        return true;
      },
    },
    author: { type: String, required: false, default: null },
    avatar: { type: String, required: false, default: null },
    id: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tokenid: { type: Number, required: true },
    tokentype: { type: String, required: true },
    coinType: { type: Number, required: false, default: 0 },
    verified: { type: Boolean, required: false, default: false },
    period: { type: Object, required: false, default: null },
    marketplace: { type: Object, required: false, default: null },
  },
  data() {
    return {
      isLoading: true,
      timeLeft: null,
      Address: localStorage.getItem('account'),
      placeBuy: false,
      nftAddress: '',
      token: '',
      erc721ContractAddress: '0xF3538d2696FF98396Aa0386d91bd7f9C02570511',
      erc1155ContractAddress: '0x24d5CaBE5A68653c1a6d10f65679839a5CD4a42A',
      delegateContractAddress: '0x5942b38Fa09D0457D699B3756259C4D8285d6E0b',
    };
  },
  computed: {
    bgColor() { return this.css?.bgColor; },
    padding() { return this.css?.padding; },
    size() { return this.css?.size || 220; },
  },
  mounted() {
    if (this.period != null) {
      const now = Math.floor(Date.now() / 1000);
      const timeEnd = Date.parse(this.period.end) / 1000;
      let hf = this.secondsToHumanFormat(timeEnd - now);
      if (this.isTimesUp(hf)) { this.timeLeft = this.$t('components.times_up'); return; }

      this.timeLeft = this.getTimeLeftString(hf);
      setTimeout(() => {
        const timer = setInterval(() => {
          hf = this.secondsToHumanFormat(timeEnd - now);
          if (this.isTimesUp(hf)) {
            // this.timeLeft = this.$t('components.times_up');
            this.timeLeft = null;
            clearInterval(timer);
          } else {
            this.timeLeft = this.getTimeLeftString(hf);
          }
        }, 60);
      }, hf.second);
    }
    if (this.tokentype === 'single') {
      this.nftAddress = this.erc721ContractAddress;
      this.token = 1;
    } else {
      this.nftAddress = this.erc1155ContractAddress;
      this.token = 2;
    }
  },
  methods: {
    handleImageError(event) {
      const { target } = event;
      target.src = NoImage;
    },
    closeModal() {
      this.placeBuy = false;
    },
    handleClick() {
      this.$router.push({ name: 'TokenDetails', params: { id: this.id } });
    },
    takeOffMarket() {
      const web3 = new Web3(window.ethereum);
      console.log(this.nftAddress, this.tokenid, this.tokentype, this.token);
      const delegateContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
      delegateContract.methods
        .closeOrder(this.nftAddress, this.tokenid, this.token)
        .send({ from: this.Address })
        .on('error', (error) => {
          console.log(error);
          this.isLoading = false;
          this.$toast.error('An error occurred');
        })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.placeBuy = true;
          // this.$toast.error('Successfully taken NFT off Marketplace');
        });
    },
    // OfferForSale() {
    //   const web3 = new Web3(window.ethereum);
    //   console.log(this.nftAddress, this.tokenid, this.tokentype, this.token);
    //   const delegateContract = new web3.eth
    // .Contract(require('@/assets/abi/delegateContract').default,
    // this.delegateContractAddress);
    //   delegateContract.methods
    //     .OfferForSale(this.erc20ContractAddress, this.erc721ContractAddress, this.tokenId, (1),
    //       (1), web3.utils.toWei(startingBid, 'ether'), this.userData.uid, (3), (startTime), (0))
    //     .send({ from: this.value, gas: 3000000, gasPrice: '35000000000' })
    //     .on('error', (error) => {
    //       console.log(error);
    //       this.isLoading = false;
    //     });
    // },
    ResaleURL() {
      this.$router.push({ name: 'ResaleNFT', params: { id: this.id } });
    },
    onImgLoaded() {
      this.isLoading = false;
    },
    secondsToHumanFormat(seconds) {
      let totaldays = Math.floor(seconds / 86400);
      if (totaldays < 0) { totaldays = 0; }
      let totalhours = Math.floor((seconds - totaldays * 86400) / 3600);
      if (totalhours < 0) { totalhours = 0; }
      let totalminutes = Math.floor((seconds - totaldays * 86400 - totalhours * 3600) / 60);
      if (totalminutes < 0) { totalminutes = 0; }
      let totalseconds = seconds - totaldays * 86400 - totalhours * 3600 - totalminutes * 60;
      if (totalseconds < 0) { totalseconds = 0; }

      return {
        day: totaldays,
        hour: totalhours,
        minute: totalminutes,
        second: totalseconds,
      };
    },
    getTimeLeftString(hf) {
      return `${hf?.day}d ${hf?.hour}h ${hf?.minute}m left`;
    },
    isTimesUp(hf) {
      return hf.day <= 0 && hf.hour <= 0 && hf.minute <= 0 && hf.second <= 0;
    },
  },
};
</script>

<style scoped>
.card-container {
  border-radius: 1.5rem;
  cursor: pointer;
  margin: 0.5rem;
  display: inline-block;
}

.card-container:hover {
  filter: brightness(85%);
  transform: translateY(-0.25rem);
  transition: all 0s;
}

/* https://stackoverflow.com/a/26768532/11440474 */
img[src=''],
img:not([src]) {
  opacity: 0;
}

.card-inner-div {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  font-weight: bold;
}

.author,
.description {
  align-items: center;
  display: flex;
  overflow: hidden;
}

.avatar {
  border-radius: 1rem;
  object-fit: cover;
}

.abstract-text {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
}

.right{
  right: 0.5rem;
}

.author-name {
  margin: 0 0.625rem;

  /* Safari Bug?  */
  width: 0;
}

.product-image {
  object-fit: cover;
}

.product-name {
  margin-right: 0.3rem;
}

.product-div {
  margin-bottom: 1.25rem;
  margin-top: 0.625rem;
  position: relative;
}

.product-div img {
  border-radius: 1rem;
  position: absolute;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}

.coins-and-price-div {
  align-items: center;
  display: flex;
  margin-left: auto;
}

.price {
  color: #6374c3;
  margin-left: 0.375rem;
}

.timed-auction-badge {
  background: #5d6ec2;
  border: 0.1rem solid #fff;
  border-radius: 1rem;
  bottom: 0;
  color: #fff;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  padding: 0.4rem 0.6rem;
  position: absolute;
  text-align: center;
}
</style>
