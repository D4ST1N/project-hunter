<template>
  <div class="meet-popup popup" v-show="show">
    <div class="popup__overlay">
      <div class="popup__content">
        <div class="popup__container meet-popup__container">
          <div class="meet-popup__item" @click="showMaps">
            <Icon type="map" class="meet-popup__icon" />
            <span>{{ $t('Map.Load.Action') }}</span>
          </div>
          <div class="meet-popup__item" @click="createMap">
            <Icon type="map_mono" class="meet-popup__icon" />
            <span>{{ $t('Map.Create.Action') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon      from '../../components/ui/Icon';
  import $events   from '../../utils/events';
  import '../../assets/styles/popup.scss';

  export default {
    name: "MeetPopup",
    components: {
      Icon,
    },

    data() {
      return {
        show: true,
      };
    },

    mounted() {
      $events.$on('showMeetPopup', () => {
        this.show = true;
      });
    },

    methods: {
      showMaps() {
        $events.$emit('showOpenMaps');
        this.show = false;
      },

      createMap() {
        $events.$emit('showCreateMap');
        this.show = false;
      },
    }
  }
</script>

<style lang="scss">
  .meet-popup {

    &__container {
      flex-direction: row;
    }

    &__item {
      display: flex;
      flex-direction: column;
      color: #fff;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, .2);
      }
    }

    &__icon {
      width: 96px;
      height: 96px;
      margin-bottom: 8px;
    }
  }
</style>