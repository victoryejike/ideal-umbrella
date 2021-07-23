const initialState = () => ({
  isMenuOpen: false,
  isInterval: false,
});

const getters = {
  isMenuOpen(state) {
    return state.isMenuOpen;
  },
};

const actions = {
  toggleMenu({ commit, state }) {
    if (!state.isInterval) {
      commit('setIsMenuOpen', !state.isMenuOpen);
      commit('setisInterval', true);
      setTimeout(() => {
        commit('setisInterval', false);
      }, 700);
    }
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  setIsMenuOpen(state, status) {
    state.isMenuOpen = status;
  },
  setisInterval(state, status) {
    state.isInterval = status;
  },
};

const state = initialState();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
