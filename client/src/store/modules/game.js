const state = {
  view: {
    width: null,
    height: null,
  },
  cellSize: 48,
  editorSize: {
    width: 1400,
    height: 850,
  }
};

const getters = {
  view(state) {
    return state.view;
  },

  size(state) {
    return state.cellSize;
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