<template>
  <div class="notification-center">
    <transition-group name="notification">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        v-if="notification.isVisible"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
  import $events      from  '../../utils/events';
  import Notification from './Notification';
  import NotificationPrototype from '../../resources/entities/Notification';

  export default {
    name: "NotificationCenter",
    components: {
      Notification,
    },

    data() {
      return {
        notifications: [],
      };
    },

    mounted() {
      $events.$on('showNotification', this.showNotification);
    },

    methods: {
      showNotification(opts) {
        this.notifications.push(new NotificationPrototype(opts));
      }
    }
  }
</script>

<style scoped lang="scss">
  .notification-center {
    position: fixed;
    bottom: 80px;
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 5;
    padding: 10px;
  }
</style>