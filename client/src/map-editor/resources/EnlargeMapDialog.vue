<template>
  <div class="enlarge-map-dialog" v-show="show" :style="dialogStyles">
    <div class="enlarge-map-dialog__content">
      <p>{{ $t('Map.ChangeSize.Increase.Action') }}</p>
      <Button :text="$t('Map.ChangeSize.Left')" :rectangular="true" type="white" :button="{ type: 'left' }" @buttonClick="click"/>
      <Button :text="$t('Map.ChangeSize.Right')" :rectangular="true" type="white" :button="{ type: 'right' }" @buttonClick="click"/>
      <Button :text="$t('Map.ChangeSize.Up')" :rectangular="true" type="white" :button="{ type: 'up' }" @buttonClick="click"/>
      <Button :text="$t('Map.ChangeSize.Down')" :rectangular="true" type="white" :button="{ type: 'down' }" @buttonClick="click"/>
      <Button :text="$t('Action.Close')" @buttonClick="show = false"/>
    </div>
  </div>
</template>

<script>
  import $events            from '../../utils/events';
  import getElementPosition from '../../utils/getElementPosition';

  export default {
    name: "EnlargeMapDialog",

    data() {
      return {
        left: 0,
        top: 0,
        show: false,
      }
    },

    mounted() {
      $events.$on('showEnlargeDialog', (event) => {
        this.showDialog(event.target);
      });
    },

    computed: {
      dialogStyles() {
        return {
          left: `${this.left}px`,
          top: `${this.top}px`,
        }
      }
    },

    methods: {
      showDialog(element) {
        const position = getElementPosition(element);
        this.left = position.left + element.offsetWidth / 2;
        this.top = position.top;
        this.show = true;
      },

      click(button) {
        $events.$emit('enlargeMap', button.type);
      }
    }
  }
</script>

<style lang="scss">
  .enlarge-map-dialog {
    position: fixed;
    background: #fff;
    transform: translate(-50%, -110%);

    &__content {
      padding: 10px;
    }
  }
</style>