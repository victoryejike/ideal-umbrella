<template>
  <IndexSection
    :title="title"
  >
    <template #right>
      <BaseNavigationTab
        :list="topSellerTab"
        :mobile-max-width="38"
        :style="{'pointer-events':(isLoading) ? 'none': 'auto'}"
        :width="9.4"
      />
    </template>
    <template #content>
      <div
        v-if="!isLoading && activeSellerList.length > 0"
        class="seller-gridbox"
      >
        <AuthorBlock
          v-for="(item, index) in activeSellerList"
          :key="index"
          :author="item.author"
          :avatar="item.avatar"
          class="seller-block"
          :total-coin="item.totalCoin"
          :verified="item.verified"
        />
      </div>
      <div
        v-if="!isLoading && activeSellerList.length === 0"
        class="no-content"
      >
        {{ $t(`index_screen.no_content.${sortMethod}`) }}
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
</template>

<script>
import IndexSection from '@/components/Index/IndexSection.vue';
import AuthorBlock from '@/components/Index/AuthorBlock.vue';

export default {
  name: 'TopSellerSection',
  components: { IndexSection, AuthorBlock },
  props: {
    title: { type: String, required: true },
  },
  data() {
    return {
      topSellerTab: [
        {
          name: this.$t('index_screen.seller_tab.day'),
          handler: () => { this.sortData('day'); },
        },
        {
          name: this.$t('index_screen.seller_tab.week'),
          handler: () => { this.sortData('week'); },
        },
        {
          name: this.$t('index_screen.seller_tab.month'),
          handler: () => { this.sortData('month'); },
        },
      ],
      topSellerList: {
        day: [],
        week: [],
        month: [],
      },
      sortMethod: 'day',
      isLoading: true,
    };
  },
  computed: {
    activeSellerList() { return this.topSellerList[this.sortMethod]; },
  },
  mounted() {
    this.sortData('day');
  },
  methods: {
    async sortData(method) {
      this.isLoading = true;
      this.sortMethod = method;
      if (this.activeSellerList.length === 0) {
        const response = await this.$api.GET_TOP_SELLERS(method);
        if (response && response?.length > 0) {
          const matchKeyResponse = response.map((item) => {
          // eslint-disable-next-line no-underscore-dangle
            const seller = item._users;
            return {
              avatar: seller.image,
              author: seller.display_name,
              totalCoin: item.sum,
              verified: seller.is_kyc_verified,
            };
          });
          this.activeSellerList.push(...matchKeyResponse);
        }
        this.isLoading = false;
      } else {
        setTimeout(() => {
          this.isLoading = false;
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.seller-gridbox {
  display: grid;
  grid-column-gap: 4rem;
  grid-row-gap: 3rem;
  grid-template-columns: repeat(auto-fit, 14.625rem);
  overflow: hidden;
}

@media (max-width: 62.5em) {
  .seller-gridbox {
    grid-row-gap: 2.5rem;
    max-height: 23.5rem;
  }
}

@media (max-width: 37.1875em) {
  .seller-gridbox {
    justify-content: space-around;
  }
}
</style>
