<template>
  <div class="gridbox-root mt-2">
    <div
      class="gridbox"
    >
      <BaseProductCard
        v-for="(item, index) in nft"
        :id="item.id"
        :key="index"
        :author="item.author"
        :avatar="item.avatar"
        class="gridbox-product-card"
        :css="cardCSS"
        :image="item.image"
        :marketplace="true"
        :name="item.name"
        :period="item.period"
        :price="item.price"
        :verified="item.verified"
      />
    </div>
    <!-- <BaseRoundButton
      class="load-more-btn btn-outline-primary btn-xl"
      :text="$t('index_screen.more')"
    /> -->
    <NoNFT
      v-if="nft?.length === 0"
    />
  </div>
</template>

<script>
import NoNFT from './NoNFT.vue';

export default {
  name: 'OnSale',
  components: {
    NoNFT,
  },
  data() {
    return {
      cardCSS: { bgColor: null },
      nft: [],
    };
  },
  async mounted() {
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });

    const response = await this.$api.GET_ONSALES_NFT();
    this.nft = this.$global.translateNFTDetails(response);
  },
};
</script>

<style scoped>
.gridbox {
  display: grid;
  grid-column-gap: 1.25rem;
  grid-row-gap: 5rem;
  grid-template-columns: repeat(auto-fit, 11.875rem);
  justify-content: space-between;
  overflow: hidden;
}

.gridbox-product-card {
  margin-top: 0.3rem;
}

.load-more-btn {
  margin: auto auto;
  margin-top: 3.5rem;
}

.mt-2 {
  margin-top: 2rem;
}

@media (max-width: 62.5em) {
  .gridbox {
    grid-template-columns: repeat(auto-fit, 8.75rem);
  }
}
</style>
