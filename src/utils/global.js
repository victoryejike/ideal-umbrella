import DefaultAvatar from '@img/default-avatar.png';
import store from '@/store';
import i18n from '@/utils/i18n';

const $t = i18n.global.t;

const GLOBAL_FUNCTION = {
  /**
   * All the avatar IMG tag should add this function to handle error display.
   * example: :onerror="$global.handleAvatarError"
   *
   * JavaScript default error event
   * @param  {object} event
   */
  handleAvatarError(event) {
    const { target } = event;
    target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
  },

  /**
   * All the avatar IMG tag should add this function to handle default avatar image
   * and dead link image. (Temporary)
   *
   * Avatar link
   * @param  {string|undefined} url
   */
  handleAvatarURL(url) {
    return (typeof url === 'string') ? url.replace('http://', 'https://') : DefaultAvatar;
  },

  /**
   * Handle media query using JavaScript.
   *
   * Same as CSS max-width, em unit.
   * @param  {number} maxWidth
   * If window size larger then the maxWidth, this function will be executed
   * @param  {function} pcProperties
   * If window size lower or equal then the maxWidth, this function will be executed
   * @param  {function} mobileProperties
   */
  handleResponsive(maxWidth, pcProperties, mobileProperties) {
    const responsiveAction = (mediaQuery) => {
      if (mediaQuery.matches) {
        mobileProperties();
      } else {
        pcProperties();
      }
    };
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}em)`);
    responsiveAction(mediaQuery);
    mediaQuery.addEventListener('change', responsiveAction);
  },

  /**
   * Handle data format from backend since it is incompatible to frontend.
   *
   * Should be a Axios response get from backend
   * @param  {obejct} response
   */
  translateNFTDetails(response) {
    let result = [];
    if (response && response.length > 0) {
      result = response.map((item) => {
        // eslint-disable-next-line no-underscore-dangle
        const nft = item._nfts || item;
        const newData = {
          // eslint-disable-next-line no-underscore-dangle
          id: nft._id,
          name: nft.title,
          tokenId: nft.tokenId,
          tokenType: nft.collectible_type,
          // eslint-disable-next-line no-underscore-dangle
          price: nft.price || nft.bid?.highest_bid || nft.minimum_bid,
          image: `https://ipfs.io/ipfs/${nft.uri}`,
          market_visibility: nft.market_visibility,
          author: nft.creator?.display_name,
          avatar: nft.creator?.image,
          verified: nft.creator?.is_kyc_verified || false,
          period: null,
        };

        if (nft.pricing_type === 'timed_auction' && nft.starting_date && nft.expiration_date) {
          newData.period = {
            start: nft.starting_date,
            end: nft.expiration_date,
          };
        }
        return newData;
      });
    }
    return result;
  },

  /**
   * Check whether the user installed or enable the broswer wallet or not.
   * Note: if the wallet only locked, isWalletConnected() will return true
   */
  async isWalletConnected() {
    return new Promise((resolve) => {
      const tid = setInterval(() => {
        // window.ethereum is undefined if document state is not complete
        if (document.readyState === 'complete') {
          clearInterval(tid);
          if (window.ethereum == null) {
            store.$toast.error($t('global.no_metamask'));
          }
          resolve(window.ethereum != null);
        }
      }, 200);
    });
  },

  // const addressStorage = () => {

  // }

  /**
   * Check whether the wallet has address or not, you should check isWalletConnected()
   * first before checking isAddressExist()
   */
  async isAddressExist() {
    const eth = window.ethereum;
    if (eth?.selectedAddress == null) {
      try {
        // If there are already has a queuing request, then eth will throw error with code -32002
        await eth.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        store.$toast.error(error.code === -32002 ? $t('global.already_has_request') : $t('global.no_metamask'));
        return false;
      }
    }
    return true;
  },

  /**
   * An Observer that watching user current network/chain.
   */
  async detectingChain() {
    if (await this.isWalletConnected()) {
      // Since the observer will not trigger when the user visit the site, so we have to check it
      store.commit('data/setIsWrongChain', window.ethereum?.chainId !== process.env.VUE_APP_ETH_CHAIN_ID);
      // Prevent creating multiple observer
      if (!store.getters['data/isMonitoringChain']) {
        store.commit('data/setIsMonitoringChain', true);
        window.ethereum.on('chainChanged', (chainId) => {
          store.commit('data/setIsWrongChain', chainId !== process.env.VUE_APP_ETH_CHAIN_ID);
        });
      }
      return true;
    }
    return false;
  },
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$global = GLOBAL_FUNCTION;
  },
};
