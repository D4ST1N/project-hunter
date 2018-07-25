<template>
  <div :style="{ '--main-bg-color': `-${notificationHeight}px` }" :class="notificationStyles" @click="click" @mouseenter="hover" @mouseleave="leave">
    <div class="notification__content">
      <div class="notification__title">{{ notification.title }}</div>
      <div class="notification__text">{{ notification.text }}</div>
    </div>
    <div class="notification__progress-bar">
      <div class="notification__progress">{{ notification.left }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Notification",
    props: {
      notification: {
        type: Object,
      },
    },

    data() {
      return {
        notificationHeight: null,
      };
    },

    computed: {
      notificationStyles() {
        return {
          notification: true,
          [`notification--${this.notification.type}`]: true,
          'notification--interactive': this.notification.clickToClose,
        }
      },
    },

    mounted() {
      this.notificationHeight = this.$el.offsetHeight + 10;
    },

    methods: {
      hover() {
        if (this.notification.hoverToStop) {
          this.notification.pauseTimer();
        }
      },

      leave() {
        if (this.notification.hoverToStop) {
          this.notification.continueTimer();
        }
      },

      click() {
        if (this.notification.clickToClose) {
          this.notification.hide();
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .notification {
    margin-bottom: 10px;
    background: rgba(255,87,34 ,1);
    color: #fff;
    border-radius: 10px;
    width: 400px;
    box-shadow: 4px 4px 12px 0 rgba(55,71,79 ,.4);
    transition: all .5s;

    &--interactive {
      cursor: pointer;
    }

    &--success {
      background: rgba(76,175,80 ,1);
    }

    &__content {
      padding: 10px 25px;
    }

    &__title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &-enter, &-leave-to {
      transform: translate(-100%, -10px) scale(.15);
      opacity: .25;
      margin-top: var(--main-bg-color);
    }

    &-enter-to, &-leave {
      transform: translate(0) scale(1);
      opacity: 1;
      margin-top: 0;
    }
  }
</style>