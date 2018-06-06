<template>
  <canvas ref="map" class="layout"></canvas>
</template>

<script>
  // import PF                from 'pathfinding';
  import renderRectangle   from '../../utils/renderRectangle';
  import getMousePosition  from '../../utils/getMousePosition';
  import createClearMatrix from '../../utils/createClearMatrix';

  export default {
    name: "MapEditor",

    data() {
      return {
        map: null,
        ctx: null,
        mapData: null,
      };
    },

    mounted() {
      this.map = this.$refs.map;
      this.ctx = this.map.getContext('2d');
      this.map.width = this.$store.state.game.view.width;
      this.map.height = this.$store.state.game.view.height;
      const width = Math.ceil(this.$store.state.game.view.width / this.$store.state.game.cellSize) - 1;
      const height = Math.ceil(this.$store.state.game.view.height / this.$store.state.game.cellSize) - 1;
      this.mapData = localStorage.getItem('editorMap')
                     ? JSON.parse(localStorage.getItem('editorMap'))
                     : createClearMatrix(width, height);
      this.renderMap();
      document.body.addEventListener('click', this.mouseClick);
    },

    methods: {
      renderMap() {
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
          color: tile.tile === 'rock' ? 'rgba(120,144,156 ,1)' : 'rgba(102,187,106 ,1)',
        });
      },

      mouseClick(e) {
        const coordinates = this.getClickCoordinates(e);
        console.log(coordinates);
        const clickedPoint = this.mapData[coordinates.y][coordinates.x];
        clickedPoint.tile = clickedPoint.tile === 'grass' ? 'rock' : 'grass';
        clickedPoint.isBarrier = clickedPoint.tile === 'rock';
        localStorage.setItem('editorMap', JSON.stringify(this.mapData));
        this.renderMap();
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

<style scoped>

</style>