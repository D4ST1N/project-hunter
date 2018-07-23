export default function getXCoordinate(y, from, to) {
  return (y - from.y) * (to.x - from.x) / (to.y - from.y) + from.x;
}