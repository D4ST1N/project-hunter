<template>
  <div class="quests-list">
    <div class="quests-list__wrapper">
      <div
        v-for="quest in quests"
        :key="quest.name"
        :class="{
          'quests-list__item': true,
          'quests-list__item--checked': checked === quest.name
        }"
        @click="click(quest)"
      >
        <Icon type="scroll" size="medium" class="open-maps__map-icon"></Icon>
        <div class="quests-list__label">{{ quest.name }}</div>
      </div>
    </div>
    <Button
      :rectangular="true"
      :text="$t('QuestEditor.Quest.Load.Action')"
      type="white"
      size="tiny"
      @buttonClick="submit"
    >
      <Icon slot="before" type="add" size="tiny"></Icon>
    </Button>
  </div>
</template>

<script>
  export default {
    name: "QuestsList",
    props: {
      quests: {
        type: Array,
      },
    },

    data() {
      return {
        checked: '',
      };
    },

    methods: {
      click(quest) {
        this.checked = quest.name;
      },

      submit() {
        const selectedQuest = this.quests.find(quest => quest.name === this.checked);

        if (selectedQuest) {
          this.$emit('loadQuest', selectedQuest);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .quests-list {

    &__wrapper {
      display: flex;
    }

    &__item {
      display: flex;
      flex-direction: column;
      color: #fff;
      margin: 0 10px 10px 0;
      padding: 5px;
      align-items: center;
      cursor: pointer;

      &--checked {
        background: rgba(144,164,174 ,.2);
        border-radius: 4px;
      }
    }
  }
</style>