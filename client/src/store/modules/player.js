import toFixed from '../../utils/toFixed';

const state = {
  player: null,
};

const mutations = {
  createPlayer(state, payload) {
    state.player = payload;
  },

  addPath(state, payload) {
    state.player.path.push(payload);
  },

  shiftPath(state) {
    state.player.path.shift();
  },

  moveUp(state) {
    state.player.pos.y = toFixed(state.player.pos.y - 0.05, 3);
  },

  moveLeft(state) {
    state.player.pos.x = toFixed(state.player.pos.x - 0.05, 3);
  },

  moveDown(state) {
    state.player.pos.y = toFixed(state.player.pos.y + 0.05, 3);
  },

  moveRight(state) {
    state.player.pos.x = toFixed(state.player.pos.x + 0.05, 3);
  },
};

export default {
  state,
  mutations
}