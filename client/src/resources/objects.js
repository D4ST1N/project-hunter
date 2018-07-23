const action = function () {
  // store.commit('selectTile', this);
};

export default {
  folders: [
    {
      name: 'folder_flora',
      label: 'Флора',
      isMain: true,
      subFolders: [
        'folder_trees',
        'folder_brushes',
        'folder_grass',
        'folder_flowers',
      ],
    },
    {
      name: 'folder_fauna',
      label: 'Фауна',
      isMain: true,
      subFolders: [
        'folder_beasts',
        'folder_birds',
        'folder_fishes',
        'folder_insects',
      ],
    },
    {
      name: 'folder_nature',
      label: 'Рельєф',
      isMain: true,
      subFolders: [
        'folder_stones',
      ],
    },
    {
      name: 'folder_architecture',
      label: 'Архітектура',
      isMain: true,
      subFolders: [
        'folder_buildings',
        'folder_items',
        'folder_roads',
      ],
    },
    {
      name: 'folder_trees',
      label: 'Дерева',
    },
    {
      name: 'folder_brushes',
      label: 'Кущі',
    },
    {
      name: 'folder_grass',
      label: 'Трава',
    },
    {
      name: 'folder_flowers',
      label: 'Квіти',
    },
    {
      name: 'folder_beasts',
      label: 'Звірі',
    },
    {
      name: 'folder_birds',
      label: 'Птахи',
    },
    {
      name: 'folder_fishes',
      label: 'Риби',
    },
    {
      name: 'folder_insects',
      label: 'Комахи',
    },
    {
      name: 'folder_stones',
      label: 'Камені',
    },
    {
      name: 'folder_buildings',
      label: 'Будівлі',
    },
    {
      name: 'folder_items',
      label: 'Предмети',
    },
    {
      name: 'folder_roads',
      label: 'Дороги',
    },
  ],
  scenery: [
    {
      name: 'scenery_tree',
      miniature: 'scenery_tree',
      label: 'Дерево',
      size: {
        width: 326,
        height: 266,
      },
      offset: {
        x: 0,
        y: 126,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_tree_2',
      miniature: 'scenery_tree_2',
      label: 'Дерево',
      size: {
        width: 220,
        height: 268,
      },
      offset: {
        x: 0,
        y: 106,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_tree_3',
      miniature: 'scenery_tree_3',
      label: 'Дерево',
      size: {
        width: 260,
        height: 256,
      },
      offset: {
        x: 0,
        y: 96,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_tree_4',
      miniature: 'scenery_tree_4',
      label: 'Дерево',
      size: {
        width: 248,
        height: 250,
      },
      offset: {
        x: 0,
        y: 76,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_tree_5',
      miniature: 'scenery_tree_5',
      label: 'Дерево',
      size: {
        width: 276,
        height: 390,
      },
      offset: {
        x: 0,
        y: 161,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_hemp',
      miniature: 'scenery_hemp',
      label: 'Пеньок',
      size: {
        width: 144,
        height: 88,
      },
      offset: {
        x: 0,
        y: 16,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_deck',
      miniature: 'scenery_deck',
      label: 'Колода',
      size: {
        width: 136,
        height: 86,
      },
      offset: {
        x: -28,
        y: 28,
      },
      isWalkable: false,
      folders: [
        'folder_trees'
      ],
      grid: {
        size: {
          width: 1,
          height: 2,
        },
        matrix: [
          [1],
          [1],
        ],
        startPosition: {
          x: 0,
          y: 1,
        },
      },
    },
    {
      name: 'scenery_stone',
      miniature: 'scenery_stone',
      label: 'Камінь',
      size: {
        width: 120,
        height: 120,
      },
      offset: {
        x: -10,
        y: 56,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 2,
          height: 2,
        },
        matrix: [
          [1, 1],
          [1, 1],
        ],
        startPosition: {
          x: 1,
          y: 1,
        },
      },
    },
    {
      name: 'scenery_stone_2',
      miniature: 'scenery_stone_2',
      label: 'Камінь',
      size: {
        width: 154,
        height: 92,
      },
      offset: {
        x: 0,
        y: 0,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_stone_3',
      miniature: 'scenery_stone_3',
      label: 'Камінь',
      size: {
        width: 74,
        height: 44,
      },
      offset: {
        x: 0,
        y: 4,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [1],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_stone_4',
      miniature: 'scenery_stone_4',
      label: 'Камінь',
      size: {
        width: 126,
        height: 132,
      },
      offset: {
        x: -10,
        y: 64,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 2,
          height: 2,
        },
        matrix: [
          [1, 1],
          [1, 1],
        ],
        startPosition: {
          x: 1,
          y: 1,
        },
      },
    },
    {
      name: 'scenery_stone_5',
      miniature: 'scenery_stone_5',
      label: 'Камінь',
      size: {
        width: 190,
        height: 188,
      },
      offset: {
        x: -10,
        y: 104,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 3,
          height: 3,
        },
        matrix: [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 0],
        ],
        startPosition: {
          x: 2,
          y: 2,
        },
      },
    },
    {
      name: 'scenery_stone_6',
      miniature: 'scenery_stone_6',
      label: 'Камінь',
      size: {
        width: 122,
        height: 106,
      },
      offset: {
        x: -12,
        y: 48,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 2,
          height: 2,
        },
        matrix: [
          [1, 1],
          [1, 1],
        ],
        startPosition: {
          x: 1,
          y: 1,
        },
      },
    },
    {
      name: 'scenery_stone_7',
      miniature: 'scenery_stone_7',
      label: 'Камінь',
      size: {
        width: 148,
        height: 116,
      },
      offset: {
        x: -28,
        y: 64,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 2,
          height: 3,
        },
        matrix: [
          [1, 1],
          [1, 1],
          [1, 1],
        ],
        startPosition: {
          x: 1,
          y: 2,
        },
      },
    },
    {
      name: 'scenery_stone_8',
      miniature: 'scenery_stone_8',
      label: 'Камінь',
      size: {
        width: 134,
        height: 126,
      },
      offset: {
        x: -14,
        y: 60,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 2,
          height: 2,
        },
        matrix: [
          [1, 1],
          [1, 1],
        ],
        startPosition: {
          x: 1,
          y: 1,
        },
      },
    },
    {
      name: 'scenery_stone_9',
      miniature: 'scenery_stone_9',
      label: 'Камінь',
      size: {
        width: 186,
        height: 150,
      },
      offset: {
        x: -14,
        y: 88,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 3,
          height: 3,
        },
        matrix: [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 0],
        ],
        startPosition: {
          x: 2,
          y: 2,
        },
      },
    },
    {
      name: 'scenery_stone_10',
      miniature: 'scenery_stone_10',
      label: 'Камінь',
      size: {
        width: 120,
        height: 70,
      },
      offset: {
        x: -2,
        y: 16,
      },
      isWalkable: false,
      folders: [
        'folder_stones'
      ],
      grid: {
        size: {
          width: 2,
          height: 2,
        },
        matrix: [
          [0, 1],
          [1, 1],
        ],
        startPosition: {
          x: 1,
          y: 1,
        },
      },
    },
    {
      name: 'scenery_road_EW',
      miniature: 'scenery_road_EW',
      label: 'Дорога',
      size: {
        width: 96,
        height: 48,
      },
      offset: {
        x: 0,
        y: 0,
      },
      isWalkable: true,
      folders: [
        'folder_roads'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [0],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'scenery_road_SN',
      miniature: 'scenery_road_SN',
      label: 'Дорога',
      size: {
        width: 96,
        height: 48,
      },
      offset: {
        x: 0,
        y: 0,
      },
      isWalkable: true,
      folders: [
        'folder_roads'
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [0],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
    {
      name: 'player',
      miniature: 'player',
      label: 'Гравець',
      size: {
        width: 96,
        height: 180,
      },
      offset: {
        x: 0,
        y: 0,
      },
      isWalkable: true,
      folders: [
        null
      ],
      grid: {
        size: {
          width: 1,
          height: 1,
        },
        matrix: [
          [0],
        ],
        startPosition: {
          x: 0,
          y: 0,
        },
      },
    },
  ]
}