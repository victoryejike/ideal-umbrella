<template>
  <div
    class="nft-card"
    @click="forwardURL"
  >
    <div v-if="btn === 'true'">
      <BaseRoundButton
        class="btn-outline btn-sm"
        :text="$t('nft_index.button_text')"
      />
    </div>
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
    btn: { type: String, required: true },
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
  border-radius: 23px;
  margin-right: 30px;
  margin-top: 30px;
  padding: 20px;
  width: 250px;
}

.symbol {
  padding: 45px;
}

.bg-symbol {
  background-image: url(../../assets/svg/nft-bg.svg);
  border-radius: 16px;
  height: 100px;
  margin: auto;
  width: 100px;
}

.multiple-section {
  position: absolute;
}

.multiple {
  position: absolute;
}

.one {
  left: 60px;
  top: 100px;
  z-index: 2;
}

.two {
  left: 100px;
  top: 60px;
  z-index: 0;
}

.three {
  left: 82px;
  top: 78px;
  z-index: 0;
}

.type {
  font-size: 20px;
  font-variant-caps: all-petite-caps;
  text-align: center;
}

.relative {
  position: relative;
  top: 80%;
}
</style>
