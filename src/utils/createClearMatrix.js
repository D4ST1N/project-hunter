export default function createClearMatrix(width = 5, height = 5) {
  return Array.apply(null, Array(height))
              .map(() => Array.apply(null, Array(width))
                              .map(() => ({
                                tile:      'grass',
                                isBarrier: false,
                                objects:   [],
                              })));
}