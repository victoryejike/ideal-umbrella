<template>
  <div
    class="card-container"
    :style="{background: bgColor, padding: padding}"
  >
    <div
      class="card-inner-div"
      :style="{width: `${size}px`}"
    >
      <div
        class="author"
      >
        <img
          class="avatar"
          height="30"
          :onerror="handleAvatarError"
          :src="avatar"
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
    padding: { type: String, required: false, default: null },
    verified: { type: Boolean, required: false, default: false },
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
  white-space: nowrap;
}

.avatar {
  background: #fff;
  border-radius: 1rem;
  margin-right: 0.625rem;
}

.abstract-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.author-name {
  margin-right: 0.625rem;
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
