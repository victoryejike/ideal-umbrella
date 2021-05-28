import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

const app = createApp(App).use(i18n).use(store).use(router);

// Automatically register all base components in the UI directory

const allBaseComponents = require.context(
  '@/components/UI',
  false,
  /Base[A-Z]\w+\.vue$/,
);

allBaseComponents.keys().forEach((fileName) => {
  const componentObject = allBaseComponents(fileName);
  app.component(fileName.replace(/\.\/|\.vue/g, ''), componentObject.default || componentObject);
});

app.mount('#app');
