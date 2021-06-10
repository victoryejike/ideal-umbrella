import { createStore, createLogger } from 'vuex';
import modules from './modules/_index';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules,
  actions: {
    reset({ commit }) {
      // resets state of all the modules
      Object.keys(modules).forEach((moduleName) => {
        commit(`${moduleName}/RESET`);
      });
    },
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
