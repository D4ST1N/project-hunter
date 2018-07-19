import $events               from '../../utils/events';
import getXCoordinate        from '../../utils/getXCoordinate';
import toFixed               from '../../utils/toFixed';
import store                 from '../../store';
import getYCoordinate        from '../../utils/getYCoordinate';
import getIsometricDirection from '../../utils/getIsometricDirection';
import getBorderCoordinates  from '../../utils/getBorderCoordinates';

export default class Player {
  constructor(gameObject, data, speed = 2) {
    this.player = gameObject;
    this.data = data;
    this.speed = speed;
    this.pathPoints = [];
    this.pathNodes = [];
    this.block = null;
    this.map = store.getters.getMap;
    this.prevBlock = this.block;
    this.nextBlock = null;
  }

  setGameMap(map) {
    this.gameMap = map;
  }

  setOffset(offset) {
    this.offset = offset;
  }

  setSize(size) {
    this.size = size;
  }

  move(path) {
    this.pathPoints = path;
  }

  setInitialBlock(block) {
    this.block = block;
  }

  update() {
    if (this.pathPoints.length > 0) {
      const nextPathPoint = this.pathPoints[0];

      this.player.depth = Math.max(
        this.gameMap[this.block.y][this.block.x].depth,
        this.gameMap[nextPathPoint.y][nextPathPoint.x].depth
      ) + 2;

      if (this.pathNodes.length > 0) {
        const nextNode = this.pathNodes[0];

        if (Math.abs(this.player.x - nextNode.x) < this.speed && Math.abs(this.player.y - nextNode.y) < this.speed) {
          this.player.x = nextNode.x;
          this.player.y = nextNode.y;

          if (nextNode.type === 'fromCenter') {
            $events.$emit('moveStarted', this.block);
          } else if (nextNode.type === 'fromBorder') {
            $events.$emit('blockLeave', this.block);
          } else if (nextNode.type === 'toBorder') {
            $events.$emit('blockEnter', nextPathPoint);
          } else if (nextNode.type === 'toCenter') {
            $events.$emit('moveEnded', nextPathPoint);
          }

          this.pathNodes.shift();

          if (this.pathNodes.length === 0) {
            this.block = nextPathPoint;
            this.pathPoints.shift();
          }
        } else {
          let xCoordinate;
          let yCoordinate;

          if (Math.abs(this.player.x - nextNode.x) > Math.abs(this.player.y - nextNode.y)) {
            xCoordinate = nextNode.x > this.player.x
                          ? this.player.x + this.speed
                          : this.player.x - this.speed;
            yCoordinate = getYCoordinate(xCoordinate, this.player, nextNode);
          } else {
            yCoordinate = nextNode.y > this.player.y
                          ? this.player.y + this.speed
                          : this.player.y - this.speed;
            xCoordinate = getXCoordinate(yCoordinate, this.player, nextNode);
          }

          this.player.x = toFixed(xCoordinate, 1);
          this.player.y = toFixed(yCoordinate, 1);
        }
      } else {
        this.pathNodes = this.getPathNodes(this.block, nextPathPoint);
      }
    }
  }

  getPathNodes(from, to) {
    const fromBlock = this.gameMap[from.y][from.x];
    const fromBlockData = this.map.geo[from.y][from.x];
    const fromBlockCenter = {
      x: fromBlock.x,
      y: fromBlock.y - fromBlockData.height / 2,
      type: 'fromCenter',
    };
    const toBlock = this.gameMap[to.y][to.x];
    const toBlockData = this.map.geo[to.y][to.x];
    const toBlockCenter = {
      x: toBlock.x,
      y: toBlock.y - toBlockData.height / 2,
      type: 'toCenter',
    };
    const fromDirection = getIsometricDirection(from, to);
    const toDirection = getIsometricDirection(to, from);
    const fromBlockBorder = getBorderCoordinates(fromBlockCenter, fromDirection, this.size);
    const toBlockBorder = getBorderCoordinates(toBlockCenter, toDirection, this.size);
    fromBlockBorder.type = 'fromBorder';
    toBlockBorder.type = 'toBorder';

    return [
      fromBlockCenter,
      fromBlockBorder,
      toBlockBorder,
      toBlockCenter,
    ];
  }
}