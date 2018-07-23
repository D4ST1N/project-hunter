<template>
  <div class="add-step-window">
    <div class="add-step-window__overlay">
      <div class="add-step-window__content">
        <div class="new-quest__section">
          <div class="new-quest__label">Що потрібно зробити?</div>
          <textarea v-model="step.description" class="new-quest__field" title="Quest name"></textarea>
        </div>
        <Button type="white" size="small" text="Додати" @buttonClick="submit" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddStepWindow",

    data() {
      return {
        step: {
          description: ''
        }
      }
    },

    methods: {
      submit() {
        this.$emit('stepSubmit', this.step);
      }
    }
  }
</script>

<style lang="scss">
  .add-step-window {

    &__overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__content {
      padding: 10px;
      border-radius: 5px;
      background: rgba(144,164,174 ,.8);
    }
  }
</style>