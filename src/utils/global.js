import router from '@/router';

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
   *  Fake data function, should be removed in production stage / integrated API
   */
  async getFakeData(total, sortMethod = 'popular', activeIndex = 5) {
    const randomStr = (length, str = '') => {
      let result = str;
      result += Math.random().toString(20).substr(2, length);
      if (str.length > length) return result.slice(0, length);
      return randomStr(length, result);
    };
    const result = [];
    const filter = ['art', 'music', 'sport', 'photo', 'collect', 'random'];
    const images = await router.$api.FAKE_DATA('image', Math.floor(Math.random() * 39) + 1);
    for (let i = 0; i < total; i += 1) {
      result.push({
        id: randomStr(36),
        avatar: `https://i.pravatar.cc/64?img=${Math.floor(Math.random() * 70) + 1}`,
        author: `Author ${randomStr(10)}`,
        image: images[i % 25].download_url,
        name: `${sortMethod}_${filter[activeIndex]}_${randomStr(10)}`,
        price: Math.random() * 60 + 5,
        coinType: 0, // Math.floor(Math.random() * 3)
        verified: Math.random() > 0.5,
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
