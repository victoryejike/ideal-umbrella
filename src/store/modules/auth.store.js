const initialState = () => ({
  username: null,
  icon: null,
  apiToken: null,
});

const getters = {

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
};

const state = initialState();

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
