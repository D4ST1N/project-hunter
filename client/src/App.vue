<template>
  <div id="app">
    <NotificationCenter />
    <Map v-if="false"></Map>
    <MapEditor v-if="true"></MapEditor>
  </div>
</template>

<script>
  import Map       from './components/layouts/Map';
  import MapEditor from './components/layouts/MapEditor';
  import API       from './services/API';
  import $events   from './utils/events';

  export default {
    name: 'app',
    components: {
      Map,
      MapEditor,
    },

    created() {
    },

    mounted() {
      this.$logger.log('App loaded');
      $events.$on('saveLogs', this.sendLogs);
      this.createLogFile();
      setInterval(this.sendLogs, 1000 * 60);
    },

    methods: {
      createLogFile() {
        const getId = () => {
          const S4 = () => {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          };

          return `${S4()}-${S4()}-${S4()}`
        };
        this.$root.fileName = `${new Date().toISOString().split('.')[0].replace(/:/g, '-')}&${getId()}`;
        API()
          .post('/start', { fileName: this.$root.fileName })
          .then((response) => {
            this.$logger.log(response.data);
          })
          .catch((error) => {
            this.$logger.log(error, 'error');
          });
      },

      sendLogs() {
        API()
          .post('/logs', { logs: this.$logger.getLogs(), fileName: this.$root.fileName })
          .then((response) => {
            this.$logger.log(response.data);
            $events.$emit('showNotification', {
              title: 'Логи збережено успішно.',
              type: 'success',
            });
          })
          .catch((error) => {
            this.$logger.log(error, 'error');
            $events.$emit('showNotification', {
              title: 'Виникла помилка при збереженні логів.',
            });
          });
      }
    }
  }
</script>

<style>
</style>
