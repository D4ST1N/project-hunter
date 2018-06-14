import Phaser           from 'phaser';
import store            from '../store';
import getMousePosition from '../utils/getMousePosition';

const gameScene = new Phaser.Scene('Game');
let clickStart = false;
gameScene.preload = function () {
  this.load.image('floor', '/img/tiles/floor.png');
  this.load.image('floor2', '/img/tiles/floor2.png');
  this.load.image('floor3', '/img/tiles/floor3.png');
  this.load.image('ground', '/img/tiles/ground.png');
  this.load.image('sand', '/img/tiles/sand.png');
  this.load.image('water', '/img/tiles/water.png');
  this.load.image('empty', '/img/tiles/empty.png');
};
gameScene.create = function () {
  scene = this;
  renderScene();
  // emitter = new Phaser.Events.EventEmitter();
  // emitter.on('click', mouseClick, this);
};
gameScene.update = function () {
  if (this.input.activePointer.isDown) {
    mouseClick(this.input.activePointer);
  } else {
    clickStart = false;
  }
};
const config = {
  type: Phaser.AUTO,
  width: 1450,
  height: 900,
  tileSize: store.state.game.cellSize,
  backgroundColor: "#4488AA",
  scene: gameScene,
  borderOffset: {
    x: 800,
    y: 0,
  }
};
let gameMap;
let scene;
let gameClass;

function mouseClick(pointer) {
  if (clickStart) {
    return
  }

  clickStart = true;
  console.log(pointer.x, pointer.y);
  const coordinates = getClickCoordinates(pointer);
  console.log(coordinates);
  const clickedPoint = gameMap[coordinates.y][coordinates.x];
  console.log(clickedPoint);
  // const currentTile = this.$store.state.editor.selectedTile;
  //
  // if (currentTile) {
  //   clickedPoint.tile = currentTile.name;
  //   clickedPoint.color = currentTile.color;
  //   clickedPoint.isBarrier = currentTile.isWalkable;
  //   localStorage.setItem('editorMap', JSON.stringify(this.mapData));
  //   this.renderMap();
  // }
}

function renderScene() {
  gameMap.forEach((mapRow, rowIndex) => {
    mapRow.forEach((cell, cellIndex) => {
      drawIsometricTile(cell, cellIndex, rowIndex);
    })
  })
}

function drawIsometricTile(tile, x, y) {
  const tilePosition = {
    x: x * config.tileSize,
    y: y * config.tileSize,
  };
  const isoPt = cartesianToIsometric(tilePosition);
  console.log(tilePosition, isoPt);
  const tileVariant = tile.tile === 'grass' || tile.tile === 'rock' ? 'floor' : tile.tile;

  scene.add.sprite(isoPt.x + config.borderOffset.x, isoPt.y + config.borderOffset.y, tileVariant);
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

function getClickCoordinates(pointer) {
  const isometricCoordinates = cartesianToIsometric({
    x: pointer.x + config.borderOffset.x,
    y: pointer.y + config.borderOffset.y,
  });
  return {
    x: Math.ceil(isometricCoordinates.x / store.state.game.cellSize) - 1,
    y: Math.ceil(isometricCoordinates.y / store.state.game.cellSize) - 1,
  };
}

export default {
  init({ map }) {
    gameMap = map;
  },
  run() {
    gameClass = new Phaser.Game(config);
    console.log(Phaser);
  },
};