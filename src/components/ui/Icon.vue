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
  @mixin icon($icon) {
    background: url("../../assets/icons/#{$icon}.svg") no-repeat center;
  }

  .icon {
    width: 32px;
    height: 32px;
    display: inline-flex;
    position: relative;
    z-index: 1;
    pointer-events: none;

    &--cancel {
      @include icon('cancel');
    }

    &--select {
      @include icon('select');
    }

    &--brush {
      @include icon('brush');
    }

    &--dropper {
      @include icon('dropper');
    }

    &--grid {
      @include icon('grid');
    }

    &--add {
      @include icon('add');
    }

    &--minus {
      @include icon('minus');
    }

    &--save {
      @include icon('save');
    }
  }
</style>