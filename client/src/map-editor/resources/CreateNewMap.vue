<template>
  <div class="create-new-popup popup" v-if="show">
    <div class="popup__overlay">
      <div class="popup__content">
        <h2 class="popup__title">Створити нову карту</h2>
        <div class="popup__container">
          <div class="create-new-popup__item create-new-popup__item--row">
            <div class="create-new-popup__item create-new-popup__item--half create-new-popup__item--row">
              <label for="map-width" class="create-new-popup__label">Ширина карти</label>
              <input type="number" v-model="width" class="create-new-popup__input create-new-popup__input--number" id="map-width">
            </div>
            <div class="create-new-popup__item create-new-popup__item--half create-new-popup__item--row">
              <label for="map-height" class="create-new-popup__label">Висота карти</label>
              <input type="number" v-model="height" class="create-new-popup__input create-new-popup__input--number" id="map-height">
            </div>
          </div>
          <div class="create-new-popup__item">
            <label for="map-name" class="create-new-popup__label">Назва карти</label>
            <input type="text" v-model="name" class="create-new-popup__input" id="map-name">
          </div>
          <div class="create-new-popup__item">
            <label for="map-description" class="create-new-popup__label">Опис карти</label>
            <textarea v-model="description" class="create-new-popup__input" id="map-description"></textarea>
          </div>
          <div class="create-new-popup__item">
            <label for="map-file-name" class="create-new-popup__label">Назва файлу карти</label>
            <input type="text" v-model="fileName" class="create-new-popup__input" id="map-file-name">
          </div>
          <div class="create-new-popup__item">
            <div class="create-new-popup__label">Базовий тайл</div>
            <div class="create-new-popup__item-container">
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
          </div>
        </div>
        <div class="popup__footer">
          <Button type="blue" text="Створити" @buttonClick="create" />
          <Button type="red" text="Відміна" @buttonClick="cancel"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $events        from '../../utils/events';
  import tiles          from '../../resources/tiles';
  import '../../assets/styles/popup.scss';
  import createEmptyMap from '../../utils/createEmptyMap';

  export default {
    name: "CreateNewMap",

    data() {
      return {
        tiles,
        show: false,
        width: 10,
        height: 10,
        name: "Нова мапа",
        description: "Опис карти...",
        fileName: "new map",
      }
    },

    mounted() {
      this.selectTile(tiles[1]);
      $events.$on('showCreateMap', () => {
        this.show = true;
      });
    },

    methods: {
      cancel() {
        $events.$emit('showMeetPopup');
        this.close();
      },

      create() {
        const selectedTile = this.tiles.find(t => t.selected);
        const newMap = createEmptyMap(this.width, this.height, Object.assign({}, selectedTile));
        newMap.info.name = this.name;
        newMap.info.description = this.description;
        newMap.info.fileName = this.fileName;
        $events.$emit('loadMap', {
          content: newMap,
        });
        this.close();
      },

      close() {
        this.show = false;
      },

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
  .create-new-popup {

    &__item {
      display: flex;
      max-width: 600px;
      flex-direction: column;
      margin-bottom: 10px;
      color: #fff;

      &--row {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      &--half {
        width: calc(50% - 10px);
      }

      &-container {
        display: flex;
        flex-wrap: wrap;
      }
    }

    &__input {
      font-size: 16px;
      padding: 5px 15px;

      &--number {
        width: 150px;
      }
    }
  }
</style>