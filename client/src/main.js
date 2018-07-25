import Vue                from 'vue';
import App                from './App.vue';
import store              from './store'
import AddActionWindow    from './quest-editor/AddActionWindow';
// UI Components
import Button             from './components/ui/Button';
import Icon               from './components/ui/Icon';
import DropDown           from './components/ui/DropDown';
import Popup              from './components/ui/Popup';
import NotificationCenter from './components/ui/NotificationCenter';
import './assets/styles/global.scss';
import logger             from './logger';

Vue.config.productionTip = false;

Vue.prototype.$logger = logger;
Vue.component('AddActionWindow', AddActionWindow);
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('DropDown', DropDown);
Vue.component('Popup', Popup);
Vue.component('NotificationCenter', NotificationCenter);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
