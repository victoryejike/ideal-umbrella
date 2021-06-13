<template>
  <div
    class="nft-card"
    @click="forwardURL"
  >
    <BaseRoundButton
      v-if="btn"
      class="btn-outline-primary btn-sm"
      :text="$t('nft_index.button_text')"
    />

    <div
      v-if="type === 'single'"
      class="symbol"
    >
      <div class="bg-symbol" />
    </div>
    <div
      v-if="type === 'multiple'"
      class="multiple-section"
    >
      <div class="bg-symbol multiple one" />
      <div class="bg-symbol multiple two" />
      <div class="bg-symbol multiple three" />
    </div>
    <div
      class="type"
      :class="{'relative': type === 'multiple'}"
    >
      <h5>{{ type }}</h5>
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

.symbol {
  padding: 2.8125rem;
}

.bg-symbol {
  background-image: url('~@img/nft-card-single.png');
  border-radius: 1rem;
  height: 6.25rem;
  margin: auto;
  width: 6.25rem;
}

.multiple-section {
  position: absolute;
}

.multiple {
  position: absolute;
}

.one {
  left: 6.25rem;
  top: 3.75rem;
}

.two {
  left: 5.125rem;
  top: 4.875rem;
}

.three {
  left: 3.75rem;
  top: 6.25rem;
}

.type {
  font-size: 1.25rem;
  font-variant-caps: all-petite-caps;
  text-align: center;
}

.relative {
  position: relative;
  top: 80%;
}
</style>
