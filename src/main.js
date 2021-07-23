import { createApp } from 'vue';
import Toast from 'vue-toast-notification';
import App from './App.vue';
import router from './router';
import store from './store';

import i18n from './utils/i18n';
import global from './utils/global';
import api from './utils/api';
import toastConfig from './utils/toast';
import components from './utils/register-components';

import './utils/validator';

const app = createApp(App).use(Toast, { position: 'top-right' }).use(i18n)
  .use(store)
  .use(toastConfig)
  .use(router)
  .use(global)
  .use(api)
  .use(components);

app.mount('#app');
