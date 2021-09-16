<template>
  <div class="container">
    <div class="top" />
    <div class="profile-div">
      <img
        v-if="profile.image"
        class="profile-img"
        :class="profile.image == null ? 'profile' : 'profile-border'"
        :onerror="$global.handleAvatarError"
        :src="profile.image"
      >
      <img
        v-else
        class="profile-img"
        :class="profile.image == null ? 'profile' : 'profile-border'"
        :onerror="$global.handleAvatarError"
        :src="$global.handleAvatarURL(avatar)"
      >
    </div>
    <div class="profile-details">
      <div
        class="username"
      >
        <h3>
          {{ profile.display_name }}
          <img
            v-if="$store.getters['auth/isVerified']"
            src="@svg/tick.svg"
            width="12"
          >
        </h3>
      </div>
      <div
        class="wallet-address"
      >
        <span
          v-if="account !== null"
          class="address"
        >
          {{ account.replace(account.substring(5,34), "*******") }}
        </span>
      </div>
      <!-- <div class="profile-actions">
        <router-link to="/account/profile/edit">
          <BaseRoundButton
            class="btn-outline-primary btn-sm action"
            :text="$t('profile.edit_profile')"
          />
        </router-link>
        <BaseRoundButton
          class="btn-outline-primary btn-sm action p1"
          :text="$t('profile.share')"
        />
      </div> -->
      <Share />
    </div>
  </div>
</template>

<script>
import Share from './Share.vue';

export default {
  name: 'ProfileBaseframe',
  components: {
    Share,
  },
  data() {
    return {
      account: this.$route.params.walletAddress,
      profile: [],
    };
  },
  computed: {
    // avatar() {
    //   return this.$store.getters['auth/avatar'];
    // },
  },
  async mounted() {
    const profile = await this.$api.GET_PROFILE(this.$route.params.walletAddress);
    this.profile = profile.data.data;
    console.log(this.profile);
  },
};
</script>

<style scoped>
.address {
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 0.6rem;
}

.wallet-address {
  margin-bottom: 1rem;
  margin-top: -1rem;
  cursor: pointer;
}

.top {
  background-image: url("~@img/banner-bg.png");
  border-radius: 0.625rem;
  padding: 5rem;
}

.profile-div {
  margin: -6rem auto;
  text-align: center;
}

.profile-img {
  border-radius: 22.5rem;
  height: 6.25rem;
  object-fit: cover;
  width: 6.25rem;
}

.profile-border {
  border: 0.1875rem solid #fff;
}

.profile-details {
  margin-top: 8rem;
  text-align: center;
}

.share {
  text-align: center;
}

.share img {
  margin: 1rem;
}

.verified {
  background: #2c43ad;
  border-radius: 22.5rem;
  height: 0.8rem;
  width: 0.8rem;
}

.username h3 {
  font-size: 2rem;
}

.profile-actions {
  display: flex;
  justify-content: center;
}

.action {
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0.3125rem;
}

.p1 {
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  height: fit-content;
}

</style>
