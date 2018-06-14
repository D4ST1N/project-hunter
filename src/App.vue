<template>
  <div id="app">
    <Map v-if="false"></Map>
    <MapEditor v-if="true"></MapEditor>
    <Player v-if="false"></Player>
  </div>
</template>

<script>
  import Map from './components/layouts/Map';
  import MapEditor from './components/layouts/MapEditor';
  import Player from './components/layouts/Player';
  import PlayerClass from './resources/entities/player';
  import $events from './utils/events';
  import './assets/styles/global.scss';

  export default {
    name: 'app',
    components: {
      Map,
      Player,
      MapEditor,
    },

    created() {
      this.$store.commit('setViewSize', {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const player = new PlayerClass({
        pos: {
          x: 2,
          y: 2,
        },
        size: this.$store.state.game.cellSize,
        cellSize: this.$store.state.game.cellSize,
        color: 'rgba(66,165,245 ,1)',
        border: 'rgba(92,107,192 ,1)',
      });
      this.$store.commit('createPlayer', player);
    },

    mounted() {
      $events.$emit('initGame');
    }
  }
</script>

<style>
</style>
