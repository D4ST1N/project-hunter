import Phaser      from 'phaser';
import findLast    from 'lodash/findLast';
import store       from '../store';
import $events     from '../utils/events';
import createArray from '../utils/createArray';
import collision   from '../utils/collision';

const gameScene = new Phaser.Scene('Game');
let clickStart = false;
let scene;
let keys;
gameScene.preload = function () {
  this.load.image('grid', '/img/tiles/grid.png');
  this.load.image('wall', '/img/tiles/wall.png');
  this.load.image('grass', '/img/tiles/grass.png');
  this.load.image('highlight', '/img/tiles/highlight.png');
  this.load.image('empty', '/img/tiles/empty.png');
};
gameScene.create = function () {
  scene = this;
  renderGrid();
  renderScene();
  keys = this.input.keyboard.addKeys('S');
  // eachRight(gameMapTest, (row, y) => {
  //   eachRight(row, (cell, x) => {
  //     const cartesian = {
  //       leftTop: {
  //         x: x * config.tileSize,
  //         y: y * config.tileSize,
  //       },
  //       rightTop: {
  //         x: (x + 1) * config.tileSize,
  //         y: y * config.tileSize,
  //       },
  //       leftBot: {
  //         x: x * config.tileSize,
  //         y: (y + 1) * config.tileSize,
  //       },
  //       rightBot: {
  //         x: (x + 1) * config.tileSize,
  //         y: (y + 1) * config.tileSize,
  //       }
  //     };
  //     const isometric = {
  //       leftTop: cartesianToIsometric(cartesian.leftTop),
  //       rightTop: cartesianToIsometric(cartesian.rightTop),
  //       leftBot: cartesianToIsometric(cartesian.leftBot),
  //       rightBot: cartesianToIsometric(cartesian.rightBot),
  //     };
  //     console.log(`
  //       cell: ${x},${y}
  //       Cartesian position: [${cartesian.leftTop.x},${cartesian.leftTop.y}; ${cartesian.rightTop.x},${cartesian.rightTop.y}; ${cartesian.rightBot.x},${cartesian.rightBot.y}; ${cartesian.leftBot.x},${cartesian.leftBot.y}]
  //       Isometric position: [${isometric.leftTop.x},${isometric.leftTop.y}; ${isometric.rightTop.x},${isometric.rightTop.y}; ${isometric.rightBot.x},${isometric.rightBot.y}; ${isometric.leftBot.x},${isometric.leftBot.y}]
  //     `);
  //   });
  // });
  // emitter = new Phaser.Events.EventEmitter();
  // emitter.on('click', mouseClick, this);
};
gameScene.update = function () {
  if (keys.S.isDown) {
    mouseMove(this.input.activePointer);
  }

  if (this.input.activePointer.isDown) {
    mouseClick(this.input.activePointer);
  } else {
    clickStart = false;
  }
};
const config = {
  type: Phaser.AUTO,
  width: store.state.game.editorSize.width,
  height: store.state.game.editorSize.height,
  tileSize: store.state.game.cellSize,
  backgroundColor: "#4488AA",
  scene: gameScene,
  borderOffset: {
    x: 800,
    y: 200,
  }
};
const defaultTile = () => ({
  tile: 'wall',
  z: 0,
  height: 48,
});
let gameMap;
let gameMapTest = [
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
let gameClass;

// $events.$on('enlargeMap', (direction) => {
//   if (direction === 'down') {
//     gameMapTest[gameMapTest.length] = createArray(gameMapTest[0].length, () => defaultTile());
//   }
//
//   if (direction === 'right') {
//     gameMapTest.forEach((row) => {
//       row.push(defaultTile());
//     });
//   }
//
//   if (direction === 'up') {
//     gameMapTest.unshift(createArray(gameMapTest[0].length, () => defaultTile()));
//     config.borderOffset.x += store.state.game.cellSize;
//     config.borderOffset.y -= store.state.game.cellSize / 2;
//   }
//
//   if (direction === 'left') {
//     gameMapTest.forEach((row) => {
//       row.unshift(defaultTile());
//     });
//     config.borderOffset.x -= store.state.game.cellSize;
//     config.borderOffset.y -= store.state.game.cellSize / 2;
//   }
//
//   console.log(gameMapTest);
//   renderScene();
// });

function mouseClick(pointer) {
  if (clickStart) {
    return
  }

  clickStart = true;
  const isometricPosition = {
    x: pointer.x - config.borderOffset.x,
    y: pointer.y - config.borderOffset.y,
  };
  const pos = isometricToCartesian(isometricPosition);
  const clickedCoordinates = {
    x: Math.ceil(pos.x / store.state.game.cellSize) - 1,
    y: Math.ceil(pos.y / store.state.game.cellSize) - 1,
  };

  if (gameMapTest[clickedCoordinates.y] && gameMapTest[clickedCoordinates.y][clickedCoordinates.x]) {
    const tile = gameMapTest[clickedCoordinates.y][clickedCoordinates.x];
    tile.tile = tile.tile === 'grass' ? 'wall' : 'grass';
    renderScene();
  }
}

function mouseMove(pointer) {
  let render = false;

  gameMapTest.forEach((row) => {
    const highlightedTile = row.find(tile => tile.highlighted);

    if (highlightedTile) {
      highlightedTile.highlighted = false;
      render = true;
    }
  });

  findLast(gameMapTest, (row, y) => {
    return findLast(row, (cell, x) => {
      const cartesian = {
        leftTop: {
          x: x * config.tileSize,
          y: y * config.tileSize,
        },
        rightTop: {
          x: (x + 1) * config.tileSize,
          y: y * config.tileSize,
        },
        leftBot: {
          x: x * config.tileSize,
          y: (y + 1) * config.tileSize,
        },
        rightBot: {
          x: (x + 1) * config.tileSize,
          y: (y + 1) * config.tileSize,
        }
      };
      const isometric = {
        leftTop: cartesianToIsometric(cartesian.leftTop),
        rightTop: cartesianToIsometric(cartesian.rightTop),
        leftBot: cartesianToIsometric(cartesian.leftBot),
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
        pointer.x - config.borderOffset.x,
        pointer.y - config.borderOffset.y,
        tilePoints
      )) {
        cell.highlighted = true;
        render = true;

        return true
      }

      return false;
    });
  });

  if (render) {
    renderScene();
  }
}

function renderGrid() {
  // for (let x = 0; x <= gameMapTest.length + 1; x += 1) {
  //   for (let y = 0; y <= gameMapTest[0].length + 1; y += 1) {
  //     drawIsometricGrid(x, y);
  //   }
  // }
}

function renderScene() {
  // scene.update();
  gameMapTest.forEach((mapRow, rowIndex) => {
    mapRow.forEach((cell, cellIndex) => {
      drawIsometricGrid(cellIndex, rowIndex);
      drawIsometricTile(cell, cellIndex, rowIndex);
    })
  })
}

function drawIsometricGrid(x, y) {
  const gridPosition = {
    x: x * config.tileSize,
    y: y * config.tileSize,
  };
  const isoPt = cartesianToIsometric(gridPosition);
  scene.add.sprite(isoPt.x + config.borderOffset.x, isoPt.y + config.borderOffset.y + config.tileSize, 'grid');
}

function drawIsometricTile(tile, x, y) {
  const tilePosition = {
    x: x * config.tileSize,
    y: y * config.tileSize,
  };
  const isoPt = cartesianToIsometric(tilePosition);
  // const tileVariant = tile.tile === 'grass' || tile.tile === 'rock' ? 'floor' : tile.tile;

  scene.add.sprite(isoPt.x + config.borderOffset.x, isoPt.y + config.borderOffset.y - tile.z + tile.height, tile.tile);

  if (tile.highlighted) {
    scene.add.sprite(isoPt.x + config.borderOffset.x, isoPt.y + config.borderOffset.y - tile.z + tile.height, 'highlight');
  }
}

function cartesianToIsometric(cartPt) {
  return {
    x: cartPt.x - cartPt.y,
    y: (cartPt.x + cartPt.y) / 2,
  };
}

function isometricToCartesian(isoPt) {
  return {
    x: (2 * isoPt.y + isoPt.x) / 2,
    y: (2 * isoPt.y - isoPt.x) / 2,
  };
}

export default {
  init({ map }) {
    gameMap = map;
  },
  run() {
    game = new Phaser.Game(config);
  },
};