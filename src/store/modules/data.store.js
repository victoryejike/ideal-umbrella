const initialState = () => ({
  countryList: null,
});

const getters = {
  countryList(state) {
    return state.countryList;
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
};

const state = initialState();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
