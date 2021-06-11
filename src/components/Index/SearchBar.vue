<template>
  <div
    class="searchbar-container"
    :style="{width: `${width}rem`}"
  >
    <div class="padding">
      <img src="@svg/search.svg">
      <input
        class="search-input"
        :placeholder="$t('components.search_placeholder')"
        type="text"
      >
      <BaseRoundButton
        class="search-btn btn-primary btn-lg btn-bold"
        :text="$t('components.search')"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseSearchBar',
  props: {
    width: { type: Number, required: true },
  },
};
</script>

<style scoped>
.searchbar-container {
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
  color: #000;
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
  text-overflow: ellipsis;
}

.search-btn {
  margin-left: auto;
  opacity: 1;
  position: inherit;
}

@media (max-width: 40em) {
  .search-btn {
    left: -9999rem;
    opacity: 0;
    position: absolute;
    top: -9999rem;
  }

  .searchbar-container {
    width: 80vw !important;
  }
}

</style>
