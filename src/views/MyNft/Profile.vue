<template>
  <BaseFrame />
  <div class="section">
    <BaseNavigationTab
      :list="profileOption"
      :width="10.6"
    />
    <OnSale v-show="visibleSale" />
    <Created v-show="visibleCreated" />
  </div>
</template>
<script>
import BaseFrame from './BaseFrame.vue';
import OnSale from '../../components/MyNft/OnSale.vue';
import Created from '../../components/MyNft/Created.vue';

export default {
  name: 'Profile',
  components: { BaseFrame, OnSale, Created },
  data() {
    return {
      visibleSale: true,
      visibleCreated: false,
      profileOption: [
        {
          name: this.$t('profile.onsale'),
          handler: () => {
            this.visibleSale = true;
            this.visibleCreated = false;
          },
        },
        {
          name: this.$t('profile.owned'),
          handler: () => { console.log('owned'); },
        },
        {
          name: this.$t('profile.created'),
          handler: () => {
            this.visibleSale = false;
            this.visibleCreated = true;
          },
        },
      ],
      discoverList: Array(5).fill({
        avatar: 'avatar.png',
        author: 'Otha Davis III',
        image: 'image.png',
        name: 'Crypto Mask',
        price: 67.456,
        verified: true,
      }),
    };
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
