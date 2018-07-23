<template>
  <div class="new-quest">
    <div class="new-quest__section">
      <div class="new-quest__label">Назва:</div>
      <input v-model="quest.name" class="new-quest__field" type="text" title="Quest name">
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Опис:</div>
      <textarea v-model="quest.description" class="new-quest__field" title="Quest name"></textarea>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Ініціалізація:</div>
      <Button text="Додати дію" type="white" size="small" @buttonClick="showAddActionWindow('init')">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Старт:</div>
      <Button text="Додати дію" type="white" size="small">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Завершення:</div>
      <Button text="Додати дію" type="white" size="small">
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__section">
      <div class="new-quest__label">Кроки:</div>
      <div v-for="(step, index) in quest.steps" class="new-quest__section">
        <div class="new-quest__label">Крок {{ index }}:</div>
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
    <AddActionWindow v-if="showAddAction" @onActionSelect="addAction" @onWindowClose="closeAddActionWindow"></AddActionWindow>
  </div>
</template>

<script>
  import Button          from '../components/ui/Button';
  import Icon            from '../components/ui/Icon';
  import AddActionWindow from './AddActionWindow';

  export default {
    name: "NewQuest",
    components: {
      Button,
      Icon,
      AddActionWindow,
    },

    data() {
      return {
        showAddAction: false,
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

    methods: {
      addStep() {
        this.quest.steps.push([]);
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
  }
</style>