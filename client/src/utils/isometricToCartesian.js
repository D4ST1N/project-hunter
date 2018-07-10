export default function isometricToCartesian(isometricPosition) {
  return {
    x: (2 * isometricPosition.y + isometricPosition.x) / 2,
    y: (2 * isometricPosition.y - isometricPosition.x) / 2,
  };
}