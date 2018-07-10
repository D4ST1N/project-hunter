export default function cartesianToIsometric(cartesianPosition) {
  return {
    x: cartesianPosition.x - cartesianPosition.y,
    y: (cartesianPosition.x + cartesianPosition.y) / 2,
  };
}