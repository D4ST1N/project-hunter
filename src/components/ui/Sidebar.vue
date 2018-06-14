<template>
  <div class="sidebar">
    <Tabs :tabs="tabs"/>
  </div>
</template>

<script>
  import Tabs from './Tabs';
  import tiles from '../../resources/tiles';
  import objects from '../../resources/objects';

  export default {
    name: "Sidebar",
    components: {
      Tabs,
    },

    data() {
      return {
        tabs: [
          {
            name: "Тайли",
            content: "tiles",
            active: true,
            items: tiles,
          },
          {
            name: "Об'єкти",
            content: "objects",
            active: false,
            items: objects,
          },
          {
            name: "Події",
            content: "events",
            active: false,
          },
        ]
      }
    }
  }
</script>

<style lang="scss">
  .sidebar {
    position: fixed;
    width: 460px;
    top: 16px;
    right: 16px;
    max-height: calc(100% - 40px);
    background: #fff;
    padding: 16px;
    box-shadow: 2px 2px 8px 0 rgba(55,71,79 ,.64);
  }
</style>