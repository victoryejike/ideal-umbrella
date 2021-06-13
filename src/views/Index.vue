<template>
  <div class="container">
    <div
      class="banner-container"
    >
      <img
        class="banner-bg"
        height="440"
        src="@img/index-bg.png"
        width="965"
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
        <SearchBar
          :width="36.25"
        />
        <BaseRoundButton
          class="mobile-search-btn btn-primary btn-lg btn-bold"
          :text="$t('components.search')"
        />
      </div>
    </div>
    <IndexSection :title="$t('index_screen.title.popular')">
      <template #content>
        <div
          class="popular-box"
        >
          <BaseProductCard
            v-for="(item, index) in popularList"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            class="popular-product-card"
            :image="item.image"
            :name="item.name"
            :padding="popularSection.padding"
            :price="item.price"
            :size="popularSection.size"
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
          class="gridbox seller-gridbox"
          :style="{gridTemplateColumns: gridSetting.sellerSection.templateSize}"
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
        <BaseRoundButton
          class="load-more-btn btn-outline-primary btn-xl"
          :text="$t('index_screen.more')"
        />
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
        <div class="filter-container">
          <BaseRoundButton
            v-for="(item, index) in filterBtn"
            :key="index"
            class="filter-btn btn-outline-secondary btn-bold"
            :class="[filterSize, {'filter-btn-active': item.isActive}]"
            :text="item.name"
            @click="toogleFilterBtn(index)"
          />
        </div>
        <div
          class="gridbox discover-gridbox"
          :style="{gridTemplateColumns: gridSetting.discoverSection.templateSize}"
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
            :size="gridSetting.discoverSection.size"
            :verified="item.verified"
          />
        </div>
        <BaseRoundButton
          class="load-more-btn btn-outline-primary btn-xl"
          :text="$t('index_screen.more')"
        />
      </template>
    </IndexSection>
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
      filterBtn: [
        { name: '🎨 Art', isActive: true },
        { name: '🎵 Music', isActive: false },
        { name: '⚽ Sports', isActive: false },
        { name: '📸 Photography', isActive: false },
        { name: '💎 Collectibles', isActive: false },
      ],
      activeFilterIndex: 0,
      filterSize: 'btn-lg',
      popularSection: {
        size: 220,
        padding: '1.25rem 1.875rem',
      },
      gridSetting: {
        sellerSection: {
          name: 'seller-block',
          templateSize: null,
        },
        discoverSection: {
          name: 'discover-product-card > div > img',
          templateSize: null,
          size: 190,
          padding: null,
        },
      },
    };
  },
  mounted() {
    /*
      This is a px value like media query, if the width lower then this value,
      ProductCard will be responsive
    */
    this.MAX_WIDTH = 1000;

    /*
      Two function will be run to check the value of current width after mounted,
      should have a better code version I guess, just a temporarily implementation
    */
    this.mobileResponsive();
    this.pcResponsive();
  },
  methods: {
    calcGridTemplateSize() {
      const setting = this.gridSetting;
      Object.keys(setting).forEach((key) => {
        setting[key].templateSize = `repeat(auto-fit, ${this.getWidth(setting[key].name)}rem)`;
      });
    },
    mobileResponsive() {
      if (window.innerWidth <= this.MAX_WIDTH) {
        window.removeEventListener('resize', window);
        window.addEventListener('resize', this.pcResponsive);

        this.popularSection = {
          ...this.popularSection,
          padding: '1rem 1.25rem',
          size: 180,
        };
        this.gridSetting.discoverSection.size = 140;
        this.filterSize = 'btn-md-2';
        setTimeout(() => { this.calcGridTemplateSize(); }, 400);
      }
    },
    pcResponsive() {
      if (window.innerWidth > this.MAX_WIDTH) {
        window.removeEventListener('resize', window);
        window.addEventListener('resize', this.mobileResponsive);

        this.popularSection = {
          ...this.popularSection,
          padding: '1.25rem 1.875rem',
          size: 220,
        };
        this.gridSetting.discoverSection.size = 190;
        this.filterSize = 'btn-lg';
        setTimeout(() => { this.calcGridTemplateSize(); }, 400);
      }
    },
    getWidth(className) {
      const dom = document.querySelector(`.${className}`);
      const width = dom.clientWidth || dom.width;
      return width / 16;
    },
    toogleFilterBtn(index) {
      this.filterBtn[this.activeFilterIndex].isActive = false;
      this.filterBtn[index].isActive = true;
      this.activeFilterIndex = index;
    },
  },
};
</script>

<style scoped>
.container {
  overflow-anchor: none;
}

.banner-container {
  display: flex;
  height: 27.5rem;
  margin-bottom: 2rem;
}

.banner-bg {
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  z-index: -1;
}

.banner-title-and-searchbar {
  left: 50%;
  margin-top: 2.5rem;
  position: absolute;
  transform: translateX(-13.5%);
}

.banner-title {
  font-size: 3.6rem;
  font-weight: 800;
  margin-bottom: 4rem;
  text-align: center;
  width: 0;
}

.index-hero {
  margin-left: 7.5rem;
  margin-top: -1rem;
  opacity: 1;
}

.mobile-search-btn {
  margin-top: 1.25rem;
  opacity: 0;
  width: 100%;
}

.popular-box {
  display: flex;
  margin-right: -2.4rem;
  overflow-x: scroll;
  scrollbar-width: none;
}

.popular-box::-webkit-scrollbar {
  width: 0;
}

.popular-product-card {
  margin-right: 2rem;
}

.discover-product-card {
  margin-top: 0.3rem;
}

.gridbox {
  display: grid;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
}

.discover-gridbox {
  grid-gap: 1.25rem;
  grid-row-gap: 5rem;
}

.seller-gridbox {
  grid-gap: 4rem;
  grid-row-gap: 3rem;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

.filter-btn {
  margin-bottom: 0.6rem;
  margin-right: 1.2rem;
}

.filter-btn-active {
  background-color: #586dc2;
  color: #fff;
  transition: all 0s;
}

.load-more-btn {
  margin: auto auto;
  margin-top: 3.5rem;
}

@media (max-width: 90em) {
  .banner-bg {
    max-width: 90%;
    opacity: 0.1;
  }

  .index-hero {
    margin-left: 50%;
    opacity: 0.1;
    transform: translateX(-50%);
  }

  .banner-title-and-searchbar {
    transform: translate(-50%);
  }

  .banner-title {
    width: 100%;
  }
}

@media (max-width: 70em) {
  .popular-box {
    margin-right: 0;
  }
}

@media (max-width: 62.5em) {
  .discover-gridbox {
    grid-row-gap: 3rem;
    max-height: 48.5rem;
  }

  .seller-gridbox {
    grid-row-gap: 2.5rem;
    max-height: 23.5rem;
  }
}

@media (max-width: 54em) {
  .filter-container {
    margin-right: -0.6rem;
  }

  .filter-btn {
    margin-right: 0.6rem;
  }
}

@media (max-width: 40em) {
  .banner-title {
    font-size: 8.5vw;
    margin-bottom: 6.5vw;
  }

  .mobile-search-btn {
    opacity: 1;
    position: inherit;
  }
}

@media (max-width: 34em) {
  .tabs {
    width: 100% !important;
  }

  .fixed {
    width: 100% !important;
  }
}
</style>
