<template>
  <div id="app">
    <Map v-if="false"></Map>
    <MapEditor v-if="true"></MapEditor>
  </div>
</template>

<script>
  import Map from './components/layouts/Map';
  import MapEditor from './components/layouts/MapEditor';
  import $events from './utils/events';
  import './assets/styles/global.scss';

  export default {
    name: 'app',
    components: {
      Map,
      MapEditor,
    },

    created() {
    },

    mounted() {
      $events.$emit('initGame');
    }
  }
</script>

<style>
</style>
