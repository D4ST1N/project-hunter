export default class Entity {
  constructor({ color, size, cellSize, pos }) {
    this.color = color;
    this.size = size;
    this.cellSize = cellSize;
    this.pos = pos;
  }

  get position() {
    return {
      x: this.pos.x * this.cellSize,
      y: this.pos.y * this.cellSize,
    }
  }

  set position(position) {
    this.pos = position;
  }
}