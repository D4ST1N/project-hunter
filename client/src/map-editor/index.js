import Phaser               from 'phaser';
import PF                   from 'pathfinding';
import store                from '../store';
import cartesianToIsometric from '../utils/cartesianToIsometric';
import collision           from '../utils/collision';
import findLast            from 'lodash/findLast';
import $events             from '../utils/events';
import createArray         from '../utils/createArray';
import objects             from '../resources/objects';
import tiles               from '../resources/tiles';
import createClearMatrix   from '../utils/createClearMatrix';
import createPassageMatrix from '../utils/createPassageMatrix';
import API                 from '../services/API';

let map;
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
let keys;

class Editor extends Phaser.Scene {
  constructor() {
    super();

    this.map = [];
    this.mapObjects = [];
    this.clickStart = false;
    this.hasChanges = false;
    this.depthMatrix = [];

    $events.$on('enlargeMap', this.enlargeMap.bind(this));
    $events.$on('decreaseMap', this.decreaseMap.bind(this));
    $events.$on('selectInstrument', this.selectInstrument.bind(this));
    $events.$on('saveMap', this.saveMap);
    $events.$on('zUp', this.zUp);
    $events.$on('zDown', this.zDown);
    $events.$on('removeDecor', (decor) => {
      const index = map.scenery.indexOf(decor);
      store.commit('removeDecor', index);
      this.mapObjects[index].destroy();
      this.mapObjects.splice(index, 1);
    });
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
    console.log(store.state.editor.currentMap);
    API().post('/saveMap', {
      name: store.state.editor.currentMap,
      content: map
    }).then((response) => {
      console.log(response);
    }).catch(console.error);
  }

  updateState() {
    store.commit('updateMap', map);
  }

  selectInstrument(instrument) {
    if (instrument !== 'selection') {
      this.highlight.visible = false;
    }
  }

  enlargeMap(direction) {
    if (direction === 'down') {
      map.geo[map.geo.length] = createArray(map.geo[0].length, () => defaultTile());
      this.map[this.map.length] = map.geo[map.geo.length - 1].map((cell, cellIndex) => {
        return this.addIsometricTile(cell.tile, cellIndex, map.geo.length - 1);
      });
    }

    if (direction === 'right') {
      map.geo.forEach((row) => {
        row.push(defaultTile());
      });
      this.map.forEach((row, index) => {
        row.push(this.addIsometricTile('wall', row.length - 1, index));
      });
    }

    if (direction === 'up') {
      map.geo.unshift(createArray(map.geo[0].length, () => defaultTile()));
      this.map.unshift(createArray(map.geo[0].length, (item, index) => {
        return this.addIsometricTile('wall', 0, index);
      }));
      gameConfig.offset.x += gameConfig.tileSize;
      gameConfig.offset.y -= gameConfig.tileSize / 2;
    }

    if (direction === 'left') {
      map.geo.forEach((row) => {
        row.unshift(defaultTile());
      });

      this.map.forEach((row, index) => {
        row.unshift(this.addIsometricTile('wall', 0, index));
      });
      gameConfig.offset.x -= gameConfig.tileSize;
      gameConfig.offset.y -= gameConfig.tileSize / 2;
    }

    this.hasChanges = true;
    this.updateState();
    this.createDepthMatrix();
  }

  decreaseMap(direction) {
    if (direction === 'down') {
      this.map[this.map.length - 1].forEach((sprite) => {
        sprite.destroy();
      });
      map.geo.pop();
      this.map.pop();
    }

    if (direction === 'right') {
      map.geo.forEach(row => row.pop());
      this.map.forEach((row) => {
        row[row.length - 1].destroy();
        row.pop();
      });
    }

    if (direction === 'up') {
      map.geo.shift();
      this.map[0].forEach((sprite) => {
        sprite.destroy();
      });
      this.map.shift();
      gameConfig.offset.x -= gameConfig.tileSize;
      gameConfig.offset.y += gameConfig.tileSize / 2;
    }

    if (direction === 'left') {
      map.geo.forEach(row => row.shift());
      this.map.forEach((row) => {
        row[0].destroy();
        row.shift();
      });
      gameConfig.offset.x += gameConfig.tileSize;
      gameConfig.offset.y += gameConfig.tileSize / 2;
    }

    this.hasChanges = true;
    this.updateState();
    this.createDepthMatrix();
  }

  createDepthMatrix() {
    const height = this.map.length;
    const width = this.map[0].length;
    const matrix = createClearMatrix(height, width, 0);
    const step = 5;
    let iterator = 0;
    const maxLength = Math.max(width, height);

    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
      for (let y = height - 1; y >= 0; --y) {
        let x = k - y;

        if (x >= 0 && x < width) {
          matrix[y][x] = step * iterator;
          iterator++;
        }
      }
    }

    this.depthMatrix = matrix;
  }

  zUp() {
    store.commit('selectedTileUp');
    this.updateState();
  }

  zDown() {
    store.commit('selectedTileDown');
    this.updateState();
  }

  moveSelection(direction) {
    const selectedTile = store.getters.tile;

    if (!selectedTile) {
      return;
    }
    const position = {
      x: selectedTile.x,
      y: selectedTile.y,
    };
    let newPosition = position;
    let newSelectedTile;

    if (!this.highlight.visible) {
      return;
    }

    if (direction === 'left' && position.x > 0) {
      newPosition = {
        x: position.x - 1,
        y: position.y,
      };
    }

    if (direction === 'right' && position.x < map.geo[0].length - 1) {
      newPosition = {
        x: position.x + 1,
        y: position.y,
      };
    }

    if (direction === 'up' && position.y > 0) {
      newPosition = {
        x: position.x,
        y: position.y - 1,
      };
    }

    if (direction === 'down' && position.y < map.geo.length - 1) {
      newPosition = {
        x: position.x,
        y: position.y + 1,
      };
    }

    newSelectedTile = map.geo[newPosition.y][newPosition.x];
    this.highlightedTile = this.map[newPosition.y][newPosition.x];
    store.commit('selectTile', {
      tile: newSelectedTile,
      x: newPosition.x,
      y: newPosition.y,
      depth: this.highlightedTile.depth,
    });
  }

  getDecor(decorName) {
    return objects.scenery.find(decor => decor.name === decorName);
  }

  getTile(tileName) {
    return tiles.find(tile => tile.name === tileName);
  }

  preload() {
    $events.$emit('resourcesLoadStart');
    this.load.on('progress', (value) => {
      $events.$emit('progressUpdate', value);
    });
    this.load.on('complete', () => {
      $events.$emit('progressStop');
    });
    tiles.forEach((tile) => {
      this.load.image(tile.name, `/img/tiles/${tile.name}.png`);
    });
    objects.scenery.forEach((decor) => {
      this.load.image(decor.miniature, `/img/objects/${decor.miniature}.png`);
    });
    this.load.image('highlight', '/img/tiles/highlight.png');
    this.load.image('empty_cube', '/img/tiles/empty_cube.png');
  }

  create() {
    this.createScene();
    this.updateState();
    this.highlight = this.add.sprite(0, 0, 'highlight');
    this.highlight.visible = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.getDefaultOffset();
    keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    };
    this.matrix = createPassageMatrix(map.geo, map.scenery);
  }

  update() {
    if (store.getters.instrument === 'selection') {
      if (Phaser.Input.Keyboard.JustDown(keys.left)) {
        this.moveSelection('left');
      }

      if (Phaser.Input.Keyboard.JustDown(keys.right)) {
        this.moveSelection('right');
      }

      if (Phaser.Input.Keyboard.JustDown(keys.up)) {
        if (keys.up.ctrlKey) {
          this.zUp();
        } else {
          this.moveSelection('up');
        }
      }

      if (Phaser.Input.Keyboard.JustDown(keys.down)) {
        if (keys.down.ctrlKey) {
          this.zDown();
        } else {
          this.moveSelection('down');
        }
      }
    } else {
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
    }

    if (this.input.activePointer.isDown) {
      this.mouseClick(this.input.activePointer);
    } else {
      this.clickStart = false;
    }

    this.updateScene();
  }

  createScene() {
    this.map = map.geo.map((mapRow, rowIndex) => {
      return mapRow.map((cell, cellIndex) => {
        return this.addIsometricTile(cell.tile, cellIndex, rowIndex);
      });
    });
    this.mapObjects = map.scenery.map((decor) => {
      const gameBlock = this.map[decor.block.y][decor.block.x];
      const decorData = this.getDecor(decor.name);

      return this.add.sprite(
        gameBlock.x - decorData.offset.x,
        gameBlock.y - decorData.offset.y,
        decorData.miniature
      );
    });
    this.createDepthMatrix();
  }

  addDecor(block, decor) {
    this.mapObjects.push(this.add.sprite(
      block.x - decor.offset.x,
      block.y - decor.offset.y,
      decor.miniature
    ));
  }

  updateScene() {
    this.map.forEach((mapRow, y) => {
      mapRow.forEach((cell, x) => {
        const originalPosition = {
          x: x * gameConfig.tileSize,
          y: y * gameConfig.tileSize,
        };
        const isometricPosition = cartesianToIsometric(originalPosition);
        const tile = map.geo[y][x];

        cell.x = isometricPosition.x + gameConfig.offset.x;
        cell.y = isometricPosition.y + gameConfig.offset.y - tile.z + tile.height;
        cell.depth = this.depthMatrix[y][x];
      });
    });

    this.updateScenery();

    if (this.highlightedTile) {
      this.highlight.x = this.highlightedTile.x;
      this.highlight.y = this.highlightedTile.y;
      this.highlight.depth = this.highlightedTile.depth + 1;
    }
  }

  updateScenery() {
    map.scenery.forEach((decor, index) => {
      const decorData = this.getDecor(decor.name);
      const gameBlock = this.map[decor.block.y][decor.block.x];

      this.mapObjects[index].x = gameBlock.x - decorData.offset.x;
      this.mapObjects[index].y = gameBlock.y - decorData.offset.y;
      this.mapObjects[index].depth = gameBlock.depth + (decor.name === 'player' ? 2 : 1);
    });
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

    findLast(map.geo, (row, y) => {
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
          const tile = map.geo[y][x];

          if (store.getters.instrument === 'draw') {
            const tileData = this.getTile(store.getters.drawTile);
            tile.tile = store.getters.drawTile;
            tile.height = tileData.height;

            if (store.state.editor.showEmptyTiles && tile.tile === 'empty') {
              tile.tile = 'empty_cube';
            }

            this.map[y][x].setTexture(tile.tile);
            this.hasChanges = true;
            this.updateState();
          } else if (store.getters.instrument === 'selection') {
            this.highlightedTile = this.map[y][x];
            this.highlight.visible = true;
            store.commit('selectTile', {
              tile,
              x,
              y,
              depth: this.highlightedTile.depth,
            });
          } else if (store.getters.instrument === 'move') {
            const decor = this.getDecor(store.getters.decor);
            const sprite = this.map[y][x];
            this.addDecor(sprite, decor);
            map.scenery.push({
              name:          decor.name,
              block:         { x, y },
              size:          decor.grid.size,
              matrix:        decor.grid.matrix,
              startPosition: decor.grid.startPosition
            });
            this.hasChanges = true;
            this.updateState();
          } else if (store.getters.instrument === 'walk') {
            this.findPath(x, y);
          }

          return true;
        } else {
          if (store.getters.instrument === 'selection') {
            this.highlight.visible = false;
            store.commit('selectTile', null);
          }
        }

        return false;
      });
    });
  }

  findPath(x, y) {
    const player = store.getters.getPlayer;
    const startPosition = player.block;

    if (this.hasChanges) {
      this.matrix = createPassageMatrix(store.getters.getMap.geo, store.getters.getMap.scenery);
    }

    const grid = new PF.Grid(this.matrix);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(startPosition.x, startPosition.y, x, y, grid);
    path.shift();

    const intervalId = setInterval(() => {
      if (path.length === 0) {
        clearInterval(intervalId);
      } else {
        store.commit('updateDecor', {
          decor: player,
          newState: {
            block: {
              x: path[0][0],
              y: path[0][1],
            }
          }
        });
        map.scenery = store.getters.objectsData;

        path.shift();
      }
    }, 250);
  }
}

const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 'rgba(38,50,56 ,1)',
  parent: 'phaser-example',
  scene: Editor,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
};

$events.$on('loadMap', (mapData) => {
  console.log(mapData);
  map = mapData.content;
  store.commit('selectMap', map.info.fileName);
  const game = new Phaser.Game(config);

  window.addEventListener('resize', () => {
    game.resize(window.innerWidth, window.innerHeight);
  }, false);
});