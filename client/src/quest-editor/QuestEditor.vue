<template>
  <div class="quest-editor">
    <div class="quest-editor__menu">
      <router-link to="/" class="nav-link">
        <Button :squash="true" class="about__button" text="На головну" size="small" type="white">
          <Icon slot="before" size="small" type="castle"></Icon>
        </Button>
      </router-link>
      <Button
        :squash="true"
        text="Список квестів"
        type="white"
        size="small"
      >
        <Icon slot="before" type="scroll" size="small"></Icon>
      </Button>
      <Button
        v-if="!showNewQuest"
        :squash="true"
        text="Створити квест"
        type="white"
        size="small"
        @buttonClick="addQuest"
      >
        <Icon slot="before" type="add" size="small"></Icon>
      </Button>
    </div>
    <div v-if="showNewQuest" class="quest-editor__new-quest">
      <NewQuest @cancel="showNewQuest = false" />
    </div>
    <AboutFloatButton />
  </div>
</template>

<script>
  import NewQuest from './NewQuest';
  import AboutFloatButton from '../components/AboutFloatButton';

  export default {
    name: "QuestEditor",
    components: {
      NewQuest,
      AboutFloatButton,
    },

    data() {
      return {
        showNewQuest: false,
      };
    },

    methods: {
      addQuest() {
        this.showNewQuest = true;
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

    &__new-quest {
      padding: 10px 5px;
      border-radius: 5px;
      background: rgba(120,144,156 ,.2);
    }
  }
</style>