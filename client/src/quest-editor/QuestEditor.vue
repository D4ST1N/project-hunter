<template>
  <div class="quest-editor">
    <Button
      v-if="!showNewQuest"
      text="Створити квест"
      type="white"
      size="small"
      @buttonClick="addQuest"
    >
      <Icon slot="before" type="add" size="tiny"></Icon>
    </Button>
    <div v-else class="quest-editor__new-quest">
      <NewQuest />
    </div>
  </div>
</template>

<script>
  import NewQuest from './NewQuest';

  export default {
    name: "QuestEditor",
    components: {
      NewQuest,
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

</style>