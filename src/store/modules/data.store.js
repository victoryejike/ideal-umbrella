import router from '@/router';

const initialState = () => ({
  countryList: [],
  filterCategory: [],
  searchValue: null,
  isWrongChain: false,
  isMonitoringChain: false,
  isWalletConnected: false,
});

const getters = {
  countryList(state) {
    return state.countryList;
  },
  searchValue(state) {
    return state.searchValue;
  },
  filterCategory(state) {
    return state.filterCategory;
  },
  isWrongChain(state) {
    return state.isWrongChain;
  },
  isMonitoringChain(state) {
    return state.isMonitoringChain;
  },
  isWalletConnected(state) {
    return state.isWalletConnected;
  },
};

const actions = {
  disconnect({ commit, state }) {
    localStorage.removeItem('account');
    commit('isWalletConnected', false);
    router.push('/');
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  setCountryList(state, list) {
    state.countryList = list;
  },
  setSearchValue(state, value) {
    state.searchValue = value;
  },
  setFilterCategory(state, value) {
    state.filterCategory = value;
  },
  setIsWrongChain(state, value) {
    state.isWrongChain = value;
  },
  setIsMonitoringChain(state, value) {
    state.isMonitoringChain = value;
  },
  isWalletConnected(state, value) {
    state.isWalletConnected = value;
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
