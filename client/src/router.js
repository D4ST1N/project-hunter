import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MapEditor from './views/MapEditor';
import QuestEditor from './quest-editor/QuestEditor';
import IconList from './components/layouts/IconsList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/editor',
      name: 'Map Editor',
      component: MapEditor,
      meta: {
        title: 'Map Editor',
      },
    },
    {
      path: '/quests',
      name: 'Quest Editor',
      component: QuestEditor,
      meta: {
        title: 'Quest Editor',
      },
    },
    {
      path: '/icons',
      name: 'Icons list',
      component: IconList,
      meta: {
        title: 'Icons list',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),

      meta: {
        title: 'About',
      },
    },
  ],
});
