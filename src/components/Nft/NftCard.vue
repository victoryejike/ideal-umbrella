<template>
  <div
    class="nft-card"
    @click="forwardURL"
  >
    <BaseRoundButton
      v-if="btn"
      class="time-btn btn-outline-primary btn-sm"
      :text="$t('nft_index.button_text')"
    />

    <div
      v-if="type === 'single'"
      class="symbol"
    >
      <img
        height="100"
        src="@img/nft-card-single.png"
        style="border-radius: 1rem;"
        width="100"
      >
    </div>
    <div
      v-if="type === 'multiple'"
      class="symbol"
    >
      <img
        height="140"
        src="@img/nft-card-multi.png"
        width="140"
      >
    </div>
    <div
      class="type"
    >
      {{ type }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'NFTCard',
  props: {
    btn: { type: Boolean, required: false, default: false },
    type: { type: String, required: true },
    url: { type: String, required: false, default: null },
  },
  methods: {
    forwardURL() {
      if (this.url !== null) { this.$router.push(this.url); }
    },
  },
};

</script>

<style scoped>
.nft-card {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 1.4375rem;
  margin-right: 1.875rem;
  margin-top: 1.875rem;
  padding: 1.25rem;
  width: 15.625rem;
}

.time-btn {
  position: absolute;
}

.symbol {
  align-items: center;
  display: flex;
  height: 8.75rem;
  justify-content: center;
  margin-top: 1rem;
  padding: 2.8125rem;
}

.type {
  font-size: 1.25rem;
  font-variant-caps: all-petite-caps;
  font-weight: bold;
  margin-bottom: 1.9rem;
  text-align: center;
}
</style>
