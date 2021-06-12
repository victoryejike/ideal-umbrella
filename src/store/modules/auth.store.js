const initialState = () => ({
  username: process.env.NODE_ENV === 'development' ? true : null,
  avatarURL: null,
});

const getters = {
  loggedIn(state) {
    return !!state.username;
  },
  avatar(state) {
    return state.avatarURL;
  },
};

const actions = {
  validate({ commit, state }) {
    if (process.env.NODE_ENV === 'development') return true;
    // TODO: CAll API to validate
    return false;
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
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
