<template>
  <div
    class="container"
  >
    <div class="discover-banner">
      <div class="discover-title-and-searchbar">
        <h1 class="discover-title">
          {{ $t('discover_screen.title') }}
        </h1>
        <SearchBar
          class="searchbar"
          :search-value="searchValue"
          :width="36.25"
          @click="handleSearch($event)"
        />
      </div>
      <img
        class="discover-hero"
        src="@img/discover-hero.png"
      >
    </div>
    <DiscoverSection
      ref="discover-section"
      :number="25"
      :title="title"
      :underlined="isUnderline"
    />
  </div>
</template>

<script>
import SearchBar from '@/components/Index/SearchBar.vue';
import DiscoverSection from '@/components/Discover/DiscoverSection.vue';

/**
 *  In order to show the NFT item greatly, I designed three layer, which is
 *  Discover -> DiscoverSection -> ProductGridBox.
 *
 *  Discover: focus on searching (interacts with SearchBar)
 *  searching cache would be store here (prototype, may put it to Vuex if acceptable)
 *
 *  DiscoverSection: focus on sorting (interacts with BaseNavigationTab)
 *  Landing Page can reuse this components
 *
 *  ProductGridBox: focus on filtering (interacts with FilterList)
 *  Profile Page can reuse this components
 *
 *  It may have a bit tortuous to passing searching data to ProductGridBox, but it follows SRP.
 *  (better maintaining + readable)
 *
 */

export default {
  name: 'Discover',
  components: { SearchBar, DiscoverSection },
  data() {
    return {
      searchValue: null,
      searchingCache: {},
    };
  },
  computed: {
    title() {
      return this.searchValue
        ? this.$t('discover_screen.search_result', [this.searchValue])
        : this.$t('index_screen.title.discover');
    },
    isUnderline() {
      return !this.searchValue;
    },
  },
  activated() {
    this.searchValue = this.$route.params?.searchValue;
    // this.handleSearch(this.searchValue);
  },
  methods: {
    handleSearch(value) {
      this.searchValue = value;
      this.$refs['discover-section'].gridbox.search(value);
    },
  },
};
</script>

<style scoped>
.container {
  overflow-anchor: none;
}

.discover-banner {
  background-image: url('~@img/banner-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 1rem;
  display: flex;
  height: calc((-4 / 27) * 100vw + (1300px / 3));
  margin-bottom: 4.375rem;
  max-width: 73.75rem;
  min-height: 13.75rem;
  min-width: 0;
}

.discover-title-and-searchbar {
  align-items: center;
  display: flex;
}

.discover-hero {
  margin-left: 44rem;
  margin-top: -1.2rem;
  position: absolute;
  z-index: 1;
}

.discover-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
  margin-left: 6.25rem;
  width: 18rem;
  z-index: 2;
}

.searchbar {
  margin-left: 5.25rem;
  z-index: 2;
}

@media (max-width: 90em) {
  .discover-title-and-searchbar {
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
  }

  .discover-title {
    margin-left: 0;
    margin-top: 2rem;
    text-align: center;
  }

  .discover-hero {
    margin-left: calc(100vw - (740.51px));
    margin-top: calc((-0.15) * 100vw + (192.26px));
  }

  .searchbar {
    margin-left: 0;
  }
}

@media (max-width: 70em) {
  .discover-banner {
    margin-left: -3rem;
    min-width: 106vw;
    transition: margin-left 0s, min-width 0.5;
  }

  .discover-hero {
    margin-left: calc((0.79) * 100vw - (248.39px));
  }

  .discover-title {
    margin-top: 4.5rem;
  }
}

@media (max-width: 40em) {
  .discover-title {
    font-size: 1.375rem;
    width: 16rem;
  }
}
</style>
