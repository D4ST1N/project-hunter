<template>
  <div class="main-menu">
    <div class="main-menu__wrapper"><router-link to="/" class="nav-link">
      <Button :rectangular="true" class="about__button" :text="$t('Routes.Home')" size="small" type="white">
        <Icon slot="before" size="tiny" type="castle"></Icon>
      </Button>
    </router-link>
      <Button
        :rectangular="true"
        :text="$t('Map.Load.Action')"
        type="white"
        size="small"
        @buttonClick="openMap"
      >
        <Icon slot="before" type="map" size="tiny"></Icon>
      </Button>
      <Button
        :rectangular="true"
        :text="$t('Map.Create.Action')"
        type="white"
        size="tiny"
        @buttonClick="createMap"
      >
        <Icon slot="before" type="add" size="tiny"></Icon>
      </Button>
    </div>
  </div>
</template>

<script>
  import $events from '../../utils/events';

  export default {
    name: "MainMenu",

    data() {
      return {
      }
    },

    methods: {
      openMap() {
        $events.$emit('showOpenMaps');
      },

      createMap() {
        $events.$emit('showCreateMap');
      },
    }
  }
</script>

<style lang="scss">
  .main-menu {

    &__wrapper {
      padding: 5px 10px;
      border-radius: 5px;
      background: rgba(120,144,156 ,.2);
      margin-bottom: 10px;
    }

    &__container {
      position: absolute;
      left: 100%;
      top: 0;
      padding: 10px;
      background: rgba(255, 255, 255, .5);
      border-radius: 8px;
    }

    &__item {
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
</style>