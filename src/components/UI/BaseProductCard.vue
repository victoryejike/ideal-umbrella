<template>
  <div
    class="card-container"
    :style="{background: bgColor}"
  >
    <div
      class="card-inner-div"
      :style="{padding:(bgColor == null) ? null : '1.25rem 1.875rem'}"
    >
      <div
        class="author"
        :class="(abstractLength <= MINIMUM_LENGTH) ? 'center' : null"
      >
        <img
          class="avatar"
          height="30"
          :onerror="handleAvatarError"
          :src="avatar"
          width="30"
        >
        <span
          v-if="abstractedAuthorName = textAbstract(author, abstractLength)"
          class="author-name"
        >
          {{ abstractedAuthorName }}
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
      <div class="description">
        <span
          v-if="abstractedProductName = textAbstract(name, abstractLength)"
          class="product-name"
        >
          {{ abstractedProductName }}
        </span>
        <div
          class="coins-and-price-div"
          :class="(abstractLength <= MINIMUM_LENGTH) ? 'center' : null"
        >
          <img
            class="coins-icon"
            height="20"
            src="@svg/ht.svg"
            width="20"
          >
          <span class="price">
            <!-- Correct to 2 decimal places -->
            {{ Math.round(price * 1e2) / 1e2 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoImage from '@img/no-image.png';

export default {
  name: 'BaseProductCard',
  props: {
    author: { type: String, required: true },
    avatar: { type: String, required: true },
    bgColor: { type: String, required: false, default: 'rgba(255, 255, 255, 0.25)' },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: false, default: 220 },
    verified: { type: Boolean, required: false, default: false },
  },
  computed: {
    abstractLength() {
      /*
       * Linear Regression (y = ax + b)
       * Here not using text-overflow because we cant fixed width of the author + product name
      */
      return Math.ceil(this.size * 0.1537 - 13.05);
    },
  },
  created() {
    this.MINIMUM_LENGTH = 5;
  },
  methods: {
    handleAvatarError(event) {
      const { target } = event;
      target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
    },
    handleImageError(event) {
      const { target } = event;
      target.src = NoImage;
    },
    textAbstract(text, maxLength) {
      if (maxLength <= this.MINIMUM_LENGTH) { return null; }
      return (text.length > maxLength) ? `${text.substring(0, maxLength)}...` : text;
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
}

.avatar {
  background: #fff;
  border-radius: 1rem;
  margin-right: 0.625rem;
}

.author-name {
  margin-right: 0.625rem;
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

/* If the length of author name or product name lower then MINIMUM_LENGTH, center the div */

.center {
  margin: auto auto;
}
</style>
