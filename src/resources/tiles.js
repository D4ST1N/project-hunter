import store from '../store';

const action = function () {
  store.commit('selectTile', this);
};

export default [
  {
    action,
    name: 'empty',
    label: 'Пустота',
    isWalkable: false,
  },
  {
    action,
    name: 'grass',
    label: 'Трава',
    isWalkable: true,
  },
  {
    action,
    name: 'wall',
    label: 'Стіна',
    isWalkable: true,
  },
]