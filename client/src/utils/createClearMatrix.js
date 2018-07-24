import createArray from './createArray';

export default function createClearMatrix(width = 5, height = 5, fill, assign = true) {
  return createArray(width, createArray.bind(null, height, () => assign ? Object.assign({}, fill) : fill));
}