<template>
  <div class="quest-editor">
    <div class="quest-editor__menu">
      <router-link to="/" class="nav-link">
        <Button :rectangular="true" class="about__button" text="На головну" size="small" type="white">
          <Icon slot="before" size="tiny" type="castle"></Icon>
        </Button>
      </router-link>
      <Button
        :rectangular="true"
        text="Список квестів"
        type="white"
        size="small"
        @buttonClick="showQuests"
      >
        <Icon slot="before" type="scroll" size="tiny"></Icon>
        <Spinner v-show="showLoader" slot="after" color="blue" />
      </Button>
      <Button
        v-if="!showNewQuest"
        :rectangular="true"
        text="Створити квест"
        type="white"
        size="tiny"
        @buttonClick="addQuest"
      >
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
    <div v-show="showNewQuest || showQuestsPopup" class="quest-editor__content">
      <NewQuest v-show="showNewQuest" @cancel="showNewQuest = false" />
      <QuestsList v-show="showQuestsPopup" :quests="quests" @loadQuest="loadQuest"></QuestsList>
    </div>
    <AboutFloatButton />
  </div>
</template>

<script>
  import NewQuest         from './NewQuest';
  import AboutFloatButton from '../components/AboutFloatButton';
  import QuestsList       from './QuestsList';
  import API              from '../services/API';
  import $events          from '../utils/events';

  export default {
    name: "QuestEditor",
    components: {
      NewQuest,
      AboutFloatButton,
      QuestsList,
    },

    data() {
      return {
        showNewQuest: false,
        showLoader: false,
        quests: [],
        showQuestsPopup: false,
      };
    },

    methods: {
      addQuest() {
        this.showNewQuest = true;
        this.showQuestsPopup = false;
      },

      showQuests() {
        this.showLoader = true;
        this.showNewQuest = false;
        API().get('/quests').then((response) => {
          this.quests = [];
          response.data.forEach((quest) => {
            this.quests.push({
              name: quest.name,
              content: JSON.parse(quest.content)
            });
          });
          this.showLoader = false;
          this.showQuestsPopup = true;
        }).catch((error) => {
          this.$logger.log(error, 'error');
          $events.$emit('showNotification', {
            title: 'Сталась помилка під час завантаження квестів.',
          });
        });
      },

      loadQuest(quest) {
        this.showQuestsPopup = false;
        this.showNewQuest = true;
        $events.$emit('loadQuest', quest);
      }
    }
  }
</script>

<style lang="scss">
  .quest-editor {

    &__menu {
      padding: 5px 10px;
      border-radius: 5px;
      background: rgba(120,144,156 ,.2);
      margin-bottom: 10px;
    }

    &__content {
      padding: 10px 5px;
      border-radius: 5px;
      background: rgba(120,144,156 ,.2);
    }
  }
</style>