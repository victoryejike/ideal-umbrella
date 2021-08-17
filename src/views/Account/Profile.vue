<template>
  <div>
    <BaseFrame />
    <div class="section">
      <BaseNavigationTab
        :list="profileOption"
        :width="10.6"
      />
      <Owned v-show="tabStatus[0]" />
      <OnSale v-show="tabStatus[1]" />
      <Created v-show="tabStatus[2]" />
    </div>
  </div>
</template>
<script>
import OnSale from '@/components/MyNft/OnSale.vue';
import Owned from '@/components/MyNft/Owned.vue';
import Created from '@/components/MyNft/Created.vue';
import BaseFrame from '@/components/Profile/BaseFrame.vue';

export default {
  name: 'Profile',
  components: {
    BaseFrame, OnSale, Created, Owned,
  },
  data() {
    return {
      tabStatus: [true, false, false],
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
  methods: {
    toggleTab(index) {
      for (let i = 0; i < this.tabStatus.length; i += 1) {
        this.tabStatus[i] = i === index;
      }
    },
  },
};

</script>

<style scoped>
  .section {
    margin-top: 4rem;
  }

  .gridbox {
    display: grid;
    justify-content: space-between;
  }

  .card-gridbox {
    grid-gap: 1.25rem;
    grid-row-gap: 5rem;
  }

  .m-3 {
    margin-top: 4rem;
  }
</style>
