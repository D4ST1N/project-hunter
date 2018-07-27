<template>
  <div v-show="show" class="sidebar">
    <Tiles v-show="showTiles" />
    <Objects v-show="showObjects" />
    <TileSettings v-show="showTileSettings" />
  </div>
</template>

<script>
  import Tiles        from './Tiles';
  import Objects      from './Objects';
  import TileSettings from './TileSettings';
  import $events      from '../../utils/events';

  export default {
    name: "Sidebar",
    components: {
      Tiles,
      Objects,
      TileSettings,
    },

    data() {
      return {
        currentInstrument: null,
      };
    },

    computed: {
      show() {
        return this.showTiles || this.showObjects || this.showTileSettings || this.showQuestEditor;
      },

      showTiles() {
        return this.currentInstrument === 'draw';
      },

      showObjects() {
        return this.currentInstrument === 'move';
      },

      showTileSettings() {
        return this.currentInstrument === 'selection';
      },

      showQuestEditor() {
        return this.currentInstrument === 'quests';
      }
    },

    mounted() {
      $events.$on('selectInstrument', (instrument) => {
        this.currentInstrument = instrument;
      });
      $events.$on('deselectInstrument', () => {
        this.currentInstrument = null;
      });
    }
  }
</script>

<style lang="scss">
  .sidebar {
    position: fixed;
    width: 500px;
    top: 16px;
    right: 16px;
    max-height: calc(100% - 40px);
    background: rgba(69,90,100 , .5);
    border-radius: 10px;
    padding: 16px;
  }
</style>