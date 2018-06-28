<template>
  <div class="enlarge-map">
    <div :class="arrowClass" :style="arrowPosition" @click="clickArrow"></div>
  </div>
</template>

<script>
  import $events from '../../../utils/events';

  export default {
    name: "enlargeMap",
    props: {
      direction: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        width: this.$store.state.game.editorSize.width,
        height: this.$store.state.game.editorSize.height,
      };
    },

    computed: {
      arrowClass() {
        return {
          'enlarge-map__arrow': true,
          [`enlarge-map__arrow--${this.direction}`]: true,
        };
      },

      arrowPosition() {
        const pos = {};
        const arrowWidth = 96;
        const arrowHeight = 48;
        const arrowOffset = 16;

        switch (this.direction) {
          case 'left':
            pos.left = `${arrowOffset}px`;
            pos.top = `${arrowOffset}px`;
            break;

          case 'right':
            pos.left = `${this.width - arrowWidth - arrowOffset}px`;
            pos.top = `${this.height - arrowHeight - arrowOffset}px`;
            break;

          case 'up':
            pos.left = `${this.width - arrowWidth - arrowOffset}px`;
            pos.top = `${arrowOffset}px`;
            break;

          case 'down':
            pos.left = `${arrowOffset}px`;
            pos.top = `${this.height - arrowHeight - arrowOffset}px`;
            break;

          default:
            break;
        }
        return pos;
      },
    },

    methods: {
      clickArrow() {
        $events.$emit('enlargeMap', this.direction);
      }
    }
  }
</script>

<style lang="scss">
  .enlarge-map {

    &__arrow {
      border: 24px solid #fff;
      border-left-width: 48px;
      border-right-width: 48px;
      position: fixed;
      opacity: .5;
      transition: all .375s;
      cursor: pointer;
      transform: scale(.85);

      &--left {
        border-bottom-color: transparent;
        border-right-color: transparent;
      }

      &--right {
        border-top-color: transparent;
        border-left-color: transparent;
      }

      &--up {
        border-bottom-color: transparent;
        border-left-color: transparent;
      }

      &--down {
        border-top-color: transparent;
        border-right-color: transparent;
      }

      &:hover {
        opacity: .8;
      }
    }
  }
</style>