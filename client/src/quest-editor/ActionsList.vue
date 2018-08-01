<template>
  <div class="actions-list">
    <div class="actions-list__number">
      {{ index }}
    </div>
    <div class="actions-list__content">
      <div v-for="(action, index) in list" :key="index" class="actions-list__wrapper">
        <QuestAction :action="action" />
        <div class="actions-list__action-container">
          <Button type="transparent" size="tiny" :squash="true" @buttonClick="removeItem(index)">
            <Icon slot="before" size="tiny" type="trash" />
          </Button>
          <Button v-if="showUpArrow(list, index)" type="transparent" size="tiny" :squash="true" @buttonClick="moveUp(index)">
            <Icon slot="before" size="tiny" type="arrow_up" />
          </Button>
          <Button v-if="showDownArrow(list, index)" type="transparent" size="tiny" :squash="true" @buttonClick="moveDown(index)">
            <Icon slot="before" size="tiny" type="arrow_down" />
          </Button>
        </div>
      </div>
      <Button text="Додати дію" :rectangular="true" type="blue" size="tiny" @buttonClick="showAddActionPopup">
        <Icon slot="before" type="add" size="x-small"></Icon>
      </Button>
    </div>
    <AddActionWindow v-if="showAddAction" :quest="quest" @onActionSelect="addAction" @onWindowClose="closeAddActionWindow" />
    <Button :squash="true" type="transparent" size="tiny" class="actions-list__remove-button" @buttonClick="removeList">
      <Icon slot="before" type="close" size="tiny"></Icon>
    </Button>
  </div>
</template>

<script>
  import QuestAction from './QuestAction';

  export default {
    name: "ActionsList",
    components: {
      QuestAction,
    },
    props: {
      list: {
        type: Array,
      },
      index: {
        type: Number,
      },
      quest: {
        type: Object
      },
    },

    data() {
      return {
        showAddAction: false,
      };
    },

    methods: {
      showAddActionPopup() {
        this.showAddAction = true;
      },

      closeAddActionWindow() {
        this.showAddAction = false;
      },

      addAction(action) {
        this.closeAddActionWindow();
        this.list.push(action);
      },

      removeList() {
        this.$emit('removeList');
      },

      removeItem(index) {
        this.list.splice(index, 1);
      },

      moveUp(index) {
        this.list[index] = this.list.splice(index - 1, 1, this.list[index])[0];
      },

      moveDown(index) {
        this.list[index] = this.list.splice(index + 1, 1, this.list[index])[0];
      },

      showUpArrow(list, index) {
        if (list.length === 1) {
          return false;
        }

        return index > 0;
      },

      showDownArrow(list, index) {
        if (list.length === 1) {
          return false;
        }

        return index < list.length - 1;
      },
    }
  }
</script>

<style lang="scss">
  .actions-list {
    background-color: rgba(200, 200, 200, 0.1);
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: flex-start;

    &__number {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
      background-color: rgba(200, 200, 200, 0.2);
      border-radius: 16px;
    }

    &__content {
      flex-grow: 1;
      max-width: calc(100% - 74px);
    }

    &__wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      &:hover {
        background-color: rgba(200, 200, 200, 0.1);
      }
    }

    &__remove-button {
      margin-left: 5px;
    }
  }
</style>