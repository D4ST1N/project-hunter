const state = {
  selectedTile: null,
  selectedInstrument: null,
};

const getters = {
  tile(state) {
    return state.selectedTile;
  },

  instrument(state) {
    return state.selectedInstrument;
  }
};

const mutations = {
  selectTile(state, tile) {
    state.selectedTile = tile;
  },

  selectInstrument(state, instrument) {
    state.selectedInstrument = instrument;
  }
};

export default {
  state,
  getters,
  mutations
}