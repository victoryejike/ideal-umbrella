<template>
  <div
    class="searchbar-container"
    :style="{width: `${width}rem`}"
  >
    <div
      class="searchbar-bg"
      :style="{width: `${width}rem`}"
    >
      <div class="padding">
        <img src="@svg/search.svg">
        <input
          v-model="value"
          class="search-input"
          :placeholder="$t('components.search_placeholder')"
          type="text"
          @keyup.enter="handleSearch"
        >
        <BaseRoundButton
          class="search-btn btn-primary btn-lg btn-bold"
          :text="$t('components.search')"
          @click="handleSearch"
        />
      </div>
    </div>
    <BaseRoundButton
      class="mobile-search-btn btn-primary btn-lg btn-bold"
      :text="$t('components.search')"
      @click="handleSearch"
    />
  </div>
</template>

<script>

export default {
  name: 'SearchBar',
  props: {
    width: { type: Number, required: true },
  },
  emits: ['click'],
  data() {
    return {
      value: '',
    };
  },
  methods: {
    handleSearch() {
      this.$emit('click', this.value.trim());
    },
  },
};
</script>

<style scoped>
.searchbar-bg {
  background-color: #fff;
  border-radius: 2rem;
}

.padding {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding: 0.2rem 0.4rem 0.2rem 1rem;
}

.search-input {
  background-color: transparent;
  border: 0;
  flex-grow: 1;
  font-size: 1rem;
  margin: 1rem 1rem;
  outline: 0;
  width: 100%;
}

.search-input::placeholder {
  color: #c4c4c4;
  font-weight: bold;
  overflow: hidden;
}

.search-btn {
  margin-left: auto;
  opacity: 1;
  position: inherit;
}

.mobile-search-btn {
  left: -9999rem;
  opacity: 0;
  position: absolute;
  top: -9999rem;
  width: 100%;
}

@media (max-width: 40em) {
  .search-btn {
    left: -9999rem;
    opacity: 0;
    position: absolute;
    top: -9999rem;
  }

  .searchbar-container,
  .searchbar-bg {
    width: 80vw !important;
  }

  .mobile-search-btn {
    margin-top: 1.25rem;
    opacity: 1;
    position: inherit;
  }
}

</style>
