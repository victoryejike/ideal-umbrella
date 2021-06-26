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
          :width="36.25"
          @click="updateGridBox($event)"
        />
      </div>
      <img
        class="discover-hero"
        src="@img/discover-hero.png"
      >
    </div>
    <DiscoverSection
      :number="25"
      :title="title"
      :underlined="isUnderline"
    />
  </div>
</template>

<script>
import SearchBar from '@/components/Index/SearchBar.vue';
import DiscoverSection from '@/components/Discover/DiscoverSection.vue';

export default {
  name: 'Discover',
  components: { SearchBar, DiscoverSection },
  data() {
    return {
      searchValue: null,
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
  created() {
    this.searchValue = this.$route.query.value;
  },
  methods: {
    updateGridBox(value) {
      this.searchValue = value;
      if (this.$route.query.value) {
        this.$router.replace({ query: null });
      }
    },
  },
};
</script>

<style scoped>

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
