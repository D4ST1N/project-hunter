export default function transformToCoordinates(path) {
  return path.map((pathPoint) => {
    return {
      x: pathPoint[0],
      y: pathPoint[1],
    }
  })
}