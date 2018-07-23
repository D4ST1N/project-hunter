export default function transformToMatrix(map) {
  return map.map(row => row.map((cell) => cell.isBarrier ? 1 : 0));
}