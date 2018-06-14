const state = {
  view: {
    width: null,
    height: null,
  },
  cellSize: 52,
};

const getters = {
  view(state) {
    return state.view;
  }
};

const mutations = {
  setViewSize(state, payload) {
    state.view.width = payload.width;
    state.view.height = payload.height;
  },
};

export default {
  state,
  getters,
  mutations
}