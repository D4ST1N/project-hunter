<template>
  <button :class="buttonClass" @click="buttonClick">
    <slot name="before"></slot>
    {{ text }}
    <slot name="after"></slot>
  </button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      type: {
        type: String,
      },
      text: {
        type: String,
      },
      size: {
        type: String,
        default: 'medium'
      },
      button: {
        type: Object,
      }
    },

    computed: {
      buttonClass() {
        return {
          button: true,
          [`button--${this.type}`]: !!this.type,
          [`button--${this.size}`]: true,
        };
      },
    },

    methods: {
      buttonClick(event) {
        this.$emit('buttonClick', this.button, event);
      }
    }
  }
</script>

<style lang="scss">
  .button {
    display: inline-flex;
    padding: 8px 16px;
    border: 0;
    line-height: 1;
    border-radius: 16px;
    font-family: 'Neucha', cursive;
    color: #fff;
    cursor: pointer;
    margin-right: 8px;
    transition: all .375s;
    background: linear-gradient(to bottom, rgba(30,136,229 ,1), rgba(25,118,210 ,1));
    box-shadow: 2px 2px 8px 0 rgba(13,71,161 ,.75);

    &:hover,
    &:focus {
      outline: none;
      background: linear-gradient(to bottom, rgba(25,118,210 ,1), rgba(21,101,192 ,1));
    }

    &--red {
      background: linear-gradient(to bottom, rgba(244,81,30 ,1), rgba(230,74,25 ,1));
      box-shadow: 2px 2px 8px 0 rgba(191,54,12 ,1);

      &:hover,
      &:focus {
        background: linear-gradient(to bottom, rgba(230,74,25 ,1), rgba(216,67,21 ,1));
      }
    }

    &--green {
      background: linear-gradient(to bottom, rgba(76,175,80 ,1), rgba(67,160,71 ,1));
      box-shadow: 2px 2px 8px 0 rgba(27,94,32 ,1);

      &:hover,
      &:focus {
        background: linear-gradient(to bottom, rgba(67,160,71 ,1), rgba(56,142,60 ,1));
      }
    }

    &--blue {
      background: linear-gradient(to bottom, rgba(79,195,247 ,1), rgba(41,182,246 ,1));
      box-shadow: 2px 2px 8px 0 rgba(2,136,209 ,1);

      &:hover,
      &:focus {
        background: linear-gradient(to bottom, rgba(41,182,246 ,1), rgba(3,169,244 ,1));
      }
    }

    &--white {
      background: #fff;
      box-shadow: 2px 2px 8px 0 rgba(100,100,100 ,.8);
      color: rgba(84,110,122 ,1);

      &:hover,
      &:focus {
        background: linear-gradient(to bottom, #fff, #eee);
      }
    }

    &--transparent {
      background: transparent;
      box-shadow: none;
      color: #fff;

      &:hover,
      &:focus {
        background: rgba(255, 255, 255, .2);
      }
    }

    &--medium {
      font-size: 20px;
    }

    &--big {
      font-size: 24px;
    }

    &--huge {
      font-size: 28px;
    }

    &--small {
      font-size: 16px;
    }

    &--tiny {
      font-size: 14px;
    }
  }
</style>