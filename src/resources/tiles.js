import store from '../store';

const action = function () {
  // store.commit('selectTile', this);
};

export default [
  {
    action,
    name: 'empty',
    label: 'Пустота',
    isWalkable: false,
    height: 48,
  },
  {
    action,
    name: 'grass',
    label: 'Трава',
    isWalkable: true,
    height: 48,
  },
  {
    action,
    name: 'wall',
    label: 'Стіна',
    isWalkable: true,
    height: 48,
  },
  {
    action,
    name: 'water',
    label: 'Вода',
    isWalkable: false,
    height: 12,
  },
]