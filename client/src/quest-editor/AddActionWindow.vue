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
          <div v-for="action in actions" class="add-action-window__action" @click="selectAction(action)">
            <div class="add-action-window__name-block">
              <span class="add-action-window__label">Назва:</span>
              <span class="add-action-window__name">{{ action.method }}</span>
            </div>
            <div class="add-action-window__description">{{ action.description }}</div>
            <div v-if="action.params" class="add-action-window__params">
              <div v-for="parameter in action.params" class="add-action-window__action-parameter">
                <div class="add-action-window__name-block">
                  <span class="add-action-window__name">{{ parameter.name }}</span>
                  <span class="add-action-window__parameter-type">({{ parameter.type.name }})</span>
                </div>
                <div class="add-action-window__description">{{ parameter.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddParamsWindow v-show="showAddParamsWindow" :action="action" :quest="quest" @submit="addAction" @cancel="showAddParamsWindow = false" />
  </div>
</template>

<script>
  import Quest from '../resources/entities/Quest';
  import AddParamsWindow from './AddParamsWindow';

  export default {
    name: "AddActionWindow",
    components: {
      AddParamsWindow,
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
      addAction(action) {
        this.$emit('onActionSelect', action);
      },

      selectAction(action) {
        this.action = action;

        if (action.params) {
          this.showAddParamsWindow = true;
        } else {
          this.addAction(action);
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
    }

    &__content {
      max-height: calc(100vh - 135px);
      overflow: auto;
      padding-right: 5px;
    }

    &__action {
      background: rgba(96,125,139 ,.2);
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
      transition: background .375s;
      cursor: pointer;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        bottom: -5px;
        background: rgba(255, 255, 255, .6);
      }

      &:hover {
        background: rgba(96,125,139 ,.8);
      }
    }

    &__name-block {
      display: flex;
    }

    &__label {
      margin-right: 8px;
      font-weight: 300;
    }

    &__name {
      font-weight: 600;
      font-size: 16px;
    }

    &__description {
      padding: 5px;
      background: rgba(238,238,238 ,.2);
      margin: 5px 0;
      border-radius: 5px;
    }

    &__params {
      padding: 10px;
      border-radius: 10px;
      background: rgba(238,238,238 ,.2);
      margin-bottom: 10px;
    }

    &__parameter-type {
      margin-left: 10px;
    }
  }
</style>