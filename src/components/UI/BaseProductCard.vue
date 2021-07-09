<template>
  <div
    class="card-container"
    :style="{background: bgColor, padding: padding}"
    @click="handleClick"
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
          :src="avatarImage"
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
      <img
        class="product-image"
        :height="size"
        :onerror="handleImageError"
        :src="image"
        :width="size"
      >
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
          <span
            v-else-if="mininum"
            class="price"
          >
            {{ Math.round(mininum * 1e3) / 1e3 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoImage from '@img/no-image.png';
import DefaultAvatar from '@img/default-avatar.png';

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
    author: { type: String, required: true },
    avatar: { type: String, required: false, default: null },
    id: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    coinType: { type: Number, required: false, default: 0 },
    mininum: { type: Number, required: false, default: null },
    verified: { type: Boolean, required: false, default: false },
  },
  computed: {
    bgColor() { return this.css?.bgColor; },
    padding() { return this.css?.padding; },
    avatarImage() { return this.avatar || DefaultAvatar; },
    size() { return this.css?.size || 220; },
  },
  methods: {
    handleImageError(event) {
      const { target } = event;
      target.src = NoImage;
    },
    handleClick() {
      this.$router.push({ name: 'TokenDetails', params: { id: this.id } });
    },
  },
};
</script>

<style scoped>

.card-container {
  border-radius: 1.5rem;
  cursor: pointer;
  display: inline-block;
}

.card-container:hover {
  filter: brightness(85%);
  transform: translateY(-0.25rem);
  transition: all 0s;
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
}

.abstract-text {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
}

.author-name {
  margin: 0 0.625rem;

  /* Safari Bug?  */
  width: 0;
}

.product-name {
  margin-right: 0.3rem;
}

.product-image {
  border-radius: 1rem;
  margin-bottom: 1.25rem;
  margin-top: 0.625rem;
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
</style>
