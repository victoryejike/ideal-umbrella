import router from '@/router';

const safelyParseJSON = (jsonStr) => {
  let result;
  try {
    result = JSON.parse(jsonStr);
  } catch {
    result = null;
  }
  return result;
};

const initialState = () => ({
  user: safelyParseJSON(localStorage.getItem('userData')),
});

const getters = {
  user(state) {
    return state.user;
  },
  loggedIn(state) {
    return !!state.user;
  },
  uid(state) {
    return state.user?.uid;
  },
  username(state) {
    return state.user?.display_name;
  },
  avatar(state) {
    return state.user?.image;
  },
  about(state) {
    return state.user?.about;
  },
  portfolio(state) {
    return state.user?.portfolio_link;
  },
  verified(state) {
    return state.user?.is_kyc_verified || false;
  },
  apiToken(state) {
    return state.user?.token;
  },
};

const actions = {
  logout({ commit, state }) {
    localStorage.removeItem('userData');
    commit('setUser', null);
    router.push('/');
  },
  login({ commit, state }, userData) {
    commit('setUser', userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  },
  updateProfile({ commit, state }, userData) {
    commit('setUser', {
      ...state.user,
      image: userData.image,
      display_name: userData.display_name,
      about: userData.about,
      portfolio_link: userData.portfolio_link,
    });
    localStorage.setItem('userData', JSON.stringify(state.user));
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
