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
    color: '#FFFFFF00',
  },
  {
    action,
    name: 'floor',
    label: 'Трава',
    isWalkable: true,
    color: 'rgba(76,175,80 ,1)',
  },
  {
    action,
    name: 'floor2',
    label: 'Трава2',
    isWalkable: true,
    color: 'rgba(76,175,80 ,1)',
  },
  {
    action,
    name: 'floor3',
    label: 'Трава3',
    isWalkable: true,
    color: 'rgba(76,175,80 ,1)',
  },
  {
    action,
    name: 'ground',
    label: 'Земля',
    isWalkable: false,
    color: 'rgba(96,125,139 ,1)',
  },
  {
    action,
    name: 'sand',
    label: 'Пісок',
    isWalkable: true,
    color: 'rgba(255,235,59 ,1)',
  },
  {
    action,
    name: 'water',
    label: 'Вода',
    isWalkable: false,
    color: 'rgba(33,150,243 ,1)',
  },
]