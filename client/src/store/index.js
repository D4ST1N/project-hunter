import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game';
import player from './modules/player';
import editor from './modules/editor'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    game,
    player,
    editor,
  },
  strict: true,
});