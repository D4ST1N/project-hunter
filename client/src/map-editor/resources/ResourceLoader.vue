<template>
  <div class="resource-loader" v-show="show">
    <div class="resource-loader__title">Завантаження карти...</div>
    <div class="resource-loader__progress-bar">
      <div class="resource-loader__progress" :style="{ width: `${progress}%` }">
        <div class="resource-loader__progress-percent">{{ progress }}%</div>
      </div>
      <div class="resource-loader__progress-percent resource-loader__progress-percent--white">{{ progress }}%</div>
    </div>
  </div>
</template>

<script>
  import toFixed from '../../utils/toFixed';
  import $events from '../../utils/events';

  export default {
    name: "ResourceLoader",

    data() {
      return {
        progress: 0,
        timerId: null,
        show: false,
      }
    },

    mounted() {
      $events.$on('resourcesLoadStart', () => {
        this.show = true;
        this.progress = 0;
        $events.$on('progressUpdate', (progress) => {
          this.progress = this.toFixed(progress * 100, 1);
        });
        $events.$on('progressStop', () => {
          this.show = false;
        })
      });
    },

    methods: {
      toFixed,
    }
  }
</script>

<style lang="scss">
  .resource-loader {

    &__title {
      position: fixed;
      top: calc(50% - 30px);
      width: 100%;
      text-align: center;
      color: #fff;
    }

    &__progress-bar {
      position: fixed;
      height: 20px;
      width: 50vw;
      left: 25vw;
      top: 50%;
    }

    &__progress {
      position: absolute;
      height: 100%;
      background: rgba(255, 255, 255, .75);
      border-radius: 8px;
      overflow: hidden;

      &-percent {
        width: 50vw;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;

        &--white {
          color: #fff;
        }
      }
    }
  }
</style>