export default function createArray(size, mapper) {
  return Array.apply(null, Array(size)).map(mapper);
}