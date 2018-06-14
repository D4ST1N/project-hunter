const state = {
  selectedTile: null,
};

const getters = {
  tile(state) {
    return state.selectedTile;
  }
};

const mutations = {
  selectTile(state, tile) {
    state.selectedTile = tile;
  },
};

export default {
  state,
  getters,
  mutations
}