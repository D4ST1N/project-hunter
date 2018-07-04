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
      </div>
      <Button text="Підняти рівень тайлу" @buttonClick="zUp"/>
      <Button text="Опустити рівень тайлу" @buttonClick="zDown"/>
    </div>
  </div>
</template>

<script>
  import Button from '../../components/ui/Button';
  import $events from '../../utils/events';

  export default {
    name: "TileSettings",
    components: {
      Button,
    },

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
    },
  }
</script>

<style lang="scss">
  .tile-settings {

    &__title {
      color: #fff;
      margin-top: 0;
    }

    &__info-item {
      color: #fff;
      margin-bottom: 16px;
    }
  }
</style>