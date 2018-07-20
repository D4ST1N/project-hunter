<template>
  <div class="quests" v-if="quests.length > 0">
    <div
      v-for="quest in quests"
      :key="quest.name"
      class="quests__quest"
    >
      <h3 class="quests__quest-name">{{ quest.name }}</h3>
      <p class="quests__quest-description">{{ quest.description }}</p>
      <div v-for="(step, index) in quest.steps" v-if="step.isActive" :key="index" class="quests__quest-step">
        <span v-if="step.isCompleted">V</span>
        <span v-else>X</span>
        <span
          :class="{ 'quests__quest-step-description': true, 'quests__quest-step-description--completed': step.isCompleted }"
        >
          {{ step.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import $events from '../../utils/events';

  export default {
    name: "Quests",

    data() {
      return {
        quests: [],
      };
    },

    mounted() {
      $events.$on('questStarted', (quest) => {
        this.quests.push(quest);
      });
      $events.$on('questCompleted', (quest) => {
        const index = this.quests.indexOf(quest);

        if (index > -1) {
          this.quests.splice(index, 1);
        }
      });
    }
  }
</script>

<style lang="scss">
  .quests {
    position: fixed;
    top: 100px;
    left: 10px;
    background: rgba(144,164,174 ,.4);
    padding: 10px;
    border-radius: 10px;
    color: #fff;

    &__quest {
      margin-bottom: 5px;
      display: flex;
      flex-direction: column;

      &-name {
        margin-top: 0;
        margin-bottom: 5px;
      }

      &-description {
        margin-top: 0;
      }

      &-step {

        &-description {
          margin-left: 10px;

          &--completed {
            text-decoration: line-through;
          }
        }
      }
    }
  }
</style>