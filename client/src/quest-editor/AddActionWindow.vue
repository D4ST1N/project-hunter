<template>
  <div class="add-action-window">
    <div class="add-action-window__overlay" @click.self="closeWindow">
      <div class="add-action-window__content">
        <div v-for="action in actions" class="add-action-window__action" @click="addAction(action)">
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
</template>

<script>
  import Quest from '../resources/entities/Quest';

  export default {
    name: "AddActionWindow",

    data() {
      return {
        actions: Quest.getActionsList(),
      };
    },

    methods: {
      addAction(action) {
        this.$emit('onActionSelect', action);
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
    }

    &__content {
      position: fixed;
      background: rgba(96,125,139 ,.6);
      top: 20px;
      right: 530px;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 80px);
      overflow: auto;
    }

    &__action {
      background: rgba(96,125,139 ,.2);
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
      transition: background .375s;
      cursor: pointer;

      &:hover {
        background: rgba(96,125,139 ,.6);
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