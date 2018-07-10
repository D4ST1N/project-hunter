import tiles from '../resources/tiles';

export default function createPassageMatrix(geo, decorations) {
  const passageMatrix = geo.map((geoRow) => {
    return geoRow.map((geoBlock) => {
      const blockData = tiles.find(tile => tile.name === geoBlock.tile);

      return blockData.isWalkable ? 0 : 1;
    });
  });

  decorations.forEach((decor) => {
    const blockPosition = decor.block;

    decor.matrix.forEach((matrixRow, rowIndex) => {
      matrixRow.forEach((matrixCell, cellIndex) => {
        const x = decor.size.width - 1 - cellIndex;
        const y = decor.size.height - 1 - rowIndex;

        if (matrixCell > 0 && blockPosition.y - y >= 0 && blockPosition.x - x >= 0) {
          passageMatrix[blockPosition.y - y][blockPosition.x - x] = 1;
        }
      });
    })
  });

  return passageMatrix;
}