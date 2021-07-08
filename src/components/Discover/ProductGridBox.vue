<template>
  <div
    ref="gridbox-root"
    class="gridbox-root"
  >
    <FilterList
      v-if="hasFilter || activeIndex === activeList.length - 1"
      @selected="handleSelected"
    />
    <div
      class="gridbox"
    >
      <BaseProductCard
        v-for="(item, index) in activeList"
        :id="item.id"
        :key="index"
        :author="item.author"
        :avatar="item.avatar"
        class="gridbox-product-card"
        :coin-type="item.coinType"
        :css="cardCSS"
        :image="item.image"
        :name="item.name"
        :price="item.price"
        :verified="item.verified"
      />
    </div>
    <div
      v-if="isPageLoading"
      class="page-loading"
    >
      <img
        height="128"
        src="@svg/loading.svg"
        width="128"
      >
    </div>
    <BaseRoundButton
      v-if="!isAutoLoad"
      class="load-more-btn btn-outline-primary btn-xl"
      :icon="isBtnLoading ? 'transparent-loading' : null"
      :text="isBtnLoading ? null : $t('index_screen.more')"
      @click="handleClick"
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
    hasFilter: { type: Boolean, required: false, default: true },
    sortMethod: { type: String, required: true },
  },
  data() {
    return {
      isBtnLoading: false,
      isPageLoading: true,
      isAutoLoad: false,
      activeIndex: 0,
      cardCSS: { bgColor: null },
      list: {
        latest: [[], [], [], [], []],
        cheapest: [[], [], [], [], []],
        highest: [[], [], [], [], []],
        search: [],
      },
    };
  },
  computed: {
    activeList() {
      return this.list[this.sortMethod][this.activeIndex];
    },
  },
  watch: {
    sortMethod() {
      this.handleSelected(this.activeIndex);
    },
  },
  mounted() {
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });
    this.loadMore();
  },
  methods: {
    handleClick() {
      this.isBtnLoading = true;
      this.loadMore();
      setTimeout(() => {
        this.isBtnLoading = false;
        this.isAutoLoad = true;
        window.addEventListener('scroll', this.autoLoad);
      }, 1100);
    },
    loadMore() {
      // TODO: Call API
      setTimeout(async () => {
        this.activeList.push(...await this.$global.getFakeData(
          this.number, this.sortMethod, this.activeIndex,
        ));
        this.isPageLoading = false;
      }, 1000);
    },
    handleSelected(index) {
      this.activeIndex = index;
      if (this.activeList.length === 0) {
        this.isPageLoading = true;
        this.isAutoLoad = false;
        this.loadMore();
        window.removeEventListener('scroll', this.autoLoad);
      }
    },
    autoLoad() {
      if (!this.isPageLoading && this.$refs['gridbox-root'].getBoundingClientRect().bottom < window.innerHeight) {
        this.isPageLoading = true;
        this.loadMore();
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
  justify-content: space-around;
  overflow: hidden;
}

.gridbox-product-card {
  margin-top: 0.3rem;
}

.page-loading {
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
  margin-top: 5rem;
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
