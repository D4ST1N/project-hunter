<template>
  <div :class="iconsClass"></div>
</template>

<script>
  export default {
    name: "Icon",
    props: {
      type: {
        type: String,
      },
    },

    computed: {
      iconsClass() {
        return {
          icon: true,
          [`icon--${this.type}`]: !!this.type,
        };
      },
    }
  }
</script>

<style lang="scss">
  .icon {
    width: 32px;
    height: 32px;
    display: inline-flex;
    position: relative;
    z-index: 1;

    &--close {
      background: url("../../assets/icons/cancel.svg") no-repeat center;
    }
  }
</style>