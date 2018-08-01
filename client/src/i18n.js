import Vue     from 'vue';
import VueI18n from 'vue-i18n';
import texts   from './resources/texts';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'ua',
  messages: texts,
});