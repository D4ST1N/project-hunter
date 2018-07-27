<template>
  <div class="spinner">
    <div v-for="item in [1,1,1,1]" :class="spinnerClass"></div>
  </div>
</template>

<script>
  export default {
    name: "Spinner",
    props: {
      color: {
        type: String,
        default: 'white',
      }
    },

    computed: {
      spinnerClass() {
        return {
          'spinner__item': true,
          [`spinner__item--${this.color}`]: true,
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .spinner {
    display: inline-block;
    position: relative;
    width: 64px;

    &__item {
      position: absolute;
      top: -6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);

      &--black {
        background: #000;
      }

      &--blue {
        background: rgba(33,150,243 ,1);
      }

      &--green {
        background: rgba(76,175,80 ,1);
      }

      &:nth-child(1) {
        left: 6px;
        animation: spinner1 0.6s infinite;
      }

      &:nth-child(2) {
        left: 6px;
        animation: spinner2 0.6s infinite;
      }

      &:nth-child(3) {
        left: 26px;
        animation: spinner2 0.6s infinite;
      }

      &:nth-child(4) {
        left: 45px;
        animation: spinner3 0.6s infinite;
      }
    }
  }

  @keyframes spinner1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes spinner3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes spinner2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
</style>