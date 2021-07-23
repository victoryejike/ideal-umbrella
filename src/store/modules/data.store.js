const initialState = () => ({
  countryList: [],
  filterCategory: [],
  searchValue: null,
  isWrongChain: false,
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
};

const actions = {

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
};

const state = initialState();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
