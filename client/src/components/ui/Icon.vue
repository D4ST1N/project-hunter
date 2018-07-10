<template>
  <div :class="iconsClass" @click="click"></div>
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
    },

    methods: {
      click() {
        this.$emit('iconClick');
      }
    }
  }
</script>

<style lang="scss">
  @mixin icon($icon) {
    background: url("../../assets/icons/#{$icon}.svg") no-repeat center;
  }

  @mixin monoIcon($icon) {
    -webkit-mask: url("../../assets/icons/#{$icon}.svg") no-repeat center;
    background: #fff;
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

    &--move {
      @include icon('move');
    }

    &--folder {
      @include icon('folder');
    }

    &--folder_empty {
      @include icon('folder_empty');
    }

    &--walk {
      @include icon('walk');
    }

    &--file {
      @include icon('file');
    }

    &--map {
      @include icon('map');
    }

    &--menu {
      @include icon('menu');
    }

    &--search {
      @include monoIcon('search');
    }

    &--close {
      @include monoIcon('close');
    }

    &--return {
      @include monoIcon('return');
    }

    &--map_mono {
      @include monoIcon('map_mono');
    }
  }
</style>