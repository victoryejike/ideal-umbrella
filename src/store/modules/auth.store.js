import router from '@/router';

const initialState = () => ({
  username: process.env.NODE_ENV === 'development' ? 'Tester' : null,
  avatarURL: null,
});

const getters = {
  loggedIn(state) {
    return !!state.username;
  },
  username(state) {
    return state.username;
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
  logout({ commit, state }) {
    // ...
    setTimeout(() => {
      router.push('/');
      commit('setUsername', null);
    }, 400);
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  setUsername(state, username) {
    state.username = username;
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
