<template>
  <div>
    <BaseFrame />
    <div class="profile-container">
      <BaseNavigationTab
        :list="profileOption"
        :width="10.6"
      />
      <div class="gridbox-root">
        <div
          class="gridbox"
        >
          <BaseProductCard
            v-for="(item, index) in activeList"
            :id="item.id"
            :key="index"
            :author="item.author"
            :avatar="item.avatar"
            class="gridbox-product-card"
            :css="cardCSS"
            :image="item.image"
            :name="item.name"
            :period="item.period"
            :price="item.price"
            :verified="item.verified"
          />
        </div>
        <NoNFT
          v-if="activeList?.length === 0"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BaseFrame from '@/components/Profile/BaseFrame.vue';
import NoNFT from '@/components/MyNft/NoNFT.vue';

export default {
  name: 'Profile',
  components: {
    BaseFrame, NoNFT,
  },
  data() {
    return {
      activeIndex: 0,
      cardCSS: { bgColor: null },
      nftList: [
        [], [], [],
      ],
      profileOption: [
        {
          name: this.$t('profile.owned'),
          handler: () => { this.toggleTab(0); },
        },
        {
          name: this.$t('profile.onsale'),
          handler: () => { this.toggleTab(1); },
        },
        {
          name: this.$t('profile.created'),
          handler: () => { this.toggleTab(2); },
        },
      ],
    };
  },
  computed: {
    activeList() { return this.nftList[this.activeIndex]; },
  },
  async mounted() {
    this.$global.handleResponsive(62.5,
      () => { this.cardCSS.size = 190; },
      () => { this.cardCSS.size = 140; });
    this.fetchData(this.activeIndex);
  },
  methods: {
    toggleTab(index) {
      this.activeIndex = index;
      if (this.activeList.length === 0) { this.fetchData(index); }
    },
    async fetchData(index) {
      switch (index) {
        case 0:
          return this.$api.GET_OWNED_NFT();
        case 1:
          return this.$api.GET_ONSALES_NFT();
        case 2:
          return this.$api.GET_CREATED_NFT();
        default:
          return null;
      }
    },
  },
};

</script>

<style scoped>
.profile-container {
  margin-top: 4rem;
}

.gridbox-root {
  margin-top: 2rem;
}

.gridbox {
  display: grid;
  grid-column-gap: 3.5rem;
  grid-row-gap: 5rem;
  grid-template-columns: repeat(auto-fit, 11.875rem);
  overflow: hidden;
}

.gridbox-product-card {
  margin-top: 0.5rem;
}

@media (max-width: 62.5em) {
  .gridbox {
    grid-template-columns: repeat(auto-fit, 8.75rem);
  }
}
</style>
