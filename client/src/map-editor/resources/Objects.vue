<template>
  <div class="objects">
    <h2 class="objects__title">Декорації</h2>
    <div class="objects__search">
      <input type="text" class="objects__search-input" title="search">
      <Button v-show="showCancel" class="objects__search-button">
        <Icon slot="before" type="close" size="small" class="objects__search-icon" />
      </Button>
      <Icon type="search" size="small" class="objects__search-icon objects__search-icon--right" />
    </div>
    <div class="objects__container">
      <div v-show="showReturn" class="objects__return">
        <Button type="transparent" class="objects__return-button" @buttonClick="back">
          <Icon slot="before" type="return" size="huge" class="objects__return-icon" />
        </Button>
        <div class="objects__folder-name">
          Назад
        </div>
      </div>
      <div
        v-for="folder in folders"
        :key="folder.name"
        class="objects__folder"
        @click="selectFolder(folder.name)">
        <Icon :type="isFolderEmpty(folder.name) ? 'folder_empty' : 'folder'" size="huge" class="objects__folder-icon" />
        <div class="objects__folder-name">
          {{ folder.label }}
          <span class="objects__scenery-count">{{ sceneryCount(folder.name) }}</span>
        </div>
      </div>
      <div
        v-for="decor in scenery"
        :key="decor.name"
        :class="{ 'objects__item': true, 'objects__item--selected': decor.selected }"
        :style="{ 'background-image': `url(/img/objects/${decor.miniature}.png)` }"
        @click="selectDecor(decor)"
      >
        <span class="objects__item-label">{{ decor.label }} {{ getObjectSize(decor) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import objects from '../../resources/objects';

  export default {
    name: 'Objects',

    data() {
      return {
        objects,
        currentFolder: null,
      };
    },

    computed: {
      folders() {
        if (this.currentFolder === null) {
          return this.objects.folders.filter(folder => folder.isMain);
        }

        const currentFolder = this.objects.folders.find(folder => folder.name === this.currentFolder);

        if (!currentFolder.subFolders) {
          return [];
        }

        return this.objects.folders.filter(folder => currentFolder.subFolders.includes(folder.name));
      },

      scenery() {
        return this.objects.scenery.filter(scenery => scenery.folders.includes(this.currentFolder));
      },

      showReturn() {
        return this.currentFolder !== null;
      },

      showCancel() {
        return false;
      },
    },

    methods: {
      getObjectSize(decor) {
        return `(${decor.grid.size.width} x ${decor.grid.size.height})`;
      },

      getSceneryCount(folderName) {
        return objects.scenery.filter(scenery => scenery.folders.includes(folderName)).length;
      },

      sceneryCount(folderName) {
        const count = this.getSceneryCount(folderName);
        let end;

        if (count === 0) {
          return '';
        }

        switch (count % 10) {
          case 1:
            end = 'я';
            break;

          case 2:
          case 3:
          case 4:
            end = 'ї';
            break;

          default:
            end = 'й';
            break;
        }

        return `(${count} декораці${end})`;
      },

      isFolderEmpty(folderName) {
        const count = this.getSceneryCount(folderName);
        const folder = this.objects.folders.find(folder => folder.name === folderName);
        return count === 0 && !folder.subFolders;
      },

      selectFolder(folder) {
        this.currentFolder = folder;
      },

      back() {
        const parentFolder = this.objects.folders.find(folder => folder.subFolders && folder.subFolders.includes(this.currentFolder));

        if (parentFolder) {
          this.currentFolder = parentFolder.name;
        } else {
          this.currentFolder = null;
        }
      },

      selectDecor(decor) {
        const selectedDecor = this.scenery.find(s => s.selected);

        if (selectedDecor) {
          selectedDecor.selected = false;
        }

        this.$set(decor, 'selected', true);
        this.$store.commit('selectObjectForDrawing', decor.name);
      },
    }
  }
</script>

<style lang="scss">
  .objects {
    display: flex;
    flex-direction: column;

    &__title {
      color: #fff;
      margin-top: 0;
    }

    &__search {
      position: relative;
      margin-bottom: 16px;

      &-input {
        border: 0;
        border-radius: 5px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, .3);
        width: 100%;
        font-size: 20px;
        line-height: 1;
        color: #fff;
      }

      &-button {
        background: transparent;
        box-shadow: none;
        padding: 0;
        top: 6px;
        right: 36px;
        position: absolute;

        &:hover {
          background: none;
          box-shadow: none;
        }
      }

      &-icon {
        background: #fff;
        width: 24px;
        height: 24px;
      }

      &-icon--right {
        position: absolute;
        right: 6px;
        top: 6px;
      }
    }

    &__container {
      display: flex;
      flex-wrap: wrap;
    }

    &__return-button {
      height: 96px;
      width: 104px;
      margin-right: 8px;
      margin-bottom: 8px;
      justify-content: center;
    }

    &__return-icon {
      height: 64px;
      width: 64px;
      opacity: .75;
    }

    &__folder {
      margin-right: 8px;
      margin-bottom: 8px;
      width: 104px;
      cursor: pointer;

      &-icon {
        width: 96px;
        height: 96px;
        margin-bottom: 8px;
        opacity: .75;
        transition: all .375s;
      }

      &-name {
        color: #fff;
        width: 96px;
      }

      &:hover .objects__folder-icon {
        opacity: 1;
      }
    }

    &__scenery-count {
      white-space: nowrap;
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
      background-size: contain;

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