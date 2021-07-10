const initialState = () => ({
  countryList: [],
  searchValue: null,
});

const getters = {
  countryList(state) {
    return state.countryList;
  },
  searchValue(state) {
    return state.searchValue;
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
};

const state = initialState();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
