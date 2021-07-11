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
          @search="handleSearch"
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
            :id="item.id"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            class="popular-product-card"
            :coin-type="item.coinType"
            :css="popularCardCSS"
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
          :mobile-max-width="38"
          :width="9.4"
        />
      </template>
      <template #content>
        <div
          class="seller-gridbox"
        >
          <AuthorBlock
            v-for="(item, index) in topSellerList"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            class="seller-block"
            :coin-type="item.coinType"
            :total-coin="item.totalCoin"
            :verified="item.verified"
          />
        </div>
      </template>
    </IndexSection>
    <DiscoverSection :title="$t('index_screen.title.discover')" />
  </div>
</template>

<script>
import AuthorBlock from '@/components/Index/AuthorBlock.vue';
import IndexSection from '@/components/Index/IndexSection.vue';
import SearchBar from '@/components/Index/SearchBar.vue';
import DiscoverSection from '@/components/Discover/DiscoverSection.vue';

export default {
  name: 'Index',
  components: {
    AuthorBlock, IndexSection, SearchBar, DiscoverSection,
  },
  data() {
    // TODO: Fake data to real data
    return {
      popularList: [],
      topSellerList: [],
      sellerTab: [
        this.$t('index_screen.seller_tab.day'),
        this.$t('index_screen.seller_tab.week'),
        this.$t('index_screen.seller_tab.month'),
      ],
      popularCardCSS: { bgColor: 'rgba(255, 255, 255, 0.25)' },
    };
  },
  async mounted() {
    this.$global.handleResponsive(62.5,
      () => {
        this.popularCardCSS.padding = '1.25rem 1.875rem';
        this.popularCardCSS.size = 220;
      },
      () => {
        this.popularCardCSS.padding = '1rem 1.25rem';
        this.popularCardCSS.size = 180;
      });

    this.$api.GET_POPULAR_NFT().then((response) => {
      if (response.length > 0) {
        const matchKeyResponse = response.map((item) => ({
        // eslint-disable-next-line no-underscore-dangle
          id: item._id,
          name: item.title,
          price: item.price || item.bid?.highest_bid || item.minimum_bid,
          image: `https://ipfs.io/ipfs/${item.uri.replace('ipfs://', '')}`,
          author: item.creator?.name || item.creator?.display_name,
          avatar: item.creator?.image,
          verified: item.creator?.is_kyc_verified,
        }));
        this.popularList.push(...matchKeyResponse);
      }
    });

    // this.$api.GET_TOP_SELLERS().then((response) => {
    //   if (response.length > 0) {
    //     // eslint-disable-next-line camelcase
    //     const matchKeyResponse = response.map(({ _top_sellers }) => ({
    //       avatar: _top_sellers.image,
    //       author: _top_sellers.name || _top_sellers.display_name,
    //       totalCoin: Math.random() * 800 + 100,
    //       verified: _top_sellers.is_kyc_verified,
    //     }));
    //     this.topSellerList.push(...matchKeyResponse);
    //   }
    // });

    for (let i = 0; i < 8; i += 1) {
      this.topSellerList.push({
        avatar: `https://i.pravatar.cc/64?img=${Math.floor(Math.random() * 70) + 1}`,
        author: `Author ${Math.random().toString(20).substr(2, 13)}`,
        totalCoin: Math.random() * 1e5 + 1e4,
        coinType: 0, // Math.floor(Math.random() * 3),
        verified: Math.random() > 0.5,
      });
    }
  },
  methods: {
    handleSearch(value) {
      this.$router.push({ name: 'Discover' });
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
  white-space: nowrap;
  width: 0;
}

.index-hero {
  margin-left: 7.5rem;
  margin-top: -1rem;
  opacity: 1;
}

.popular-box {
  display: flex;
  overflow: hidden;
}

.popular-product-card {
  margin-bottom: 1.25rem;
  margin-right: 1.25rem;
}

.seller-gridbox {
  display: grid;
  grid-column-gap: 4rem;
  grid-row-gap: 3rem;
  grid-template-columns: repeat(auto-fit, 14.625rem);
  justify-content: space-around;
  overflow: hidden;
}

.load-more-btn {
  margin: auto auto;
  margin-top: 3.5rem;
}

@media (max-width: 90em) {
  .popular-box {
    overflow-x: scroll;
  }

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
  .discover-section {
    max-height: 67rem;
    overflow: hidden;
  }

  .seller-gridbox {
    grid-row-gap: 2.5rem;
    max-height: 23.5rem;
  }
}

@media (max-width: 40em) {
  .banner-title {
    font-size: 8.5vw;
    margin-bottom: 6.5vw;
  }
}

@media (max-width: 37.1875em) {
  .seller-gridbox {
    justify-content: space-between;
  }
}
</style>
