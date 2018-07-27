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
      name: 'home',
      component: Home,
    },
    {
      path: '/editor',
      name: 'Map Editor',
      component: MapEditor,
    },
    {
      path: '/quests',
      name: 'Quest Editor',
      component: QuestEditor,
    },
    {
      path: '/icons',
      name: 'Icons list',
      component: IconList,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
