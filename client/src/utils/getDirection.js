export default function getDirection(from, to) {
  if (from.x < to.x) {
    return 'right';
  }

  if (from.x > to.x) {
    return 'left';
  }

  if (from.y < to.y) {
    return 'down';
  }

  if (from.y > to.y) {
    return 'up';
  }

  return 'none';
}