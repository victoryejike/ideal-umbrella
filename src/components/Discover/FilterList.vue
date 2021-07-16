<template>
  <div class="filter-container">
    <BaseRoundButton
      v-for="(item, index) in categories"
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
      filterBtn: [
        { name: '🎨 Arts', isActive: true },
        { name: '🎵 Music', isActive: false },
        { name: '⚽ Sports', isActive: false },
        { name: '📸 Photography', isActive: false },
        { name: '💎 Collectibles', isActive: false },
      ],
      activeFilterIndex: 0,
      categories: [],
    };
  },
  async mounted() {
    try {
      const { data } = await this.$api.GETCATEGORIES();
      this.categories = data.data;
    } catch (error) {
      //
    }
  },
  methods: {
    toogleFilterBtn(index) {
      this.filterBtn[this.activeFilterIndex].isActive = false;
      if (index < this.filterBtn.length) {
        this.filterBtn[index].isActive = true;
        this.activeFilterIndex = index;
      }
      this.$emit('selected', index);
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
