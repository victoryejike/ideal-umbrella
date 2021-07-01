<template>
  <div>
    <BaseFrame />
    <div class="section">
      <BaseNavigationTab
        :list="profileOption"
        :width="10.6"
      />
      <OnSale v-show="visibleSale" />
      <Created v-show="visibleCreated" />
    </div>
  </div>
</template>
<script>
import OnSale from '@/components/MyNft/OnSale.vue';
import Created from '@/components/MyNft/Created.vue';
import BaseFrame from './BaseFrame.vue';

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
          handler: () => {},
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
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      let response = null;

      try {
        const { data } = await this.$api.GETPROFILE();
        response = data;
      } catch (error) {
        response = error.response.data;
      }

      if (response?.success) {
        console.log(response.data);
      } else {
        console.log(response.error);
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
