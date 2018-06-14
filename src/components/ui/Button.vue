<template>
  <button :class="buttonClass">
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
    },

    computed: {
      buttonClass() {
        return {
          button: true,
          [`button--${this.type}`]: !!this.type,
        };
      },
    }
  }
</script>

<style lang="scss">
  .button {
    display: inline-flex;
    padding: 8px 16px;
    border: 0;
    line-height: 1;
    font-size: 24px;
    border-radius: 16px;
    font-family: 'Neucha', cursive;
    color: #fff;
    cursor: pointer;
    margin-right: 8px;
    background: linear-gradient(to bottom, rgba(30,136,229 ,1), rgba(25,118,210 ,1));
    box-shadow: 2px 2px 8px 0 rgba(13,71,161 ,.75);

    &--red {
      background: linear-gradient(to bottom, rgba(244,81,30 ,1), rgba(230,74,25 ,1));
      box-shadow: 2px 2px 8px 0 rgba(191,54,12 ,1);
    }

    &--green {
      background: linear-gradient(to bottom, rgba(76,175,80 ,1), rgba(67,160,71 ,1));
      box-shadow: 2px 2px 8px 0 rgba(27,94,32 ,1);
    }
  }
</style>