import 'vue-toast-notification/dist/theme-sugar.css';

const ToastConfig = {
  install: (app, options = {}) => {
    const { globalProperties } = app.config;
    globalProperties.$store.$toast = globalProperties.$toast;
  },
};

export default ToastConfig;
