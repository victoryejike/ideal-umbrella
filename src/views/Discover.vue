<template>
  <div
    class="container"
  >
    <div class="discover-banner">
      <h1 class="discover-title">
        {{ $t('discover_screen.title') }}
      </h1>
      <SearchBar
        class="searchbar"
        :width="36.25"
        @click="updateGridBox($event)"
      />
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
  align-items: center;
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
  white-space: normal;
  width: 18rem;
  z-index: 2;
}

.searchbar {
  margin-left: 5.25rem;
  z-index: 2;
}

@media (max-width: 90em) {
  .discover-banner {
    flex-direction: column;
  }

  .discover-title {
    margin-left: 0;
    margin-top: 2rem;
    text-align: center;
  }

  .discover-hero {
    margin-right: calc((-0.95) * 100vw + (1372.29px));
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
    margin-right: calc((-0.59) * 100vw + (755.94px));
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
