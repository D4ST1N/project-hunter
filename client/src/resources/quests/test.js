export default {
  name: 'First quest',
  description: 'The easiest quest ever',

  init(quest) {
    quest.onBlockEnter(10, 3, quest.start);
  },

  start(quest) {
    quest.startQuest();
    quest.activateQuest();
    quest.setQuestStep(0);
  },

  complete(quest) {
    quest.completeQuest();
    quest.reward(quest);
  },

  reward() {
    console.log('quest completed');
  },
  steps: [
    {
      description: 'Move to [6, 4] cell',
      isActive: false,
      isCompleted: false,

      action(quest) {
        this.isActive = true;
        quest.onBlockEnter(6, 4, () => {
          this.isCompleted = true;
          quest.setQuestStep(1);
        });
      }
    },
    {
      description: 'Move to [6, 8] cell',
      isActive: false,
      isCompleted: false,

      action(quest) {
        this.isActive = true;
        quest.onBlockEnter(6, 8, () => {
          this.isCompleted = true;
          quest.setQuestStep(2);
        });
      }
    },
    {
      description: 'Move to [2, 2] cell',
      isActive: false,
      isCompleted: false,

      action(quest) {
        this.isActive = true;
        quest.onBlockEnter(2, 2, () => {
          this.isCompleted = true;
          quest.setQuestStep(3);
        });
      }
    },
    {
      description: 'Move to [4, 10] cell',
      isActive: false,
      isCompleted: false,

      action(quest) {
        this.isActive = true;
        quest.onBlockEnter(4, 10, () => {
          this.isCompleted = true;
          quest.complete(quest);
        });
      }
    },
  ]
}