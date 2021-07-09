<template>
  <div
    ref="gridbox-root"
    class="gridbox-root"
  >
    <FilterList
      v-if="hasFilter || activeFilterIndex === activeList.length - 1"
      @selected="handleSelected"
    />
    <div
      v-if="isReady"
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
      v-if="!isAutoLoad && !isEndOfContent"
      class="load-more-btn btn-outline-primary btn-xl"
      :icon="isBtnLoading ? 'transparent-loading' : null"
      :text="isBtnLoading ? null : $t('index_screen.more')"
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
      isEndOfContent: false,
      isReady: false,
      activeFilterIndex: 0,
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
      return this.list[this.sortMethod][this.activeFilterIndex];
    },
  },
  watch: {
    sortMethod() {
      this.handleSelected(this.activeFilterIndex);
    },
  },
  mounted() {
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });
    this.loadMore();
  },
  methods: {
    async handleClick() {
      this.isBtnLoading = true;
      await this.loadMore();
      this.isAutoLoad = true;
      window.addEventListener('scroll', this.autoLoad);
      this.isBtnLoading = false;
    },
    async loadMore() {
      const params = {
        skip: this.activeList.length,
        limit: this.number,
        recently_added: this.sortMethod === 'latest',
        cheapest: this.sortMethod === 'cheapest',
        highest_price: this.sortMethod === 'highest',
      };
      const response = await this.$api.GET_NFT_LIST(params);
      if (response.length > 0) {
        const matchKeyResponse = response.map((item) => ({
          // eslint-disable-next-line no-underscore-dangle
          id: item._id,
          name: item.title,
          price: item.price || Math.random() * 60 + 5,
          image: `https://ipfs.io/ipfs/${item.uri}`,
          author: `Author ${Math.random().toString(20).substr(2, 10)}`,
          avatar: null,
        }));
        this.activeList.push(...matchKeyResponse);
        this.isPageLoading = false;
        this.isReady = true;

        if (response.length < this.number) {
          this.handleEndOfContent();
        } else {
          this.isEndOfContent = false;
        }
      } else {
        this.handleEndOfContent();
      }
    },
    async handleSelected(index) {
      this.activeFilterIndex = index;

      this.isAutoLoad = false;
      window.removeEventListener('scroll', this.autoLoad);

      this.isPageLoading = true;
      this.isReady = false;
      if (this.activeList.length === 0) {
        await this.loadMore();
      } else {
        setTimeout(() => {
          this.isPageLoading = false;
          this.isReady = true;
        }, 500);
      }
    },
    handleEndOfContent() {
      this.isEndOfContent = true;
      window.removeEventListener('scroll', this.autoLoad);
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

.end-of-content {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 3.5rem;
  text-align: center;
}

@media (max-width: 62.5em) {
  .gridbox {
    grid-template-columns: repeat(auto-fit, 8.75rem);
  }
}
</style>
