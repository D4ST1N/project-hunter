export default function getBorderCoordinates(center, direction, size) {
  switch (direction) {
    case 'N':
      return {
        x: center.x,
        y: center.y - size / 2,
      };

    case 'NE':
      return {
        x: center.x + size / 2,
        y: center.y - size / 4,
      };

    case 'E':
      return {
        x: center.x + size,
        y: center.y,
      };

    case 'SE':
      return {
        x: center.x + size / 2,
        y: center.y + size / 4,
      };

    case 'S':
      return {
        x: center.x,
        y: center.y + size / 2,
      };

    case 'SW':
      return {
        x: center.x - size / 2,
        y: center.y + size / 4,
      };

    case 'W':
      return {
        x: center.x - size,
        y: center.y,
      };

    case 'NW':
      return {
        x: center.x - size / 2,
        y: center.y - size / 4,
      };

    default:
      break;
  }
}