<template>
  <div class="actions-list">
    <div v-for="(action, index) in list" :key="index" class="actions-list__wrapper">
      <QuestAction :action="action" />
      <div class="actions-list__action-container">
        <Button type="transparent" size="tiny" :squash="true">
          <Icon slot="before" size="tiny" type="close" />
        </Button>
        <Button v-if="showUpArrow(list, index)" type="transparent" size="tiny" :squash="true">
          <Icon slot="before" size="tiny" type="arrow_up" />
        </Button>
        <Button v-if="showDownArrow(list, index)" type="transparent" size="tiny" :squash="true">
          <Icon slot="before" size="tiny" type="arrow_down" />
        </Button>
      </div>
    </div>
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
    },

    methods: {
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

    &__wrapper {
      display: flex;
      justify-content: space-between;
    }
  }
</style>