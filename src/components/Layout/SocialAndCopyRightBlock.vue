<template>
  <div class="copyright-and-social-div">
    <div class="copyright-text">
      ©2021 Naffiti by Huobi. All rights reserved
    </div>
    <div class="social-media">
      <a
        v-for="(item, index) in socialMediaList"
        :key="index"
        :href="item.url"
      >
        <img
          class="social-media-icons"
          height="20"
          :src="item.icon"
          width="24"
        >
      </a>
    </div>
  </div>
</template>

<script>
import Facebook from '@svg/facebook.svg';
import Instagram from '@svg/instagram.svg';
import Youtube from '@svg/youtube.svg';
import Twitter from '@svg/twitter.svg';

export default {
  name: 'SocialAndCopyRightBlock',
  data() {
    return {
      socialMediaList: [
        {
          icon: Facebook,
          url: '#',
        },
        {
          icon: Instagram,
          url: '#',
        },
        {
          icon: Youtube,
          url: '#',
        },
        {
          icon: Twitter,
          url: '#',
        },
      ],
    };
  },
};
</script>

<style scoped>
.copyright-and-social-div {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.social-media {
  align-items: center;
  display: flex;
  margin-right: -2.5rem;
  margin-top: 0;
}

.social-media-icons {
  margin-right: 2.5rem;
}

.copyright-text {
  margin-right: 1rem;
  margin-top: 0;
}

@media (max-width: 70em) {
  .social-media {
    margin-top: 2.5rem;
  }

  .copyright-text {
    margin-top: 2.5rem;
  }
}
</style>
