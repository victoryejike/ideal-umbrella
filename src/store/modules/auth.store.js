import router from '@/router';

const initialState = () => ({
  user: JSON.parse(localStorage.getItem('userData')) || null,
});

const getters = {
  loggedIn(state) {
    return !!state.user;
  },
  username(state) {
    return state.user?.name;
  },
  avatar(state) {
    return state.user?.avatarURL;
  },
};

const actions = {
  validate({ commit, state }) {
    // TODO: Call API to validate
    return true;
  },
  logout({ commit, state }) {
    // ...
    setTimeout(() => {
      router.push('/');
      localStorage.removeItem('userData');
      commit('setUser', null);
    }, 400);
  },
  login({ commit, state }, userData) {
    commit('setUser', { ...userData, name: 'Chris Torres' });
    localStorage.setItem('userData', JSON.stringify({ ...userData, name: 'Chris Torres' }));
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  setUser(state, userData) {
    state.user = userData;
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
