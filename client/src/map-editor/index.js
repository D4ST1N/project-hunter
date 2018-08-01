import Phaser               from 'phaser';
import PF                   from 'pathfinding';
import findLast             from 'lodash/findLast';
import store                from '../store';
import cartesianToIsometric from '../utils/cartesianToIsometric';
import collision            from '../utils/collision';
import $events              from '../utils/events';
import createArray          from '../utils/createArray';
import objects              from '../resources/objects';
import tiles                from '../resources/tiles';
import createClearMatrix    from '../utils/createClearMatrix';
import createPassageMatrix  from '../utils/createPassageMatrix';
import API                  from '../services/API';
import PlayerPrototype      from '../resources/entities/Player';
import Quest                from '../resources/entities/Quest';
import test                 from '../resources/quests/test';
import logger               from '../logger';
import i18n                 from '../i18n';

let map;
let game;
let Player;
const gameConfig = {
  tileSize: 48,
  offset: {
    x: 400,
    y: 150
  },
  playerSpeed: 2
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
    this.path = [];
    this.isMooving = false;

    logger.log('Subscribe events', 'info');
    $events.$on('enlargeMap', this.enlargeMap.bind(this));
    $events.$on('decreaseMap', this.decreaseMap.bind(this));
    $events.$on('selectInstrument', this.selectInstrument.bind(this));
    $events.$on('saveMap', this.saveMap.bind(this));
    $events.$on('zUp', this.zUp.bind(this));
    $events.$on('zDown', this.zDown.bind(this));
    $events.$on('removeDecor', (decor) => {
      const index = map.scenery.indexOf(decor);
      store.commit('removeDecor', index);
      this.mapObjects[index].destroy();
      this.mapObjects.splice(index, 1);
    });
    $events.$on('moveStarted', () => {
      this.isMooving = true;
    });
    $events.$on('moveEnded', () => {
      this.isMooving = false;
    });
    $events.$on('blockClick', (coordinates) => {
      switch (store.getters.instrument) {
        case 'draw':
          this.drawTile(coordinates);
          break;

        case 'selection':
          this.selectBlock(coordinates);
          break;

        case 'move':
          this.setDecoration(coordinates);
          break;

        default:
          break;
      }
    });
    $events.$on('clickOutsideMap', () => {
      switch (store.getters.instrument) {
        case 'selection':
          this.deselectBlock();
          break;

        default:
          break;
      }
    });
    $events.$on('editorLeave', () => {
      if (game) {
        game.destroy();
        game = undefined;
      }
    });
    logger.log('Events subscribed', 'info');
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
    logger.log('Map saving');
    API()
      .post('/saveMap', {
        name:    store.state.editor.currentMap,
        content: map
      })
      .then((response) => {
        logger.log(response.data);
        $events.$emit('showNotification', {
          title: i18n.t('Map.Save.Success'),
          type: 'success',
        });
      })
      .catch((error) => {
        logger.log(error, 'error');
        $events.$emit('showNotification', {
          title: i18n.t('Map.Save.Error'),
        });
      });
  }

  updateState() {
    logger.log('Update map state');
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
    logger.log('decrease map');
    if (direction === 'down') {
      if (this.map.length === 1) {
        $events.$emit('showNotification', {
          title: i18n.t('Map.ChangeSize.Decrease.Vertical.Error'),
        });

        return;
      }

      try {
        this.map[this.map.length - 1].forEach((sprite) => {
          sprite.destroy();
        });
        map.geo.pop();
        this.map.pop();
      } catch (e) {
        logger.log(e, 'error');
      }
    }

    if (direction === 'right') {
      if (this.map[0].length === 1) {
        $events.$emit('showNotification', {
          title: i18n.t('Map.ChangeSize.Decrease.Horizontal.Error'),
        });

        return;
      }

      try {
        map.geo.forEach(row => row.pop());
        this.map.forEach((row) => {
          row[row.length - 1].destroy();
          row.pop();
        });
      } catch (e) {
        logger.log(e, 'error');
      }
    }

    if (direction === 'up') {
      if (this.map.length === 1) {
        $events.$emit('showNotification', {
          title: i18n.t('Map.ChangeSize.Decrease.Vertical.Error'),
        });

        return;
      }

      try {
        map.geo.shift();
        this.map[0].forEach((sprite) => {
          sprite.destroy();
        });
        this.map.shift();
        gameConfig.offset.x -= gameConfig.tileSize;
        gameConfig.offset.y += gameConfig.tileSize / 2;
      } catch (e) {
        logger.log(e, 'error');
      }
    }

    if (direction === 'left') {
      if (this.map[0].length === 1) {
        $events.$emit('showNotification', {
          title: i18n.t('Map.ChangeSize.Decrease.Horizontal.Error'),
        });

        return;
      }

      try {
        map.geo.forEach(row => row.shift());
        this.map.forEach((row) => {
          row[0].destroy();
          row.shift();
        });
        gameConfig.offset.x += gameConfig.tileSize;
        gameConfig.offset.y += gameConfig.tileSize / 2;
      } catch (e) {
        logger.log(e, 'error');
      }
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
    logger.log('Block up');
    this.updateState();
  }

  zDown() {
    store.commit('selectedTileDown');
    logger.log('Block down');
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
    this.load.on('start', () => {
      logger.log('Started resource loading');
      $events.$emit('resourcesLoadStart');
    });
    this.load.on('progress', (value) => {
      $events.$emit('progressUpdate', value);
    });
    this.load.on('complete', () => {
      logger.log('Resources loading complete');
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
    this.player = null;
    logger.log('Creating scene');
    this.createScene();
    logger.log('Scene created');
    this.updateState();

    if (this.player) {
      Player = new PlayerPrototype(this.player, this.getDecor('player'));
      Player.setSize(gameConfig.tileSize);
      Player.setGameMap(this.map);
      Player.setInitialBlock(store.getters.getPlayer.block);
    }

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
    new Quest(test);
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

    if (Player) {
      Player.update();
    }
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
      const blockData = map.geo[decor.block.y][decor.block.x];

      if (decor.name === 'player') {
        this.player = this.add.sprite(
          gameBlock.x,
          gameBlock.y - blockData.height / 2,
          decorData.miniature
        );

        return this.player;
      }

      return this.add.sprite(
        gameBlock.x - decorData.offset.x,
        gameBlock.y - blockData.height / 2 - decorData.offset.y,
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
      const blockData = map.geo[decor.block.y][decor.block.x];

      if (!(decor.name === 'player' && this.mapObjects[index].x && this.mapObjects[index].y)) {
        this.mapObjects[index].x = gameBlock.x - decorData.offset.x;
        this.mapObjects[index].y = gameBlock.y - blockData.height / 2 - decorData.offset.y;
        this.mapObjects[index].depth = gameBlock.depth + 1;
      }
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
          $events.$emit('blockClick', { x, y });

          return true;
        } else {
          $events.$emit('clickOutsideMap');
        }

        return false;
      });
    });
  }

  drawTile({ x, y }) {
    const tile = map.geo[y][x];
    const tileData = this.getTile(store.getters.drawTile);
    tile.tile = store.getters.drawTile;
    tile.height = tileData.height;

    if (store.state.editor.showEmptyTiles && tile.tile === 'empty') {
      tile.tile = 'empty_cube';
    }

    this.map[y][x].setTexture(tile.tile);
    this.hasChanges = true;
    logger.log(`Place tile ${tile.tile} into [${x},${y}]`);
    this.updateState();
  }

  setDecoration({ x, y }) {
    const decor = this.getDecor(store.getters.decor);

    if (x < decor.grid.size.width - 1 || y < decor.grid.size.height - 1) {
      $events.$emit('showNotification', {
        title: i18n.t('Map.Decor.Error.OutOfMap'),
      });

      return;
    }

    const sprite = this.map[y][x];
    this.addDecor(sprite, decor);
    store.commit('addDecor', {
      name:          decor.name,
      block:         { x, y },
      size:          decor.grid.size,
      matrix:        decor.grid.matrix,
      startPosition: decor.grid.startPosition
    });
    logger.log(`Place decoration ${decor.name} into [${x},${y}]`);
    this.hasChanges = true;
    this.updateState();
  }

  selectBlock({ x, y }) {
    const tile = map.geo[y][x];
    this.highlightedTile = this.map[y][x];
    this.highlight.visible = true;
    store.commit('selectTile', {
      tile,
      x,
      y,
      depth: this.highlightedTile.depth,
    });
    logger.log(`Select tile [${x},${y}]`);
  }

  deselectBlock() {
    this.highlight.visible = false;

    if (store.getters.tile !== null) {
      logger.log('Deselect tile');
      store.commit('selectTile', null);
    }
  }

  findPath(x, y) {
    if (!Player) {
      return;
    }

    const startPosition = Player.block;

    if (this.hasChanges) {
      this.matrix = createPassageMatrix(store.getters.getMap.geo, store.getters.getMap.scenery);
    }

    const grid = new PF.Grid(this.matrix);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(startPosition.x, startPosition.y, x, y, grid).map((pathPoint) => ({
      x: pathPoint[0],
      y: pathPoint[1],
    }));
    path.shift();

    const playerMove = () => {
      Player.move(path);
    };

    if (this.isMooving) {
      $events.$on('moveEnded', playerMove);
    } else {
      playerMove();
      $events.$off('moveEnded', playerMove);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 'rgba(38,50,56 ,1)',
  parent: 'scene',
  scene: Editor,
};

$events.$on('loadMap', (mapData) => {
  $events.$emit('showNotification', {
    title: i18n.t('Map.Load.Success'),
    type: 'success',
  });
  logger.log('Loaded map');
  const restart = game !== undefined;
  map = mapData.content;
  store.commit('updateMap', map);
  store.commit('selectMap', map.info.fileName);

  if (restart) {
    logger.log('Restarting map editor');

    try {
      game.scene.scenes[0].scene.restart();
    } catch (e) {
      logger.log(e, 'error');
      throw new Error(e);
    }
  } else {
    logger.log('Start map editor');
    game = new Phaser.Game(config);
    game.destroy = function() {
      this.renderer.destroy();
      this.loop.stop();
      this.canvas.remove();
    }
  }

  window.addEventListener('resize', () => {
    logger.log(`Window resize to ${window.innerWidth}x${window.innerHeight}`);
    game.resize(window.innerWidth, window.innerHeight);
  }, false);
});