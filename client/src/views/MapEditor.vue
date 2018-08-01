<template>
  <div class="editor" id="editor">
    <div class="editor__header">
      <MainMenu />
    </div>
    <div class="editor__content">
      <OpenMaps />
    </div>
    <div id="scene"></div>
    <Sidebar />
    <Toolbar />
    <ResourceLoader />
    <CreateNewMap />
    <Quests />
    <AboutFloatButton />
  </div>
</template>

<script>
  import Sidebar          from '../map-editor/resources/Sidebar';
  import OpenMaps         from '../map-editor/resources/OpenMaps';
  import ResourceLoader   from '../map-editor/resources/ResourceLoader';
  import MainMenu         from '../map-editor/resources/MainMenu';
  import CreateNewMap     from '../map-editor/resources/CreateNewMap';
  import Quests           from '../map-editor/resources/Quests';
  import Toolbar          from '../map-editor/resources/Toolbar';
  import AboutFloatButton from '../components/AboutFloatButton';
  import $events          from '../utils/events';
  import '../map-editor';

  export default {
    name: "MapEditor",
    components: {
      Sidebar,
      OpenMaps,
      Toolbar,
      ResourceLoader,
      CreateNewMap,
      MainMenu,
      Quests,
      AboutFloatButton,
    },

    data() {
      return {
        map: null,
        ctx: null,
        mapData: null,
        show: false,
        showAbout: false,
      };
    },

    mounted() {
      this.$logger.log('Map Editor loaded', 'info');
    },

    beforeRouteLeave (to, from, next) {
      $events.$emit('editorLeave');
      next();
    }
  }
</script>

<style lang="scss">
  .editor {

    &__header, &__content {
      position: relative;
      z-index: 1;
    }
  }
</style>