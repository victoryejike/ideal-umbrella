<template>
  <div class="container">
    <div
      class="banner"
    >
      <img
        class="index-hero"
        height="390"
        src="@img/index-hero.png"
        width="274"
      >
      <div class="banner-title-and-searchbar">
        <h1 class="banner-title">
          {{ $t('index_screen.banner_text') }}
        </h1>
        <SearchBar :width="36.25" />
      </div>
    </div>
    <IndexSection :title="$t('index_screen.title.popular')">
      <template #content>
        <div
          class="gridbox card-gridbox"
          :style="{gridTemplateColumns: popularSectionSetting}"
        >
          <BaseProductCard
            v-for="(item, index) in popularList"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            class="popular-product-card"
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :verified="item.verified"
          />
        </div>
      </template>
    </IndexSection>
    <IndexSection :title="$t('index_screen.title.top_seller')">
      <template #right>
        <BaseNavigationTab
          :list="sellerTab"
          :width="9.4"
        />
      </template>
      <template #content>
        <div
          class="gridbox block-gridbox"
          :style="{gridTemplateColumns: sellerSectionSetting}"
        >
          <AuthorBlock
            v-for="(item, index) in topSellerList"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            class="seller-block"
            :total-coin="item.totalCoin"
            :verified="item.verified"
          />
        </div>
      </template>
    </IndexSection>
    <IndexSection :title="$t('index_screen.title.discover')">
      <template #right>
        <BaseNavigationTab
          :list="discoverTab"
          :width="10"
        />
      </template>
      <template #content>
        <div
          class="gridbox card-gridbox"
          :style="{gridTemplateColumns: discoverSectionSetting}"
        >
          <BaseProductCard
            v-for="(item, index) in discoverList"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            :bg-color="null"
            class="discover-product-card"
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :size="190"
            :verified="item.verified"
          />
        </div>
      </template>
    </IndexSection>
    <BaseRoundButton
      class="load-more-btn"
      size="xl"
      :text="$t('index_screen.more')"
      type="outline"
    />
  </div>
</template>

<script>
import AuthorBlock from '@/components/Index/AuthorBlock.vue';
import IndexSection from '@/components/Index/IndexSection.vue';
import SearchBar from '@/components/Index/SearchBar.vue';

export default {
  name: 'Index',
  components: { AuthorBlock, IndexSection, SearchBar },
  data() {
    // TODO: Fake data to real data
    return {
      popularList: Array(4).fill({
        avatar: 'avatar.png',
        author: 'Otha Davis III - Abstract Test Display',
        image: 'image.png',
        name: 'Everydays - The First Crypto Art',
        price: 20.12412,
        verified: true,
      }),
      topSellerList: Array(8).fill({
        avatar: 'avatar.png',
        author: 'CryptoPunks - Abstract Test Display',
        totalCoin: 867.00012,
        verified: true,
      }),
      discoverList: Array(10).fill({
        avatar: 'avatar.png',
        author: 'Otha Davis III',
        image: 'image.png',
        name: 'Crypto Mask',
        price: 67.456,
        verified: true,
      }),
      sellerTab: [
        this.$t('index_screen.seller_tab.day'),
        this.$t('index_screen.seller_tab.month'),
        this.$t('index_screen.seller_tab.week'),
      ],
      discoverTab: [
        this.$t('index_screen.discover_tab.recent'),
        this.$t('index_screen.discover_tab.cheap'),
        this.$t('index_screen.discover_tab.high'),
      ],
      popularSectionSetting: null,
      sellerSectionSetting: null,
      discoverSectionSetting: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.popularSectionSetting = `repeat(auto-fit, ${this.getWidth('popular-product-card')}rem)`;
      this.sellerSectionSetting = `repeat(auto-fit, ${this.getWidth('seller-block')}rem)`;
      this.discoverSectionSetting = `repeat(auto-fit, ${this.getWidth('discover-product-card')}rem)`;
    }, 100);
  },
  methods: {
    getWidth(className) {
      return document.querySelector(`.${className}`).clientWidth / 16;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.banner {
  background-image: url('~@img/index-bg.png');
  background-repeat: no-repeat;
  display: flex;
  height: 27.5rem;
  margin: auto auto;
  margin-bottom: 2rem;
}

.banner-title-and-searchbar {
  margin-left: 6.75rem;
  margin-top: 3rem;
}

.banner-title {
  font-size: 3.6rem;
  font-weight: 800;
  margin-bottom: 4rem;
}

.index-hero {
  margin-left: 1rem;
  margin-top: -1rem;
}

.gridbox {
  display: grid;
  justify-content: space-between;
}

.card-gridbox {
  grid-gap: 1.25rem;
  grid-row-gap: 5rem;
}

.block-gridbox {
  grid-gap: 4rem;
  grid-row-gap: 3rem;
}

.load-more-btn {
  margin: auto auto;
}
</style>
