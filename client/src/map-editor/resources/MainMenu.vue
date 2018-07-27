<template>
  <div class="main-menu">
    <Button type="transparent" @buttonClick="toggle">
      <Icon slot="before" type="menu" />
    </Button>
    <div v-show="showMenu" class="main-menu__container">
      <div v-for="menuItem in menu" :key="menuItem.name" class="main-menu__item" @click="click(menuItem)">
        {{ menuItem.label }}
      </div>
    </div>
  </div>
</template>

<script>
  import $events from '../../utils/events';

  export default {
    name: "MainMenu",

    data() {
      return {
        showMenu: false,
        menu: [
          {
            name: 'open',
            label: 'Відкрити',

            action() {
              $events.$emit('showOpenMaps');
              this.toggle();
            },
          },
          {
            name: 'create',
            label: 'Створити',

            action() {
              $events.$emit('showCreateMap');
              this.toggle();
            },
          },
          {
            name: 'home',
            label: 'На головну',

            action() {
              this.$router.push('/');
            },
          },
          // {
          //   name: 'change',
          //   label: 'Змінити інформацію про карту',
          //
          //   action(button) {
          //
          //   },
          // },
        ]
      }
    },

    methods: {
      click(button) {
        button.action.call(this);
      },

      toggle() {
        this.showMenu = !this.showMenu;
      }
    }
  }
</script>

<style lang="scss">
  .main-menu {
    position: fixed;
    top: 0;
    left: 0;

    &__container {
      position: absolute;
      left: 100%;
      top: 0;
      padding: 10px;
      background: rgba(255, 255, 255, .5);
      border-radius: 8px;
    }

    &__item {
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
</style>