import $events from '../../utils/events';

export default class Quest {
  constructor({ name, description, init, start, complete, isActive, steps, reward }) {
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

  static getActionsList() {
    return [
      {
        method: 'setQuestStep',
        description: 'Перейти на інший крок квесту',
        params: [
          {
            name: 'step',
            description: 'Який крок квесту виконати',
            type: String,
          },
        ],
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
          },
          {
            name: 'bottomRight',
            description: 'Координати правого нижнього блоку',
            type: Object,
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
          },
        ],
      },
    ];
  }
}