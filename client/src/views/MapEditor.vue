<template>
  <div class="editor" id="editor">
    <Sidebar />
    <Toolbar />
    <MeetPopup />
    <OpenMaps />
    <ResourceLoader />
    <CreateNewMap />
    <Quests />
    <MainMenu />
    <div class="editor__about">
      <Button :squash="true" type="transparent" @buttonClick="toggleAbout">
        <Icon slot="before" type="info"></Icon>
      </Button>
    </div>
    <About v-if="showAbout" :popup="true" @close="toggleAbout" />
  </div>
</template>

<script>
  import Sidebar        from '../map-editor/resources/Sidebar';
  import OpenMaps       from '../map-editor/resources/OpenMaps';
  import ResourceLoader from '../map-editor/resources/ResourceLoader';
  import MeetPopup      from '../map-editor/resources/MeetPopup';
  import MainMenu       from '../map-editor/resources/MainMenu';
  import CreateNewMap   from '../map-editor/resources/CreateNewMap';
  import Quests         from '../map-editor/resources/Quests';
  import Toolbar        from '../map-editor/resources/Toolbar';
  import About          from '../views/About';
  import '../map-editor';

  export default {
    name: "MapEditor",
    components: {
      About,
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
        showAbout: false,
      };
    },

    mounted() {
      this.$logger.log('Map Editor loaded', 'info');
    },

    methods: {
      toggleAbout() {
        this.showAbout = !this.showAbout;
      }
    }
  }
</script>

<style lang="scss">
  .editor {

    &__about {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
  }
</style>