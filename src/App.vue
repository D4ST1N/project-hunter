<template>
  <div id="app">
    <Map></Map>
    <MapEditor v-if="false"></MapEditor>
    <Player></Player>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
