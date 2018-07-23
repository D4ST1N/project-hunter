<template>
  <div class="new-quest">
    <div class="new-quest__section">
      <div class="new-quest__label">Назва:</div>
      <input v-model="quest.name" class="new-quest__field" type="text" title="Quest name" @input="console.log(1)">
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Опис:</div>
      <textarea v-model="quest.description" class="new-quest__field" title="Quest name"></textarea>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Ініціалізація:</div>
      <ActionsList :list="quest.init" />
      <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('init')">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Старт:</div>
      <ActionsList :list="quest.start" />
      <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('start')">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Завершення:</div>
      <ActionsList :list="quest.complete" />
      <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('complete')">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Кроки:</div>
      <div v-for="(step, index) in quest.steps" class="new-quest__section">
        <div class="new-quest__label">Крок {{ index }}:</div>
        <div class="new-quest__step-description">
          {{ step.description }}
        </div>
        <Button text="Додати дію" type="white" size="small">
          <Icon slot="before" type="add" size="tiny"></Icon>
        </Button>
      </div>
      <Button text="Додати крок" type="white" size="small" @buttonClick="addStep">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Нагорода:</div>
      <Button text="Додати нагороду" type="white" size="small">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <AddActionWindow v-if="showAddAction" :quest="quest" @onActionSelect="addAction" @onWindowClose="closeAddActionWindow" />
    <AddStepWindow v-if="showAddStepWindow" @stepSubmit="submitStep"/>
  </div>
</template>

<script>
  import QuestAction     from './QuestAction';
  import ActionsList from './ActionsList';
  import AddStepWindow from './AddStepWindow';

  export default {
    name: "NewQuest",
    components: {
      QuestAction,
      ActionsList,
      AddStepWindow,
    },

    data() {
      return {
        showAddAction: false,
        showAddStepWindow: false,
        where: null,
        quest: {
          name: 'Новий квест',
          description: 'Опис Завдання',
          steps: [],
          init: [],
          start: [],
          complete: [],
          reward: [],
        },
      };
    },

    mounted() {
      this.$store.commit('disableInput');
    },

    methods: {
      addStep() {
        this.showAddStepWindow = true;
      },

      submitStep(step) {
        this.quest.steps.push(step);
        this.showAddStepWindow = false;
      },

      addAction(action) {
        this.closeAddActionWindow();
        this.quest[this.where].push(action);
      },

      showAddActionWindow(where) {
        this.showAddAction = true;
        this.where = where;
      },

      closeAddActionWindow() {
        this.showAddAction = false;
      },
    }
  }
</script>

<style lang="scss">
  .new-quest {
    display: flex;
    flex-direction: column;
    background-color: rgba(200, 200, 200, .1);
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    overflow: auto;
    max-height: calc(100vh - 72px);

    &__section {
      background-color: rgba(200, 200, 200, .1);
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    &__label {
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__field {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      background: transparent;
      border: 0;
      border-bottom: 2px solid #fff;
      padding: 5px 0;
      font-size: 16px;
      color: rgba(224,224,224 ,1);
    }

    &__quest-action-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &__step-description {
      padding: 5px;
      background: rgba(207,216,220 ,.2);
      margin-bottom: 10px;
    }
  }
</style>