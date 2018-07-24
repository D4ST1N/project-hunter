import Vue from 'vue';
import App from './App.vue';
import store from './store'
import AddActionWindow from './quest-editor/AddActionWindow';
// UI Components
import Button from './components/ui/Button';
import Icon from './components/ui/Icon';
import DropDown from './components/ui/DropDown';
import Popup from './components/ui/Popup';
import './assets/styles/global.scss';

Vue.config.productionTip = false;
Vue.component('AddActionWindow', AddActionWindow);
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('DropDown', DropDown);
Vue.component('Popup', Popup);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
