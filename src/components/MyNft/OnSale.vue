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
        :name="item.title"
        :price="item.price"
      />
    </div>
    <BaseRoundButton
      class="load-more-btn btn-outline-primary btn-xl"
      :text="$t('index_screen.more')"
    />
  </div>
</template>

<script>
export default {
  name: 'OnSale',
  data() {
    return {
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
      const { data } = await this.$api.GETOWNEDNFT(localStorage.getItem('account'));
      response = data;
      console.log(response);
      this.nft = response.data;
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
