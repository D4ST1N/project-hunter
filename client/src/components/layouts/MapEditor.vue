<template>
  <div class="editor" id="editor">
    <MainMenu />
    <Sidebar />
    <Toolbar />
    <MeetPopup />
    <OpenMaps />
    <ResourceLoader />
    <CreateNewMap />
    <Quests />
  </div>
</template>

<script>
  import Sidebar           from '../../map-editor/resources/Sidebar';
  import OpenMaps          from '../../map-editor/resources/OpenMaps';
  import ResourceLoader    from '../../map-editor/resources/ResourceLoader';
  import MeetPopup         from '../../map-editor/resources/MeetPopup';
  import MainMenu          from '../../map-editor/resources/MainMenu';
  import CreateNewMap      from '../../map-editor/resources/CreateNewMap';
  import Quests            from '../../map-editor/resources/Quests';
  import renderRectangle   from '../../utils/renderRectangle';
  import getMousePosition  from '../../utils/getMousePosition';
  import Toolbar           from '../../map-editor/resources/Toolbar';
  import clearRectangle    from '../../utils/clearRectangle';
  import '../../map-editor';

  export default {
    name: "MapEditor",
    components: {
      Sidebar,
      OpenMaps,
      Toolbar,
      ResourceLoader,
      MeetPopup,
      CreateNewMap,
      MainMenu,
      Quests,
    },

    data() {
      return {
        map: null,
        ctx: null,
        mapData: null,
        show: false,
      };
    },

    mounted() {
      this.$logger.log('Map Editor loaded', 'info');
    },
  }
</script>

<style lang="scss">

</style>