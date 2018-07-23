import createArray from './createArray';

export default function createClearMatrix(width = 5, height = 5, fill) {
  return createArray(width, createArray.bind(null, height, () => fill));
}