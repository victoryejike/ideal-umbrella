<template>
  <div class="gridbox-root">
    <FilterList />
    <div
      class="gridbox"
    >
      <BaseProductCard
        v-for="(item, index) in list"
        :id="item.id"
        :key="index"
        :author="item.author"
        :avatar="item.avatar"
        class="gridbox-product-card"
        :css="cardCSS"
        :image="item.image"
        :name="item.name"
        :price="item.price"
        :verified="item.verified"
      />
    </div>
    <BaseRoundButton
      class="load-more-btn btn-outline-primary btn-xl"
      :icon="isLoading ? 'transparent-loading' : null"
      :text="isLoading ? null : $t('index_screen.more')"
      @click="loadMore"
    />
  </div>
</template>

<script>
import FilterList from '@/components/Discover/FilterList.vue';

export default {
  name: 'ProductGridBox',
  components: { FilterList },
  props: {
    number: { type: Number, required: false, default: 10 },
  },
  data() {
    return {
      isLoading: false,
      list: Array(this.number).fill({
        id: 'V3isglWtYb5qIy24QbTJeoJjuV35fEDd0RoL',
        avatar: 'avatar.png',
        author: 'Otha Davis III',
        image: 'image.png',
        name: 'Crypto Mask',
        price: 67.456,
        verified: true,
      }),
      cardCSS: { bgColor: null },
    };
  },
  mounted() {
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      setTimeout(() => {
        this.list.push(...Array(this.number).fill({
          id: 'V3isglWtYb5qIy24QbTJeoJjuV35fEDd0RoL',
          avatar: 'avatar.png',
          author: 'Otha Davis III',
          image: 'image.png',
          name: 'Crypto Mask',
          price: 67.456,
          verified: true,
        }));
        this.isLoading = false;
      }, 500);
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
  justify-content: space-around;
  overflow: hidden;
}

.gridbox-product-card {
  margin-top: 0.3rem;
}

.load-more-btn {
  margin: auto auto;
  margin-top: 3.5rem;
}

@media (max-width: 62.5em) {
  .gridbox {
    grid-template-columns: repeat(auto-fit, 8.75rem);
  }
}
</style>
