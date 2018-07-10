import createClearMatrix from './createClearMatrix';

export default function createEmptyMap(width, height, tile) {
  return {
    geo: createClearMatrix(height, width, {
      tile: tile.name,
      z: 0,
      height: tile.height,
    }),
    scenery: [],
    info: {},
    events: [],
  }
}