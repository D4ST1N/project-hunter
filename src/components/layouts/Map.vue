<template>
  <canvas ref="map" class="layout"></canvas>
</template>

<script>
  import PF                     from 'pathfinding';
  import renderRectangle        from '../../utils/renderRectangle';
  import mapData                from '../../resources/map';
  import getMousePosition       from '../../utils/getMousePosition';
  import transformToMatrix      from '../../utils/transformToMatrix';
  import $events                from '../../utils/events';
  import transformToCoordinates from '../../utils/transformToCoordinates';

  export default {
    name: "Map",

    data() {
      return {
        map: null,
        ctx: null,
      };
    },

    mounted() {
      this.map = this.$refs.map;
      this.ctx = this.map.getContext('2d');
      this.map.width = this.$store.state.game.view.width;
      this.map.height = this.$store.state.game.view.height;
      this.renderMap();
      document.body.addEventListener('click', this.mouseClick);
    },

    methods: {
      renderMap() {
        mapData.forEach(this.renderMapRow);
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
        const path = transformToCoordinates(this.getPath(coordinates));
        path.shift();
        path.forEach((pathPoint) => {
          this.$store.commit('addPath', pathPoint);
        });
        console.log(path);
        $events.$emit('startPlayerMove');
        // $events.$emit('startPlayerMove', getDirection(this.$store.state.player.player.pos, this.$store.state.player.player.path[0]));
      },

      getPath(coordinates) {
        const player = this.$store.state.player.player;
        const matrix = transformToMatrix(mapData);
        const grid = new PF.Grid(matrix);
        const finder = new PF.AStarFinder();
        return finder.findPath(player.pos.x, player.pos.y, coordinates.x, coordinates.y, grid);
      },

      getClickCoordinates(e) {
        const mousePosition = getMousePosition(this.map, e);
        return {
          x: Math.ceil(mousePosition.x / this.$store.state.game.cellSize) - 1,
          y: Math.ceil(mousePosition.y / this.$store.state.game.cellSize) - 1,
        }
      },
    }
  };
</script>

<style scoped>

</style>