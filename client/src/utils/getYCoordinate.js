export default function getYCoordinate(x, from, to) {
  return (x - from.x) * (to.y - from.y) / (to.x - from.x) + from.y;
}