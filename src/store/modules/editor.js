const state = {
  selectedTile: null,
  selectedInstrument: null,
  drawTile: null,
  drawObject: null,
  showEmptyTiles: true,
};

const getters = {
  tile(state) {
    return state.selectedTile;
  },

  drawTile(state) {
    return state.drawTile;
  },

  decor(state) {
    return state.drawObject;
  },

  instrument(state) {
    return state.selectedInstrument;
  }
};

const mutations = {
  selectTile(state, tile) {
    state.selectedTile = tile;
  },

  selectTileForDrawing(state, tile) {
    state.drawTile = tile;
  },

  selectObjectForDrawing(state, object) {
    state.drawObject = object;
  },

  selectInstrument(state, instrument) {
    state.selectedInstrument = instrument;
  },

  selectedTileUp(state) {
    state.selectedTile.tile.z += 4;
  },

  selectedTileDown(state) {
    state.selectedTile.tile.z -= 4;
  },
};

export default {
  state,
  getters,
  mutations
}