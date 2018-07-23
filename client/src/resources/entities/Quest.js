import $events from '../../utils/events';

export default class Quest {
  constructor({ name, description, init, start, complete, isActive, reward, steps = [] }) {
    this.name = name;
    this.description = description;
    this.init = init;
    this.start = start;
    this.complete = complete;
    this.isActive = isActive;
    this.steps = steps;
    this.reward = reward;
    this.currentStep = null;

    this.init(this);
  }

  setQuestStep(step) {
    this.currentStep = step;
    this.steps[step].action(this);
  }

  activateQuest() {
    this.isActive = true;
  }

  deactivateQuest() {
    this.isActive = false;
  }

  startQuest() {
    $events.$emit('questStarted', this);
  }

  completeQuest() {
    this.complete = true;
    $events.$emit('questCompleted', this);
  }

  onBlockEnter(x, y, action) {
    const enter = (block) => {
      if (block.x === x && block.y === y) {
        action(this);
        $events.$off('blockEnter', enter);
      }
    };
    $events.$on('blockEnter', enter);
  }

  onRectangleAreaEnter(topLeft, bottomRight, action) {
    const enter = (block) => {
      if (block.x >= topLeft.x && block.x <= bottomRight.x
        && block.y >= topLeft.y && block.y === bottomRight.y
      ) {
        action(this);
        $events.$off('blockEnter', enter);
      }
    };
    $events.$on('blockEnter', enter);
  }

  onBlocksListEnter(action, ...blocks) {
    const enter = (block) => {
      if (blocks.filter(b => b.x === block.x && b.y === block.y).length > 0) {
        action(this);
        $events.$off('blockEnter', enter);
      }
    };
    $events.$on('blockEnter', enter);
  }

  static getStepActionsList() {
    return [
      {
        method: 'activateStep',
        description: 'Зробити цей крок активним',
      },
      {
        method: 'completeStep',
        description: 'Зробити цей крок виконаним',
      },
      {
        method: 'failStep',
        description: 'Провалити цей крок',
      },
    ];
  }

  static getActionsList() {
    return [
      {
        method: 'setQuestStep',
        description: 'Перейти на інший крок квесту',
        params: [
          {
            name: 'step',
            description: 'Який крок квесту виконати',
            type: Number,

            items(quest) {
              return quest.steps.map((step, index) => ({
                label: `Крок ${index}`,
                value: index,
              }));
            },
          },
        ],
      },
      {
        method: 'start',
        description: 'Виконати "Старт квесту"',
      },
      {
        method: 'complete',
        description: 'Виконати "Завершення квесту"',
      },
      {
        method: 'activateQuest',
        description: 'Зробити квест активним',
      },
      {
        method: 'deactivateQuest',
        description: 'Зробити квест неактивним',
      },
      {
        method: 'startQuest',
        description: 'Земітити старт квесту, щоб він з\'явився в списку активних квестів',
      },
      {
        method: 'completeQuest',
        description: 'Завершити квест',
      },
      {
        method: 'onBlockEnter',
        description: 'При відвіданні блоку виконати дію',
        params: [
          {
            name: 'x',
            description: 'X - координата',
            type: Number,
          },
          {
            name: 'y',
            description: 'Y - координата',
            type: Number,
          },
          {
            name: 'action',
            description: 'Дія, яку потрібно виконати',
            type: Function,
            actions: [],
          },
        ],
      },
      {
        method: 'onRectangleAreaEnter',
        description: 'При відвіданні прямокутної області виконати дію',
        params: [
          {
            name: 'topLeft',
            description: 'Координати лівого верхнього блоку',
            type: Object,
            fields: [
              {
                name: 'x',
                type: Number,
              },
              {
                name: 'y',
                type: Number,
              },
            ],
          },
          {
            name: 'bottomRight',
            description: 'Координати правого нижнього блоку',
            type: Object,
            fields: [
              {
                name: 'x',
                type: Number,
              },
              {
                name: 'y',
                type: Number,
              },
            ],
          },
          {
            name: 'action',
            description: 'Дія, яку потрібно виконати',
            type: Function,
          },
        ],
      },
      {
        method: 'onBlocksListEnter',
        description: 'При відвіданні одного з масиву блоків',
        params: [
          {
            name: 'action',
            description: 'Дія, яку потрібно виконати',
            type: Function,
          },
          {
            name: 'block',
            description: 'Координати блоку',
            type: Object,
            multiple: true,
            fields: [
              {
                name: 'x',
                type: Number,
              },
              {
                name: 'y',
                type: Number,
              },
            ],
          },
        ],
      },
    ];
  }
}