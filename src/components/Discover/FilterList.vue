<template>
  <div
    v-if="filterBtn.length > 0"
    class="filter-container"
  >
    <BaseRoundButton
      v-for="(item, index) in filterBtn"
      :key="index"
      class="filter-btn btn-outline-secondary btn-lg btn-bold"
      :class="{'filter-btn-active': item.isActive}"
      :img="item.image"
      :text="item.category"
      @click="toogleFilterBtn(index)"
    />
  </div>
</template>

<script>

export default {
  name: 'FilterList',
  emits: ['selected'],
  data() {
    return {
      activeFilterIndex: 0,
      filterBtn: [],
    };
  },
  async created() {
    const categories = await this.$api.GET_FILTER_CATEGORIES();
    this.filterBtn = categories.map((item) => ({ ...item, isActive: false }));
    this.toogleFilterBtn(0);
  },
  methods: {
    toogleFilterBtn(index) {
      this.filterBtn[this.activeFilterIndex].isActive = false;
      if (index < this.filterBtn.length) {
        this.filterBtn[index].isActive = true;
        this.activeFilterIndex = index;
      }

      // eslint-disable-next-line no-underscore-dangle
      this.$emit('selected', { id: this.filterBtn[index]?._id, index });
    },
  },
};
</script>

<style scoped>
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

@media (max-width: 62.5em) {
  .btn-lg {
    padding: 0.6875rem 1.25rem;
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
</style>
