<template>
  <!-- <div class="share">
    <a id="share">Share: </a>
    <div class="platform">
      <img
        src="@/assets/svg/fb.svg"
        width="25"
      >
      <div class="p2">
        <a
          class="p2"
          :href="'https://www.facebook.com/sharer/sharer.php?u='+ href"
          target="_blank"
        >Facebook</a>
      </div>
    </div>
    <div class="platform">
      <img
        src="@/assets/svg/tweet.svg"
        width="25"
      >
      <div class="p2">
        <a
          :href="'http://twitter.com/share?url='+ href"
          target="_blank"
        >
          Twitter
        </a>
      </div>
    </div>
    <div class="platform">
      <img
        src="@/assets/svg/share.svg"
        width="25"
      >
      <div class="p2">
        <a
          class="copy"
          @click="copyURL"
        >
          Copy Link
        </a>
      </div>
    </div>
  </div> -->
  <div class="profile-actions">
    <router-link to="/account/profile/edit">
      <BaseRoundButton
        class="btn-outline-primary btn-sm action"
        :text="$t('profile.edit_profile')"
      />
    </router-link>
    <BaseRoundButton
      class="btn-outline-primary btn-sm action p1"
      :text="$t('profile.share')"
      @click="copyURL"
    />
  </div>
</template>

<script>

export default {
  name: 'Share',
  data() {
    return {
      href: window.location.href,
    };
  },
  methods: {
    copyURL() {
      console.log(1);
      navigator.clipboard.writeText(this.href);
      this.$toast.success('Profile Link Copied Successfully');
    },
  },
};
</script>

<style scoped>
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

  /* .share {
    max-width: 27rem;
    border: 1px solid rgba(44, 67, 173, 0.25);
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.25);
    margin: 2rem auto;
    display: flex;
    padding: 0.5rem;
  }
  #share {
    margin-top: 0.2rem;
  }
  .share a {
    color: #5D6EC2;
    font-size: 0.9rem;
    margin-left: 1rem;
  }
  .copy {
    cursor: pointer;
  }
  .platform {
    margin-left: 0.9rem;
    display: flex;
  }
  .p2 {
    padding: 2px;
  }
  @media only screen and (max-width: 520px) {
    .share {
      display: none;
    }
  } */
</style>
