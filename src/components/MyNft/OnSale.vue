<template>
  <div class="gridbox-root mt-2">
    <div
      class="gridbox"
    >
      <BaseProductCard
        v-for="(item, index) in list"
        :id="item.id"
        :key="index"
        :author="item.author"
        :avatar="item.avatar"
        :bg-color="null"
        class="gridbox-product-card"
        :image="item.image"
        :name="item.name"
        :price="item.price"
        :size="size"
        :verified="item.verified"
      />
    </div>
    <BaseRoundButton
      class="load-more-btn btn-outline-primary btn-xl"
      :text="$t('index_screen.more')"
    />
  </div>
</template>

<script>

const MAX_WIDTH = 1000;

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
      size: null,
    };
  },
  mounted() {
    return window.innerWidth > MAX_WIDTH
      ? this.pcResponsive()
      : this.mobileResponsive();
  },
  methods: {
    mobileResponsive() {
      if (window.innerWidth <= MAX_WIDTH) {
        window.removeEventListener('resize', this.mobileResponsive);
        window.addEventListener('resize', this.pcResponsive);
        this.size = 140;
      }
    },
    pcResponsive() {
      if (window.innerWidth > MAX_WIDTH) {
        window.removeEventListener('resize', this.pcResponsive);
        window.addEventListener('resize', this.mobileResponsive);
        this.size = 190;
      }
    },
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
  overflow: hidden hidden;
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
