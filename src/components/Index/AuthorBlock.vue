<template>
  <div class="author-block">
    <img
      class="avatar"
      :src="avatar"
      width="60"
      height="60"
      :onerror="handleAvatarError"
    >
    <div class="information">
      <div class="author">
        <span class="author-name">
          {{ (author.length > MAX_LENGTH) ? `${author.substring(0, MAX_LENGTH)}...` : author }}
        </span>
        <img
          v-if="verified"
          class="tick-icon"
          src="@svg/tick.svg"
          width="16"
          height="16"
        >
      </div>
      <span class="total-coins">{{ `${Math.round(totalCoin * 1e5) / 1e5} ${coinType}` }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AuthorInformationBlock',
  props: {
    author: { type: String, required: true },
    avatar: { type: String, required: true },
    totalCoin: { type: Number, required: true },
    coinType: { type: String, required: false, default: 'HT' },
    verified: { type: Boolean, required: false, default: false },
  },
  created() {
    this.MAX_LENGTH = 11;
  },
  methods: {
    handleAvatarError(event) {
      const { target } = event;
      target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
    },
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
  border-radius: 2rem;
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
  width: 7.5rem;
}

.tick-icon {
  margin-left: 0.5rem;
}

.total-coins {
  color: #808080;
  font-size: 0.9rem;
}
</style>
