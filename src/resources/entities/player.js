import Entity from './base';

export default class Player extends Entity {
  constructor({ border, ...options }) {
    super(options);
    this.border = border;
    this.moveTo = Object.assign({}, this.pos);
    this.path = [];
  }
}