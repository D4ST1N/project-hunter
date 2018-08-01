<template>
  <div class="new-quest">
    <div class="new-quest__section new-quest__section--header">
      <input
        v-model="quest.name"
        class="new-quest__field"
        type="text"
        title="Quest name"
      >
      <Button :rectangular="true" :text="$t('QuestEditor.Part.Description.Edit')" type="white" size="tiny">
        <Icon slot="before" type="edit" size="tiny"></Icon>
      </Button>
    </div>
    <div class="new-quest__content">
      <div class="new-quest__section new-quest__section--start">
        <div class="new-quest__section-title">
          {{ $t('QuestEditor.Phase.Start') }}
        </div>
        <div class="new-quest__section-content">
          <ActionsList
            v-for="(list, index) in quest.start"
            :key="index"
            :quest="quest"
            :list="list"
            :index="index"
            @removeList="removeStep(quest.start, index)"
          />
          <Button
            :text="$t('QuestEditor.Step.Add')"
            :rectangular="true"
            type="blue"
            size="small"
            @buttonClick="addStep('start')"
          >
            <Icon slot="before" type="add" size="tiny"></Icon>
          </Button>
        </div>
      </div>
      <div class="new-quest__section new-quest__section--progress">
        <div class="new-quest__section-title">
          {{ $t('QuestEditor.Phase.Progress') }}
        </div>
        <div class="new-quest__section-content">
          <ActionsList
            v-for="(list, index) in quest.progress"
            :key="index"
            :quest="quest"
            :list="list"
            :index="index"
            @removeList="removeStep(quest.progress, index)"
          />
          <Button
            :text="$t('QuestEditor.Step.Add')"
            :rectangular="true"
            type="blue"
            size="small"
            @buttonClick="addStep('progress')"
          >
            <Icon slot="before" type="add" size="tiny"></Icon>
          </Button>
        </div>
      </div>
      <div class="new-quest__section new-quest__section--complete">
        <div class="new-quest__section-title">
          {{ $t('QuestEditor.Phase.Complete') }}
        </div>
        <div class="new-quest__section-content">
          <ActionsList
            v-for="(list, index) in quest.complete"
            :key="index"
            :quest="quest"
            :list="list"
            :index="index"
            @removeList="removeStep(quest.complete, index)"
          />
          <Button
            :text="$t('QuestEditor.Step.Add')"
            :rectangular="true"
            type="blue"
            size="small"
            @buttonClick="addStep('complete')"
          >
            <Icon slot="before" type="add" size="tiny"></Icon>
          </Button>
        </div>
      </div>
    </div>
    <div class="new-quest__footer">
      <Button :text="$t('QuestEditor.Quest.Save.Action')" :rectangular="true" type="green" size="small" @buttonClick="save">
        <Icon slot="before" type="save" size="tiny"></Icon>
      </Button>
      <Button :text="$t('Action.Cancel')" :rectangular="true" type="red" size="small" @buttonClick="cancel">
        <Icon slot="before" type="cancel_mono" size="tiny"></Icon>
      </Button>
    </div>
  </div>
</template>

<script>
  import QuestAction   from './QuestAction';
  import ActionsList   from './ActionsList';
  import API           from '../services/API';
  import $events       from '../utils/events';

  export default {
    name: "NewQuest",
    components: {
      QuestAction,
      ActionsList,
    },

    data() {
      return {
        showAddAction: false,
        showAddStepWindow: false,
        where: null,
        quest: {
          name: this.$t('QuestEditor.Quest.New'),
          description: this.$t('QuestEditor.Part.Description.Label'),
          start: [],
          progress: [],
          complete: [],
        },
      };
    },

    mounted() {
      $events.$on('loadQuest', (quest) => {
        this.quest = quest.content;
      });
    },

    methods: {
      addStep(part) {
        this.quest[part].push([]);
      },

      removeStep(part, index) {
        part.splice(index, 1);
      },

      submitStep(step) {
        this.quest.steps.push(step);
        this.showAddStepWindow = false;
      },

      addAction(action) {
        this.closeAddActionWindow();
        this.quest[this.where].push(action);
      },

      cancel() {
        this.$emit('cancel');
      },

      save() {
        API()
          .post('/saveQuest', {
            name:    this.quest.name,
            content: this.quest
          })
          .then((response) => {
            this.$logger.log(response.data);
            $events.$emit('showNotification', {
              title: this.$t('QuestEditor.Quest.Save.Success'),
              type: 'success',
            });
          })
          .catch((error) => {
            this.$logger.log(error, 'error');
            $events.$emit('showNotification', {
              title: this.$t('QuestEditor.Quest.Save.Error'),
            });
          });
      },
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
        width: 27.5%;
      }

      &--progress {
        width: 45%;
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