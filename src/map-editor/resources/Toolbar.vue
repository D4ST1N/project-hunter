<template>
  <div class="toolbar">
    <div v-for="group in groups" :key="group.name" class="toolbar__group">
      <Button
        v-for="button in group.buttons"
        :key="button.name"
        size="tiny"
        :button="button"
        :type="getButtonType(button)"
        @buttonClick="buttonClick"
      >
        <Icon slot="before" :type="button.icon" />
      </Button>
    </div>
    <EnlargeMapDialog />
    <DecreaseMapDialog />
  </div>
</template>

<script>
  import Button            from '../../components/ui/Button';
  import Icon              from '../../components/ui/Icon';
  import $events           from '../../utils/events';
  import EnlargeMapDialog  from './EnlargeMapDialog';
  import DecreaseMapDialog from './DecreaseMapDialog';

  export default {
    name: "Toolbar",
    components: {
      Button,
      Icon,
      EnlargeMapDialog,
      DecreaseMapDialog,
    },

    data() {
      return {
        groups: [
          {
            name: 'instruments',
            buttons: [
              {
                name: 'selection',
                label: 'Вибір',
                icon: 'select',

                action(button) {
                  this.deselectInstrumentsButton();
                  this.$set(button, 'selected', true);
                  this.$store.commit('selectInstrument', button.name);
                  $events.$emit('selectInstrument', button.name);
                }
              },
              {
                name: 'draw',
                label: 'Малювати',
                icon: 'brush',

                action(button) {
                  this.deselectInstrumentsButton();
                  this.$set(button, 'selected', true);
                  this.$store.commit('selectInstrument', button.name);
                  $events.$emit('selectInstrument', button.name);
                }
              },
              {
                name: 'picker',
                label: 'Пипетка',
                icon: 'dropper',

                action(button) {
                  this.deselectInstrumentsButton();
                  this.$set(button, 'selected', true);
                  this.$store.commit('selectInstrument', button.name);
                  $events.$emit('selectInstrument', button.name);
                }
              },
            ]
          },
          {
            name: 'view',
            buttons: [
              {
                name: 'Walkable',
                label: 'Показати непрохідні ділянки',
                icon: 'grid',
              }
            ]
          },
          {
            name: 'map',
            buttons: [
              {
                name: 'enlarge',
                label: 'Збільшити',
                icon: 'add',

                action(button, event) {
                  $events.$emit('showEnlargeDialog', event);
                }
              },
              {
                name: 'decrease',
                label: 'Зменшити',
                icon: 'minus',

                action(button, event) {
                  $events.$emit('showDecreaseDialog', event);
                }
              },
              {
                name: 'save',
                label: 'Зберети',
                icon: 'save',

                action() {
                  $events.$emit('saveMap');
                }
              }
            ]
          }
        ]
      }
    },

    methods: {
      buttonClick(button, event) {
        if (typeof button.action === 'function') {
          button.action.call(this, button, event);
        }
      },

      getButtonType(button) {
        return button.selected ? 'blue' : 'white';
      },

      deselectInstrumentsButton() {
        const selectedButton = this.groups
          .find(group => group.name === 'instruments')
          .buttons
          .find(button => button.selected);

        if (selectedButton) {
          this.$set(selectedButton, 'selected', false);
        }
      }
    }
  }
</script>

<style lang="scss">
  .toolbar {
    position: fixed;
    left: 5px;
    bottom: 5px;
    height: 60px;
    display: flex;
    padding: 5px 10px;
    background: rgba(69,90,100 ,.5);
    border-radius: 10px;

    &__group {
      margin: 0 10px;
    }

    &__button {
      margin: 0 5px;
    }
  }
</style>