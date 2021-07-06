<template>
  <div class="gridbox-root mt-2">
    <div
      class="gridbox"
    >
      <BaseProductCard
        v-for="(item, index) in nft"
        :id="item._id"
        :key="index"
        avatar="avatar.png"
        class="gridbox-product-card"
        :css="cardCSS"
        :image="`https://ipfs.io/ipfs/${item.uri}`"
        :mininum="item.minimum_bid"
        :name="item.title"
        :price="item.price"
        :verified="true"
      />
    </div>
    <!-- <BaseRoundButton
      class="load-more-btn btn-outline-primary btn-xl"
      :text="$t('index_screen.more')"
    /> -->
    <NoNFT
      v-show="nonft"
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
      nonft: false,
      list: Array(10).fill({
        id: 'V3isglWtYb5qIy24QbTJeoJjuV35fEDd0RoL',
        avatar: 'avatar.png',
        author: 'Otha Davis III',
        image: 'image.png',
        name: 'Crypto Mask',
        price: 67.456,
        verified: true,
      }),
      cardCSS: { bgColor: null },
      nft: '',
    };
  },
  async mounted() {
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });
    let response = null;
    try {
      const { data } = await this.$api.GETOCREATEDNFT();
      response = data;
      console.log(response);
      if (response.data.length === 0) {
        this.nonft = true;
      } else {
        this.nft = response.data;
      }
    } catch (error) {
      response = error?.response?.data;
    }
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
