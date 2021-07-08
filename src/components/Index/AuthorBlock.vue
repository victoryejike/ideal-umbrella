<template>
  <div class="author-block">
    <img
      class="avatar"
      height="60"
      :onerror="$global.handleAvatarError"
      :src="avatar"
      width="60"
    >
    <div class="information">
      <div class="author">
        <span class="author-name">
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
      <span class="total-coins">
        {{ `${Math.round(totalCoin * 1e5) / 1e5} ${coinTypeString[coinType]}` }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AuthorBlock',
  props: {
    author: { type: String, required: true },
    avatar: { type: String, required: true },
    coinType: { type: Number, required: false, default: 0 },
    totalCoin: { type: Number, required: true },
    verified: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      coinTypeString: ['ETH', 'HT', 'BTC'],
    };
  },
};
</script>

<style scoped>
.author-block {
  display: inline-flex;
  font-weight: bold;
}

.avatar {
  border: 0.125rem solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

.information {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1.2rem;
}

.author {
  align-items: center;
  display: flex;
  font-size: 1.1rem;
}

.author-name {
  overflow: hidden;
  white-space: nowrap;
  width: 8rem;
}

.tick-icon {
  margin-left: 0.5rem;
}

.total-coins {
  color: #808080;
  font-size: 0.9rem;
}
</style>
