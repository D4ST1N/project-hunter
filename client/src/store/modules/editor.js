const state = {
  currentMap: null,
  selectedTile: null,
  selectedInstrument: null,
  drawTile: null,
  drawObject: null,
  showEmptyTiles: true,
  map: null,
  disableInput: false
};

const getters = {
  inputDisable(state) {
    return state.disableInput;
  },

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
  },

  getMap(state) {
    return state.map;
  },

  getPlayer(state) {
    if (!state.map || !state.map.scenery) {
      return;
    }

    return state.map.scenery.find(decor => decor.name === 'player');
  }
};

const mutations = {
  selectMap(state, mapName) {
    state.currentMap = mapName;
  },

  disableInput(state) {
    state.disableInput = true;
  },

  enableInput(state) {
    state.disableInput = false;
  },

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

  updateMap(state, mapData) {
    state.map = mapData;
  },

  removeDecor(state, index) {
    state.map.scenery.splice(index, 1);
  },

  updateDecor(state, { decor, newState }) {
    const decorIndex = state.map.scenery.indexOf(decor);
    state.map.scenery[decorIndex] = Object.assign(state.map.scenery[decorIndex], newState);
  }
};

export default {
  state,
  getters,
  mutations
}