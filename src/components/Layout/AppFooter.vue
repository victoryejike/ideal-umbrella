<template>
  <footer>
    <div class="logo-and-links-div">
      <div class="logo-language-container">
        <img
          height="24"
          width="102"
          src="@svg/logo-white.svg"
        >
        <BaseScrollableSelectBox
          class="select-language"
          :width="14"
          :options="languageList"
        />
      </div>

      <div class="links-group-container">
        <div
          v-for="(column, columnIndex) in links"
          :key="columnIndex"
          class="links-group"
        >
          <div class="links-header">
            {{ column.header }}
          </div>
          <div
            v-for="(link, contentIndex) in column.content"
            :key="contentIndex"
            class="links-div"
          >
            <router-link
              class="links"
              :to="link.url"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright-and-social-div">
      <p class="copyright-text">
        ©2021 Naffiti by Huobi. All rights reserved
      </p>
      <div class="social-media">
        <a href="">
          <img
            class="social-media-icons"
            src="@svg/facebook.svg"
          >
        </a>
        <a href="">
          <img
            class="social-media-icons"
            src="@svg/instagram.svg"
          >
        </a>
        <a href="">
          <img
            class="social-media-icons"
            src="@svg/youtube.svg"
          >
        </a>
        <a href="">
          <img
            class="social-media-icons"
            src="@svg/twitter.svg"
          >
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import BaseScrollableSelectBox from '@/components/UI/BaseScrollableSelectBox.vue';

export default {
  name: 'AppFooter',
  components: { BaseScrollableSelectBox },
  data() {
    return {
      languageList: ['English', 'Chinese', 'Japanese', 'Korean'],
      links: [
        {
          header: 'NFT Marketplace',
          content: [
            { name: 'Discover', url: '/' },
            { name: 'Create NFT', url: '/' },
            { name: 'My Profile', url: '/' },
            { name: 'Wallet', url: '/' },
            { name: 'How it works', url: '/' },
          ],
        },
        {
          header: 'Fanschain',
          content: [
            { name: 'Exchange', url: '/' },
            { name: 'Fan Token Offering', url: '/' },
            { name: 'Community', url: '/' },
          ],
        },
        {
          header: 'Legal',
          content: [
            { name: 'Terms', url: '/' },
            { name: 'Privacy Policy', url: '/' },
            { name: 'Insider Trading Policy', url: '/' },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>

footer {
  background: #2c43ad;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 5rem 8rem 2.5rem 8rem;
}

.logo-and-links-div {
  display: flex;
  flex-direction: column column;
  justify-content: space-between;
  margin-bottom: 5rem;
}

.copyright-and-social-div {
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
}

.select-language {
  margin-top: 4rem;
}

.copyright-text {
  white-space: nowrap;
}

.links-group-container {
  display: flex;
}

.links-group {
  width: 12.5rem;
}

.links-header {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
}

.links-div {
  font-weight: 600;
  line-height: 2rem;
}

.links {
  color: #c4c4c4;
}

.social-media {
  align-items: center;
  display: flex;
}

.social-media-icons {
  margin-right: 2.5rem;
}

</style>
