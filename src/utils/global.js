const globalFunction = {
  handleAvatarError(event) {
    const { target } = event;
    target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
  },
};

export default {
  install: (app, options) => {
    const { globalProperties } = app.config;
    globalProperties.$global = globalFunction;
  },
};
