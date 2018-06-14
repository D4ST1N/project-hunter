<template>
  <div class="editor" id="editor">
    <canvas v-if="false" ref="map" class="layout"></canvas>
    <Sidebar />
    <Popup title="Тестовий заголовок" :show="show" @close="show = false"/>
  </div>
</template>

<script>
  import Popup             from '../ui/Popup';
  import Sidebar           from '../ui/Sidebar';
  import renderRectangle   from '../../utils/renderRectangle';
  import getMousePosition  from '../../utils/getMousePosition';
  import createClearMatrix from '../../utils/createClearMatrix';
  import editor            from '../../resources/mapEditor';
  import clearRectangle    from '../../utils/clearRectangle';

  export default {
    name: "MapEditor",
    components: {
      Popup,
      Sidebar,
    },

    data() {
      return {
        map: null,
        ctx: null,
        mapData: null,
        show: false,
      };
    },

    mounted() {
      // this.map = this.$refs.map;
      // this.ctx = this.map.getContext('2d');
      // this.map.width = this.$store.state.game.view.width;
      // this.map.height = this.$store.state.game.view.height;
      // const width = Math.ceil(this.$store.state.game.view.width / this.$store.state.game.cellSize) - 1;
      // const height = Math.ceil(this.$store.state.game.view.height / this.$store.state.game.cellSize) - 1;
      this.mapData = localStorage.getItem('editorMap')
                     ? JSON.parse(localStorage.getItem('editorMap'))
                     : createClearMatrix(width, height);
      editor.init({ map: this.mapData });
      editor.run();
      // this.renderMap();
      // this.map.addEventListener('click', this.mouseClick);
    },

    methods: {
      renderMap() {
        clearRectangle(this.ctx, {
          pos: {
            x: 0,
            y: 0,
          },
          size: {
            width: this.map.width,
            height: this.map.height,
          }
        });
        this.mapData.forEach(this.renderMapRow);
      },

      renderMapRow(mapRow, rowIndex) {
        mapRow.forEach((tile, index) => {
          this.renderTile(tile, index, rowIndex);
        });
      },

      renderTile(tile, index, rowIndex) {
        renderRectangle(this.ctx, {
          position: {
            x: index * this.$store.state.game.cellSize,
            y: rowIndex * this.$store.state.game.cellSize,
          },
          size: this.$store.state.game.cellSize,
          color: tile.color ? tile.color : 'rgba(102,187,106 ,1)',
          border: 'rgba(236,239,241 ,1)',
        });
      },

      mouseClick(e) {
        const coordinates = this.getClickCoordinates(e);
        const clickedPoint = this.mapData[coordinates.y][coordinates.x];
        const currentTile = this.$store.state.editor.selectedTile;

        if (currentTile) {
          clickedPoint.tile = currentTile.name;
          clickedPoint.color = currentTile.color;
          clickedPoint.isBarrier = currentTile.isWalkable;
          localStorage.setItem('editorMap', JSON.stringify(this.mapData));
          this.renderMap();
        }
      },

      getClickCoordinates(e) {
        const mousePosition = getMousePosition(this.map, e);
        return {
          x: Math.ceil(mousePosition.x / this.$store.state.game.cellSize) - 1,
          y: Math.ceil(mousePosition.y / this.$store.state.game.cellSize) - 1,
        }
      },
    }
  }
</script>

<style lang="scss">

</style>