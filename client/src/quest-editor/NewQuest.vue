<template>
  <div class="new-quest">
    <div class="new-quest__section new-quest__section--header">
      <input v-model="quest.name" class="new-quest__field" type="text" title="Quest name">
      <Button :squash="true" text="Редагувати опис" type="white" size="small">
        <Icon slot="before" type="edit" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__content">
      <div class="new-quest__section new-quest__section--start">
        <div class="new-quest__section-title">
          Старт
        </div>
        <div class="new-quest__section-content">
          <ActionsList :list="quest.start" />
          <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('start')">
            <Icon slot="before" type="add" size="tiny"></Icon>
          </Button>
        </div>
      </div>
      <div class="new-quest__section new-quest__section--progress">
        <div class="new-quest__section-title">
          Прогрес
        </div>
        <div class="new-quest__section-content">
          <ActionsList :list="quest.progress" />
          <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('progress')">
            <Icon slot="before" type="add" size="tiny"></Icon>
          </Button>
        </div>
      </div>
      <div class="new-quest__section new-quest__section--complete">
        <div class="new-quest__section-title">
          Завершення
        </div>
        <div class="new-quest__section-content">
          <ActionsList :list="quest.complete" />
          <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('complete')">
            <Icon slot="before" type="add" size="tiny"></Icon>
          </Button>
        </div>
      </div>
      <!--<div class="new-quest__section">-->
        <!--<div class="new-quest__label">Опис:</div>-->
        <!--<textarea v-model="quest.description" class="new-quest__field" title="Quest name"></textarea>-->
      <!--</div>-->
      <!--<div class="new-quest__section">-->
        <!--<div class="new-quest__label">Ініціалізація:</div>-->
        <!--<ActionsList :list="quest.init" />-->
        <!--<Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('init')">-->
          <!--<Icon slot="before" type="add" size="tiny"></Icon>-->
        <!--</Button>-->
      <!--</div>-->
      <!--<div class="new-quest__section">-->
        <!--<div class="new-quest__label">Старт:</div>-->
        <!--<ActionsList :list="quest.start" />-->
        <!--<Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('start')">-->
          <!--<Icon slot="before" type="add" size="tiny"></Icon>-->
        <!--</Button>-->
      <!--</div>-->
      <!--<div class="new-quest__section">-->
        <!--<div class="new-quest__label">Завершення:</div>-->
        <!--<ActionsList :list="quest.complete" />-->
        <!--<Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('complete')">-->
          <!--<Icon slot="before" type="add" size="tiny"></Icon>-->
        <!--</Button>-->
      <!--</div>-->
      <!--<div class="new-quest__section">-->
        <!--<div class="new-quest__label">Кроки:</div>-->
        <!--<div v-for="(step, index) in quest.steps" class="new-quest__section">-->
          <!--<div class="new-quest__label">Крок {{ index }}:</div>-->
          <!--<div class="new-quest__step-description">-->
            <!--{{ step.description }}-->
          <!--</div>-->
          <!--<Button text="Додати дію" type="white" size="small">-->
            <!--<Icon slot="before" type="add" size="tiny"></Icon>-->
          <!--</Button>-->
        <!--</div>-->
        <!--<Button text="Додати крок" type="white" size="small" @buttonClick="addStep">-->
          <!--<Icon slot="before" type="add" size="tiny"></Icon>-->
        <!--</Button>-->
      <!--</div>-->
      <!--<div class="new-quest__section">-->
        <!--<div class="new-quest__label">Нагорода:</div>-->
        <!--<Button text="Додати нагороду" type="white" size="small">-->
          <!--<Icon slot="before" type="add" size="tiny"></Icon>-->
        <!--</Button>-->
      <!--</div>-->
    </div>
    <div class="new-quest__footer">
      <Button text="Створити квест" type="green" size="small">
        <Icon slot="before" type="add_mono" size="tiny"></Icon>
      </Button>
      <Button text="Відмінити" type="red" size="small" @buttonClick="cancel">
        <Icon slot="before" type="cancel_mono" size="tiny"></Icon>
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
          start: [],
          progress: [],
          complete: [],
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

      cancel() {
        this.$emit('cancel');
      }
    }
  }
</script>

<style lang="scss">
  .new-quest {
    padding: 5px;
    border-radius: 5px;
    color: #fff;

    &__content {
      margin: 10px 0;
      display: flex;
    }

    &__section {
      background-color: rgba(200, 200, 200, .1);
      border-radius: 5px;
      display: flex;
      flex-direction: column;

      &--header {
        flex-direction: row;
      }

      &--start, &--complete {
        width: 25%;
      }

      &--progress {
        width: 50%;
        margin: 0 10px;
      }

      &-title {
        padding: 10px;
        font-size: 24px;
        color: rgba(255, 255, 255, .6);
        font-weight: 600;
        background-color: rgba(200, 200, 200, .1);
        border-radius: 5px 5px 0 0;
        text-align: center;
      }

      &-content {
        padding: 10px;
        overflow: auto;
        height: calc(100vh - 240px);
      }
    }

    &__label {
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__field {
      flex-grow: 1;
      background: transparent;
      border: 0;
      border-bottom: 2px solid #fff;
      padding: 5px 10px;
      font-size: 18px;
      color: rgba(224,224,224 ,1);

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    &__footer {
      display: flex;
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