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
    if (response) {
      result = response.map((item) => {
        // eslint-disable-next-line no-underscore-dangle
        const nft = item._nfts || item;
        const newData = {
          // eslint-disable-next-line no-underscore-dangle
          id: nft._id,
          name: nft.title,
          // eslint-disable-next-line no-underscore-dangle
          price: nft.price || nft.bid?.highest_bid || nft.minimum_bid,
          image: `https://ipfs.io/ipfs/${nft.uri}`,
          author: nft.creator?.display_name || '',
          avatar: nft.creator?.image?.replace('http://', 'https://') || '',
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
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$global = GLOBAL_FUNCTION;
  },
};
