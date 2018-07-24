<template>
  <div class="tile-settings">
    <h2 class="tile-settings__title">Налаштування тайлу</h2>
    <div class="tile-settings__content" v-if="showInfo">
      <div class="tile-settings__info-item">
        Тайл: <span class="tile-settings__info-item-value">{{ info.tile }}</span>
      </div>
      <div class="tile-settings__info-item">
        Координати:
        <br />
        x: <span class="tile-settings__info-item-value">{{ info.position.x }}</span>
        <br />
        y: <span class="tile-settings__info-item-value">{{ info.position.y }}</span>
        <br />
        z: <span class="tile-settings__info-item-value">{{ info.position.z }}</span>
        <br />
        <Button text="Підняти рівень тайлу" @buttonClick="zUp"/>
        <Button text="Опустити рівень тайлу" @buttonClick="zDown"/>
      </div>
      <div class="tile-settings__info-item" v-show="!!getDecoration().length">
        Декорації:
        <div class="tile-settings__decoration">
          <div
            v-for="decor in getDecoration()"
            :key="decor.name"
            :class="{ 'objects__item': true, 'objects__item--selected': decor.selected }"
            :style="{ 'background-image': `url(/img/objects/${decor.name}.png)` }"
          >
            <Icon class="tile-settings__remove-decor" type="close" size="small" @iconClick="removeDecor(decor)"/>
            <span class="objects__item-label">{{ decor.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $events from '../../utils/events';

  export default {
    name: "TileSettings",

    computed: {
      showInfo() {
        return !!this.$store.getters.tile;
      },

      info() {
        const tile = this.$store.getters.tile;
        const size = this.$store.getters.size;

        return {
          tile:     tile.tile.tile,
          position: {
            x: tile.x * size,
            y: tile.y * size,
            z: tile.tile.z,
          }
        };
      }
    },

    methods: {
      zUp() {
        $events.$emit('zUp');
      },

      zDown() {
        $events.$emit('zDown');
      },

      removeDecor(decor) {
        $events.$emit('removeDecor', decor);
      },

      getDecoration() {
        const objectsData = this.$store.getters.getMap.scenery;
        const tile = this.$store.getters.tile;

        return objectsData.filter(decor => decor.block.x === tile.x && decor.block.y === tile.y);
      }
    },
  }
</script>

<style scoped lang="scss">
  .tile-settings {

    &__title {
      color: #fff;
      margin-top: 0;
    }

    &__info-item {
      color: #fff;
      margin-bottom: 16px;
      position: relative;
    }

    &__decoration {
      display: flex;
      flex-wrap: wrap;
    }

    &__remove-decor {
      pointer-events: all;
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 24px;
      background: rgba(255,87,34 ,1);
    }
  }
</style>