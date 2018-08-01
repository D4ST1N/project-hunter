<template>
  <div class="open-maps popup" v-if="show">
    <div class="popup__overlay">
      <div class="popup__content">
        <h2 class="popup__title">{{ $t('Map.Load.Action') }}</h2>
        <div class="popup__container popup__container--horizontal">
          <div
            v-for="map in maps"
            :key="map.name"
            :class="{'open-maps__map': true, 'open-maps__map--checked': checked === map.name }"
            @click="click(map)"
          >
            <Icon type="file" size="large" class="open-maps__map-icon"></Icon>
            {{ map.content.info.name }}
          </div>
        </div>
        <div class="open-maps__footer">
          <Button type="green" :text="$t('Action.Select')" :rectangular="true" size="small" @buttonClick="openMap">
            <Icon slot="before" type="hand" size="tiny"></Icon>
          </Button>
          <Button type="red" :text="$t('Action.Cancel')" :rectangular="true" size="small" @buttonClick="cancel">
            <Icon slot="before" type="cancel_mono" size="tiny"></Icon>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../services/API';
  import $events from '../../utils/events';
  import '../../assets/styles/popup.scss';

  export default {
    name: "OpenMaps",

    data() {
      return {
        show: false,
        maps: null,
        checked: null,
      };
    },

    mounted() {
      $events.$on('showOpenMaps', () => {
        this.show = true;
      });
      API().get('/maps').then((response) => {
        this.maps = [];
        response.data.forEach((map) => {
          this.maps.push({
            name: map.name,
            content: JSON.parse(map.content)
          })
        });
      }).catch((error) => {
        this.$logger.log(error, 'error');
        $events.$emit('showNotification', {
          title: this.$t('Map.Load.Error'),
        });
      });
    },

    methods: {
      click(map) {
        this.checked = map.name;
      },

      openMap() {
        const mapData = this.maps.find(map => map.name === this.checked);

        if (mapData) {
          $events.$emit('loadMap', mapData);
          this.close();
        }
      },

      cancel() {
        $events.$emit('showMeetPopup');
        this.close();
      },

      close() {
        this.show = false;
      }
    }
  }
</script>

<style lang="scss">
  .open-maps {

    &__map {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;

      &:hover {
        background-color: rgba(255, 255, 255, .2);
      }

      &--checked {
        background-color: rgba(255, 255, 255, .4);
      }

      &-icon {
        width: 64px;
        height: 64px;
        margin-bottom: 8px;
      }
    }
  }
</style>