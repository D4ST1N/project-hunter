<template>
  <div v-show="show" class="sidebar">
    <Tiles />
  </div>
</template>

<script>
  import Tiles   from './Tiles';
  import $events from '../../utils/events';

  export default {
    name: "Sidebar",
    components: {
      Tiles,
    },

    data() {
      return {
        showTiles: false,
        showObjects: false,
        showEvents: false,
        showTileSettings: false,
      };
    },

    computed: {
      show() {
        return this.showTiles || this.showObjects || this.showEvents || this.showTileSettings;
      }
    },

    mounted() {
      $events.$on('selectInstrument', (instrument) => {
        this.showTiles = instrument === 'draw';
      });
    }
  }
</script>

<style lang="scss">
  .sidebar {
    position: fixed;
    width: 460px;
    top: 16px;
    right: 16px;
    max-height: calc(100% - 40px);
    background: rgba(69,90,100 , .5);
    border-radius: 10px;
    padding: 16px;
  }
</style>