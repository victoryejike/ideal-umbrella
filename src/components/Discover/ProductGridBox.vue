<template>
  <div
    ref="gridbox-root"
    class="gridbox-root"
  >
    <FilterList
      v-if="hasFilter"
      ref="filterList"
      :style="{'pointer-events':(isLoading) ? 'none': 'auto'}"
      @selected="handleSelected"
    />
    <div
      v-if="isPageReady && activeList.length > 0"
      class="gridbox"
    >
      <BaseProductCard
        v-for="(item, index) in activeList"
        :id="item.id"
        :key="index"
        :author="item.author"
        :avatar="item.avatar"
        class="gridbox-product-card"
        :css="cardCSS"
        :image="item.image"
        :name="item.name"
        :period="item.period"
        :price="item.price"
        :verified="item.verified"
      />
    </div>
    <div
      v-if="isLoading"
      class="page-loading"
    >
      <img
        height="128"
        src="@svg/loading.svg"
        width="128"
      >
    </div>
    <BaseRoundButton
      v-if="!isAutoLoad && !isEndOfContent && !isLoading"
      class="load-more-btn btn-outline-primary btn-xl"
      :text="$t('index_screen.more')"
      @click="handleClick"
    />
    <div
      v-if="isEndOfContent"
      class="end-of-content"
    >
      {{ $t('index_screen.end_of_content') }}
    </div>
  </div>
</template>

<script>
import FilterList from '@/components/Discover/FilterList.vue';

const SEARCH_INDEX = 5;

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
      isLoading: true,
      isPageReady: true,
      isAutoLoad: false,
      isEndOfContent: false,
      activeFilterIndex: 0,
      cardCSS: { bgColor: null },
      list: {
        latest: [[], [], [], [], [], []],
        cheapest: [[], [], [], [], [], []],
        highest: [[], [], [], [], [], []],
      },
    };
  },
  computed: {
    searchValue() { return this.$store.getters['data/searchValue']; },
    activeList() { return this.list[this.sortMethod][this.activeFilterIndex]; },
  },
  watch: {
    sortMethod() { this.handleSelected({ index: this.activeFilterIndex }); },
    searchValue(value) {
      this.list[this.sortMethod][SEARCH_INDEX] = [];
      this.$refs.filterList.toogleFilterBtn(value ? SEARCH_INDEX : 0);
    },
  },
  deactivated() {
    /**
     * Since this page will be cached in KeepAlive, I want to reset to 'Art' filter
     * if user forward to another page (also clear search value), so toogleFilterBtn
     * can update filter UI + trigger handleSelected, handleSelected will clear search value
     * since the activeIndex is 0, details can see the second line of handleSelected function.
     * IMPORTANT: Dont cache Index Page at the moment, it will cause a bug in searching
     */
    this.$refs.filterList.toogleFilterBtn(0);
    this.$store.commit('data/setSearchValue', null);
  },
  mounted() {
    console.log(this.activeList);
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });

    // FilterList will trigger handleSelected after getting the category list
  },
  methods: {
    async handleClick() {
      await this.loadMore();
      if (!this.isEndOfContent) {
        /**
         * If these still have content, auto load will enable, no 'More' button
         * will be shown. (like Rarible.com)
         */
        this.isAutoLoad = true;
        window.addEventListener('scroll', this.autoLoad);
      }
    },
    async loadMore() {
      this.isLoading = true;

      const params = {
        skip: this.activeList.length,
        limit: this.number,
        // sortMethod: this.sortMethod
      };

      // Should be Optimized
      if (this.sortMethod === 'latest') { params.recently_added = true; }
      if (this.sortMethod === 'cheapest') { params.cheapest_price = true; }
      if (this.sortMethod === 'highest') { params.highest_price = true; }
      if (this.categoryID != null) { params.category = this.categoryID; }
      if (this.searchValue) { params.search_word = this.searchValue; }

      const response = await this.$api.GET_NFT_LIST(params);
      const matchKeyResponse = this.$global.translateNFTDetails(response);
      this.activeList.push(...matchKeyResponse);
      this.isLoading = false;
      this.isEndOfContent = (matchKeyResponse.length < this.number);
    },
    async handleSelected(data) {
      this.activeFilterIndex = data.index;
      if (data.id) { this.categoryID = data.id; }

      if (data.index < SEARCH_INDEX && this.searchValue != null) {
        this.$store.commit('data/setSearchValue', null);
      }

      /**
       * When new filter option selected, auto load will disable, user have to click 'More'
       * button again to enable auto load.
       */
      this.isAutoLoad = false;
      window.removeEventListener('scroll', this.autoLoad);

      this.isPageReady = false;
      if (this.activeList.length === 0) {
        await this.loadMore();
      } else {
        await setTimeout(() => { this.isEndOfContent = false; }, 400);
      }
      this.isPageReady = true;
    },
    async autoLoad() {
      // Check isLoading is to prevent trigger loadMore multiple times in a short time
      if (!this.isLoading && this.$refs['gridbox-root'].getBoundingClientRect().bottom < window.innerHeight) {
        await this.loadMore();
        if (this.isEndOfContent) {
          this.isAutoLoad = false;
          window.removeEventListener('scroll', this.autoLoad);
        }
      }
    },
  },
};
</script>

<style scoped>
.gridbox {
  display: grid;
  grid-column-gap: 3.25rem;
  grid-row-gap: 5rem;
  grid-template-columns: repeat(auto-fit, 11.875rem);
  overflow: hidden;
}

.gridbox-product-card {
  margin-top: 0.3rem;
}

.load-more-btn {
  margin: auto auto;
  margin-top: 3.5rem;
}

.end-of-content {
  color: #6d6565;
  font-size: 1.3rem;
  margin-top: 3.5rem;
  text-align: center;
}

@media (max-width: 62.5em) {
  .gridbox {
    grid-template-columns: repeat(auto-fit, 8.75rem);
  }
}

@media (max-width: 37.1875em) {
  .gridbox {
    justify-content: space-around;
  }
}
</style>
