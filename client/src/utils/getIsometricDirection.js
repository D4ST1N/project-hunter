export default function getIsometricDirection(from, to) {
  if (from.x > to.x) {
    if (from.y > to.y) {
      return 'N';
    }

    if (from.y === to.y) {
      return 'NW';
    }

    if (from.y < to.y) {
      return 'W';
    }
  } else if (from.x < to.x) {
    if (from.y > to.y) {
      return 'E';
    }

    if (from.y === to.y) {
      return 'SE';
    }

    if (from.y < to.y) {
      return 'S';
    }
  } else {
    if (from.y > to.y) {
      return 'NE';
    }

    if (from.y < to.y) {
      return 'SW';
    }
  }
}