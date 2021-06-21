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
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$global = GLOBAL_FUNCTION;
  },
};
