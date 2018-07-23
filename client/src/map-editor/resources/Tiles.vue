<template>
  <div class="tiles">
    <h2 class="tiles__title">Тайли</h2>
    <div
      v-for="tile in tiles"
      :key="tile.name"
      :class="{ 'tiles__item': true, 'tiles__item--selected': tile.selected }"
      :style="{ 'background-image': `url(/img/tiles/${tile.name}.png)` }"
      @click="selectTile(tile)"
    >
      <span class="tiles__item-label">{{ tile.label }}</span>
    </div>
  </div>
</template>

<script>
  import tiles from '../../resources/tiles';

  export default {
    name: "Tiles",

    data() {
      return {
        tiles,
      };
    },

    mounted() {
      this.selectTile(tiles[0]);
    },

    methods: {
      selectTile(tile) {
        const selectedTile = this.tiles.find(t => t.selected);

        if (selectedTile) {
          selectedTile.selected = false;
        }

        this.$set(tile, 'selected', true);
        this.$store.commit('selectTileForDrawing', tile.name);
      }
    }
  }
</script>

<style lang="scss">
  .tiles {
    display: flex;
    flex-wrap: wrap;

    &__title {
      color: #fff;
      width: 100%;
      margin-top: 0;
    }

    &__item {
      width: 104px;
      height: 104px;
      margin-right: 8px;
      margin-bottom: 32px;
      border-radius: 4px;
      cursor: pointer;
      transition: all .5s;
      position: relative;
      border: 2px solid transparent;
      background-position: center;
      background-repeat: no-repeat;

      &:hover {
        background-color: rgba(255, 255, 255, .15);
      }

      &--selected,
      &--selected:hover {
        background-color: rgba(255, 255, 255, .25);
      }

      &-label {
        color: #fff;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -24px;
        font-size: 16px;
      }
    }
  }
</style>