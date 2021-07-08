<template>
  <footer>
    <div class="logo-and-links-div">
      <div class="logo-language-container">
        <img
          height="24"
          src="@svg/logo-white.svg"
          width="102"
        >
        <BaseScrollableSelectBox
          ref="language-selectbox"
          class="select-language"
          :css="selectBoxCSS"
          key-name="key"
          name="currLang"
          :options="languageList"
          :value="getLocale"
          @selected="setLocale"
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
              v-if="link.url.startsWith('/')"
              class="links"
              :to="link.url"
            >
              {{ link.name }}
            </router-link>
            <a
              v-else
              class="links"
              :href="link.url"
              target="_blank"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <SocialAndCopyRightBlock />
  </footer>
</template>

<script>
import SocialAndCopyRightBlock from './SocialAndCopyRightBlock.vue';

export default {
  name: 'AppFooter',
  components: { SocialAndCopyRightBlock },
  data() {
    return {
      // ISO 639-1 two-letter codes
      languageList: [
        { name: 'English', key: 'en' },
        { name: '中文', key: 'zh' },
        { name: '日本語', key: 'jp' },
        { name: '한국어', key: 'ko' },
      ],
      selectBoxCSS: {
        activeColor: '#31459f',
        bgColor: '#374db1',
        borderColor: '#697ac5',
        hoverColor: '#31459f',
      },
      links: [
        {
          header: this.$t('footer.nft.title'),
          content: [
            { name: this.$t('footer.nft.discover'), url: '/discover' },
            { name: this.$t('footer.nft.create'), url: '/nft' },
            { name: this.$t('footer.nft.profile'), url: '/account/profile' },
            { name: this.$t('footer.nft.wallet'), url: '/wallet' },
            { name: this.$t('footer.nft.how_it_works'), url: '/' },
          ],
        },
        {
          header: this.$t('footer.fanschain.title'),
          content: [
            { name: this.$t('footer.fanschain.exchange'), url: 'http://fanschain.net' },
            { name: this.$t('footer.fanschain.fto'), url: '/' },
            { name: this.$t('footer.fanschain.community'), url: '/' },
          ],
        },
        {
          header: this.$t('footer.legal.title'),
          content: [
            { name: this.$t('footer.legal.terms'), url: '/' },
            { name: this.$t('footer.legal.privacy_policy'), url: '/' },
            { name: this.$t('footer.legal.trading_policy'), url: '/' },
          ],
        },
      ],
    };
  },
  computed: {
    getLocale() {
      return localStorage.getItem('lang');
    },
  },
  watch: {
    $route() {
      /*
        When user pull down the menu and forward to another page,
        the menu position is not correct since the position is absolute,
        so just set to FALSE when $route changed.
      */
      this.$refs['language-selectbox'].isPullDown = false;
    },
  },
  methods: {
    setLocale(lang) {
      this.$root.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
      this.$parent.reRenderUI();
      this.$router.smoothlyScroll();
    },
  },
};
</script>

<style scoped>

footer {
  background: #2c43ad;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.logo-and-links-div {
  display: flex;

  /* Fixing a mobile Safari bug (not going to wrap the links when refreshing) */
  flex: 1 1 auto;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.select-language {
  margin-top: 4rem;
}

.logo-language-container {
  margin-bottom: 4rem;
  margin-right: 4rem;
}

.links-group-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.links-group {
  margin-bottom: 2.5rem;
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

/* Here using 65 instead of 70 is to prevent links-group flickering when footer padding changed */

@media (max-width: 65em) {
  .logo-and-links-div {
    flex-wrap: wrap;
  }

  .links-group-container {
    flex-wrap: wrap;
  }
}

@media (max-width: 70em) {
  .links-group {
    width: 10.5rem;
  }
}

</style>
