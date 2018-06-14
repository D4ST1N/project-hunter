<template>
  <div class="popup" v-if="show">
    <div class="popup__overlay">
      <div class="popup__wrapper">
        <header class="popup__header">
          <h2 class="popup__title">{{ title }}</h2>
          <div class="popup__close" @click="closePopup">
            <Icon type="close" />
          </div>
        </header>
        <section class="popup__content">
          <slot name="content"></slot>
          <div class="popup__text">{{ content }}</div>
        </section>
        <footer class="popup__footer">
          <Button text="Закрити"/>
          <Button text="Закрити" type="red"/>
          <Button text="Закрити" type="green"/>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon';
  import Button from './Button';

  export default {
    name: "Popup",
    components: {
      Icon,
      Button,
    },
    props: {
      title: {
        type: String,
      },
      content: {
        type: String,
      },
      show: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {};
    },

    methods: {
      closePopup() {
        this.$emit('close');
      },
    }
  }
</script>

<style lang="scss">
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &__overlay {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(48, 63, 159, .75);
    }

    &__wrapper {
      width: 600px;
      background: linear-gradient(to bottom, rgba(255,224,130 ,1), rgba(255,202,40 ,1));
      box-shadow: 0 0 40px 0 rgba(48,63,159 ,.5);
      border-radius: 8px;
      color: #fff;
    }

    &__header {
      position: relative;
      display: flex;
      flex-direction: column;
      background: rgba(255,160,0 ,1);
      padding: 16px;
      border-radius: 8px 8px 0 0;
    }

    &__title {
      margin: 0;
      font-size: 26px;
    }

    &__close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      opacity: .75;
      transform: scale(.95);
      transition: all .375s;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 50%;
        z-index: 0;
      }

      &:hover {
        opacity: 1;
        transform: scale(1);
      }
    }

    &__content {
      height: 400px;
    }
  }
</style>