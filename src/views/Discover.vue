<template>
  <div class="container">
    <div class="discover-banner">
      <img
        class="discover-hero"
        src="@img/discover-hero.png"
      >
      <h1 class="discover-title">
        {{ $t('discover_screen.title') }}
      </h1>
      <SearchBar
        class="searchbar"
        :width="36.25"
        @click="updateGridBox($event)"
      />
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
  background-position: left;
  display: flex;
  height: 13.75rem;
  margin-bottom: 4.375rem;
  max-width: 73.75rem;
}

.discover-hero {
  margin-bottom: 1.25rem;
  margin-left: 44.25rem;
  position: absolute;
  z-index: 1;
}

.discover-title {
  font-size: 2rem;
  font-weight: bold;
  margin-left: 6.25rem;
  white-space: normal;
  width: 18rem;
  z-index: 2;
}

.searchbar {
  margin-left: 5.25rem;
  z-index: 2;
}
</style>
