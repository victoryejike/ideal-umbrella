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
          v-if="!isLoading && popularList.length > 0"
          class="popular-box"
        >
          <BaseProductCard
            v-for="(item, index) in popularList"
            :id="item.id"
            :key="index"
            :assetType="item.assetType"
            :author="item.author"
            :avatar="item.avatar"
            class="popular-product-card"
            :css="popularCardCSS"
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :verified="item.verified"
          />
        </div>
        <div
          v-if="!isLoading && popularList.length === 0"
          class="no-content"
        >
          {{ $t('index_screen.popular_no_content') }}
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
      </template>
    </IndexSection>
    <TopSellerSection :title="$t('index_screen.title.top_seller')" />
    <DiscoverSection :title="$t('index_screen.title.discover')" />
  </div>
</template>

<script>
import IndexSection from '@/components/Index/IndexSection.vue';
import SearchBar from '@/components/Index/SearchBar.vue';
import TopSellerSection from '@/components/Index/TopSellerSection.vue';
import DiscoverSection from '@/components/Discover/DiscoverSection.vue';

export default {
  name: 'Index',
  components: {
    IndexSection, SearchBar, DiscoverSection, TopSellerSection,
  },
  data() {
    return {
      popularList: [],
      popularCardCSS: { bgColor: 'rgba(255, 255, 255, 0.25)' },
      isLoading: true,
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

    const response = await this.$api.GET_POPULAR_NFT();
    const matchKeyResponse = this.$global.translateNFTDetails(response);
    this.popularList.push(...matchKeyResponse);
    this.isLoading = false;
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

@media (max-width: 40em) {
  .banner-title {
    font-size: 8.5vw;
    margin-bottom: 6.5vw;
  }
}
</style>
