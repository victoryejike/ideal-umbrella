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
        @click.self="handleClick"
      >
        <img
          v-if="assetType === 'image'"
          class="product-image"
          :height="size"
          :onerror="handleImageError"
          :src="image"
          :width="size"
          @click="handleClick"
          @load="onImgLoaded"
        >
        <video
          v-else-if="assetType === 'video'"
          class="product-image product-placeholde"
          controls
          :height="size"
          :style="{opacity: (isLoading) ? 1 : 0}"
          :width="size"
          @click="handleClick"
        >
          <source
            :src="image"
            type="video/mp4"
          >
          <source
            :src="image"
            type="video/ogg"
          >
          Your browser does not support the video tag.
        </video>
        <img
          v-if="assetType != 'video'"
          class="product-placeholder"
          :height="size"
          src="@img/no-image.png"
          :style="{opacity: (isLoading) ? 1 : 0}"
          :width="size"
          @click="handleClick"
        >
        <div
          v-if="period != null && marketplace === true"
          class="timed-auction-badge"
        >
          {{ timeLeft }}
        </div>
        <div
          v-else-if="marketplace != null"
        >
          <div
            v-if="marketplace === true && bid === null"
            class="timed-auction-badge off-marketplace"
            @click="takeOffMarket"
          >
            <span>Keep NFT</span>
            <span
              v-if="isNftActionClick"
              class="unshow"
            >
              <img
                src="@svg/loading.svg"
                style=" background-color: #fff; border-radius: 50%; height: 0.8rem; width: 0.8rem;"
              >
              <!-- <img
                class="unshow"
                src="@svg/loading.svg"
                style=" background-color: #fff; border-radius: 50%; height: 1.1rem; width: 1.1rem;"
              > -->
            </span>
          </div>
          <div
            v-else-if="marketplace === false"
            class="timed-auction-badge"
            @click.self="ResaleURL"
          >
            Sell NFT
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
    assetType: { type: String, required: false, default: null },
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
    marketplace: { type: Boolean, required: false, default: null },
    bid: { type: Object, required: false, default: null },
  },
  data() {
    return {
      isLoading: true,
      isNftActionClick: false,
      timeLeft: null,
      Address: localStorage.getItem('account'),
      placeBuy: false,
      nftAddress: '',
      token: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      erc721ContractAddress: '0x9aE66F8aDF65816BE94C957D6D37b316791Bc5CD',
      erc1155ContractAddress: '0x5eb7Ce96075387E343D4c50b42ADb4AFE79852E5',
      delegateContractAddress: '0xc2199b47e35Bc1D3eAeC73651728Bd83857C4B01',
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
            this.timeLeft = this.$t('components.times_up');
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
    console.log(this.period);
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
      this.isNftActionClick = true;
      const web3 = new Web3(window.ethereum);
      console.log(this.nftAddress, this.tokenid, this.tokentype, this.token);
      const delegateContract = new web3.eth.Contract(require('@/assets/abi/delegateContract').default, this.delegateContractAddress);
      delegateContract.methods
        .closeOrder(this.nftAddress, this.tokenid, this.token, this.userData.uid)
        .send({ from: this.Address })
        .on('error', (error) => {
          console.log(error);
          this.isNftActionClick = false;
          this.$toast.error('An error occurred');
        })
        .once('receipt', (receipt) => {
          console.log(receipt);
          this.isNftActionClick = false;
          this.placeBuy = true;
          // this.$toast.error('Successfully taken NFT off Marketplace');
        });
    },
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

.unshow {
  margin: 0 0.12rem;
  margin-top: -0.6rem;
}

.timed-auction-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #5d6ec2;
  border: 0.1rem solid #fff;
  border-radius: 1rem;
  bottom: 0;
  color: #fff;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  padding: 0.4rem 0.75rem;
  position: absolute;
  text-align: center;
}
</style>
