<template>
  <div>
    <BaseFrame
      :profile="profile"
      :username="username"
    />
    <div class="section">
      <BaseNavigationTab
        :list="profileOption"
        :width="10.6"
      />
      <Owned v-show="visibleOnwed" />
      <OnSale v-show="visibleSale" />
      <Created v-show="visibleCreated" />
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
      username: '',
      profile: '',
      visibleOnwed: true,
      visibleSale: false,
      visibleCreated: false,
      profileOption: [
        {
          name: this.$t('profile.owned'),
          handler: () => {
            this.visibleOnwed = true;
            this.visibleSale = false;
            this.visibleCreated = false;
          },
        },
        {
          name: this.$t('profile.onsale'),
          handler: () => {
            this.visibleSale = true;
            this.visibleCreated = false;
            this.visibleOnwed = false;
          },
        },
        {
          name: this.$t('profile.created'),
          handler: () => {
            this.visibleSale = false;
            this.visibleCreated = true;
            this.visibleOnwed = false;
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
        const { data } = await this.$api.GET_PROFILE();
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        this.username = response?.data?.display_name || 'Chris Torres';
        this.profile = response?.data?.image;
      } else {
        //
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
