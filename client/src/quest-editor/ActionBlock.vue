<template>
  <div class="action-block" @click="selectAction">
    <div class="action-block__header">
      <span class="action-block__name">{{ action.action }}</span>
      <Button :squash="true" :stop="true" size="tiny" type="transparent" @buttonClick="toggleDescription">
        <Icon slot="before" type="info" size="tiny" />
      </Button>
    </div>
    <div v-show="showDescription" class="action-block__footer">
      <div class="action-block__description">{{ action.description }}</div>
      <div v-if="action.params" class="action-block__params">
        <div v-for="(parameter, index) in action.params" :key="index" class="action-block__action-parameter">
          <div class="action-block__name-block">
            <span class="action-block__name">{{ parameter.name }}</span>
            <span class="action-block__parameter-type">({{ parameter.type }})</span>
          </div>
          <div class="action-block__description">{{ parameter.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ActionBlock",
    props: {
      action: {
        type: Object,
      },
    },

    data() {
      return {
        showDescription: false,
      };
    },

    methods: {
      toggleDescription() {
        this.showDescription = !this.showDescription;
      },

      selectAction() {
        this.$emit('selectAction', this.action);
      }
    }
  }
</script>

<style scoped lang="scss">
  .action-block {
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
      background: rgba(144,164,174 ,.6);
    }

    &__header {
      display: flex;
    }

    &__name {
      font-weight: 600;
      font-size: 18px;
      margin-right: 10px;
    }

    &__description {
      padding: 5px 10px;
      background: rgba(238,238,238 ,.2);
      margin: 5px 0;
      border-radius: 5px;
    }

    &__params {
      padding: 5px 10px;
      border-radius: 10px;
      background: rgba(238,238,238 ,.2);
      margin-bottom: 10px;
    }

    &__parameter-type {
      margin-left: 10px;
    }
  }
</style>