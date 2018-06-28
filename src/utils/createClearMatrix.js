import createArray from './createArray';

export default function createClearMatrix(width = 5, height = 5) {
  return createArray(width, createArray.bind(null, height, () => ({
    tile:      'grass',
    isBarrier: false,
    objects:   [],
  })));
}