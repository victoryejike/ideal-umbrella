import { createStore } from 'vuex';

export default createStore({
  state: {
    isMenuOpen: false,
    gappingTime: false,
  },
  actions: {
  },
  modules: {
  },
  mutations: {
    toggleMenu(state) {
      if (!this.gappingTime) {
        this.gappingTime = true;
        state.isMenuOpen = !state.isMenuOpen;
        setTimeout(() => {
          this.gappingTime = false;
        }, 700);
      }
    },
  },
});
