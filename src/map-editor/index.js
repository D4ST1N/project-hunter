import Phaser               from 'phaser';
import store                from '../store';
import cartesianToIsometric from '../utils/cartesianToIsometric';
import collision            from '../utils/collision';
import findLast             from 'lodash/findLast';
import $events              from '../utils/events';
import createArray          from '../utils/createArray';

const gameMapTest = [
  [
    {
      tile: 'grass',
      z: -16,
      height: 48,
    },
    {
      tile: 'wall',
      z: 0,
      height: 48,
    },
    {
      tile: 'grass',
      z: 16,
      height: 48,
    },
    {
      tile: 'wall',
      z: 0,
      height: 48,
    },
    {
      tile: 'grass',
      z: -16,
      height: 48,
    },
  ],
  [
    {
      tile: 'empty',
      z: 0,
      height: 48,
    },
    {
      tile: 'wall',
      z: 16,
      height: 48,
    },
    {
      tile: 'grass',
      z: 32,
      height: 48,
    },
    {
      tile: 'wall',
      z: 16,
      height: 48,
    },
    {
      tile: 'empty',
      z: 0,
      height: 48,
    },
  ],
  [
    {
      tile: 'grass',
      z: 16,
      height: 48,
    },
    {
      tile: 'grass',
      z: 32,
      height: 48,
    },
    {
      tile: 'wall',
      z: 48,
      height: 48,
    },
    {
      tile: 'grass',
      z: 32,
      height: 48,
    },
    {
      tile: 'grass',
      z: 16,
      height: 48,
    },
  ],
  [
    {
      tile: 'empty',
      z: 0,
      height: 48,
    },
    {
      tile: 'wall',
      z: 16,
      height: 48,
    },
    {
      tile: 'grass',
      z: 32,
      height: 48,
    },
    {
      tile: 'wall',
      z: 16,
      height: 48,
    },
    {
      tile: 'empty',
      z: 0,
      height: 48,
    },
  ],
  [
    {
      tile: 'grass',
      z: -16,
      height: 48,
    },
    {
      tile: 'wall',
      z: 0,
      height: 48,
    },
    {
      tile: 'grass',
      z: 16,
      height: 48,
    },
    {
      tile: 'wall',
      z: 0,
      height: 48,
    },
    {
      tile: 'grass',
      z: -16,
      height: 48,
    },
  ],
];
const gameMapData = localStorage.getItem('editorMap')
                    ? JSON.parse(localStorage.getItem('editorMap'))
                    : gameMapTest;
const gameConfig = {
  tileSize: 48,
  offset: {
    x: 400,
    y: 150
  }
};
const defaultTile = () => ({
  tile: 'wall',
  z: 0,
  height: 48,
});

class Editor extends Phaser.Scene {
  constructor() {
    super();

    this.map = [];
    this.clickStart = false;

    $events.$on('enlargeMap', this.enlargeMap.bind(this));
    $events.$on('decreaseMap', this.decreaseMap.bind(this));
    $events.$on('selectInstrument', this.selectInstrument.bind(this));
    $events.$on('saveMap', this.saveMap);
  }

  getDefaultOffset() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mapHeight = this.map.length;
    const mapWidth = this.map[0].length;
    const center = {
      x: width / 2,
      y: height / 2,
    };
    const mapOffset = {
      x: (mapWidth - 4) * gameConfig.tileSize,
      y: (mapHeight + 1) * gameConfig.tileSize,
    };
    gameConfig.offset.x = center.x - mapOffset.x / 2;
    gameConfig.offset.y = center.y - mapOffset.y / 2;
  }

  saveMap() {
    localStorage.setItem('editorMap', JSON.stringify(gameMapData));
  }

  selectInstrument(instrument) {
    if (instrument !== 'selection') {
      this.highlight.visible = false;
    }
  }

  enlargeMap(direction) {
    if (direction === 'down') {
      gameMapData[gameMapData.length] = createArray(gameMapData[0].length, () => defaultTile());
      this.map[this.map.length] = gameMapData[gameMapData.length - 1].map((cell, cellIndex) => {
        return this.addIsometricTile(cell.tile, cellIndex, gameMapData.length - 1);
      });
    }

    if (direction === 'right') {
      gameMapData.forEach((row) => {
        row.push(defaultTile());
      });
      this.map.forEach((row, index) => {
        row.push(this.addIsometricTile('wall', row.length - 1, index));
      });
    }

    if (direction === 'up') {
      gameMapData.unshift(createArray(gameMapData[0].length, () => defaultTile()));
      this.map.unshift(createArray(gameMapData[0].length, (item, index) => {
        return this.addIsometricTile('wall', 0, index);
      }));
      gameConfig.offset.x += gameConfig.tileSize;
      gameConfig.offset.y -= gameConfig.tileSize / 2;
    }

    if (direction === 'left') {
      gameMapData.forEach((row) => {
        row.unshift(defaultTile());
      });

      this.map.forEach((row, index) => {
        row.unshift(this.addIsometricTile('wall', 0, index));
      });
      gameConfig.offset.x -= gameConfig.tileSize;
      gameConfig.offset.y -= gameConfig.tileSize / 2;
    }
  }

  decreaseMap(direction) {
    if (direction === 'down') {
      this.map[this.map.length - 1].forEach((sprite) => {
        sprite.destroy();
      });
      gameMapData.pop();
      this.map.pop();
    }

    if (direction === 'right') {
      gameMapData.forEach(row => row.pop());
      this.map.forEach((row) => {
        row[row.length - 1].destroy();
        row.pop();
      });
    }

    if (direction === 'up') {
      gameMapData.shift();
      this.map[0].forEach((sprite) => {
        sprite.destroy();
      });
      this.map.shift();
      gameConfig.offset.x -= gameConfig.tileSize;
      gameConfig.offset.y += gameConfig.tileSize / 2;
    }

    if (direction === 'left') {
      gameMapData.forEach(row => row.shift());
      this.map.forEach((row) => {
        row[0].destroy();
        row.shift();
      });
      gameConfig.offset.x += gameConfig.tileSize;
      gameConfig.offset.y += gameConfig.tileSize / 2;
    }
  }

  preload() {
    this.load.image('grid', '/img/tiles/grid.png');
    this.load.image('wall', '/img/tiles/wall.png');
    this.load.image('grass', '/img/tiles/grass.png');
    this.load.image('highlight', '/img/tiles/highlight.png');
    this.load.image('empty', '/img/tiles/empty.png');
    this.tiles = ['wall', 'grass', 'empty'];
  }

  create() {
    this.createScene();
    this.highlight = this.add.sprite(0, 0, 'highlight');
    this.highlight.visible = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.getDefaultOffset();
  }

  update() {
    if (this.cursors.left.isDown) {
      gameConfig.offset.x -= 4;
    } else if (this.cursors.right.isDown) {
      gameConfig.offset.x += 4;
    }

    if (this.cursors.up.isDown) {
      gameConfig.offset.y -= 4;
    } else if (this.cursors.down.isDown) {
      gameConfig.offset.y += 4;
    }

    if (this.input.activePointer.isDown) {
      this.mouseClick(this.input.activePointer);
    } else {
      this.clickStart = false;
    }

    this.updateScene();
  }

  createScene() {
    this.map = gameMapData.map((mapRow, rowIndex) => {
      return mapRow.map((cell, cellIndex) => {
        return this.addIsometricTile(cell.tile, cellIndex, rowIndex);
      });
    });
  }

  updateScene() {
    let counter = 0;
    this.map.forEach((mapRow, y) => {
      mapRow.forEach((cell, x) => {
        const originalPosition = {
          x: x * gameConfig.tileSize,
          y: y * gameConfig.tileSize,
        };
        const isometricPosition = cartesianToIsometric(originalPosition);
        const tile = gameMapData[y][x];

        cell.x = isometricPosition.x + gameConfig.offset.x;
        cell.y = isometricPosition.y + gameConfig.offset.y - tile.z + tile.height;
        cell.depth = counter;
        counter += 2;
      });
    });

    if (this.highlightedTile) {
      this.highlight.x = this.highlightedTile.x;
      this.highlight.y = this.highlightedTile.y;
      this.highlight.depth = this.highlightedTile.depth + 1;
    }
  }

  addIsometricTile(tile, x, y) {
    const tilePosition = {
      x: x * gameConfig.tileSize,
      y: y * gameConfig.tileSize,
    };
    const isometricPosition = cartesianToIsometric(tilePosition);

    return this.add.sprite(
      isometricPosition.x + gameConfig.offset.x,
      isometricPosition.y + gameConfig.offset.y - tile.z + tile.height,
      tile
    );
  }

  mouseClick(pointer) {
    if (this.clickStart) {
      return
    }

    this.clickStart = true;

    findLast(gameMapData, (row, y) => {
      return findLast(row, (cell, x) => {
        const cartesian = {
          leftTop:  {
            x: x * gameConfig.tileSize,
            y: y * gameConfig.tileSize,
          },
          rightTop: {
            x: (x + 1) * gameConfig.tileSize,
            y: y * gameConfig.tileSize,
          },
          leftBot:  {
            x: x * gameConfig.tileSize,
            y: (y + 1) * gameConfig.tileSize,
          },
          rightBot: {
            x: (x + 1) * gameConfig.tileSize,
            y: (y + 1) * gameConfig.tileSize,
          }
        };
        const isometric = {
          leftTop:  cartesianToIsometric(cartesian.leftTop),
          rightTop: cartesianToIsometric(cartesian.rightTop),
          leftBot:  cartesianToIsometric(cartesian.leftBot),
          rightBot: cartesianToIsometric(cartesian.rightBot),
        };
        const tilePoints = [
          {
            x: isometric.leftTop.x,
            y: isometric.leftTop.y - cell.z
          },
          {
            x: isometric.rightTop.x,
            y: isometric.rightTop.y - cell.z
          },
          {
            x: isometric.rightBot.x,
            y: isometric.rightBot.y - cell.z
          },
          {
            x: isometric.leftBot.x,
            y: isometric.leftBot.y - cell.z
          },
        ];

        if (collision.test.pointPoly(
          pointer.x - gameConfig.offset.x,
          pointer.y - gameConfig.offset.y,
          tilePoints
        )) {
          const tile = gameMapData[y][x];

          if (store.getters.instrument === 'draw') {
            const currentIndex = this.tiles.indexOf(tile.tile);
            let newIndex = currentIndex === this.tiles.length - 1 ? 0 : currentIndex + 1;

            tile.tile = this.tiles[newIndex];
            this.map[y][x].setTexture(tile.tile);
          } else if (store.getters.instrument === 'selection') {
            this.highlightedTile = this.map[y][x];
            this.highlight.visible = true;
          }

          return true;
        }

        return false;
      });
    });
  }
}

const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#4488AA',
  parent: 'phaser-example',
  scene: Editor,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.resize(window.innerWidth, window.innerHeight);
}, false);