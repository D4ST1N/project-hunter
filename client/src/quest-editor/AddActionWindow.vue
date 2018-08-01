<template>
  <div class="add-action-window">
    <div class="add-action-window__overlay" @click.self="closeWindow">
      <div class="add-action-window__content-wrapper" :style="{ transform: inner ? 'translate(-20px, 5px)' : 'none' }">
        <div class="objects__search">
          <input type="text" class="objects__search-input" title="search">
          <Button v-show="false" class="objects__search-button">
            <Icon slot="before" type="close" size="small" class="objects__search-icon" />
          </Button>
          <Icon type="search" size="small" class="objects__search-icon objects__search-icon--right" />
        </div>
        <div class="add-action-window__content">
          <ActionBlock v-for="action in actions" :key="action.action" :action="action" @selectAction="selectAction"/>
        </div>
      </div>
    </div>
    <AddParamsWindow v-show="showAddParamsWindow" :action="action" :quest="quest" @submit="addAction" @cancel="showAddParamsWindow = false" />
  </div>
</template>

<script>
  import Quest from '../resources/entities/Quest';
  import AddParamsWindow from './AddParamsWindow';
  import ActionBlock from './ActionBlock';

  export default {
    name: "AddActionWindow",
    components: {
      AddParamsWindow,
      ActionBlock,
    },
    props: {
      quest: {
        type: Object,
      },
      inner: {
        type: Boolean,
        default: false,
      }
    },

    data() {
      return {
        actions: Quest.getActionsList(),
        showAddParamsWindow: false,
        action: {},
      };
    },

    methods: {
      addAction(actionData) {
        const action = Object.assign({}, actionData);
        delete action.description;
        this.$emit('onActionSelect', action);
      },

      selectAction(actionData) {
        this.action = actionData;

        if (actionData.params) {
          this.showAddParamsWindow = true;
        } else {
          this.addAction(actionData);
        }
      },

      closeWindow() {
        this.$emit('onWindowClose');
      }
    }
  }
</script>

<style lang="scss">
  .add-action-window {
    position: relative;
    z-index: 1;

    &__overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__content-wrapper {
      position: fixed;
      background: rgba(96,125,139 ,.8);
      top: 20px;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      min-width: 750px;
    }

    &__content {
      max-height: calc(100vh - 135px);
      overflow: auto;
      padding-right: 5px;
    }
  }
</style>