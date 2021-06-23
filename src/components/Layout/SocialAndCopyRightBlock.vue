<template>
  <div class="social-and-copyright-root">
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
.social-and-copyright-root {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.social-media {
  align-items: center;
  display: flex;
  margin-right: -2.5rem;
  margin-top: 2.5rem;
}

.social-media-icons {
  margin-right: 2.5rem;
}

.copyright-text {
  color: #c4c4c4;
  margin-right: 1rem;
  margin-top: 2.5rem;
  white-space: normal;
}
</style>
